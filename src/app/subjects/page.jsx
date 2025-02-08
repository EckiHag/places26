import CardSubject from "@/components/cardsplaces/CardSubject";
import { getSubjectsAll } from "@/app/actions/subjectActions";
import Link from "next/link";

const SubjectsList = async () => {
  const subjects = await getSubjectsAll();
  const sortedSubjects = subjects.sort((a, b) => new Date(b.created.$date) - new Date(a.created.$date));

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
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedSubjects.map((subject) => (
          <div key={subject.id}>
            <CardSubject id={subject.id} image={subject.image} title={subject.title} description={subject.description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectsList;
