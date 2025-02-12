"use client";
import { useState } from "react";
import { Avatar } from "@heroui/react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@heroui/react";

export default function CardSubject({ id, image, title, description }) {
  // ---- read-more-button
  const maxNumberOfChars = 80;
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncatedDescription = showFullDescription ? description : description.slice(0, maxNumberOfChars) + (description.length > maxNumberOfChars ? "..." : "");

  const toggleDescriptionHandler = () => {
    setShowFullDescription(!showFullDescription);
  };

  const toSplit = () => {
    return description.length > maxNumberOfChars;
  };
  // eof ------------ read-more-button

  return (
    <Card className="max-w-[300px] lg:max-w-[400px] min-h-[200px] mx-4">
      <CardHeader className="flex gap-3  bg-blue-400">
        <Link href={`/subjects/editsubject/${id}`}>up</Link>
        <Link href={`/places/${id}`} className="block">
          <Avatar
            className="w-20 h-20 transition-transform rounded-full"
            color="success"
            style={{
              borderColor: "#FFFFFF",
              borderWidth: "2px",
            }}
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
        <span dangerouslySetInnerHTML={{ __html: truncatedDescription }} />
        <span className="text-xs">
          {toSplit() && (
            <button className="read-more-button" onClick={toggleDescriptionHandler}>
              {showFullDescription ? " ... weniger" : " ... mehr"}
            </button>
          )}
        </span>
      </CardBody>
    </Card>
  );
}
