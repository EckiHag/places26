import { getPlacesAll, getPlacesByCreatorsubject } from "@/app/actions/placeActions";

import CardPlace from "@/components/cardsplaces/CardPlace";

const PlacesWithCreatorsubject = async ({ params }) => {
  const { id } = params; // Extrahiere id aus params
  const places = await getPlacesByCreatorsubject(id);

  const sortedPlaces = places.sort((a, b) => new Date(b.created.$date) - new Date(a.created.$date));

  return (
    <div>
      <h2 className="text-3xl">PlacesWithCreatorsubject: Hier steht die CardEditSubject als Titel für die Places, wo das Subject editiert und Places hinzugefügt werden können.</h2>

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

export default PlacesWithCreatorsubject;
