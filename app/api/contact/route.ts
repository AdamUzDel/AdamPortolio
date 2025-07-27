import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Create email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">New Portfolio Contact</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Someone reached out through your website!</p>
        </div>
        
        <div style="padding: 30px;">
          <div style="background-color: #f8fafc; padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #8b5cf6;">
            <h2 style="color: #4f46e5; margin: 0 0 20px 0; font-size: 20px;">Contact Information</h2>
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Name:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${name}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Email:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${email}</span>
            </div>
            <div>
              <strong style="color: #374151;">Subject:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${subject}</span>
            </div>
          </div>
          
          <div style="background-color: #ffffff; padding: 25px; border: 2px solid #e5e7eb; border-radius: 12px; margin-bottom: 25px;">
            <h3 style="color: #4f46e5; margin: 0 0 15px 0; font-size: 18px;">Message</h3>
            <div style="line-height: 1.6; color: #374151; white-space: pre-wrap;">${message}</div>
          </div>
          
          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; text-align: center;">
            <p style="margin: 0; color: #065f46; font-size: 14px;">
              📧 This message was sent from your portfolio website contact form<br>
              🌐 <strong>BytebaseTech Portfolio</strong>
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              Reply directly to this email to respond to ${name}
            </p>
          </div>
        </div>
      </div>
    `

    const emailText = `
New Portfolio Contact Form Submission

Contact Information:
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from your BytebaseTech portfolio website.
Reply directly to this email to respond to ${name}.
    `

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Use Resend's default sending domain
      to: ["adamssemakula@gmail.com"],
      // replyTo: email, // This allows you to reply directly to the sender
      subject: `Portfolio Contact: ${subject}`,
      html: emailHtml,
      text: emailText,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    console.log("Email sent successfully:", data)
    return NextResponse.json(
      {
        message: "Message sent successfully! I'll get back to you soon.",
        emailId: data?.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        error: "Failed to send message. Please try again later.",
      },
      { status: 500 },
    )
  }
}

// Add CORS headers to handle preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
