// @/app/actions/data.js
import { getPicsTwenty } from "@/app/actions/picActions";

export default async function slides() {
  const sls = await getPicsTwenty();
  console.log("sls: ", sls);

  return sls?.map((slide) => ({
    ...slide, // Behalte alle ursprünglichen Eigenschaften
    src: `https://beihaggis.de/${slide.image?.replace(/^.\//, "")}`, // Transformiere `image` zu `src`
    image: undefined, // Entferne die ursprüngliche `image`-Eigenschaft
  }));
}
