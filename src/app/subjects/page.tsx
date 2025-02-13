// subjects/page.tsx

import CardSubject from "@/components/cardsplaces/CardSubject";
// import { NextResponse } from "next/server";
import { getSubjectsAll } from "@/app/actions/subjectActions";
import Link from "next/link";
export const dynamic = "force-dynamic"; // 🚀 Verhindert das Next.js-Caching!

const SubjectsList = async () => {
  // ✅ Prisma-Daten holen (jetzt reines JSON!)
  const subjects = await getSubjectsAll();

  // ✅ Sortierung korrigiert (kein Prisma-Fehler mehr)
  const sortedSubjects = subjects && subjects.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  return (
    <div className="mx-auto flex justify-center flex-col mt-3">
      {/* <div className="mb-6 text-center">
        <Link href={`/subjects/addsubject/${id ?? "new"}`}>add</Link>
        <Link href="subjects/addsubject" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition">
          Add Subject
        </Link>
      </div> */}
      <Link href={`/subjects/editsubject/new`} className="mb-6 text-center">
        New Subject
      </Link>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSubjects &&
            sortedSubjects.map((subject) => <CardSubject key={subject.id} id={subject.id} image={subject.image} title={subject.title} description={subject.description} />)}
        </div>
      </div>
    </div>
  );
};

export default SubjectsList;
