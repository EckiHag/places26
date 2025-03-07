import { getPlacesByCreatorsubject } from "@/app/actions/placeActions";
import { getSubjectById } from "@/app/actions/subjectActions";
import CardPlace from "@/components/cardsplaces/CardPlace";
import Link from "next/link";

type Props = {
  params: Promise<{ subjectId: string }>;
};

export default async function PlacesList({ params }: Props) {
  const { subjectId } = await params;
  console.log("subjectId in PlacesList: ", subjectId);
  const subjects = await getSubjectById(subjectId);
  const places = await getPlacesByCreatorsubject(subjectId);
  const sortedPlaces = places && places.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  return (
    <div className="mx-auto flex justify-center flex-col mt-3">
      <div className="mb-6 text-center">
        <span className="mr-2 text-2xl">{subjects?.title}</span>
        <Link href={`/subjects`} className="mt-2 mr-2 px-4 py-2 bg-pprimary-400 text-white rounded-lg shadow-md hover:bg-pprimary-300 transition">
          Back to Subjects
        </Link>

        <Link href={`/places/editplace/new?subjectId=${subjectId}`} className="mt-2 px-4 py-2 bg-pprimary-400 text-white rounded-lg shadow-md hover:bg-pprimary-300 transition">
          New Place
        </Link>
      </div>
      <br></br>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto justify-items-center">
          {sortedPlaces &&
            sortedPlaces.map((place) => (
              <div key={place.id}>
                <CardPlace subjectId={subjectId} placeId={place.id} image={place.image} title={place.title} description={place.description} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
