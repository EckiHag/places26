"use server";

import { getPicsTwenty } from "@/app/actions/picActions";
import GalleryPage from "./GalleryPage";

export default async function Gallery() {
  const sls = await getPicsTwenty();
  console.log("sls: ", sls);

  const slides = sls?.map((slide) => ({
    ...slide, // Behalte alle ursprünglichen Eigenschaften
    src: `https://beihaggis.de/${slide.image?.replace(/^.\//, "")}`, // Transformiere `image` zu `src`
    image: undefined, // Entferne die ursprüngliche `image`-Eigenschaft
  }));
  console.log("LB pics (slides): ", slides);
  console.log("LB pics (slides): Ende");
  return <GalleryPage slides={slides} />;
}
