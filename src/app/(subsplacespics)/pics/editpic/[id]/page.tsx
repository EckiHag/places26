"use client";

import { Card, CardHeader, CardBody, Button, Input, Switch, Checkbox } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getPicById, addPic, updatePic } from "@/app/actions/picActions";
import { PicSchema, picSchema } from "@/lib/schemas/picSchema";
import { PicUpdateSchema, picUpdateSchema } from "@/lib/schemas/picSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import imageCompression from "browser-image-compression";
// import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

// import { uploadImage } from "@/lib/util/uploadImage";
const SERVER_URL = "https://beihaggis.de";
const USERS_PATH = "api/places26/p26imgpics";
const FETCH_URL = `${SERVER_URL}/${USERS_PATH}`;
const Bildsize = 1200;
const BildsizeMb = 0.1;

// Der Bildupload geschieht über die Datei places26userroutes.js in _places, das mit REACT programmiert wurde
// in app.js muss dort auch noch die route gelinkt werden: app.use("/api/places26/user", places26userroutes);
// "use" wird gebraucht um middleware zu setzen
// Um eine neue Version zum upload bei _places (REACT) zu bekommen muss neben der Routen-Datei auch app.js überschrieben werden
// Am besten mit fileZilla
// Danach muss die App bei netcup neu gestartet werden und hier der USERS_PATH geändert werden

export default function PicForm() {
  const router = useRouter();
  // const { data: session } = useSession();
  // const userId = session?.user?.id;
  const searchParams = useSearchParams();
  const placeId = searchParams.get("placeId");
  const subjectId = searchParams.get("subjectId");
  const { id } = useParams();
  const picId = Array.isArray(id) ? id[0] : id ?? "";

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  // Überprüfen, ob picIdId vorhanden ist oder "new" entspricht
  const isUpdateMode = Boolean(picId && picId !== "new");
  // console.log("subjectId: ", picId);
  // console.log("isUpdateMode: ", isUpdateMode);
  const [eingabeWeiter, setEingabeWeiter] = useState(false);
  const [skipordmi1, setSkipordmi1] = useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PicSchema | PicUpdateSchema>({
    resolver: zodResolver(isUpdateMode ? picUpdateSchema : picSchema),
    mode: "onTouched",
    defaultValues: { title: "pic", description: "nothing to say", copyright: "EckiHag", ord: 0, video: false, belongstoid: placeId ?? "" }, // Kein image bei default
  });

  useEffect(() => {
    if (!picId) return; // wenn kein update, braucht es kein fetch
    const fetchPic = async () => {
      try {
        const picData = await getPicById(picId);
        if (picData) {
          setValue("title", picData.title || "");
          setValue("description", picData.description || "");
          setValue("copyright", picData.copyright || "EckiHag");
          setValue("ord", picData.ord || 0);
          setValue("video", picData.video || false);
          // `https://beihaggis.de/${image.replace(/^.\//, "")}`
          // setExistingImage(subjectData.image ?? null);
          setExistingImage(`https://beihaggis.de/${picData.image}`);
        }
      } catch (error) {
        console.error("Error fetching pic:", error);
        toast.error("Error loading pic data.");
      }
    };

    fetchPic();
  }, [picId, setValue]);

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

  const onSubmit = async (data: PicSchema) => {
    // console.log("onSubmit");
    try {
      // let imageUrl = existingImage ?? undefined;
      let imageUrl = undefined;
      let imgwidth = 0;
      let imgheight = 0;

      if (!isUpdateMode || imageFile) {
        if (imageFile) {
          // Bild komprimieren
          const compressedFile = await imageCompression(imageFile, { maxSizeMB: BildsizeMb, maxWidthOrHeight: Bildsize, useWebWorker: true });
          const uploadResult = await uploadImage(compressedFile);
          if (!uploadResult) throw new Error("Image upload failed.");
          imageUrl = uploadResult.imageUrl;
          imgwidth = uploadResult.width;
          imgheight = uploadResult.height;
        }
      }

      const picData = {
        ...data,
        ...(imageUrl ? { image: imageUrl, imgwidth: imgwidth, imgheight: imgheight } : {}), // ✅ image wird nur gesetzt, wenn es definiert ist
        belongstoid: placeId ?? "",
      };

      console.log("Sending data to server:", picData);

      let result;
      if (isUpdateMode) {
        console.log("picId:", picId);
        result = await updatePic(picId, picData);
      } else {
        result = await addPic(picData);
      }

      if (result?.status === "success") {
        toast.success(isUpdateMode ? "Pic updated successfully." : "Pic added successfully.");
        if (eingabeWeiter || isUpdateMode) {
          router.push(`/pics/cards/search?placeId=${placeId}&subjectId=${subjectId}`);
        } else {
          // Aktuellen Wert abrufen und um 5 erhöhen
          const currentOrd = watch("ord") || 0; // Falls undefined, als 0 behandeln
          if (skipordmi1) {
            setValue("ord", currentOrd + -1);
          } else {
            setValue("ord", currentOrd + 10);
          }
        }
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
        <div className="flex flex-col gap-2 items-center text-ppics-400">
          <div className="flex flex-row items-center gap-3">
            <div>Bearbeite Pic für Place Nr.: {placeId}</div>
            <h1 className="text-3xl font-semibold">{isUpdateMode ? "Update Pic" : "Add Pic"}</h1>
          </div>
          <p className="text-ppics-400">Manage your pics</p>
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
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={3}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.description ? "border-red-500" : ""}`}
                  placeholder="Enter description"
                />
              )}
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
          </div>
          {/* Copyright */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Copyright</label>
            <Controller
              name="copyright"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Enter copyright" isInvalid={!!errors.copyright} errorMessage={errors.copyright?.message} />}
            />
          </div>

          {/* Ord */}
          <div className="mt-4 flex flex-row">
            <label className="block text-sm font-medium text-gray-700">Ord</label>
            <Controller
              name="ord"
              control={control}
              rules={{ required: "Ord is required" }} // Falls erforderlich
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="w-24"
                  placeholder="Enter ord"
                  isInvalid={!!errors.ord}
                  errorMessage={errors.ord?.message}
                  value={field.value?.toString() || ""} // Zahl als String umwandeln
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")} // Wert als Number speichern
                />
              )}
            />
            {!isUpdateMode && (
              <Checkbox className="ml-4" name="skipordmi1" checked={skipordmi1} onChange={(e) => setSkipordmi1(e.target.checked)}>
                Skip ord -1
              </Checkbox>
            )}
          </div>

          {/* Video */}
          <div className="mt-4">
            <Controller
              name="video"
              control={control}
              defaultValue={false} // Sicherstellen, dass es einen Startwert gibt
              render={({ field: { value, onChange } }) => (
                <Switch isSelected={value ?? false} onValueChange={(val) => onChange(val)}>
                  Video aktivieren
                </Switch>
              )}
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
          <Button isLoading={isSubmitting} isDisabled={!isValid} fullWidth className="bg-ppics-400" type="submit">
            {isUpdateMode ? "Update Pic" : "Add Pic"}
          </Button>
          {!isUpdateMode && (
            <Checkbox name="EingabeWeiter" checked={eingabeWeiter} onChange={(e) => setEingabeWeiter(e.target.checked)}>
              Eingabe beenden
            </Checkbox>
          )}
          <ToastContainer />
        </form>
      </CardBody>
    </Card>
  );
}
