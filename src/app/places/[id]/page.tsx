import { getPlacesByCreatorsubject } from "@/app/actions/placeActions";

import CardPlace from "@/components/cardsplaces/CardPlace";

interface PageProps {
  params: { id: string };
}

const PlacesWithCreatorsubject = async ({ params }: PageProps) => {
  const { id } = params; // Extrahiere id aus params
  const places = await getPlacesByCreatorsubject(id);

  const sortedPlaces = places?.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  return (
    <div>
      <h2 className="text-3xl">PlacesWithCreatorsubject: Hier steht die CardEditSubject als Titel für die Places, wo das Subject editiert und Places hinzugefügt werden können.</h2>

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
};

export default PlacesWithCreatorsubject;
