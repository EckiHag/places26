"use client";
import { Card, CardHeader, CardBody, Image, Tooltip, Divider, Button } from "@heroui/react";
import { MdDelete } from "react-icons/md";
import { deletePicWithId } from "@/app/actions/picActions";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

interface CardPicProps {
  place: {
    title: string;
    description: string;
  } | null;
  pic: {
    id: string;
    title: string;
    description: string;
    image?: string | null; // Hier `null` explizit erlauben
  };
}

export default function CardPic({ place, pic }: CardPicProps) {
  const router = useRouter();
  // console.log("Id von pic für die Card: ", id);
  if (!pic) {
    console.error("CardPic: pic is undefined!");
    return <div>Fehler: Kein Bild gefunden</div>;
  }

  const handleDelete = async () => {
    if (pic.image) {
      const userConfirmed = window.confirm("Möchten Sie das Bild wirklich löschen?");
      if (!userConfirmed) {
        return;
      }
      const result = await deletePicWithId(pic.id, pic.image);
      console.log("Result of deletePic", result);
      if (result == true) {
        toast("Bild wurde erfolgreich gelöscht");
      }
      router.refresh();
    }

    router.refresh();
  };

  return (
    <>
      <Card className="max-w-[400px] min-h-[200px]">
        <CardHeader className="flex justify-between items-center gap-3 bg-pplaces-400 p-4">
          <span className="text-2xl">{pic.title === "pic" || pic.title === "Pic" ? place?.title || "Picture" : pic.title}</span>
          <div className="flex flex-col items-end space-y-2">
            <Tooltip content="Delete 🚮">
              <Button className="bg-ppics-500 min-w-min" onPress={handleDelete}>
                <MdDelete size={25} className="text-pplaces-900" />
              </Button>
            </Tooltip>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="bg-ppics-100 items-center">
          {pic.image && <Image isZoomed alt="NextUI place Image" src={`https://beihaggis.de/${pic.image.replace(/^.\//, "")}`} width={300} />}
          <span className="text-xs">{pic.description === "nothing to say" || pic.description === "No description" ? "" : pic.description}</span>
        </CardBody>
      </Card>
      <ToastContainer />
    </>
  );
}
