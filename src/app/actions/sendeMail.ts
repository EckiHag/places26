"use server";

import { sendEmail } from "@/lib/util/nodemailer";
import fs from "fs";
import path from "path";

export async function sendeMail(mailTo: string, mailSubject: string, mailMessage: string) {
  try {
    await sendEmail(mailTo, mailSubject, mailMessage);

    return { success: true, message: "E-Mail erfolgreich gesendet!" };
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
    return { success: false, message: "Fehler beim Senden der Mail" };
  }
}
export async function sendeMailToNewUser(mailTo: string, userName: string) {
  // const mailHhtml = `<p>${mailMessage}</p><br><strong>Mit freundlichen Grüßen</strong>`;
  // Lade HTML-Datei
  const emailSubject = `Places26: Erfolgreiche Anmeldung!`;
  const emailHtmlPath = path.join(process.cwd(), "public", "mailRegistrationToNewUser.html");
  let emailHtml = fs.readFileSync(emailHtmlPath, "utf8");
  let emailNurText = `Willkommen userName! 

  Danke, dass du dich registriert hast. Ich freue mich, dich an Bord zu haben! Du kannst dich jetzt mit deiner Email-Adresse annmelden! Du hast zunächst als NEWBIE nur Zugang zu den Galerien, kannst aber von mir weitere Zugänge erhalten.
 
  
  Starte jetzt: https://places26.vercel.app/
  
  © 2026 EckiHag - Alle Rechte vorbehalten.`;
  emailNurText = emailNurText.replace("userName", userName);
  emailHtml = emailHtml.replace("userName", userName);

  try {
    await sendEmail(mailTo, emailSubject, emailNurText, emailHtml);

    return { success: true, message: "E-Mail erfolgreich gesendet!" };
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
    return { success: false, message: "Fehler beim Senden der Mail" };
  }
}

export async function sendeMultipartMail(mailTo: string, mailSubject: string, mailMessage: string) {
  // const mailHhtml = `<p>${mailMessage}</p><br><strong>Mit freundlichen Grüßen</strong>`;
  // Lade HTML-Datei
  const emailHtmlPath = path.join(process.cwd(), "public", "mailExample.html");
  const emailHtml = fs.readFileSync(emailHtmlPath, "utf8");
  const emailPlainText = `Willkommen! 

  Danke, dass du dich registriert hast. Ich freue mich, dich an Bord zu haben! Du kannst dich jetzt mit deiner Email-Adresse annmelden! Du hast zunächst als NEWBIE nur Zugang zu den Galerien, kannst aber von mir weitere Zugänge erhalten.
 
  
  Starte jetzt: https://places26.vercel.app/
  
  © 2026 EckiHag - Alle Rechte vorbehalten.`;
  mailMessage = emailPlainText;

  try {
    await sendEmail(mailTo, mailSubject, mailMessage, emailHtml);

    return { success: true, message: "E-Mail erfolgreich gesendet!" };
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
    return { success: false, message: "Fehler beim Senden der Mail" };
  }
}
