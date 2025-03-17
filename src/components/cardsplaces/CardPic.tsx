"use client";
import { Card, CardHeader, CardBody, Tooltip, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Accordion, AccordionItem } from "@heroui/react";
import { MdDelete } from "react-icons/md";
import { deletePicWithId } from "@/app/actions/picActions";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";

interface CardPicProps {
  subjectId: string;
  place: {
    id: string;
    title: string;
    description: string;
  } | null;
  pic: {
    id: string;
    title: string;
    description: string;
    image?: string | null; // Hier `null` explizit erlauben
    ord: number | null;
  };
}
// href={`/pics/editpic/new?placeId=${placeId}&subjectId=${subjectId}`}
export default function CardPic({ subjectId, place, pic }: CardPicProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  // console.log("Id von pic für die Card: ", id);

  if (!pic) {
    console.error("CardPic: pic is undefined!");
    return <div>Fehler: Kein Bild gefunden</div>;
  }
  const getFirstWords = (text: string, wordCount: number) => {
    return text.split(" ").slice(0, wordCount).join(" ") + " ...";
  };
  const getRemainingWords = (text: string, numWords: number) => {
    const words = text.split(" ");
    return words.slice(numWords).join(" ");
  };
  const handleDelete = async () => {
    try {
      const uploadPassword = process.env.NEXT_PUBLIC_UPLOAD_PASSWORD;

      if (!pic?.image) {
        toast.error("Kein Bild vorhanden.");
        return;
      }

      const userConfirmed = window.confirm("Möchten Sie das Bild wirklich löschen?");
      if (!userConfirmed) {
        toast.error("Das Löschen wurde nicht bestätigt!");
        return;
      }

      if (!uploadPassword) {
        toast.error("Zum Löschen fehlt das UPLOAD_PASSWORD!");
        return;
      }

      const result = await deletePicWithId(pic.id, pic.image);
      console.log("Result of deletePic", result);

      if (result === true) {
        toast.success("Bild wurde erfolgreich gelöscht");
      } else {
        toast.error("Fehler beim Löschen");
      }
    } catch (error) {
      console.error("Unerwarteter Fehler beim Löschen:", error);
      toast.error("Ein unerwarteter Fehler ist aufgetreten.");
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <Card className="max-w-[350px] md:min-w-[400px] lg:min-w-[500px] min-h-[700px]">
        <CardHeader className="flex justify-between items-center bg-pplaces-400 p-4">
          <span className="text-1xl font-semibold">{pic.title === "pic" || pic.title === "Pic" ? place?.title || "Picture" : pic.title}</span>

          <div className="flex items-center gap-[1px]">
            <Tooltip content="Delete 🚮">
              <Button
                className="bg-transparent p-0 mr-3 hover:bg-transparent focus:ring-0 shadow-none w-[30px] h-[30px] min-w-0 min-h-0 flex items-center justify-center rounded-full"
                onPress={handleDelete}
              >
                <MdDelete size={25} className="text-pplaces-900" />
              </Button>
            </Tooltip>
            <Tooltip content="Edit ✏️">
              <Link href={`/pics/editpic/${pic.id}?placeId=${place?.id}&subjectId=${subjectId}`}>
                <FiEdit size={25} className="text-pplaces-900" />
              </Link>
            </Tooltip>
            <span className="ml-6">{pic.ord}</span>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="bg-ppics-100 items-center">
          {pic.image && (
            <Image
              alt="NextUI place Image"
              src={`https://beihaggis.de/${pic.image.replace(/^.\//, "")}`}
              width={500}
              height={500}
              priority
              className="cursor-pointer w-full max-w-full h-auto object-contain"
              onClick={() => setIsOpen(true)}
            />
          )}
          {pic.title !== "Pic" && pic.description !== "nothing to say" && pic.description !== "No description" && (
            <Accordion>
              <AccordionItem className="max-w-[350px]" title={getFirstWords(pic.description, 5)}>
                <p dangerouslySetInnerHTML={{ __html: `... ${getRemainingWords(pic.description, 5)}` }} />
              </AccordionItem>
            </Accordion>
          )}
        </CardBody>
      </Card>

      {/* Modal for full-screen image using HeroUI */}
      <div className="hidden lg:block">
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
      </div>
      <ToastContainer />
    </>
  );
}
