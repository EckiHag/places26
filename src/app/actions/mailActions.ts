// src/app/actions/sendeMails.ts
"use server";

import mailExample from "@/lib/mailing/mailExample";
import mailRegistrationToNewUser from "@/lib/mailing/mailRegistrationToNewUser";
import { nodeMailer } from "@/lib/mailing/nodemailer";
import { z } from "zod";
import { sendPasswordResetEmail } from "@/lib/mailing/sendPasswordResetEmail";
import { prisma } from "@/lib/prisma";

type ActionState = {
  success?: boolean;
  error?: string;
};

const schema = z.object({
  email: z.string().email(),
});

export async function sendeMail(mailTo: string, mailSubject: string, mailMessage: string) {
  const result = await nodeMailer(mailTo, mailSubject, mailMessage);

  if (result.success) {
    return { success: true, message: "E-Mail erfolgreich gesendet!", info: result.info };
  } else {
    return { success: false, message: "Fehler beim Senden der Mail", error: result.error };
  }
}

export async function sendeMailToNewUser(mailTo: string, userName: string) {
  const personalizedHtml = mailRegistrationToNewUser.replace("{{userName}}", userName);
  const emailSubject = `Places26: Erfolgreiche Anmeldung!`;
  // const htmlPath = path.join(process.cwd(), "src", "lib", "mailing", "mailRegistrationToNewUser.html");
  // const html = fs.readFileSync(htmlPath, "utf8").replace(/userName/g, userName);
  const text = `Willkommen ${userName}!\n\nDanke, dass du dich registriert hast. Ich freue mich, dich an Bord zu haben! Du kannst dich jetzt mit deiner Email-Adresse anmelden! Du hast zunächst als NEWBIE nur Zugang zu den Galerien, kannst aber von mir weitere Zugänge erhalten.\n\nStarte jetzt: https://places26.vercel.app/\n\n© 2026 EckiHag - Alle Rechte vorbehalten.`;

  const result = await nodeMailer(mailTo, emailSubject, text, personalizedHtml);

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

export async function requestPasswordReset(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = schema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { error: "Ungültige E-Mail-Adresse" };
  }

  const email = parsed.data.email;

  // 🔍 Benutzer finden
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    // Aus Sicherheitsgründen keine genaue Info geben
    return { success: true }; // Verhalten wie bei erfolgreichem Fall
  }

  // 🔐 Token generieren
  const token = crypto.randomUUID();

  // ⏱ Ablaufzeit setzen (z. B. 1 Stunde)
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 Stunde in der Zukunft

  // 💾 Alten Token löschen (optional)
  await prisma.passwordResetToken.deleteMany({
    where: {
      userId: user.id,
    },
  });

  // 💾 Token speichern
  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  // 📧 E-Mail versenden
  const success = await sendPasswordResetEmail(email, token);

  if (!success) {
    return { error: "E-Mail konnte nicht versendet werden" };
  }

  return { success: true };
}

// export async function requestPasswordReset(prevState: ActionState, formData: FormData): Promise<ActionState> {
//   const parsed = schema.safeParse({
//     email: formData.get("email"),
//   });

//   if (!parsed.success) {
//     return { error: "Ungültige E-Mail-Adresse" };
//   }

//   const email = parsed.data.email;
//   const token = crypto.randomUUID();

//   const success = await sendPasswordResetEmail(email, token);

//   if (!success) {
//     return { error: "E-Mail konnte nicht versendet werden" };
//   }

//   return { success: true };
// }
