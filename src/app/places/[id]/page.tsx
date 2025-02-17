import { getPlacesByCreatorsubject } from "@/app/actions/placeActions";
import CardPlace from "@/components/cardsplaces/CardPlace";
import Link from "next/link";

// export type paramsType = { id: string };

// export default async function PlacesList({ params }: { params: { id: string } }) {
//   const { id } = params;

interface PageProps {
  params: { id: string };
}

export default async function PlacesList({ params }: PageProps) {
  const { id } = params;

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
                <CardPlace id={place.id} image={place.image} title={place.title} description={place.description} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
