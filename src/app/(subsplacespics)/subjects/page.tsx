// app/subjects/page.tsx
import { getSubjectsAll } from "@/app/actions/subjectActions";
import SubjectsListClient from "./subjectsListClient";
import Link from "next/link";

export default async function SubjectsList() {
  const subjects = await getSubjectsAll();
  const sortedSubjects = (subjects ?? []).sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  return (
    <div className="mx-auto flex justify-center flex-col mt-24">
      <div className="mb-6 text-center">
        <Link href={`/subjects/editsubject/new`}>New Subject</Link>
      </div>
      <SubjectsListClient subjects={sortedSubjects} />
    </div>
  );
}
