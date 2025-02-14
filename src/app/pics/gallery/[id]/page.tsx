"use server";

import React from "react";

function page() {
  return <div>Zum Testen</div>;
}

export default page;

// "use server";

// import { getPicsByBelongstoid } from "@/app/actions/picActions";
// // import { getPicsTwenty } from "@/app/actions/picActions";
// import GalleryPage from "./GalleryPage";

// // interface Params {
// //   params: {
// //     id: string;
// //   };
// // }

// // export default async function PlacesWithCreatorsubject({ params }: { params: { id: string } }) {
// //   const { id } = params;

// export default async function PlacesWithCreatorsubject({ params }: { params: { id: string } }) {
//   const { id } = params;

//   if (!id) {
//     throw new Error("Die ID in den Params fehlt.");
//   }

//   const pics = (await getPicsByBelongstoid(id)) ?? [];
//   const sortedPics = pics && pics.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

//   // const sls = await getPicsTwenty();
//   // console.log("sls: ", sls);

//   const slides = sortedPics?.map((slide) => ({
//     ...slide, // Behalte alle ursprünglichen Eigenschaften
//     src: `https://beihaggis.de/${slide.image?.replace(/^.\//, "")}`, // Transformiere `image` zu `src`
//     image: undefined, // Entferne die ursprüngliche `image`-Eigenschaft
//     imgwidth: slide.imgwidth ?? undefined, // `null` in `undefined` umwandeln
//     imgheight: slide.imgheight ?? undefined, // `null` in `undefined` umwandeln
//     title: slide.title ?? undefined, // `null` in `undefined` umwandeln
//     description: slide.description ?? undefined, // `null` in `undefined` umwandeln
//     copyright: slide.copyright ?? undefined, // `null` in `undefined` umwandeln
//   }));

//   console.log("Gallery pics (slides): ", slides);
//   console.log("Gallery pics (slides): Ende");

//   return <GalleryPage slides={slides ?? []} />;
// }
