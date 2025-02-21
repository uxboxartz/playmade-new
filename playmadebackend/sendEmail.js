
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "*",
    methods: [ 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
  }));
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.post("/send-email", async (req, res) => {
  try {
 
    const { name, email, message } = req.body;

   
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Inquiry Received</title>
          <style>
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;700&display=swap');
        
        body, table, td {
            font-family: 'Cabinet Grotesk', Arial, sans-serif !important;
        }
    </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: Cabinet Grotesk, sans-serif; background-color: #f4f4f4;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 40px 0;">
              <tr>
                  <td align="center">
                      <table width="600" border="0" cellspacing="12" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                          
                          <!-- Logo -->
                          <tr>
                              <td align="center" style="padding-bottom: 20px;">
                                   <img src="https://www.playmade.co.uk/assests/Logo.png" alt="PlayMade Logo" width="100" style="display: block;">
                              </td>
                          </tr>
                          
                          <!-- Title -->
                          <tr>
                              <td align="center" style="font-size: 22px; font-weight: bold; color: #000000; padding-bottom: 10px;">
                                  New Inquiry Received!
                              </td>
                          </tr>
                          
                          <!-- Subtitle -->
                          <tr>
                              <td align="center" style="font-size: 16px; color: #666666; padding-bottom: 20px;">
                                  You've received a new contact form submission from your website. Here are the details:
                              </td>
                          </tr>
                          
                          <!-- User Details -->
                          <tr>
                              <td style="background-color: #f8f8f8; padding: 15px; border-radius: 6px; font-size: 16px; color: #333333; margin-bottom: 10px;">
                                  <strong>Name</strong><br>
                                  ${name}
                              </td>
                          </tr>
                          
                          <tr>
                              <td style="background-color: #f8f8f8; padding: 15px; border-radius: 6px; font-size: 16px; color: #333333; margin-bottom: 10px;">
                                  <strong>Email Address</strong><br>
                                  ${email}
                              </td>
                          </tr>
                          
                          <tr>
                              <td style="background-color: #f8f8f8; padding: 15px; border-radius: 6px; font-size: 16px; color: #333333; margin-bottom: 10px;">
                                  <strong>Message</strong><br>
                                  ${message}
                              </td>
                          </tr>
                          
                          <!-- Follow-up Message -->
                          <tr>
                              <td align="center" style="font-size: 18px; font-weight: bold; color: #000000; padding-top: 30px;">
                                  Please follow up with the user as soon as possible.
                              </td>
                          </tr>
                          
                          <tr>
                              <td align="center" style="font-size: 16px; color: #666666; padding-top: 10px;">
                                  Thank you, PlayMade Website Notification System
                              </td>
                          </tr>
                          
                          <!-- Social Media Buttons -->
                          <tr>
                              <td align="center" style="padding-top: 30px;">
                                  <a href="https://facebook.com" style="background-color: #3b5998; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 16px; margin-right: 10px;">Facebook</a>
                                  <a href="https://twitter.com" style="background-color: #1da1f2; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 16px;">Twitter</a>
                              </td>
                          </tr>
                          
                          <!-- Footer -->
                          <tr>
                              <td align="center" style="font-size: 12px; color: #999999; padding-top: 30px;">
                                  Copyright © 2025 – present. PlayMade. All rights reserved.<br>
                                  PlayMade, 200 York Way, N7 9AX, London
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `;

   
    const mailOptions = {
        from: `"${name}" <${email}>`, // Your email (authenticated sender)
        to: `"PlayMade Notifications" <${process.env.EMAIL_USER}>`, // Your email to receive inquiries
        // replyTo: email, // User's email so you can reply directly to them
        subject: "New Inquiry from PlayMade Website",
        html: htmlTemplate,
      };
      

    await transporter.sendMail(mailOptions);

   
        // ✅ Updated Success Response
        res.json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Failed to send email." });
    }
});

app.post("/become-partner", async (req, res) => {
  try {
    const { first_name = '', last_name = '', email = '', phone = '', city = '', organization_type = '', message = '' } = req.body;

   
    if (!first_name || !last_name || !email || !phone || !city || !organization_type || !message) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const htmlTemplates = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>New Inquiry Received</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Link to Google Fonts -->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;700&display=swap');
        
        body, table, td {
            font-family: 'Cabinet Grotesk', Arial, sans-serif !important;
        }
    </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: Cabinet Grotesk, sans-serif; background-color: #f4f4f4;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 40px 0;">
            <tr>
                <td align="center">
                    <table width="600" border="0" cellspacing="12" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                        
                        <!-- Logo -->
                        <tr>
                            <td align="center" style="padding-bottom: 20px;">
                                <img src="https://www.playmade.co.uk/assests/Logo.png" alt="PlayMade Logo" width="100" style="display: block;">
                            </td>
                        </tr>

                        <!-- Title -->
                        <tr>
                            <td align="center" style="font-size: 22px; font-weight: bold; color: #000000; padding-bottom: 10px;">
                                New Partnership Inquiry Received!
                            </td>
                        </tr>

                        <!-- Subtitle -->
                        <tr>
                            <td align="center" style="font-size: 16px; color: #666666; padding-bottom: 20px;">
                                You've received a new partnership request from your website. Here are the details
                            </td>
                        </tr>

                        <!-- Details -->
                        <tr>
                            <td style="background-color: #f8f8f8; padding: 15px; border-radius: 6px; font-size: 16px; color: #333333; margin-bottom: 10px;">
                                <strong>First Name</strong><br>
                                ${first_name}
                            </td>
                        </tr>

                        <tr>
                            <td style="background-color: #f8f8f8; padding: 15px; border-radius: 6px; font-size: 16px; color: #333333; margin-bottom: 10px;">
                                <strong>Last Name</strong><br>
                                ${last_name}
                            </td>
                        </tr>

                        <tr>
                            <td style="background-color: #f8f8f8; padding: 15px; border-radius: 6px; font-size: 16px; color: #333333; margin-bottom: 10px;">
                                <strong>Email Address</strong><br>
                                ${email}
                            </td>
                        </tr>

                        <tr>
                            <td style="background-color: #f8f8f8; padding: 15px; border-radius: 6px; font-size: 16px; color: #333333; margin-bottom: 10px;">
                                <strong>Phone(Local)</strong><br>
                                ${phone}
                            </td>
                        </tr>

                        <tr>
                            <td style="background-color: #f8f8f8; padding: 15px; border-radius: 6px; font-size: 16px; color: #333333; margin-bottom: 10px;">
                                <strong>City</strong><br>
                                ${city}
                            </td>
                        </tr>

                        <tr>
                            <td style="background-color: #f8f8f8; padding: 15px; border-radius: 6px; font-size: 16px; color: #333333; margin-bottom: 10px;">
                                <strong>Organization</strong><br>
                                ${organization_type}
                            </td>
                        </tr>

                        <tr>
                            <td style="background-color: #f8f8f8; padding: 15px; border-radius: 6px; font-size: 16px; color: #333333; margin-bottom: 10px;">
                                <strong>Project Details</strong><br>
                                ${message}
                            </td>
                        </tr>

                        <!-- Follow-up Message -->
                        <tr>
                            <td align="center" style="font-size: 18px; font-weight: bold; color: #000000; padding-top: 30px;">
                                Please follow up with the user as soon as possible.
                            </td>
                        </tr>

                        <tr>
                            <td align="center" style="font-size: 16px; color: #666666; padding-top: 10px;">
                                Thank you, PlayMade Website Notification System
                            </td>
                        </tr>

                        <!-- Social Media Buttons -->
                        <tr>
                            <td align="center" style="padding-top: 30px;">
                                <a href="https://facebook.com" style="background-color: #3b5998; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 16px; margin-right: 10px;">
                                    Facebook
                                </a>
                                <a href="https://twitter.com" style="background-color: #1da1f2; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 16px;">
                                    Twitter
                                </a>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td align="center" style="font-size: 12px; color: #999999; padding-top: 30px;">
                                Copyright © 2025 – present. PlayMade. All rights reserved.<br>
                                PlayMade, 200 York Way, N7 9AX, London
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;

    const mailOptions = {
      // from: `"PlayMade Notifications" <${process.env.EMAIL_USER}>`,
      from: ` "PlayMade Notifications" ${first_name} ${last_name} <${email}>`,
      to: process.env.EMAIL_USER,
      // to: email, 
      subject: "New Partnership Inquiry from PlayMade website",
      html: htmlTemplates,
    };

   
    await transporter.sendMail(mailOptions);


      // ✅ Updated Success Response
      res.json({ success: true, message: "Partnership inquiry email sent successfully!" });
    } catch (error) {
        console.error("Error sending partnership inquiry email:", error);
        res.status(500).json({ success: false, message: "Failed to send partnership inquiry email." });
    }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
