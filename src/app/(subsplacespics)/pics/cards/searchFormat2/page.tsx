import { getPicsByBelongstoid } from "@/app/actions/picActions";
import { getPlaceById } from "@/app/actions/placeActions";
import Link from "next/link";
import PicsCardClient from "./pageClient";
import { Places } from "@prisma/client";

interface Props {
  searchParams: Promise<{ placeId: string; subjectId: string }>;
}

export default async function PicsCardWithPlaceId({ searchParams }: Props) {
  const { placeId, subjectId } = await searchParams;

  if (!placeId) {
    return <div>Error: Missing place ID</div>;
  }

  const place = (await getPlaceById(placeId)) || ({} as Places);
  const pics = await getPicsByBelongstoid(placeId);
  const sortedPics = pics?.sort((a, b) => a.ord - b.ord) || [];

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center">
        <Link
          href={`/pics/editpic/new?placeId=${placeId}&subjectId=${subjectId}`}
          className="mt-3 mr-3 px-4 py-2 bg-pprimary-400 text-white rounded-lg shadow-md hover:bg-pprimary-300 transition"
        >
          New Pic
        </Link>
        {subjectId && (
          <Link href={`/places/${subjectId}`} className="mt-3 px-4 py-2 bg-pprimary-400 text-white rounded-lg shadow-md hover:bg-pprimary-300 transition">
            Back to Places
          </Link>
        )}
      </div>

      {/* Übergabe der Daten an die Client-Komponente */}
      <PicsCardClient sortedPics={sortedPics} placeId={placeId} subjectId={subjectId} place={place} />
    </div>
  );
}
