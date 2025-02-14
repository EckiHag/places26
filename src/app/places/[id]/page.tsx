import { getPlacesByCreatorsubject } from "@/app/actions/placeActions";
import CardPlace from "@/components/cardsplaces/CardPlace";

export type paramsType = Promise<{ id: string }>;

export default async function PlacesList(props: { params: paramsType }) {
  const { id } = await props.params;

  const places = await getPlacesByCreatorsubject(id);
  const sortedPlaces = places && places.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  return (
    <div>
      <h2 className="text-3xl">PlacesList: PlacesList wird eigentlich nicht gebraucht, weil die PlacesList ja immer nur in Abhängigkeit von der Places-Id gelistet werden.</h2>
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
