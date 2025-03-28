import { nodeMailer } from "./nodemailer";

export async function sendPasswordResetEmail(email: string, token: string): Promise<boolean> {
  const resetUrl = `${process.env.BASE_URL}/resetpassword?token=${token}`;

  const subject = "Passwort zurücksetzen";
  const text = `Bitte klicke auf folgenden Link, um dein Passwort zurückzusetzen: ${resetUrl}`;
  const html = `<p>Klicke auf den folgenden Link, um dein Passwort zurückzusetzen:</p>
                <p><a href="${resetUrl}">${resetUrl}</a></p>`;

  const result = await nodeMailer(email, subject, text, html);

  return result.success;
}
