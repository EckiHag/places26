"use client";

import { useState } from "react";
import Link from "next/link";
function DiceRoller() {
  const [diceValue, setDiceValue] = useState<number>(1);
  const [rolling, setRolling] = useState<boolean>(false);
  const [history, setHistory] = useState<{ number: number; value: number }[]>([]);

  const rollDice = () => {
    setRolling(true);

    // Animation und Verzögerung simulieren
    setTimeout(() => {
      const newValue = Math.floor(Math.random() * 6) + 1;

      // Neuer Wurf wird mit passender Nummer gespeichert
      setHistory((prevHistory) => [{ number: prevHistory.length + 1, value: newValue }, ...prevHistory]);

      setDiceValue(newValue);
      setRolling(false);
    }, 1000);
  };

  return (
    <div className="h-screen flex flex-col items-center mt-24">
      <h1 className="text-2xl font-bold">Würfel-Simulator mit Animation</h1>

      <div className={`inline-block w-24 h-24 border-2 rounded-md text-4xl font-bold my-5 ${rolling ? "bg-gray-200 animate-spin" : "bg-white"} flex items-center justify-center`}>
        {rolling ? "?" : diceValue}
      </div>

      <button
        onClick={rollDice}
        disabled={rolling}
        className={`px-6 py-2 text-lg font-medium rounded-md ${rolling ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
      >
        {rolling ? "Würfeln..." : "Würfeln"}
      </button>

      <h2 className="text-xl font-semibold mt-8">Wurf-Historie</h2>
      <ul className="list-none mt-4">
        {history.map((entry) => (
          <li key={entry.number} className="text-lg font-medium mb-2">
            Wurf {entry.number}: {entry.value}
          </li>
        ))}
      </ul>
      {/* Button unten rechts */}
      <Link
        href="/"
        className="fixed bottom-4 right-4 w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        ⇦
      </Link>
    </div>
  );
}

export default DiceRoller;
