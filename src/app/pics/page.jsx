"use server";

import { getPicsTwenty } from "@/app/actions/picActions";
import CardPic from "@/components/cardsplaces/CardPic";

const PicsList = async () => {
  const pics = await getPicsTwenty();
  const sortedPics = pics.sort((a, b) => new Date(b.created.$date) - new Date(a.created.$date));
  console.log("Pics: ", pics);
  return (
    <div>
      <h2 className="text-3xl">PicsList: PicsList wird eigentlich nicht gebraucht, weil die Pics ja immer nur in Abhängigkeit von der Places-Id gelistet werden.</h2>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {sortedPics.map((pic) => (
          <div key={pic.id}>
            <CardPic pic={pic} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PicsList;
