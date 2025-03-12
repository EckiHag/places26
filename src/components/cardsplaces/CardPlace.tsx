"use client";

import { ScrollShadow, Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button, Tooltip } from "@heroui/react";
import { FiEdit } from "react-icons/fi";

interface CardPlaceProps {
  subjectId: string;
  placeId: string;
  image: string | null;
  title: string;
  description: string;
  ord: number;
}

export default function CardPlace({ subjectId, placeId, image, title, description, ord }: CardPlaceProps) {
  return (
    <Card className="max-w-[400px] lg:max-w-[400px] min-h-[200px] mx-4 bg-pplaces-100">
      <CardHeader className="flex justify-between items-center gap-3 bg-pplaces-400 p-4">
        <span className="text-2lg leading-relaxed text-center mt-4">{title}</span>
        <span className="mr-6">{ord}</span>
        <div className="flex flex-col items-end space-y-2">
          <Tooltip content="Edit ✏️">
            <Link href={`/places/editplace/${placeId}`}>
              <FiEdit size={25} className="text-pplaces-900" />
            </Link>
          </Tooltip>
        </div>
      </CardHeader>
      <Divider />
      <ScrollShadow hideScrollBar orientation="horizontal">
        <CardBody className="flex flex-col items-center gap-4 flex-1">
          <Image isZoomed alt="NextUI place Image" src={`https://beihaggis.de/${image?.replace(/^.\//, "")}`} width={350} className="object-contain" />
          <span className="text-lg leading-relaxed text-center mt-4">{description}</span>
        </CardBody>
      </ScrollShadow>
      <CardFooter className="flex flex-row gap-2 items-center justify-start mt-auto">
        {/* <Button as={Link} href={`/pics/cards/${id}`} variant="solid" className="bg-pplaces-400">
          PicCards
        </Button> */}
        <Button as={Link} href={`/pics/cards/search?placeId=${placeId}&subjectId=${subjectId}`} variant="solid" className="bg-pplaces-400">
          PicCards
        </Button>
        <Button as={Link} href={`/pics/cards/searchFormat2?placeId=${placeId}&subjectId=${subjectId}`} variant="solid" className="bg-pplaces-400">
          C2
        </Button>
        <Button as={Link} href={`/pics/gallery/${placeId}`} variant="solid" className="bg-pplaces-400">
          PicGallery
        </Button>
      </CardFooter>
    </Card>
  );
}
