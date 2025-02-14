"use client";
import { ScrollShadow, Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from "@heroui/react";

interface CardPlaceProps {
  id: string;
  image: string;
  title: string;
  description: string;
}

export default function CardPlace({ id, image, title, description }: CardPlaceProps) {
  return (
    <Card className="max-w-[150px] lg:max-w-[400px] min-h-[200px] mx-4">
      <CardHeader className="flex justify-between items-center bg-blue-400">
        <span className="text-2lg leading-relaxed text-center mt-4">{title}</span>
      </CardHeader>
      <Divider />
      <ScrollShadow hideScrollBar orientation="horizontal">
        <CardBody className="flex flex-col items-center gap-4 flex-1">
          <Image isZoomed alt="NextUI place Image" src={`https://beihaggis.de/${image?.replace(/^.\//, "")}`} width={350} className="object-contain" />
          <span className="text-lg leading-relaxed text-center mt-4">{description}</span>
        </CardBody>
      </ScrollShadow>
      <CardFooter className="flex flex-row gap-2 items-center justify-start mt-auto">
        <Button showAnchorIcon as={Link} color="primary" href={`/pics/cards/${id}`} variant="solid">
          PicCards
        </Button>
        <Button showAnchorIcon as={Link} color="primary" href={`/pics/gallery/${id}`} variant="solid">
          PicGallery
        </Button>
        <Button showAnchorIcon as={Link} color="primary" href={`/pics/work/${id}`} variant="solid">
          Works
        </Button>
      </CardFooter>
    </Card>
  );
}
