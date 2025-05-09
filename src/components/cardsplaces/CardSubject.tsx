"use client";
import { useState } from "react";
import { Avatar, Card, CardHeader, CardBody, Divider, Link, Tooltip } from "@heroui/react";
import { FiEdit } from "react-icons/fi";
import { useSession } from "next-auth/react";

interface CardSubjectProps {
  subjectId: string;
  image: string;
  title: string;
  description: string;
  ord: number;
}

export default function CardSubject({ subjectId, image, title, description, ord }: CardSubjectProps) {
  const { data: session } = useSession();
  const userRole = session?.user?.role as string | undefined; // Explizite Typisierung als string | undefined
  console.log("subjectId in CardSubject: ", subjectId);
  const maxNumberOfChars = 80;
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncatedDescription = showFullDescription ? description : description.slice(0, maxNumberOfChars) + (description.length > maxNumberOfChars ? "..." : "");

  return (
    <Card className="max-w-[300px] lg:max-w-[400px] min-h-[200px] mx-4">
      <CardHeader className="flex justify-between items-center gap-3 bg-pprimary-400 p-4">
        {/* Linke Gruppe */}
        <div className="flex items-center gap-3">
          <Link href={`/places/${subjectId}/default`} className="flex items-center gap-3">
            <Avatar
              className="w-20 h-20 transition-transform rounded-full bg-pprimary-400"
              style={{ borderColor: "#FFFFFF", borderWidth: "2px" }}
              name="subject avatar"
              size="md"
              src={`https://beihaggis.de/${image}`}
            />
          </Link>
          <p className="text-2xl text-pprimary-900">{title}</p>
        </div>

        {/* Rechte Gruppe */}
        <div className="flex items-center gap-3">
          {userRole === "ADMIN26" && (
            <>
              <Tooltip content="Edit ✏️">
                <Link href={`/subjects/editsubject/${subjectId}`}>
                  <FiEdit size={25} className="text-primary-900" />
                </Link>
              </Tooltip>
              <Link href={`/places/${subjectId}/format2`} className="ml-3">
                Spa3
              </Link>
              <span className="ml-2 text-black">{ord}</span>
            </>
          )}
        </div>
      </CardHeader>

      <Divider />
      <CardBody className="bg-pprimary-200">
        <span>{truncatedDescription}</span>
        {description.length > maxNumberOfChars && (
          <button className="text-xs text-black ml-2" onClick={() => setShowFullDescription(!showFullDescription)}>
            {showFullDescription ? " ... weniger" : " ... mehr"}
          </button>
        )}
      </CardBody>
    </Card>
  );
}
