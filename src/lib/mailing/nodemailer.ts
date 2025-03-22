import nodemailer, { SentMessageInfo } from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function nodeMailer(mailTo: string, mailSubject: string, mailText: string, mailHtml?: string): Promise<{ success: boolean; info?: SentMessageInfo; error?: string }> {
  const mailOptions = {
    from: `"EckiHag" <${process.env.SMTP_USER}>`,
    to: mailTo,
    subject: mailSubject,
    text: mailText,
    html: mailHtml,
  };

  try {
    const info: SentMessageInfo = await transporter.sendMail(mailOptions);
    console.log("✅ E-Mail gesendet an:", mailTo);
    console.log("ℹ️ Transporter-Info:", info);
    return { success: true, info };
  } catch (error: unknown) {
    console.error("❌ Fehler beim Senden der E-Mail:", error);

    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Unbekannter Fehler beim Senden der E-Mail." };
  }
}
