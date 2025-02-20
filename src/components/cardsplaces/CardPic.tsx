"use client";
import { Card, CardHeader, CardBody, Divider, Image } from "@heroui/react";

interface CardPicProps {
  image: string | null;
  title: string;
  description: string;
}

export default function CardPic({ image, title, description }: CardPicProps) {
  // console.log("Id von pic für die Card: ", id);
  return (
    <Card className="max-w-[400px] min-h-[200px]">
      <CardHeader className="flex gap-3 bg-ppics-400">
        <div className="flex flex-col">
          <p className="text-2xl">{title}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="bg-ppics-100 items-center">
        {image && <Image isZoomed alt="NextUI place Image" src={`https://beihaggis.de/${image.replace(/^.\//, "")}`} width={300} />}
        <span className="text-xs">{description}</span>
      </CardBody>
    </Card>
  );
}
