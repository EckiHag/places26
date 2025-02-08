"use client";
import { ScrollShadow, Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from "@heroui/react";

export default function CardPlace({ id, image, title, description }) {
  return (
    <div className="flex gap-5 flex-wrap">
      <Card className="w-[500px] h-[700px] flex flex-col items-center bg-blue-700 hover:!bg-blue-600">
        <CardHeader className="flex justify-between items-center bg-blue-400">
          <span className="text-2lg leading-relaxed text-center mt-4">{title}</span>
        </CardHeader>
        <Divider />
        <ScrollShadow hideScrollBar orientation="horizontal">
          <CardBody className="flex flex-col items-center gap-4 flex-1">
            <Image alt="NextUI place Image" src={`https://beihaggis.de/${image?.replace(/^.\//, "")}`} width={350} className="object-contain" />
            <span className="text-lg leading-relaxed text-center mt-4">{description}</span>
          </CardBody>
        </ScrollShadow>
        <CardFooter className="flex flex-row gap-2 items-center justify-start mt-auto">
          <Link href={`/pics/cards/${id}`}>
            <Button as="div" size="sm" className="bg-blue-400">
              PicCards
            </Button>
          </Link>
          <Link href={`/pics/gallery/${id}`}>
            <Button as="div" size="sm" className="bg-blue-400">
              PicGallery
            </Button>
          </Link>
          <Link href={`/pics/work/${id}`}>
            <Button as="div" size="sm" className="bg-blue-400">
              Works
            </Button>
          </Link>
          <Button showAnchorIcon as={Link} color="primary" href={`/pics/work/${id}`} variant="solid">
            Button Link
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
