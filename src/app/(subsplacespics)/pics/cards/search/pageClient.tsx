"use client";

import { Button, Tooltip } from "@heroui/react";
import { BsPlusSlashMinus } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import CardPicFormat2 from "@/components/cardsplaces/CardPicFormat2";
import { Pics, Places } from "@prisma/client";
import { updatePicsOrd } from "@/app/actions/picActions"; // Import der Server Action
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface PicsCardClientProps {
  sortedPics: Pics[];
  placeId: string;
  subjectId: string;
  place: Places;
}

export default function PicsCardClient({ sortedPics, subjectId, place }: PicsCardClientProps) {
  const { data: session } = useSession();
  const userRole = session?.user?.role as string | undefined; // Explizite Typisierung als string | undefined
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pics, setPics] = useState(sortedPics ?? []); // Sicherstellen, dass es kein undefined ist
  const toastId = "update-success"; // Eindeutige ID für den Toast
  const handleCountOrd = () => {
    const userConfirmed = window.confirm("Möchten Sie die Nummer der Pics alle hochsetzen?");
    if (!userConfirmed) {
      toast.error("Das Hochsetzen wurde nicht bestätigt!");
      return;
    }

    startTransition(async () => {
      const result = await updatePicsOrd(pics);

      if (result.success && result.updatedPics) {
        setPics(result.updatedPics ?? []); // Falls undefined, wird ein leeres Array gesetzt
        toast.dismiss(toastId); // Vorherigen Toast entfernen
        toast.success("Die Pics wurden erfolgreich um 5 hochgezählt."); // Nur hier der Erfolgstoast!
      } else {
        toast.error(result.error || "Unbekannter Fehler");
      }
    });
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center">
      {userRole === "ADMIN26" && (
        <div className="flex flex-row items-center">
          <Tooltip content="Pics hochzählen">
            <Button className="mt-5 bg-pprimary-400 hover:bg-pprimary-600" onPress={handleCountOrd} disabled={isPending}>
              {isPending ? "Wird aktualisiert..." : "Pics hochzählen"}
              PicsCount
              <BsPlusSlashMinus size={25} className="text-pplaces-900" />
            </Button>
          </Tooltip>
        </div>
      )}

      <div className="grid grid-cols-1 justify-items-center mt-12">
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
