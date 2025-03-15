"use server";

import { sendEmail } from "@/lib/util/nodemailer";

export async function sendeMail(mailTo: string, mailSubject: string, mailMessage: string) {
  try {
    await sendEmail(mailTo, mailSubject, mailMessage);

    return { success: true, message: "E-Mail erfolgreich gesendet!" };
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
    return { success: false, message: "Fehler beim Senden der Mail" };
  }
}
