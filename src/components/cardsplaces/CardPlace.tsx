"use client";

import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Button, Tooltip } from "@heroui/react";
import { FiEdit } from "react-icons/fi";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  subjectId: string;
  placeId: string;
  image: string | null;
  title: string;
  description: string;
  ord: number;
}

export default function CardPlace({ subjectId, placeId, image, title, description, ord }: Props) {
  const { data: session } = useSession();
  const userRole = session?.user?.role as string | undefined; // Explizite Typisierung als string | undefined
  const [expanded, setExpanded] = useState(false);
  const words = description.split(" ");
  const shortDescription = words.slice(0, 20).join(" ") + (words.length > 20 ? "..." : "");
  const router = useRouter();
  const cardform = "default";

  const handleEdit = () => {
    const queryParams = new URLSearchParams();
    if (subjectId) queryParams.set("subjectId", subjectId);
    if (cardform) queryParams.set("cardform", cardform);

    // ✅ Scrollposition global speichern
    sessionStorage.setItem("scrollYplaces", window.scrollY.toString());
    // 👉 Zur Bearbeiten-Seite navigieren
    router.push(`/places/editplace/${placeId}?${queryParams.toString()}`);
  };

  return (
    <Card className="max-w-[350px] lg:max-w-[600px] lg:min-w-[600px] min-h-[200px] mx-4 bg-pplaces-300">
      <CardHeader className="relative w-full items-center justify-center p-0">
        <Image alt="NextUI place Image" src={`https://beihaggis.de/${image?.replace(/^.\//, "")}`} width={500} height={500} className="w-full h-[300px] object-cover" />
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col justify-between items-center gap-3 bg-pplaces-400 p-4">
        <div className="text-3xl text-center mt-4">{title}</div>
        <div className="text-lg text-center mt-4">
          {expanded ? description : shortDescription}
          {words.length > 20 && (
            <button className="text-blue-500 ml-2 underline" onClick={() => setExpanded(!expanded)}>
              {expanded ? " weniger" : " mehr"}
            </button>
          )}
        </div>
      </CardBody>
      <CardFooter className="flex flex-row justify-between items-center mt-auto">
        {/* Linke Seite: Buttons */}
        <div className="flex flex-row gap-2">
          <Button as={Link} size="sm" href={`/pics/cards/search?placeId=${placeId}&subjectId=${subjectId}`} variant="solid" className="bg-pplaces-400">
            PicCards
          </Button>
          {userRole === "ADMIN26" && (
            <Button as={Link} size="sm" href={`/pics/cards/search3spaltig?placeId=${placeId}&subjectId=${subjectId}`} variant="solid" className="bg-pplaces-400">
              3spaltig
            </Button>
          )}
          <Button as={Link} size="sm" href={`/pics/gallery/${placeId}`} variant="solid" className="bg-pplaces-400">
            PicGallery
          </Button>
        </div>

        {/* Rechte Seite: Edit & Ord */}
        <div className="flex flex-row items-center justify-end">
          {userRole === "ADMIN26" && (
            <Tooltip content="Edit ✏️">
              <Button
                size="sm"
                className="bg-transparent p-0 mr-3 hover:bg-transparent focus:ring-0 shadow-none w-[30px] h-[30px] min-w-0 min-h-0 flex items-center justify-center rounded-full"
                onPress={handleEdit}
              >
                <FiEdit size={20} className="text-pplaces-900" />
              </Button>
            </Tooltip>
          )}
          {userRole === "ADMIN26" && <div className="mr-2">{ord}</div>}
        </div>
      </CardFooter>
    </Card>
  );
}
