// import { getPlacesByCreatorsubject } from "@/app/actions/placeActions";
// import CardPlace from "@/components/cardsplaces/CardPlace";

// export type paramsType = Promise<{ id: string }>;

// export default async function PlacesList(props: { params: paramsType }) {
//   const { id } = await props.params;

//   const places = await getPlacesByCreatorsubject(id);
//   const sortedPlaces = places && places.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

//   return (

import { getPicsByBelongstoid } from "@/app/actions/picActions";
import GalleryPage from "./GalleryPage";

export type paramsType = Promise<{ id: string }>;

export default async function PlacesWithCreatorsubject(props: { params: paramsType }) {
  const { id } = await props.params;

  if (!id) {
    throw new Error("Die ID in den Params fehlt.");
  }

  const pics = (await getPicsByBelongstoid(id)) ?? [];
  const sortedPics = pics && pics.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  // const sls = await getPicsTwenty();
  // console.log("sls: ", sls);

  const slides = sortedPics?.map((slide) => ({
    ...slide, // Behalte alle ursprünglichen Eigenschaften
    src: `https://beihaggis.de/${slide.image?.replace(/^.\//, "")}`, // Transformiere `image` zu `src`
    image: undefined, // Entferne die ursprüngliche `image`-Eigenschaft
    imgwidth: slide.imgwidth ?? undefined, // `null` in `undefined` umwandeln
    imgheight: slide.imgheight ?? undefined, // `null` in `undefined` umwandeln
    title: slide.title ?? undefined, // `null` in `undefined` umwandeln
    description: slide.description ?? undefined, // `null` in `undefined` umwandeln
    copyright: slide.copyright ?? undefined, // `null` in `undefined` umwandeln
  }));

  // console.log("Gallery pics (slides): ", slides);
  // console.log("Gallery pics (slides): Ende");

  return <GalleryPage slides={slides ?? []} />;
}
