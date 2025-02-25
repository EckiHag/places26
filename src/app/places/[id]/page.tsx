import { getPlacesByCreatorsubject } from "@/app/actions/placeActions";
import CardPlace from "@/components/cardsplaces/CardPlace";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PlacesList({ params }: Props) {
  const { id } = await params;
  console.log("subjectId in PlacesList: ", id);
  const places = await getPlacesByCreatorsubject(id);
  const sortedPlaces = places && places.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  return (
    <div className="mx-auto flex justify-center flex-col mt-3">
      <div className="mb-6 text-center">
        <Link href={`/places/editplace/new?subjectId=${id}`}>New Place</Link>
      </div>
      <br></br>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto justify-items-center">
          {sortedPlaces &&
            sortedPlaces.map((place) => (
              <div key={place.id}>
                <CardPlace subjectId={id} id={place.id} image={place.image} title={place.title} description={place.description} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
