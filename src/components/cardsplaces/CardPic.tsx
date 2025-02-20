"use client";
import { Card, CardHeader, CardBody, Divider, Image } from "@heroui/react";

interface CardPicProps {
  pic: {
    title: string;
    description: string;
    image?: string | null; // Hier `null` explizit erlauben
  };
}

export default function CardPic({ pic }: CardPicProps) {
  // console.log("Id von pic für die Card: ", id);
  if (!pic) {
    console.error("CardPic: pic is undefined!");
    return <div>Fehler: Kein Bild gefunden</div>;
  }

  return (
    <Card className="max-w-[400px] min-h-[200px]">
      <CardHeader className="flex gap-3 bg-ppics-400">
        <div className="flex flex-col">
          <p className="text-2xl">{pic.title}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="bg-ppics-100 items-center">
        {pic.image && <Image isZoomed alt="NextUI place Image" src={`https://beihaggis.de/${pic.image.replace(/^.\//, "")}`} width={300} />}
        <span className="text-xs">{pic.description}</span>
      </CardBody>
    </Card>
  );
}
