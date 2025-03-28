"use client";

import CardSubject from "@/components/cardsplaces/CardSubject";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Subject {
  id: string;
  title: string;
  image: string | null;
  description: string;
  creator: string;
  created: Date;
  ord: number;
  group: string;
  imgwidth: number | null;
  imgheight: number | null;
}

interface SubjectsListClientProps {
  subjects: Subject[];
}

export default function SubjectsListClient({ subjects }: SubjectsListClientProps) {
  const { data: session } = useSession();
  const userRole = session?.user?.role as string | undefined; // Explizite Typisierung als string | undefined

  const groups: Record<string, string[]> = {
    ADMIN26: ["galerien", "reisen", "kanusa", "fahrrad", "jahre", "eckhard"],
    CORDULA: ["galerien", "reisen", "kanusa", "fahrrad", "jahre", "eckhard"],
    INGA: ["galerien", "reisen", "kanusa", "fahrrad", "jahre"],
    MARTIN: ["galerien", "kanusa", "fahrrad"],
    REISEN: ["galerien", "reisen", "kanusa"],
    KANUSA: ["galerien", "kanusa"],
    NEWBIE: ["galerien"],
  };

  // Sicherstellen, dass userRole ein gültiger Key in groups ist
  const allowedGroups = userRole && userRole in groups ? groups[userRole] : [];
  // subjects filtern, sodass nur erlaubte Gruppen angezeigt werden
  const filteredSubjects = subjects.filter((subject) => allowedGroups.includes(subject.group));

  return (
    <div className="flex flex-col justify-center items-center mx-auto mt-3 mb-3">
      <div className="sticky top-16 bg-tranparent z-40 flex flex-col mt-1 mb-1 p-4">
        <div className="mx-auto flex justify-center flex-col mt-1">
          {userRole === "ADMIN26" && (
            <Link href={`/subjects/editsubject/new`} className="mt-1 mr-2 px-2 py-1 bg-pprimary-400 text-sm text-white rounded-lg shadow-md hover:bg-pprimary-300 transition">
              New Subject
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-6 mt-14">
        {filteredSubjects.map((subject) => (
          <CardSubject
            key={subject.id}
            subjectId={subject.id}
            image={subject.image ?? "/fallback-image.jpg"}
            title={subject.title}
            description={subject.description}
            ord={subject.ord}
          />
        ))}
      </div>
    </div>
  );
}
