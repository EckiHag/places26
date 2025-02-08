"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Hier den Token definieren (idealerweise dynamisch laden oder übergeben)
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDNlMzE0ZDM0OTEwZjU2OTA2ZjVlOTAiLCJlbWFpbCI6ImV1QGhhZ2VtZWllci13ZWIuZGUiLCJpYXQiOjE3MzcwNTcxMDAsImV4cCI6MTczNzMxNjMwMH0.4MRcOVgpsbYPFRDq-8JjrBtfF7F0xUwjsMLd1ea_V4g"; // Ersetze durch deinen tatsächlichen Token

export async function newSubject(payload: FormData) {
  try {
    // Werte aus dem FormData-Objekt extrahieren
    const title = payload.get("title");
    const description = payload.get("description");
    const image = payload.get("image");
    const creator = payload.get("creator");
    const group = payload.get("group");

    // Validierung der Pflichtfelder
    if (!title || !description || !creator || !group || !(image instanceof File)) {
      throw new Error("Required fields are missing or invalid.");
    }

    // Dateiname generieren
    // const imageName = `${Date.now()}-${image.name}`;
    const uploadUrl = "https://beihaggis.de/api/subjects/";
    // const uploadUrl = `https://beihaggis.de/uploads/picscollection/${imageName}`;

    // Bild hochladen
    const buffer = Buffer.from(await image.arrayBuffer());
    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": image.type,
        Authorization: `Bearer ${AUTH_TOKEN}`, // Token im Authorization-Header
      },
      body: buffer,
    });

    console.log("Bild-Upload-Daten:", {
      size: buffer.length,
      type: image.type,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Image upload failed with status ${uploadResponse.status}: ${errorText}`);
    }

    console.log("Bild erfolgreich hochgeladen:", uploadUrl);

    // Datensatz in der Datenbank speichern
    const newSubject = await prisma.subjects.create({
      data: {
        title: String(title),
        description: String(description),
        image: uploadUrl, // Speichere die URL des Bildes
        creator: String(creator),
        group: String(group),
      },
    });

    console.log("newSubject", newSubject);
    return { status: "success", data: newSubject };
  } catch (error) {
    // Fehlerbehandlung
    if (error instanceof Error) {
      console.error("Error creating new subject:", error);
      return { status: "error", message: error.message };
    } else {
      console.error("Unknown error creating new subject:", error);
      return { status: "error", message: "An unknown error occurred" };
    }
  }
}
