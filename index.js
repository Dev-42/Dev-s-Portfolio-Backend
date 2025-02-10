const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    // Email to Yourself
    const mailOptionsToMe = {
      from: process.env.EMAIL_USER,
      to: "devbhattacharya42@gmail.com",
      subject: subject || "New Contact Form Message",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333;">New Contact Form Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "No Subject"}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 10px; border-left: 3px solid #007bff;">${message}</blockquote>
          <hr>
          <p style="font-size: 12px; color: #888;">This message was sent via your portfolio website.</p>
        </div>
      `,
    };

    // Thank-you email to the sender
    const mailOptionsToSender = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Contacting Me!",
      html: `
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; background: #f4f4f4; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
      <div style="background: #007bff; color: white; padding: 15px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Thank You for Reaching Out!</h1>
      </div>
      
      <div style="background: white; padding: 20px; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; color: #333;">Hello <strong>${name}</strong>,</p>
        <p style="font-size: 16px; color: #555;">
          I truly appreciate you taking the time to reach out. Your message has been received, and I will do my best to respond as soon as possible.
        </p>
        
        <div style="margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #007bff;">
          <p style="margin: 0; font-size: 14px; color: #555;"><strong>Your Message:</strong></p>
          <p style="font-size: 14px; color: #333; margin-top: 5px;">${message}</p>
        </div>
        
        <p style="font-size: 16px; color: #555;">I will get back to you as soon as possible. If it's urgent, feel free to reply to this email.</p>

        <p style="font-size: 16px; color: #555; margin-top: 20px;">Best regards,</p>
        <p style="font-size: 18px; font-weight: bold; color: #007bff;">Dev Bhattacharya</p>
        <p style="font-size: 14px; color: #666;">Software Developer | Contact: devbhattacharya42@gmail.com</p>
      </div>

      <div style="text-align: center; font-size: 12px; color: #888; margin-top: 15px;">
        <p>© ${new Date().getFullYear()} Dev Bhattacharya. All Rights Reserved.</p>
      </div>
    </div>
  `,
    };

    // Send both emails
    await transporter.sendMail(mailOptionsToMe);
    await transporter.sendMail(mailOptionsToSender);

    res
      .status(200)
      .json({ success: true, message: "Emails sent successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to send email", error });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
