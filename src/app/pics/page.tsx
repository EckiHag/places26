"use server";

import { getPicsTwenty } from "@/app/actions/picActions";
import CardPic from "@/components/cardsplaces/CardPic";

export default async function PicsList() {
  const pics = await getPicsTwenty();

  const sortedPics = pics
    .map((pic) => ({
      ...pic,
      title: pic.title ?? "",
      description: pic.description ?? "",
      created: new Date(pic.created), // explizit casten
      image: pic.image ?? undefined,
    }))
    .sort((a, b) => b.created.getTime() - a.created.getTime());

  console.log("Fetched Pics:", JSON.stringify(pics, null, 2));

  return (
    <div>
      <h2 className="text-2xl">PicsList: 7 Pics zum Testen. Hola</h2>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto justify-items-center">
          {sortedPics.map((pic) => (
            <div key={pic.id}>
              <CardPic pic={pic} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
