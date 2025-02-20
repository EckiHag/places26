"use server";

import { getPicsTwenty } from "@/app/actions/picActions";
import CardPic from "@/components/cardsplaces/CardPic";

export default async function PicsList() {
  const pics = await getPicsTwenty();
  const sortedPics = pics && pics.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  console.log("Fetched Pics:", JSON.stringify(pics, null, 2));

  return (
    <div>
      <h2 className="text-3xl">Einige Pics werden gelistet.</h2>
      <br></br>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto justify-items-center">
          {sortedPics &&
            sortedPics.map((pic) => (
              <div key={pic.id}>
                <CardPic image={pic.image} title={pic.title} description={pic.description} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
