import { getPicsByBelongstoid } from "@/app/actions/picActions";
import { getPlaceById } from "@/app/actions/placeActions";
import Link from "next/link";
import CardPic from "@/components/cardsplaces/CardPic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PicsCardWithPlaceId({ params }: Props) {
  const { id } = await params;
  // const { id } = await params;
  const pics = await getPicsByBelongstoid(id);
  const place = await getPlaceById(id);
  const sortedPics = pics && pics.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  // const sortedPics = pics?.sort((a, b) => new Date(b.created.$date) - new Date(a.created.$date));
  // console.log("pics: ", pics);

  return (
    <>
      <div className="mb-6 text-center">
        <Link href={`/pics/editpic/new?placeId=${id}`}>New Pic</Link>
      </div>
      <div className="mt- mb-2">
        <Link href="/places" className="btn btn-accent">
          Back to Places
        </Link>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto justify-items-center">
          {sortedPics &&
            sortedPics.map((pic) => (
              <div key={pic.id}>
                <CardPic pic={pic} place={place} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
