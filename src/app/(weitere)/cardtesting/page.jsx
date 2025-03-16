import { Card, CardBody, CardFooter, Button, Image, Text } from "@heroui/react";

export default async function TestCards() {
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="w-full max-w-[896px] bg-red-400 shadow-lg rounded-lg p-8 mt-24">
        <h2 className="text-3xl font-bold text-gray-800">Größere Card</h2>
        <p className="text-gray-600 mt-2">Jetzt ist die Card deutlich breiter!</p>
        <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">Mehr erfahren</button>
      </div>
    </div>
  );
}
