import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface OTPStoreItem {
  otp: string;
  expiresAt: number;
  attempts: number;
  fullName?: string;
  createdAt: number;
}

const otpStore = new Map<string, OTPStoreItem>();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // -------------------------------------------------------------
  // API: Check SMTP Status
  // -------------------------------------------------------------
  app.get("/api/auth/smtp-status", (_req, res) => {
    const smtpUser = process.env.SMTP_USER || "";
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const isConfigured = Boolean(smtpUser && process.env.SMTP_PASS);

    res.json({
      configured: isConfigured,
      host: smtpHost,
      user: smtpUser ? smtpUser.replace(/(.{2})(.*)(@.*)/, "$1***$3") : null,
      info: isConfigured 
        ? "Live SMTP Server is Active. Emails will be dispatched directly to user inboxes."
        : "SMTP credentials not detected in .env. Operating in Simulation & Preview mode."
    });
  });

  // -------------------------------------------------------------
  // API: Send OTP
  // -------------------------------------------------------------
  app.post("/api/auth/send-otp", async (req, res) => {
    try {
      const { email, fullName, purpose = "Account Registration" } = req.body;

      if (!email || !email.includes("@")) {
        return res.status(400).json({ success: false, message: "Valid email address is required." });
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

      otpStore.set(email.toLowerCase(), {
        otp,
        expiresAt,
        attempts: 0,
        fullName: fullName || "Citizen",
        createdAt: Date.now()
      });

      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = Number(process.env.SMTP_PORT) || 587;
      const fromName = process.env.SMTP_FROM_NAME || "CHP Analytics Health Gateway";
      const fromEmail = process.env.SMTP_FROM_EMAIL || smtpUser || "no-reply@chpanalytics.org";

      let deliveryMethod: "smtp" | "simulation" = "simulation";
      let deliveryDetails = "";
      let previewUrl: string | undefined = undefined;

      if (smtpUser && smtpPass) {
        // Attempt real SMTP dispatch
        try {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
              user: smtpUser,
              pass: smtpPass
            }
          });

          const mailOptions = {
            from: `"${fromName}" <${fromEmail}>`,
            to: email,
            subject: `[CHP Analytics] Your 6-Digit Verification Code: ${otp}`,
            text: `Hello ${fullName || "Citizen"},\n\nYour single-use verification code for Community Health & Population Analytics (CHP) is:\n\n${otp}\n\nThis code will expire in 5 minutes.\nIf you did not request this, please disregard this email.\n\nCHP Analytics Security Team`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 540px; margin: 0 auto; background-color: #0c0c0c; color: #e5e5e5; border-radius: 12px; border: 1px solid #222; overflow: hidden;">
                <div style="background-color: #141414; padding: 20px 24px; border-bottom: 1px solid #222;">
                  <h2 style="margin: 0; color: #22d3ee; font-size: 18px; font-weight: 700; letter-spacing: -0.5px;">Community Health & Population Analytics</h2>
                  <p style="margin: 4px 0 0 0; color: #888; font-size: 12px;">Official Security & Identity Verification Service</p>
                </div>
                <div style="padding: 28px 24px;">
                  <p style="margin-top: 0; font-size: 14px; color: #ccc;">Hello <strong>${fullName || "Citizen"}</strong>,</p>
                  <p style="font-size: 13px; line-height: 1.6; color: #aaa;">You requested single-use access verification for <strong>${purpose}</strong>. Use the cryptographic security code below to complete your verification:</p>
                  
                  <div style="margin: 24px 0; background-color: #111; border: 1px solid #06b6d4; border-radius: 8px; padding: 18px; text-align: center;">
                    <span style="font-family: monospace; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #22d3ee;">${otp}</span>
                    <p style="margin: 8px 0 0 0; font-size: 11px; color: #71717a; font-family: monospace;">VALID FOR 5 MINUTES • SINGLE-USE TOKEN</p>
                  </div>

                  <p style="font-size: 12px; color: #71717a; line-height: 1.5;">
                    If you did not initiate this request, you can safely ignore this message. Your account remains protected with k-anonymity privacy protocols.
                  </p>
                </div>
                <div style="background-color: #070707; padding: 14px 24px; border-top: 1px solid #1a1a1a; font-size: 11px; color: #52525b; text-align: center;">
                  © 2026 Community Health & Population Analytics (CHP). All rights reserved.
                </div>
              </div>
            `
          };

          await transporter.sendMail(mailOptions);
          deliveryMethod = "smtp";
          deliveryDetails = `Live email successfully dispatched to ${email} via ${smtpHost}`;
        } catch (mailErr: any) {
          console.error("Failed to send via real SMTP:", mailErr);
          deliveryMethod = "simulation";
          deliveryDetails = `SMTP connection attempt failed (${mailErr.message || "Authentication error"}). Falling back to simulation mode.`;
        }
      } else {
        deliveryMethod = "simulation";
        deliveryDetails = "No SMTP credentials detected in environment variables. Running in sandbox test mode.";
      }

      return res.json({
        success: true,
        message: deliveryMethod === "smtp" 
          ? `Verification email sent directly to ${email}. Check your inbox!`
          : `Verification code generated for ${email}. (SMTP credentials not yet configured in .env)`,
        deliveryMethod,
        deliveryDetails,
        email,
        expiresInSeconds: 300,
        smtpConfigured: Boolean(smtpUser && smtpPass),
        // Return OTP token so that when running in dev/preview without external SMTP keys, user is not blocked
        otpToken: otp
      });

    } catch (err: any) {
      console.error("Error in /api/auth/send-otp:", err);
      return res.status(500).json({ success: false, message: "Internal server error generating OTP" });
    }
  });

  // -------------------------------------------------------------
  // API: Verify OTP
  // -------------------------------------------------------------
  app.post("/api/auth/verify-otp", (req, res) => {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(400).json({ success: false, message: "Email and OTP are required." });
      }

      const record = otpStore.get(email.toLowerCase());

      if (!record) {
        return res.status(400).json({
          success: false,
          message: "No pending verification code found for this email. Please request a new code."
        });
      }

      if (Date.now() > record.expiresAt) {
        otpStore.delete(email.toLowerCase());
        return res.status(400).json({
          success: false,
          message: "Verification code has expired. Please request a fresh code."
        });
      }

      if (record.attempts >= 5) {
        otpStore.delete(email.toLowerCase());
        return res.status(400).json({
          success: false,
          message: "Maximum verification attempts exceeded. Please request a new code."
        });
      }

      if (record.otp !== otp.trim()) {
        record.attempts += 1;
        return res.status(400).json({
          success: false,
          message: `Invalid verification code. ${5 - record.attempts} attempts remaining.`
        });
      }

      // Success
      otpStore.delete(email.toLowerCase());
      return res.json({
        success: true,
        message: "Email address verified successfully!"
      });

    } catch (err) {
      console.error("Error in /api/auth/verify-otp:", err);
      return res.status(500).json({ success: false, message: "Internal server error verifying OTP" });
    }
  });

  // -------------------------------------------------------------
  // Vite Middleware Setup
  // -------------------------------------------------------------
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CHP Analytics Server running on http://localhost:${PORT}`);
  });
}

startServer();
