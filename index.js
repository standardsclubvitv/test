import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
dotenv.config();

const app = express();

// ✅ Enable CORS for all origins
// app.use(cors());

// ✅ Allow JSON parsing
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(cors({
  origin: 'https://standardsclubvitv.github.io', // Use this exact URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD  // App password (not your actual password)
    }
});

// ✅ Send Welcome Email
app.post("/send-welcome-email", async (req, res) => {
    const { email, name } = req.body;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Welcome to the Standards Club!",
            html: `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to the Standards Club</title>
            </head>
            <body style="margin:0; padding:0; background-color:#121212; font-family: Arial, sans-serif; text-align: center; color: #ffffff;">
            
                <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center">
                            <table width="600px" style="background:#1c1c1c; padding:20px; border-radius:10px; box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);">
                                <tr>
                                    <td align="center">
                                        <img src="https://standardsclubvitv.github.io/Standards-Club-VITv/assets/logo.png" alt="Standards Club Logo" style="width:80px; margin-bottom: 10px;">
                                        <h2 style="color:#FFD700;">Welcome, ${name}!</h2>
                                        <p style="font-size:16px; color:#ccc;">We're thrilled to have you at <b>Standards Club</b>. Get ready to explore, engage, and grow with us.</p>
                                        <p style="font-size:16px; color:#ccc;">Click below to start your journey!</p>
            
                                        <a href="https://standardsclubvitv.github.io/Standards-Club-VITv/login/" style="display:inline-block; background:#FFD700; color:#121212; font-weight:bold; padding:12px 25px; border-radius:5px; text-decoration:none; margin-top:15px;">Get Started</a>
            
                                        <p style="margin-top:20px; font-size:14px; color:#888;">Join and share with new clubs in VIT! Follow us on social media:</p>
                                        <div style="margin-top:10px;">
                                            <a href="https://www.instagram.com/standardsclubvit?igsh=anR2dnZoamRxczRk" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" style="width:30px;"></a>
                                            <a href="https://in.linkedin.com/in/standards-club-vit-b512a829a" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" style="width:30px; margin-left:10px;"></a>
                                        </div>
            
                                        <p style="margin-top:20px; font-size:12px; color:#888;">© 2025 Standards Club. All Rights Reserved.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            
            </body>
            </html>`
        });

        res.status(200).json({ message: "Welcome email sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending welcome email", error });
    }
});
// ✅ Send Board Login Alert
app.post("/send-board-login-alert", async (req, res) => {
    const { email, device, ip, dateTime } = req.body;
console.log(email, device, ip, dateTime)
    try {
        await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Board Login Alert",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Security Alert - Board Login</title>
        <style>
            body {
                background-color: #121212;
                font-family: Arial, sans-serif;
                color: #fff;
                margin: 0;
                padding: 0;
                text-align: center;
            }
            .email-container {
                max-width: 600px;
                margin: 30px auto;
                padding: 30px;
                background-color: #1c1c1c;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(255, 80, 80, 0.3);
            }
            .email-header {
                color: #FF4C4C;
                font-size: 28px;
                margin-bottom: 20px;
            }
            .alert-message {
                font-size: 18px;
                margin-bottom: 30px;
                color: #fff;
            }
            .highlight {
                color: #FF4C4C;
                font-weight: bold;
            }
            .cta {
                display: inline-block;
                padding: 12px 25px;
                background-color: #FF4C4C;
                color: #fff;
                font-weight: bold;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
            }
            .cta:hover {
                background-color: #e04343;
            }
            .footer {
                font-size: 12px;
                color: #888;
                margin-top: 30px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h2>Security Alert!</h2>
            </div>
            <div class="alert-message">
                <p><b>A login was detected on your <span class="highlight">Board Panel</span>.</b></p>
                <p><b>Device:</b> ${device}</p>
                <p><b>IP Address:</b> ${ip}</p>
                <p><b>Date & Time:</b> ${dateTime}</p>
            </div>
            <p>If this wasn’t you, please <a href="mailto:pranav.devhead.standardsclub@gmail.com" class="cta">Contact the Development Head</a> immediately!</p>
            <div class="footer">
                <p>&copy; 2025 Standards Club VIT. All Rights Reserved.</p>
            </div>
        </div>
    </body>
    </html>`
});

        res.status(200).json({ message: "Board login alert email sent successfully!" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error sending email", error });
    }
});

// ✅ Send Event Registration Confirmation
app.post("/send-email", async (req, res) => {
    const { userEmail, eventName, formattedDateTime, eventVenue } = req.body;

    if (!userEmail || !eventName || !formattedDateTime || !eventVenue) {
        return res.status(400).json({ error: "Missing required event details" });
    }

    try {
        await transporter.sendMail({
    from: process.env.EMAIL,
    to: userEmail,
    subject: `🎉 Registration Confirmed: ${eventName}`,
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Confirmed: ${eventName}</title>
        <style>
            body {
                background-color: #121212;
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                color: #fff;
                text-align: center;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                padding: 40px;
                background-color: #1c1c1c;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
            }
            .email-header {
                font-size: 28px;
                color: #f5c518;
                margin-bottom: 20px;
            }
            .event-info {
                font-size: 16px;
                margin-bottom: 20px;
            }
            .highlight {
                color: #f5c518;
                font-weight: bold;
            }
            .cta-button {
                background-color: #f5c518;
                color: #121212;
                font-weight: bold;
                padding: 12px 30px;
                border-radius: 5px;
                text-decoration: none;
                display: inline-block;
                margin-top: 20px;
                font-size: 16px;
            }
            .cta-button:hover {
                background-color: #e4b10f;
            }
            .footer {
                font-size: 12px;
                color: #888;
                margin-top: 30px;
            }
            .footer a {
                color: #f5c518;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h4>🎉 Registration Confirmed: ${eventName}</h4>
            </div>
            <div class="event-info">
                <p><span class="highlight">Event:</span> ${eventName}</p>
                <p><span class="highlight">Date & Time:</span> ${formattedDateTime}</p>
                <p><span class="highlight">Venue:</span> ${eventVenue}</p>
            </div>
            <p>✅ You have successfully registered for this event!</p>
            <p style="font-size: 16px; color: #f5c518;">⚠️ Ensure you also register for this event on VTOP for the OD process.</p>
            <a href="https://vtop.vit.ac.in" class="cta-button">Register on VTOP</a>
            <div class="footer">
                <p>&copy; 2025 Standards Club. All Rights Reserved.</p>
            </div>
        </div>
    </body>
    </html>`
});


        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 5300;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Enable CORS for your frontend domain
