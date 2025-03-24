//places/[subjectId]/[cardform]/page.tsx
"use client";

import CardPlace from "@/components/cardsplaces/CardPlace";
import CardPlaceFormat2 from "@/components/cardsplaces/CardPlaceFormat2";
// import Link from "next/link";
// import { auth } from "@/auth";
import { Places } from "@prisma/client";
import { useEffect } from "react";
// import { useEffect, useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

interface Props {
  sortedPlaces: Places[];
  subjectId: string;
  cardform: string;
}
export default function PageClient({ sortedPlaces, subjectId, cardform }: Props) {
  // const { data: session } = useSession();
  // const userRole = session?.user?.role as string | undefined; // Explizite Typisierung als string | undefined
  // const router = useRouter();
  // const [isPending, startTransition] = useTransition();
  // const [places, setPlaces] = useState(sortedPlaces ?? []); // Sicherstellen, dass es kein undefined ist

  let formatPage = "";
  if (cardform === "default") {
    formatPage = "grid grid-cols-1 gap-10 max-w-6xl mx-auto justify-items-center"; // Eine Spalte -> untereinander
  } else if (cardform === "format2") {
    formatPage = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto justify-items-center";
  }

  useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollYplaces");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
      sessionStorage.removeItem("scrollYplaces");
    }
  }, []);

  return (
    <div className="flex justify-center mt-16">
      <div className={formatPage}>
        {sortedPlaces &&
          sortedPlaces.map((place) => (
            <div key={place.id}>
              {cardform === "default" && (
                <CardPlaceFormat2 subjectId={subjectId} placeId={place.id} image={place.image} title={place.title} description={place.description} ord={place.ord} />
              )}
              {cardform === "format2" && (
                <CardPlace subjectId={subjectId} placeId={place.id} image={place.image} title={place.title} description={place.description} ord={place.ord} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
