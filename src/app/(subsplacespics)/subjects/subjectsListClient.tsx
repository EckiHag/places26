"use client";

import CardSubject from "@/components/cardsplaces/CardSubject";
import { useSession } from "next-auth/react";

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
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => (
          <CardSubject key={subject.id} subjectId={subject.id} image={subject.image ?? "/fallback-image.jpg"} title={subject.title} description={subject.description} />
        ))}
      </div>
    </div>
  );
}
