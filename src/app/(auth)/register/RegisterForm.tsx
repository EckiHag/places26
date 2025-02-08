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

// Der Bildupload geschieht über die Datei places26userroutes.js in _places, das mit REACT programmiert wurde
// in app.js muss dort auch noch die route gelinkt werden: app.use("/api/places26/user", places26userroutes);
// "use" wird gebraucht um middleware zu setzen
// Um eine neue Version zum upload bei _places (REACT) zu bekommen muss neben der Routen-Datei auch app.js überschrieben werden
// Am besten mit fileZilla
// Danach muss die App bei netcup neu gestartet werden und hier der USERS_PATH geändert werden

export default function RegisterForm() {
  const SERVER_URL = "https://beihaggis.de";
  // const SERVER_URL = "http://localhost:5001";
  const USERS_PATH = "api/places26/user";
  const FETCH_URL = `${SERVER_URL}/${USERS_PATH}`;

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
        maxSizeMB: 1,
        maxWidthOrHeight: 1400,
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
        toast.success("User registered successfully.");
        console.log("User registered successfully:", result);
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
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-blue-600">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Register</h1>
          </div>
          <p className="text-blue-600">Welcome to Places26</p>
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

            <Button isLoading={isSubmitting} isDisabled={!isValid} fullWidth className="bg-blue-600" type="submit">
              Register
            </Button>
            <ToastContainer />
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
