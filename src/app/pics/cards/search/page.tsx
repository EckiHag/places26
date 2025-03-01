import { getPicsByBelongstoid } from "@/app/actions/picActions";
import { getPlaceById } from "@/app/actions/placeActions";
import Link from "next/link";
import CardPic from "@/components/cardsplaces/CardPic";

interface Props {
  searchParams: Promise<{ id: string; subjectId: string }>;
}

export default async function PicsCardWithPlaceId({ searchParams }: Props) {
  // Warten auf die Auflösung des Promises
  const { id, subjectId } = await searchParams;
  // console.log("PicsCardWithPlaceId subjectId:", subjectId);
  // console.log("PicsCardWithPlaceId id:", id);

  // console.log("PicsCardWithPlaceId subjectId:", subjectId);
  // console.log("PicsCardWithPlaceId id:", id);
  if (!id) {
    return <div>Error: Missing place ID</div>;
  }

  const place = await getPlaceById(id);
  const pics = await getPicsByBelongstoid(id);
  const sortedPics = pics?.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  return (
    <>
      <div className="mb-6 text-center">
        <div className="flex justify-center space-x-4">
          <Link href={`/pics/editpic/new?placeId=${id}`} className="mt-2 px-4 py-2 bg-pprimary-400 text-white rounded-lg shadow-md hover:bg-pprimary-300 transition">
            New Pic
          </Link>
          {subjectId && (
            <Link href={`/places/${subjectId}`} className="mt-2 px-4 py-2 bg-pprimary-400 text-white rounded-lg shadow-md hover:bg-pprimary-300 transition">
              Back to Places
            </Link>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto justify-items-center">
          {sortedPics?.map((pic) => (
            <div key={pic.id}>
              <CardPic place={place} pic={pic} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
