import axios from "axios";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const { itemXML, prospectId } = await req.json();

    if (!itemXML) {
      return new NextResponse(
        JSON.stringify({ message: "itemXML is required in the request body" }),
        { status: 400 }
      );
    }
    const sourceId = process.env.PCH_SOURCE_ID;
    const apiKey = process.env.PCH_API_KEY;
    const dealershipId = process.env.DEALERSHIP_ID;

    if (!sourceId || !apiKey || !dealershipId) {
      return new NextResponse(
        JSON.stringify({ message: "Missing API credentials" }),
        { status: 500 }
      );
    }
    const xmlPayload = `
      <AddProspect>
        <Item>
          <SourceProspectId>${dealershipId}_${prospectId}</SourceProspectId>
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
      return new NextResponse(
        JSON.stringify({
          message: "Lead submitted successfully",
          data: response.data,
        }),
        { status: 200 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Failed to submit lead" }),
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error posting lead:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error submitting lead" }),
      { status: 500 }
    );
  }
}
