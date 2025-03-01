"use server";

import { sendRegistrationEmail } from "@/lib/util/nodemailer";

export async function sendeMail(subject: string, message: string) {
  try {
    const mailText = `Betreff: ${subject}\n\n${message}`;
    await sendRegistrationEmail("eu@hagemeier-web.de", subject, mailText);

    return { success: true, message: "E-Mail erfolgreich gesendet!" };
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
    return { success: false, message: "Fehler beim Senden der Mail" };
  }
}
