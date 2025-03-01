"use client";
// width={200} // Fixierte Breite
// height={(200 / image.imgwidth) * image.imgheight} // Dynamische Höhe basierend auf dem Verhältnis

import React, { useState } from "react";
import Lightbox from "./Lightbox";
import Image from "next/image";

const GalleryPage = ({ slides }) => {
  console.log("GalleryPage slides: ", slides);

  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const openLightbox = (image) => {
    setCurrentImage(image.src);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {slides.map((image, index) => (
          <div key={index} onClick={() => openLightbox(image)} className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform">
            <Image
              src={image.src}
              alt={`Gallery Image ${index + 1}`}
              width={200} // Fixierte Breite
              height={(200 / image.imgwidth) * image.imgheight} // Dynamische Höhe basierend auf dem Verhältnis
              layout="intrinsic" // Intrinsische Dimensionen für responsives Verhalten
              objectFit="cover"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox isOpen={isLightboxOpen} onClose={closeLightbox} imageSrc={currentImage} />
    </div>
  );
};

export default GalleryPage;
