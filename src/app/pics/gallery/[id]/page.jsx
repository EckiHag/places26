"use server";

import { getPicsByBelongstoid } from "@/app/actions/picActions";
// import { getPicsTwenty } from "@/app/actions/picActions";
import GalleryPage from "./GalleryPage";

export default async function Gallery({ params }) {
  // Warte darauf, dass `params` korrekt bereitgestellt wird
  const { id } = await params;

  if (!id) {
    throw new Error("Die ID in den Params fehlt.");
  }
  const pics = await getPicsByBelongstoid(id);
  const sortedPics = pics.sort((a, b) => new Date(b.created.$date) - new Date(a.created.$date));

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
