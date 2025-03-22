// src/app/actions/sendeMails.ts
"use server";

import mailExample from "@/lib/mailing/mailExample";
import { nodeMailer } from "@/lib/mailing/nodemailer";
import fs from "fs";
import path from "path";

export async function sendeMail(mailTo: string, mailSubject: string, mailMessage: string) {
  const result = await nodeMailer(mailTo, mailSubject, mailMessage);

  if (result.success) {
    return { success: true, message: "E-Mail erfolgreich gesendet!", info: result.info };
  } else {
    return { success: false, message: "Fehler beim Senden der Mail", error: result.error };
  }
}

export async function sendeMailToNewUser(mailTo: string, userName: string) {
  const emailSubject = `Places26: Erfolgreiche Anmeldung!`;
  const htmlPath = path.join(process.cwd(), "src", "lib", "mailing", "mailRegistrationToNewUser.html");
  const html = fs.readFileSync(htmlPath, "utf8").replace(/userName/g, userName);
  const text = `Willkommen ${userName}!\n\nDanke, dass du dich registriert hast. Ich freue mich, dich an Bord zu haben! Du kannst dich jetzt mit deiner Email-Adresse anmelden! Du hast zunächst als NEWBIE nur Zugang zu den Galerien, kannst aber von mir weitere Zugänge erhalten.\n\nStarte jetzt: https://places26.vercel.app/\n\n© 2026 EckiHag - Alle Rechte vorbehalten.`;

  const result = await nodeMailer(mailTo, emailSubject, text, html);

  if (result.success) {
    return { success: true, message: "Willkommensmail gesendet!", info: result.info };
  } else {
    return { success: false, message: "Fehler beim Senden der Willkommensmail.", error: result.error };
  }
}

export async function sendeMultipartMail(mailTo: string, mailSubject: string, mailMessage: string) {
  const personalizedHtml = mailExample;
  // const personalizedHtml = htmlTemplate.replace("{{name}}", mailTo); // oder besser: echten Namen einsetzen

  const result = await nodeMailer(mailTo, mailSubject, mailMessage, personalizedHtml);

  return result.success
    ? { success: true, message: "Message: Multipart-Mail erfolgreich gesendet!", info: result.info }
    : { success: false, message: "Message: Fehler beim Senden der Multipart-Mail", error: result.error };
}

export async function xsendeMultipartMail(mailTo: string, mailSubject: string, mailMessage: string) {
  // htmlPath: src/lib/mailing
  const htmlPath = path.join(process.cwd(), "src", "lib", "mailing", "mailExample.html");
  const html = fs.readFileSync(htmlPath, "utf8");

  const result = await nodeMailer(mailTo, mailSubject, mailMessage, html);

  if (result.success) {
    return { success: true, message: "Message: Multipart-Mail erfolgreich gesendet!", info: result.info };
  } else {
    return { success: false, message: "Message: Fehler beim Senden der Multipart-Mail", error: result.error };
  }
}
