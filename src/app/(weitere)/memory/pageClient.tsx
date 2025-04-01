"use client";
import { useState } from "react";
import Image from "next/image";
import type { Pics } from "@prisma/client";

interface Props {
  memoryPics: Pics[];
}

// <Image
//   alt="NextUI place Image"
//   src={`https://beihaggis.de/${pic.image.replace(/^.\//, "")}`}
//   width={500} // Setze eine sinnvolle Breite
//   height={500} // Setze eine sinnvolle Höhe
//   priority
//   className="cursor-pointer w-full max-w-full h-auto object-contain"
//   onClick={() => setIsOpen(true)}
// />

const placeholderImage = "/images/placeholder.jpg"; // Stelle sicher, dass dieses Bild in /public/images liegt

const shuffleArray = (array: string[]): string[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function MemoryGame({ memoryPics }: Props) {
  // const images = memoryPics.map((pic) => pic.image ?? placeholderImage);

  const baseUrl = "https://beihaggis.de/";

  const images = memoryPics.map((pic) => {
    const path = pic.image ?? placeholderImage;
    const cleanPath = path.replace(/^.\//, ""); // './pfad' → 'pfad'
    return `${baseUrl}${cleanPath}`;
  });

  const [cards, setCards] = useState<string[]>(shuffleArray([...images, ...images]));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);

  const handleClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched((prev) => [...prev, first, second]);
        setScore((s) => s + 1);
      } else {
        setScore((s) => s - 1);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const handleRestart = () => {
    const shuffled = shuffleArray([...images, ...images]);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setScore(0);
  };

  // const isGameComplete = matched.length === cards.length;

  return (
    <div className="relative flex flex-col items-center p-4 mt-24">
      <h1 className="text-2xl font-bold mb-4">Memory-Spiel</h1>

      {/* {isGameComplete && (
        <div className="absolute inset-0 z-10 bg-black bg-opacity-80 text-white flex items-center justify-center text-2xl font-semibold rounded">🎉 Alles gefunden! 🎉</div>
      )} */}

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 max-w-4xl">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <div key={index} className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 cursor-pointer" onClick={() => handleClick(index)}>
              <div className={`w-full h-full rounded transition duration-300 ${isFlipped ? "bg-white" : "bg-gray-700"}`}>
                {isFlipped && <Image src={card} alt="memory card" width={128} height={128} className="rounded w-full h-full object-cover" />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <p className="mb-2">Punkte: {score}</p>
        <button onClick={handleRestart} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Neustart
        </button>
      </div>
    </div>
  );
}
