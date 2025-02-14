"use client";
import { useState } from "react";
import { Avatar, Card, CardHeader, CardBody, Divider, Link } from "@heroui/react";

interface CardSubjectProps {
  id: string;
  image: string;
  title: string;
  description: string;
}

export default function CardSubject({ id, image, title, description }: CardSubjectProps) {
  const maxNumberOfChars = 80;
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncatedDescription = showFullDescription ? description : description.slice(0, maxNumberOfChars) + (description.length > maxNumberOfChars ? "..." : "");

  return (
    <Card className="max-w-[300px] lg:max-w-[400px] min-h-[200px] mx-4">
      <CardHeader className="flex gap-3 bg-blue-400">
        <Link href={`/subjects/editsubject/${id}`}>up</Link>
        <Link href={`/places/${id}`} className="block">
          <Avatar
            className="w-20 h-20 transition-transform rounded-full bg-blue-400"
            style={{ borderColor: "#FFFFFF", borderWidth: "2px" }}
            name="subject avatar"
            size="md"
            src={`https://beihaggis.de/${image}`}
          />
        </Link>
        <div className="flex flex-col">
          <p className="text-2xl">{title}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="bg-amber-700">
        <span>{truncatedDescription}</span>
        {description.length > maxNumberOfChars && (
          <button className="text-xs text-blue-300 ml-2" onClick={() => setShowFullDescription(!showFullDescription)}>
            {showFullDescription ? " ... weniger" : " ... mehr"}
          </button>
        )}
      </CardBody>
    </Card>
  );
}
