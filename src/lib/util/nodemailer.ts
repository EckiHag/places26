import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE, // z. B. "gmail"
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(mailTo: string, mailSubject: string, mailText: string): Promise<void> {
  console.log("Empfänger:", mailTo);
  console.log("Betreff:", mailSubject);
  console.log("Text:", mailText);
  const mailOptions = {
    from: `"EckiHag" <${process.env.SMTP_USER}>`,
    to: mailTo,
    subject: mailSubject, // Hier wird der übergebene Betreff gesetzt
    text: mailText, // Hier wird die übergebene Nachricht gesetzt
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-Mail erfolgreich gesendet an:", mailTo);
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
    throw new Error("E-Mail konnte nicht gesendet werden.");
  }
}
