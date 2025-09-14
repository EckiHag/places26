"use client";
// import { Card, CardHeader, CardBody, Tooltip, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, Accordion, AccordionItem, CardFooter } from "@heroui/react";
import { Card, CardHeader, CardBody, Tooltip, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, CardFooter } from "@heroui/react";
import { MdDelete } from "react-icons/md";
import { deletePicWithId } from "@/app/actions/picActions";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
// import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import Image from "next/image";
import { useSession } from "next-auth/react";

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
    imgwidth: number | null;
    imgheight: number | null;
    ord: number | null;
  };
}
// href={`/pics/editpic/new?placeId=${placeId}&subjectId=${subjectId}`}
export default function CardPic({ subjectId, place, pic }: CardPicProps) {
  const { data: session } = useSession();
  const userRole = session?.user?.role as string | undefined; // Explizite Typisierung als string | undefined
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  // console.log("Id von pic für die Card: ", id);

  const [descExpanded, setDescExpanded] = useState(false);
  const [canClamp, setCanClamp] = useState(false);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = descRef.current;
    if (!el) return;
    const check = () => setCanClamp(el.scrollHeight > el.clientHeight + 1);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [pic.description, descExpanded]);

  if (!pic) {
    console.error("CardPic: pic is undefined!");
    return <div>Fehler: Kein Bild gefunden</div>;
  }
  // const getFirstWords = (text: string, wordCount: number) => {
  //   return text.split(" ").slice(0, wordCount).join(" ") + " ...";
  // };

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

  const handleEdit = () => {
    // ✅ Scrollposition global speichern
    sessionStorage.setItem("scrollY", window.scrollY.toString());

    // 👉 Zur Bearbeiten-Seite navigieren
    router.push(`/pics/editpic/${pic.id}?placeId=${place?.id}&subjectId=${subjectId}`);
  };

  return (
    <>
      <Card className="mt-3 min-w-[350px] lg:min-w-[600px] mx-auto">
        <CardHeader className="flex justify-between items-center bg-pprimary-400 p-4"></CardHeader>
        <Divider />
        <CardBody className="bg-white flex-grow flex justify-center items-center">
          {pic.image && (
            <div className="w-full max-w-[500px] h-full max-h-[400px] flex justify-center">
              <Image
                alt="NextUI place Image"
                src={`https://beihaggis.de/${pic.image.replace(/^.\//, "")}`}
                width={500} // Setze eine sinnvolle Breite
                height={500} // Setze eine sinnvolle Höhe
                priority
                className="cursor-pointer w-full max-w-full h-auto object-contain"
                onClick={() => setIsOpen(true)}
              />
            </div>
          )}
        </CardBody>
        <CardFooter className="flex flex-col w-full">
          <div className="text-1xl font-semibold">
            {pic.title === "pic" || pic.title === "Pic" ? place?.title || "Picture" : <span dangerouslySetInnerHTML={{ __html: pic.title }} />}
          </div>
          {pic.title !== "Pic" && pic.description !== "nothing to say" && pic.description !== "No description" && (
            <div className="mt-5 w-full max-w-[600px]">
              <div ref={descRef} className={`whitespace-pre-wrap break-words ${descExpanded ? "" : "line-clamp-2"}`} dangerouslySetInnerHTML={{ __html: pic.description }} />
              {canClamp && (
                <button type="button" onClick={() => setDescExpanded((v) => !v)} className="mt-1 inline-flex items-center gap-1 text-pplaces-900 hover:underline">
                  {descExpanded ? (
                    <span>weniger</span>
                  ) : (
                    <>
                      <FiMoreHorizontal aria-hidden />
                      <span>mehr</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {userRole === "ADMIN26" && (
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
                <Button
                  className="bg-transparent p-0 mr-3 hover:bg-transparent focus:ring-0 shadow-none w-[30px] h-[30px] min-w-0 min-h-0 flex items-center justify-center rounded-full"
                  onPress={handleEdit}
                >
                  <FiEdit size={25} className="text-pplaces-900" />
                </Button>
              </Tooltip>
              <span className="ml-6">{pic.ord}</span>
            </div>
          )}
        </CardFooter>
      </Card>

      {/* Modal for full-screen image using HeroUI */}
      {isOpen && window.innerWidth >= 1024 && (
        <Modal isOpen={isOpen} placement="center" backdrop="opaque" onClose={() => setIsOpen(false)}>
          <ModalContent className="flex flex-col items-center bg-transparent max-w-full max-h-full">
            <ModalHeader></ModalHeader>
            <ModalBody className="flex justify-center items-center h-full">
              <Image
                alt="Full Size Image"
                src={`https://beihaggis.de/${pic.image?.replace(/^.\//, "")}`}
                width={1200}
                height={1200}
                className="max-w-[100%] max-h-[95dvh] object-contain cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      <ToastContainer />
    </>
  );
}
