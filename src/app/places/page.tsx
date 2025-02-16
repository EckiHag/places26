import { getPlacesAll } from "@/app/actions/placeActions";

import CardPlace from "@/components/cardsplaces/CardPlace";

export default async function PlacesList() {
  const places = await getPlacesAll();
  const sortedPlaces = places && places.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  // console.log("places: ", places)

  return (
    <div>
      <h2 className="text-3xl">PlacesList: Alles Places werden gelistet.</h2>
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
