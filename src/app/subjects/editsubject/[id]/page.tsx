"use client";

import { Card, CardHeader, CardBody, Button, Input } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getSubjectById, addSubject, updateSubject } from "@/app/actions/subjectActions";
import { SubjectSchema, subjectSchema } from "@/lib/schemas/subjectSchema";
import { SubjectUpdateSchema, subjectUpdateSchema } from "@/lib/schemas/subjectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import imageCompression from "browser-image-compression";
import { useSession } from "next-auth/react";

// Der Bildupload geschieht über die Datei places26userroutes.js in _places, das mit REACT programmiert wurde
// in app.js muss dort auch noch die route gelinkt werden: app.use("/api/places26/user", places26userroutes);
// "use" wird gebraucht um middleware zu setzen
// Um eine neue Version zum upload bei _places (REACT) zu bekommen muss neben der Routen-Datei auch app.js überschrieben werden
// Am besten mit fileZilla
// Danach muss die App bei netcup neu gestartet werden und hier der USERS_PATH geändert werden

export default function SubjectForm() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  // console.log("Current User ID:", userId);
  const SERVER_URL = "https://beihaggis.de";
  // const SERVER_URL = "http://localhost:5001";
  const USERS_PATH = "api/places26/user";
  const FETCH_URL = `${SERVER_URL}/${USERS_PATH}`;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const router = useRouter();
  const { id } = useParams();
  const subjectId = Array.isArray(id) ? id[0] : id ?? "";
  // Überprüfen, ob subjectId vorhanden ist oder "new" entspricht
  const isUpdateMode = Boolean(subjectId && subjectId !== "new");

  console.log("subjectId: ", subjectId);
  console.log("isUpdateMode: ", isUpdateMode);
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SubjectSchema | SubjectUpdateSchema>({
    resolver: zodResolver(isUpdateMode ? subjectUpdateSchema : subjectSchema),
    mode: "onTouched",
    defaultValues: { title: "", description: "", group: "", creator: "EckiHag" }, // Kein image bei default
  });

  useEffect(() => {
    if (!subjectId) return; // wenn kein update, braucht es kein fetch
    const fetchSubject = async () => {
      try {
        const subjectData = await getSubjectById(subjectId);
        if (subjectData) {
          setValue("title", subjectData.title || "");
          setValue("description", subjectData.description || "");
          setValue("group", subjectData.group || "");
          // `https://beihaggis.de/${image.replace(/^.\//, "")}`
          // setExistingImage(subjectData.image ?? null);
          setExistingImage(`https://beihaggis.de/${subjectData.image}`);
        }
      } catch (error) {
        console.error("Error fetching subject:", error);
        toast.error("Error loading subject data.");
      }
    };

    fetchSubject();
  }, [subjectId, setValue]);

  // Handler für Dateiauswahl
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setImageFile(file);
  };

  // Funktion zum Hochladen des Bildes
  const uploadImage = async (imageFile: File): Promise<{ imageUrl: string; width: number; height: number } | null> => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(FETCH_URL, {
        method: "POST",
        headers: { "x-upload-password": "ga?m0Wq1jznVb<RU" },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to upload image.");
      }

      const { uploadResult } = await response.json();
      return uploadResult ? { imageUrl: uploadResult.imageUrl, width: uploadResult.width, height: uploadResult.height } : null;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
      return null;
    }
  };

  const onSubmit = async (data: SubjectSchema) => {
    console.log("onSubmit"); // ✅ Debug-Log
    try {
      // let imageUrl = existingImage ?? undefined;
      let imageUrl = undefined;
      let imgwidth = 0;
      let imgheight = 0;

      if (!isUpdateMode || imageFile) {
        if (imageFile) {
          // Bild komprimieren
          const compressedFile = await imageCompression(imageFile, { maxSizeMB: 1, maxWidthOrHeight: 1400, useWebWorker: true });
          const uploadResult = await uploadImage(compressedFile);
          if (!uploadResult) throw new Error("Image upload failed.");
          imageUrl = uploadResult.imageUrl;
          imgwidth = uploadResult.width;
          imgheight = uploadResult.height;
        }
      }

      // const subjectData = {
      //   ...data,
      //   image: imageUrl ?? undefined, // ✅ Falls `imageUrl` null ist, wird es `undefined`
      //   imgwidth: imgwidth,
      //   imgheight: imgheight,
      //   creator: userId, // 👈 Benutzer-ID wird hinzugefügt
      // };

      const subjectData = {
        ...data,
        ...(imageUrl ? { image: imageUrl, imgwidth: imgwidth, imgheight: imgheight } : {}), // ✅ image wird nur gesetzt, wenn es definiert ist
        creator: userId, // 👈 Benutzer-ID wird hinzugefügt
      };

      console.log("Sending data to server:", subjectData); // ✅ Debug-Log

      let result;
      if (isUpdateMode) {
        result = await updateSubject(subjectId, subjectData);
      } else {
        result = await addSubject(subjectData);
      }

      if (result?.status === "success") {
        toast.success(isUpdateMode ? "Subject updated successfully." : "Subject added successfully.");
        router.push("/subjects");
      } else {
        if (Array.isArray(result?.error)) {
          result.error.forEach((err) => {
            toast.error(err.message); // Jede Fehlermeldung einzeln ausgeben
          });
        } else {
          toast.error(result?.error || "An error occurred.");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to process request.");
    }
  };

  return (
    <Card className="max-w-full sm:max-w-3xl md:max-w-2xl lg:max-w-xl xl:max-w-2xl mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-blue-600">
          <div className="flex flex-row items-center gap-3">
            <h1 className="text-3xl font-semibold">{isUpdateMode ? "Update Subject" : "Add Subject"}</h1>
          </div>
          <p className="text-blue-600">Manage your subjects</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Enter title" isInvalid={!!errors.title} errorMessage={errors.title?.message} />}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Enter description" isInvalid={!!errors.description} errorMessage={errors.description?.message} />}
            />
          </div>

          {/* Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Group</label>
            <Controller
              name="group"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Enter group" isInvalid={!!errors.group} errorMessage={errors.group?.message} />}
            />
          </div>

          {/* Existing Image */}
          {existingImage ? <Image src={existingImage} width={128} height={128} alt="Existing Image" className="rounded-md" /> : <p>No Image Available</p>}

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input id="image" type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-2 rounded" />
          </div>

          {/* Fehler-Nachricht vom Server */}
          {errors.root?.serverError && <p className="text-danger text-sm">{errors.root.serverError.message}</p>}

          {/* Submit Button */}
          <Button isLoading={isSubmitting} isDisabled={!isValid} fullWidth className="bg-blue-600" type="submit">
            {isUpdateMode ? "Update Subject" : "Add Subject"}
          </Button>

          <ToastContainer />
        </form>
      </CardBody>
    </Card>
  );
}
