"use client";
import { ScrollShadow, Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from "@heroui/react";

export default function CardPlace({ id, image, title, description }) {
  return (
    <Card className="max-w-[400px] min-h-[200px]">
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
        {/* <Link href={`/pics/cards/${id}`}>
            <Button as="div" size="sm" className="bg-blue-400">
              PicCards
            </Button>
          </Link> */}
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
