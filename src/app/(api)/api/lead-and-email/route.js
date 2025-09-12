import axios from "axios";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      itemXML,
      prospectId,
      toEmail,
      emailPayload,
      subject,
      formType,
      enableEmail = true,
      enableCrm = true
    } = await req.json();

    const results = {
      email: null,
      crm: null,
      success: true,
      errors: []
    };

    // Validate required fields based on enabled features
    if (enableEmail && !emailPayload) {
      return new NextResponse(
        JSON.stringify({ 
          message: "Email is enabled but missing required field: emailPayload" 
        }),
        { status: 400 }
      );
    }

    if (enableCrm && !itemXML) {
      return new NextResponse(
        JSON.stringify({ 
          message: "CRM is enabled but missing required field: itemXML" 
        }),
        { status: 400 }
      );
    }

    // Handle Email Sending
    if (enableEmail) {
      try {
        // Check for email environment variables
        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = process.env.SMTP_PORT;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const smtpFrom = process.env.SMTP_FROM;
        const leadsEmail = process.env.LEADS_EMAIL || toEmail;

        if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !smtpFrom) {
          throw new Error("Missing SMTP configuration");
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(smtpPort),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        // Send email
        await transporter.sendMail({
          from: smtpFrom,
          to: leadsEmail,
          cc: smtpUser,
          subject: subject || `${formType || 'Form'} Submission`,
          text: emailPayload,
        });

        results.email = {
          success: true,
          message: "Email sent successfully"
        };
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        results.email = {
          success: false,
          message: "Failed to send email",
          error: emailError.message
        };
        results.errors.push("Email sending failed");
        results.success = false;
      }
    }

    // Handle CRM Lead Submission
    if (enableCrm) {
      try {
        // Check for CRM environment variables
        const sourceId = process.env.PCH_SOURCE_ID;
        const apiKey = process.env.PCH_API_KEY;
        const dealershipId = process.env.DEALERSHIP_ID;

        if (!sourceId || !apiKey || !dealershipId) {
          throw new Error("Missing CRM API credentials");
        }

        // Prepare XML payload
        const xmlPayload = `
          <AddProspect>
            <Item>
              <SourceProspectId>${dealershipId}_${prospectId || Date.now()}</SourceProspectId>
              <DealershipId>${dealershipId}</DealershipId>
              <Email>${itemXML?.email || ""}</Email>
              <Name>${itemXML?.name || ""}</Name>
              <Phone>${itemXML?.phone || ""}</Phone>
              <SourceDate>${new Date().toISOString()}</SourceDate>
              <VehicleMake>${itemXML?.vehicleMake || ""}</VehicleMake>
              <VehicleModel>${itemXML?.vehicleModel || ""}</VehicleModel>
              <VehicleYear>${itemXML?.vehicleYear || ""}</VehicleYear>
              <VehicleVIN>${itemXML?.vehicleVIN || ""}</VehicleVIN>
              <VehicleStockNum>${itemXML?.vehicleStockNum || ""}</VehicleStockNum>
              <VehicleColor>${itemXML?.vehicleColor || ""}</VehicleColor>
              <VehiclePrice>${itemXML?.vehiclePrice || ""}</VehiclePrice>
              <Notes>${itemXML?.note || ""}</Notes>
            </Item>
          </AddProspect>
        `;

        // Submit to CRM
        const response = await axios.post(
          `https://pch.v-sept.com/VSEPTPCHPostService.aspx?method=AddProspect&sourceid=${sourceId}`,
          xmlPayload,
          {
            headers: {
              "Content-Type": "application/xml",
              "X-PCHAPIKey": apiKey,
            },
          }
        );

        if (response.status === 200) {
          results.crm = {
            success: true,
            message: "Lead submitted successfully to CRM",
            data: response.data
          };
        } else {
          throw new Error(`CRM API returned status: ${response.status}`);
        }
      } catch (crmError) {
        console.error("CRM submission failed:", crmError);
        results.crm = {
          success: false,
          message: "Failed to submit lead to CRM",
          error: crmError.message
        };
        results.errors.push("CRM submission failed");
        results.success = false;
      }
    }

    // Return comprehensive results
    const responseStatus = results.success ? 200 : 207; // 207 Multi-Status for partial success
    return new NextResponse(
      JSON.stringify({
        success: results.success,
        message: results.success 
          ? "All operations completed successfully" 
          : "Some operations failed",
        results: results,
        timestamp: new Date().toISOString()
      }),
      { status: responseStatus }
    );

  } catch (error) {
    console.error("Unified API error:", error);
    return new NextResponse(
      JSON.stringify({ 
        success: false,
        message: "Internal server error",
        error: error.message 
      }),
      { status: 500 }
    );
  }
}