import { type NextRequest, NextResponse } from "next/server"

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
    const emailContent = {
      to: "adamssemakula@gmail.com",
      from: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4f46e5; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #4f46e5; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #374151;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #065f46; font-size: 14px;">
              This message was sent from your portfolio website contact form.
            </p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
        
        This message was sent from your portfolio website contact form.
      `,
    }

    // Here you would integrate with your preferred email service
    // For example, using SendGrid, Nodemailer, or Resend

    // For demonstration, we'll use a mock email service
    // Replace this with your actual email service implementation
    const emailResponse = await sendEmail(emailContent)

    if (emailResponse.success) {
      return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 })
    } else {
      throw new Error("Failed to send email")
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 })
  }
}

// Mock email service function - replace with your actual email service
async function sendEmail(emailContent: any) {
  // This is a placeholder for your email service integration
  // You can use services like:
  // - Resend: https://resend.com/
  // - SendGrid: https://sendgrid.com/
  // - Nodemailer with Gmail/SMTP
  // - EmailJS for client-side sending

  try {
    // Example with Resend (uncomment and configure):
    
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const { data, error } = await resend.emails.send({
      from: 'portfolio@yourdomain.com',
      to: emailContent.to,
      subject: emailContent.subject,
      html: emailContent.html,
      reply_to: emailContent.from,
    });
    
    if (error) {
      throw error;
    }
    
    return { success: true, data };
   

    // For now, we'll simulate a successful email send
    /* console.log("Email would be sent to:", emailContent.to)
    console.log("Subject:", emailContent.subject)
    console.log("From:", emailContent.from)

    return { success: true } */
  } catch (error) {
    console.error("Email service error:", error)
    return { success: false, error }
  }
}
