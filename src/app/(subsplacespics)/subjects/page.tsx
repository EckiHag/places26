// app/subjects/page.tsx
import { getSubjectsAll } from "@/app/actions/subjectActions";
import SubjectsListClient from "./subjectsListClient";

export default async function SubjectsList() {
  const subjects = await getSubjectsAll();
  const sortedSubjects = (subjects ?? []).sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  return (
    <div>
      <SubjectsListClient subjects={sortedSubjects} />
    </div>
  );
}
