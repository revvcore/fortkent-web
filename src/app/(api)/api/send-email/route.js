import nodemailer from "nodemailer";

export async function POST(req) {
  const body = await req.json();
  const { toEmail, payload, subject, formType } = body;

  if (!toEmail || !payload) {
    return Response.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Transporter with env vars
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: toEmail,
      cc: process.env.SMTP_USER, // optional
      subject: subject || `${formType || 'Form'} Submission`,
      text: payload,
    });

    return Response.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending failed:", error);
    return Response.json({ message: "Failed to send email" }, { status: 500 });
  }
}
