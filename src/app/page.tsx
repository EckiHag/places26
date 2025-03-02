"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white flex flex-col min-h-[calc(100dvh-80px)]">
      {/* Hero Section */}
      <header className="relative w-full flex-1 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://beihaggis.de/uploads/images/2023-05-03_20-06-40-41315630-e9dd-11ed-be5b-a75a0a41a473.jpg"
            alt="Famous Places"
            fill
            className="w-full h-full object-cover opacity-60"
          />
        </div>
      </header>

      {/* Gallery Section */}
      <section className="py-6 px-6 flex flex-col items-center w-full max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-5xl font-bold drop-shadow-lg">
            Places26
          </motion.h1>
          <p className="text-lg mt-2 opacity-90">Schöne Orte der Welt</p>
          <h2 className="text-center text-3xl font-semibold mb-8">Ansichten von Reisen</h2>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 text-center bg-gray-800 text-sm">© 2024 Places26 co by EckiHag | Bilder: EckiHag</footer>
    </div>
  );
}
