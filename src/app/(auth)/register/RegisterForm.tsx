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
import { sendeMail, sendeMailToNewUser } from "@/app/actions/mailActions";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const SERVER_URL = "https://beihaggis.de";
  const USERS_PATH = "api/places26/p26imgusers";
  const FETCH_URL = `${SERVER_URL}/${USERS_PATH}`;
  const Bildsize = 1200;
  const BildsizeMb = 0.1;

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

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
      const options = {
        maxSizeMB: BildsizeMb,
        maxWidthOrHeight: Bildsize,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(imageFile, options);
      const uploadResult = await uploadImage(compressedFile);

      if (!uploadResult) throw new Error("Image upload failed.");

      const userData = {
        ...data,
        image: uploadResult.imageUrl,
        imgwidth: uploadResult.width,
        imgheight: uploadResult.height,
      };

      const result = await registerUser(userData);

      if (result.status === "success") {
        const resultMailToAdmin = await sendeMail(
          "eu@hagemeier-web.de",
          "Neuer User bei Places26!",
          `Achtung, es gibt einen neuen User 😊:\n\n${userData.name}\n\n${userData.email}`
        );

        const resultMailToNewUser = await sendeMailToNewUser(userData.email, userData.name);

        if (!resultMailToAdmin.success) {
          toast.error(`Fehler beim Versenden der Admin-Mail: ${resultMailToAdmin.message}`);
        }
        if (!resultMailToNewUser.success) {
          toast.error(`Fehler beim Versenden der Willkommensmail: ${resultMailToNewUser.message}`);
        }
        console.log("resultMailToAdmin:", resultMailToAdmin);
        console.log("resultMailToNewUser:", resultMailToNewUser);

        toast.success("Erfolgreich registriert. Du bekommst jetzt eine Mail an die angegebenene Adresse. 😊 Mail send!");
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
          setError("root.serverError", {
            message: typeof result.error === "string" ? result.error : "Unbekannter Fehler vom Server",
          });
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
