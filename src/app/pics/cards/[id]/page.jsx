import { getPicsByBelongstoid } from "@/app/actions/picActions";
import Link from "next/link";
import CardPic from "@/components/cardsplaces/CardPic";

const PicsCardWithPlaceId = async ({ params }) => {
  const pics = await getPicsByBelongstoid(params.id);

  const sortedPics = pics.sort((a, b) => new Date(b.created.$date) - new Date(a.created.$date));
  console.log("pics: ", pics);
  return (
    <>
      <div className="mb-6 text-center">
        <Link href={`/pics/editpic/new?placeId=${params.id}`}>New Pic</Link>
      </div>
      <div className="mt-16 mb-8">
        <Link href="/places" className="btn btn-accent">
          Back to Places
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto justify-items-center">
          {sortedPics.map((pic) => (
            <CardPic key={pic.id} pic={pic} />
          ))}
        </div>
      </div>
    </>
  );
};
export default PicsCardWithPlaceId;
