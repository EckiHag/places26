import { getPicsByBelongstoid } from "@/app/actions/picActions";
import { getPlaceById } from "@/app/actions/placeActions";
import Link from "next/link";
import CardPicFormat2 from "@/components/cardsplaces/CardPicFormat2";
import { Button, Tooltip } from "@heroui/react";
import { BsPlusSlashMinus } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";

interface Props {
  searchParams: Promise<{ placeId: string; subjectId: string }>;
}

export default async function PicsCardWithPlaceId({ searchParams }: Props) {
  // Warten auf die Auflösung des Promises
  const { placeId, subjectId } = await searchParams;

  if (!placeId) {
    return <div>Error: Missing place ID</div>;
  }

  const place = await getPlaceById(placeId);
  const pics = await getPicsByBelongstoid(placeId);
  // const sortedPics = pics?.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  const sortedPics = pics?.sort((a, b) => a.ord - b.ord); // von 1 nach  100 ...
  // const sortedPics = pics?.sort((a, b) => b.ord - a.ord);

  const handleCountOrd = () => {
    const userConfirmed = window.confirm("Möchten Sie die Nummer der Pics alle hochsetzen?");
    if (!userConfirmed) {
      toast.error("Das Hochsetzen wurde nicht bestätigt!");
      return;
    }
    toast.success("Die Pics wurden erfolgreich um 5 hochgezählt.");
  };

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
        <Tooltip content="Pics hochzählen">
          <Button
            className="bg-pprimary-400 p-0 mr-3 hover:bg-pprimary-600 focus:ring-0 shadow-none w-[30px] h-[30px] min-w-0 min-h-0 flex items-center justify-center rounded-full"
            onPress={handleCountOrd}
          >
            PicsCount
            <BsPlusSlashMinus size={25} className="text-pplaces-900" />
          </Button>
        </Tooltip>
      </div>

      <div className="grid grid-cols-1 justify-items-center">
        {sortedPics?.map((pic) => (
          <div key={pic.id}>
            <CardPicFormat2 subjectId={subjectId} place={place} pic={pic} />
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
