"use server";

import { getPicsTwenty } from "@/app/actions/picActions";
import CardPic from "@/components/cardsplaces/CardPic";

// export default function CardPic({ pic }: PicProps) {

export default async function PicsList() {
  const pics = await getPicsTwenty();
  const sortedPics = pics
    .map((pic) => ({
      ...pic,
      title: pic.title ?? "", // Falls title null ist, wird es durch "" ersetzt
      description: pic.description ?? "", // Falls description null ist, wird es durch "" ersetzt
    }))
    .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  console.log("Pics: ", pics);
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
