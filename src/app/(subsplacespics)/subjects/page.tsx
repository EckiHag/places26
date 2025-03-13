import CardSubject from "@/components/cardsplaces/CardSubject";
import { getSubjectsAll } from "@/app/actions/subjectActions";
import Link from "next/link";

// export const dynamic = "force-dynamic"; // 🚀 Verhindert das Next.js-Caching!

export default async function SubjectsList() {
  const subjects = await getSubjectsAll();
  const sortedSubjects = subjects && subjects.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  return (
    <div className="mx-auto flex justify-center flex-col mt-24">
      <div className="mb-6 text-center">
        <Link href={`/subjects/editsubject/new`}>New Subject</Link>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSubjects &&
            sortedSubjects.map((subject) => (
              <CardSubject key={subject.id} subjectId={subject.id} image={subject.image ?? "/fallback-image.jpg"} title={subject.title} description={subject.description} />
            ))}
        </div>
      </div>
    </div>
  );
}
