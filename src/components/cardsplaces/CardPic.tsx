"use client";
import { Card, CardHeader, CardBody, Tooltip, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { MdDelete } from "react-icons/md";
import { deletePicWithId } from "@/app/actions/picActions";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import Image from "next/image";

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
  const [isOpen, setIsOpen] = useState(false);
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
              <Button className="bg-ppics-500 min-w-min" onClick={handleDelete}>
                <MdDelete size={25} className="text-pplaces-900" />
              </Button>
            </Tooltip>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="bg-ppics-100 items-center">
          {pic.image && (
            <Image
              alt="NextUI place Image"
              src={`https://beihaggis.de/${pic.image.replace(/^.\//, "")}`}
              width={300}
              height={200}
              className="cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          )}
          <span className="text-xs">{pic.description === "nothing to say" || pic.description === "No description" ? "" : pic.description}</span>
        </CardBody>
      </Card>

      {/* Modal for full-screen image using HeroUI */}
      <Modal isOpen={isOpen} placement="center" backdrop="opaque" onClose={() => setIsOpen(false)}>
        <ModalContent className="flex flex-col items-center p-1 bg-transparent max-w-full max-h-full">
          <ModalHeader></ModalHeader>
          <ModalBody className="flex justify-center items-center h-full">
            <Image
              alt="Full Size Image"
              src={`https://beihaggis.de/${pic.image?.replace(/^.\//, "")}`}
              width={800}
              height={600}
              className="max-w-[85%] max-h-[85h] object-contain"
            />
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => setIsOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
}
