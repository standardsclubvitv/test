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
                <style>
                    body { background-color: #121212; font-family: Arial, sans-serif; color: #fff; text-align: center; }
                    .container { max-width: 600px; margin: 20px auto; padding: 20px; background: #1c1c1c; border-radius: 10px; }
                    h2 { color: #FFD700; }
                    a { text-decoration: none; color: #FFD700; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Welcome, ${name}!</h2>
                    <p>We're thrilled to have you at <strong>Standards Club VIT</strong>. Get ready to explore, engage, and grow with us.</p>
                    <a href="https://your-club-website.com">Explore the Club</a>
                </div>
            </body>
            </html>`
        });

        res.status(200).json({ message: "Welcome email sent successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error sending email", error });
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
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Security Alert - Board Login</title>
            </head>
            <body style="background-color:#121212; color: #fff; text-align: center;">
                <h2 style="color:#FF4C4C;">Security Alert!</h2>
                <p>A login was detected on your <b>Board Panel</b>.</p>
                <p><b>Device:</b> ${device}</p>
                <p><b>IP Address:</b> ${ip}</p>
                <p><b>Date & Time:</b> ${dateTime}</p>
                <p>If this wasn’t you, <a href="https://your-club-website.com/security" style="color:#FF4C4C;">Secure Your Account</a> immediately!</p>
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
            html: `<div style="background-color: #121212; color: #fff; padding: 20px; text-align: center;">
                    <h2 style="color: #f5c518;">Standards Club - VIT</h2>
                    <p><strong>Event:</strong> ${eventName}</p>
                    <p><strong>Date & Time:</strong> ${formattedDateTime}</p>
                    <p><strong>Venue:</strong> ${eventVenue}</p>
                    <p>✅ You have successfully registered for this event!</p>
                    <p style="color: #f5c518;">⚠️ Ensure you also register for this event on VTOP for the OD process.</p>
                    <p><a href="https://vtop.vit.ac.in" style="color: #f5c518;">Register on VTOP</a></p>
                </div>`
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
app.use(cors({
    origin: "https://standardsclubvitv.github.io/Standards-Club-VITv/", // Replace with your actual frontend domain
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));
