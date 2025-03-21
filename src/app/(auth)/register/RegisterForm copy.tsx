"use client";
import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { ToastContainer, toast } from "react-toastify";
import { registerUser } from "@/app/actions/authActions";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardBody, Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { sendeMail, sendeMailToNewUser } from "@/app/actions/sendeMail";
import { useRouter } from "next/navigation";
// Der Bildupload geschieht über die Datei places26userroutes.js in _places, das mit REACT programmiert wurde
// in app.js muss dort auch noch die route gelinkt werden: app.use("/api/places26/user", places26userroutes);
// "use" wird gebraucht um middleware zu setzen
// Um eine neue Version zum upload bei _places (REACT) zu bekommen muss neben der Routen-Datei auch app.js überschrieben werden
// Am besten mit fileZilla
// Danach muss die App bei netcup neu gestartet werden und hier der USERS_PATH geändert werden

export default function RegisterForm() {
  const router = useRouter();
  const SERVER_URL = "https://beihaggis.de";
  // const SERVER_URL = "http://localhost:5001";
  const USERS_PATH = "api/places26/p26imgusers";
  const FETCH_URL = `${SERVER_URL}/${USERS_PATH}`;
  const Bildsize = 1200;
  const BildsizeMb = 0.1;

  const [resultmessage, setResultMessage] = useState("");

  const handleSendMail = async (mailTo: string, mailSubject: string, mailMessage: string) => {
    try {
      const result = await sendeMail(mailTo, mailSubject, mailMessage);
      setResultMessage(result.message);
      return resultmessage;
    } catch (error) {
      setResultMessage(`Fehler beim Mailen: ${error}`);
    }
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Handler für Dateiauswahl
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Funktion zum Hochladen des Bildes
  const uploadImage = async (imageFile: File): Promise<{ imageUrl: string; width: number; height: number } | null> => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(FETCH_URL, {
        method: "POST",
        headers: {
          "x-upload-password": "ga?m0Wq1jznVb<RU",
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to upload image.");
      }

      const result = await response.json();
      console.log("result:", result); // Debug-Ausgabe zur Überprüfung der API-Antwort

      // Extrahiere `uploadResult` aus der API-Antwort
      const { uploadResult } = result;
      if (!uploadResult) throw new Error("Invalid upload result.");

      return {
        imageUrl: uploadResult.imageUrl,
        width: uploadResult.width,
        height: uploadResult.height,
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
      return null;
    }
  };

  const onSubmit = async (data: RegisterSchema) => {
    if (!imageFile) {
      toast.error("Please upload an image.");
      return;
    }

    try {
      // Optionen für die Bildkomprimierung
      const options = {
        maxSizeMB: BildsizeMb,
        maxWidthOrHeight: Bildsize,
        useWebWorker: true,
      };

      // Bild komprimieren
      const compressedFile = await imageCompression(imageFile, options);
      console.log("Original File:", imageFile);
      console.log("Compressed File:", compressedFile);

      // Bild hochladen
      const uploadResult = await uploadImage(compressedFile);

      if (!uploadResult) {
        throw new Error("Image upload failed.");
      }
      console.log("uploadResult:", uploadResult);
      // Datensatz erstellen mit Bildinformationen
      const userData = {
        ...data,
        image: uploadResult.imageUrl,
        imgwidth: uploadResult.width,
        imgheight: uploadResult.height,
      };
      console.log("userData:", userData);

      // Hier wird erfolgt erst der Datenbankeintrag
      // Hier wird erfolgt erst der Datenbankeintrag
      // Hier wird erfolgt erst der Datenbankeintrag
      const result = await registerUser(userData);

      if (result.status === "success") {
        const resultMailToAdmin = await handleSendMail(
          "eu@hagemeier-web.de",
          "Neuer User bei Places26!",
          `Achtung, es gibt einen neuen User 😊:\n\n${userData.name}\n\n${userData.email}`
        );
        console.log("resultMailToAdmin: ", resultMailToAdmin);
        const resultMailToNewUser = await sendeMailToNewUser(userData.email, userData.name);
        console.log("resultMailToNewUser: ", resultMailToNewUser);

        toast.success("Erfolgreich registriert. Du bekommst jetzt eine Mail an die angegebenene Adresse. 😊 Mail send!");
        console.log("User registered successfully:", result);
        router.push("/");
        router.refresh();
      } else {
        if (Array.isArray(result.error)) {
          result.error.forEach((err) => {
            const path = Array.isArray(err.path) ? err.path.join(".") : err.path;
            if (typeof path === "string") {
              setError(path as keyof RegisterSchema, { message: err.message });
            }
          });
        } else {
          setError("root.serverError", { message: result.error });
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Failed to register user.");
    }
  };

  return (
    <Card className="w-full max-w-[350px] lg:max-w-[400px] min-h-[200px] mx-auto">
      <CardHeader>
        <div className="text-pprimary-600">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Register</h1>
          </div>
          <p className="text-pprimary-600">Welcome to Places26</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input defaultValue="" label="Name" variant="bordered" {...register("name")} isInvalid={!!errors.name} errorMessage={errors.name?.message} />
            <Input defaultValue="" label="Email" variant="bordered" {...register("email")} isInvalid={!!errors.email} errorMessage={errors.email?.message} />
            <Input
              defaultValue=""
              label="Password"
              variant="bordered"
              type="password"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
            {errors.root?.serverError && <p className="text-danger text-sm">{errors.root.serverError.message}</p>}
            <label htmlFor="image" className="w-full">
              Upload Image
            </label>
            <input id="image" type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-2 rounded" />

            <Button isLoading={isSubmitting} isDisabled={!isValid} fullWidth className="bg-pprimary-600" type="submit">
              Register
            </Button>
            <ToastContainer />
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
