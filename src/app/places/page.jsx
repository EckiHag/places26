// import { places } from "@/jsonschemas/mern.places"
import { getPlacesAll } from "@/app/actions/placeActions";

import CardPlace from "@/components/cardsplaces/CardPlace";

const PlacesList = async () => {
  const places = await getPlacesAll();
  const sortedPlaces = places.sort((a, b) => new Date(b.created.$date) - new Date(a.created.$date));
  // console.log("places: ", places)

  return (
    <div>
      <h2 className="text-3xl">PlacesList: PlacesList wird eigentlich nicht gebraucht, weil die PlacesList ja immer nur in Abhängigkeit von der Places-Id gelistet werden.</h2>
      <br></br>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPlaces.map((place) => (
          <div key={place.id}>
            <CardPlace id={place.id} image={place.image} title={place.title} description={place.description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesList;
