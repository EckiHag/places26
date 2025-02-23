import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE, // z. B. "gmail"
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendRegistrationEmail(to: string, subject: string, text: string): Promise<void> {
  const mailOptions = {
    from: `"Mein Service" <${process.env.SMTP_USER}>`,
    to,
    subject, // Hier wird der übergebene Betreff gesetzt
    text, // Hier wird die übergebene Nachricht gesetzt
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-Mail erfolgreich gesendet an:", to);
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
    throw new Error("E-Mail konnte nicht gesendet werden.");
  }
}
