import { getPicsForMemory } from "@/app/actions/picActions";
import PageClient from "./pageClient";

export default async function PicsMemory() {
  const pics = await getPicsForMemory();

  return <PageClient memoryPics={pics} />;
}
