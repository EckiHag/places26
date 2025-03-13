import { getPlacesByCreatorsubject } from "@/app/actions/placeActions";
import { getSubjectById } from "@/app/actions/subjectActions";
import CardPlace from "@/components/cardsplaces/CardPlace";
import CardPlaceFormat2 from "@/components/cardsplaces/CardPlaceFormat2";
import Link from "next/link";

type Props = {
  params: { subjectId: string; cardform: string };
};

export default async function PlacesList({ params }: Props) {
  const { subjectId, cardform } = params;
  console.log("subjectId in PlacesList: ", subjectId);
  const subjects = await getSubjectById(subjectId);
  const places = await getPlacesByCreatorsubject(subjectId);

  let formatPage = "";
  if (cardform === "default") {
    formatPage = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto justify-items-center";
  } else if (cardform === "format2") {
    formatPage = "grid grid-cols-1 gap-10 max-w-6xl mx-auto justify-items-center"; // Eine Spalte -> untereinander
  }

  // const sortedPlaces = places && places.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  const sortedPlaces = places?.sort((a, b) => a.ord - b.ord); // von 1 nach  100 ...
  return (
    <div className="flex flex-col justify-center mx-auto mt-3 mb-3">
      <div className="sticky top-16 bg-white z-40 flex flex-col justify-center mx-auto mt-3 mb-3 shadow-md p-4">
        <div className="flex flex-col justify-center mx-auto text-2xl">{subjects?.title}</div>
        <div className="flex flex-row justify-center mx-auto">
          <Link href={`/subjects`} className="mt-2 mr-2 px-4 py-2 bg-pprimary-400 text-white rounded-lg shadow-md hover:bg-pprimary-300 transition">
            Back to Subjects
          </Link>
          <Link href={`/places/editplace/new?subjectId=${subjectId}`} className="mt-2 px-4 py-2 bg-pprimary-400 text-white rounded-lg shadow-md hover:bg-pprimary-300 transition">
            New Place
          </Link>
        </div>
      </div>
      <div className="flex justify-center mt-16">
        <div className={formatPage}>
          {sortedPlaces &&
            sortedPlaces.map((place) => (
              <div key={place.id}>
                {cardform === "format2" && (
                  <CardPlaceFormat2 subjectId={subjectId} placeId={place.id} image={place.image} title={place.title} description={place.description} ord={place.ord} />
                )}
                {cardform === "default" && (
                  <CardPlace subjectId={subjectId} placeId={place.id} image={place.image} title={place.title} description={place.description} ord={place.ord} />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
