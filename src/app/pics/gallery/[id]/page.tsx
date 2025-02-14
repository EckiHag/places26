"use server";

import { getPicsByBelongstoid } from "@/app/actions/picActions";
// import { getPicsTwenty } from "@/app/actions/picActions";
import GalleryPage from "./GalleryPage";

interface Params {
  params: {
    id: string;
  };
}

export default async function PlacesWithCreatorsubject({ params }: Params) {
  // Warte darauf, dass `params` korrekt bereitgestellt wird
  const { id } = params;

  if (!id) {
    throw new Error("Die ID in den Params fehlt.");
  }
  const pics = await getPicsByBelongstoid(id);
  const sortedPics = pics && pics.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  // const sls = await getPicsTwenty();
  // console.log("sls: ", sls);

  const slides = sortedPics?.map((slide) => ({
    ...slide, // Behalte alle ursprünglichen Eigenschaften
    src: `https://beihaggis.de/${slide.image?.replace(/^.\//, "")}`, // Transformiere `image` zu `src`
    image: undefined, // Entferne die ursprüngliche `image`-Eigenschaft
  }));

  console.log("Gallery pics (slides): ", slides);
  console.log("Gallery pics (slides): Ende");

  return <GalleryPage slides={slides} />;
}
