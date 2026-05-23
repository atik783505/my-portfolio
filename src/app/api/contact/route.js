import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    // 1. Basic Fields Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message fields are required." },
        { status: 400 }
      );
    }

    // 2. Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 3. Basic Spam Prevention (Length and Size Limits)
    if (name.length > 80) {
      return NextResponse.json(
        { error: "Name exceeds the maximum length of 80 characters." },
        { status: 400 }
      );
    }
    if (email.length > 100) {
      return NextResponse.json(
        { error: "Email exceeds the maximum length of 100 characters." },
        { status: 400 }
      );
    }
    if (subject && subject.length > 150) {
      return NextResponse.json(
        { error: "Subject exceeds the maximum length of 150 characters." },
        { status: 400 }
      );
    }
    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message exceeds the maximum length of 5000 characters." },
        { status: 400 }
      );
    }

    // 4. Verify SMTP Credentials Exist
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const receiveEmail = process.env.CONTACT_RECEIVER_EMAIL || gmailUser;

    if (!gmailUser || !gmailPass) {
      console.error("Missing Gmail SMTP credentials in .env.local file.");
      return NextResponse.json(
        { error: "Contact service is temporarily misconfigured. Please try again later." },
        { status: 500 }
      );
    }

    // 5. Configure Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    // 6. Define Mail Options
    const mailOptions = {
      from: `"${name}" <${gmailUser}>`, // Gmail SMTP overrides the "from" to match authenticated user
      to: receiveEmail,
      replyTo: email, // Direct replies back to the sender's actual email
      subject: `Portfolio Contact: ${subject || "New Collaboration Opportunity"} [from ${name}]`,
      text: `New message from ${name} (${email}):\n\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 30px; border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; background-color: #fafafc; color: #111112;">
          <div style="text-align: center; margin-bottom: 30px;">
            <span style="font-size: 24px; font-weight: 800; letter-spacing: -0.025em; border-bottom: 2px solid #7DF9C2; padding-bottom: 6px;">
              AR<span style="color: #7DF9C2;">.</span>
            </span>
          </div>
          
          <h2 style="font-size: 18px; font-weight: 700; color: #0a0a0f; margin-top: 0; margin-bottom: 24px; text-align: center;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #ffffff; border: 1px solid rgba(0,0,0,0.04); border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid rgba(0,0,0,0.03);">
                <td style="padding: 10px 0; font-weight: 600; font-size: 13px; color: #666668; width: 100px;">Name:</td>
                <td style="padding: 10px 0; font-size: 13px; color: #111112; font-weight: 500;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(0,0,0,0.03);">
                <td style="padding: 10px 0; font-weight: 600; font-size: 13px; color: #666668;">Email:</td>
                <td style="padding: 10px 0; font-size: 13px; color: #111112;"><a href="mailto:${email}" style="color: #7DF9C2; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(0,0,0,0.03);">
                <td style="padding: 10px 0; font-weight: 600; font-size: 13px; color: #666668;">Subject:</td>
                <td style="padding: 10px 0; font-size: 13px; color: #111112; font-style: italic;">${subject || "No Subject"}</td>
              </tr>
            </table>

            <div style="margin-top: 20px;">
              <div style="font-weight: 600; font-size: 13px; color: #666668; margin-bottom: 10px;">Message:</div>
              <div style="background-color: #f6f6fa; border-left: 3px solid #A78BFA; border-radius: 6px; padding: 18px; font-size: 13.5px; line-height: 1.6; white-space: pre-wrap; color: #222225;">${message}</div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 36px; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 20px;">
            <p style="font-size: 10px; color: #9a9a9f; margin: 0; font-family: monospace;">
              SENT VIA ATIKUR RAHMAN PORTFOLIO ENG.
            </p>
          </div>
        </div>
      `,
    };

    // 7. Send Mail asynchronously
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("SMTP contact route error details:", error);
    return NextResponse.json(
      { error: "Failed to dispatch email. Please verify SMTP setup or try again." },
      { status: 500 }
    );
  }
}
