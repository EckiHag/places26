"use client";

import { ScrollShadow, Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button, Tooltip } from "@heroui/react";
import { FiEdit } from "react-icons/fi";
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
    <Card className="max-w-[350px] lg:max-w-[400px] min-h-[200px] mx-4 bg-pplaces-100">
      <CardHeader className="flex justify-between items-center gap-3 bg-pplaces-400 p-4">
        <span className="text-2lg leading-relaxed text-center mt-4">{title}</span>
        <span className="mr-6">{ord}</span>
        {userRole === "ADMIN26" && (
          <div className="flex flex-col items-end space-y-2">
            <Tooltip content="Edit ✏️">
              <Button
                className="bg-transparent p-0 mr-3 hover:bg-transparent focus:ring-0 shadow-none w-[30px] h-[30px] min-w-0 min-h-0 flex items-center justify-center rounded-full"
                onPress={handleEdit}
              >
                <FiEdit size={25} className="text-pplaces-900" />
              </Button>
            </Tooltip>
          </div>
        )}
      </CardHeader>
      <Divider />
      <ScrollShadow hideScrollBar orientation="horizontal">
        <CardBody className="flex flex-col items-center gap-4 flex-1">
          <Image isZoomed alt="NextUI place Image" src={`https://beihaggis.de/${image?.replace(/^.\//, "")}`} width={350} className="object-contain" />
          <span className="text-lg leading-relaxed text-center mt-4">{description}</span>
        </CardBody>
      </ScrollShadow>
      <CardFooter className="flex flex-row gap-2 items-center justify-start mt-auto">
        <Button as={Link} href={`/pics/cards/search?placeId=${placeId}&subjectId=${subjectId}`} variant="solid" className="bg-pplaces-400">
          PicCards
        </Button>
        {userRole === "ADMIN26" && (
          <Button as={Link} href={`/pics/cards/search3spaltig?placeId=${placeId}&subjectId=${subjectId}`} variant="solid" className="bg-pplaces-400">
            3spaltig
          </Button>
        )}
        <Button as={Link} href={`/pics/gallery/${placeId}`} variant="solid" className="bg-pplaces-400">
          PicGallery
        </Button>
      </CardFooter>
    </Card>
  );
}
