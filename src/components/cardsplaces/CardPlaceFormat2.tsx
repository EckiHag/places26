"use client";

import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Button, Tooltip } from "@heroui/react";
import { FiEdit } from "react-icons/fi";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface CardPlaceProps {
  subjectId: string;
  placeId: string;
  image: string | null;
  title: string;
  description: string;
  ord: number;
}

export default function CardPlace({ subjectId, placeId, image, title, description, ord }: CardPlaceProps) {
  const { data: session } = useSession();
  const userRole = session?.user?.role as string | undefined; // Explizite Typisierung als string | undefined
  const [expanded, setExpanded] = useState(false);
  const words = description.split(" ");
  const shortDescription = words.slice(0, 20).join(" ") + (words.length > 20 ? "..." : "");
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
          <Button as={Link} href={`/pics/cards/search?placeId=${placeId}&subjectId=${subjectId}`} variant="solid" className="bg-pplaces-400">
            PicCards
          </Button>
          {userRole === "ADMIN26" && (
            <Button as={Link} href={`/pics/cards/searchFormat2?placeId=${placeId}&subjectId=${subjectId}`} variant="solid" className="bg-pplaces-400">
              C2
            </Button>
          )}
          <Button as={Link} href={`/pics/gallery/${placeId}`} variant="solid" className="bg-pplaces-400">
            PicGallery
          </Button>
        </div>

        {/* Rechte Seite: Edit & Ord */}
        <div className="flex flex-row items-center gap-4">
          {userRole === "ADMIN26" && (
            <Tooltip content="Edit ✏️">
              <Link href={`/places/editplace/${placeId}`}>
                <FiEdit size={25} className="text-pplaces-900" />
              </Link>
            </Tooltip>
          )}
          {userRole === "ADMIN26" && <div className="mr-6">{ord}</div>}
        </div>
      </CardFooter>
    </Card>
  );
}
