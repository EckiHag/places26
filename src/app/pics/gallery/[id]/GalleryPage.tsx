"use client";

import React, { useState } from "react";
import Lightbox from "./Lightbox";
import { RowsPhotoAlbum, Photo } from "react-photo-album";
import "react-photo-album/rows.css";

type Slide = {
  id?: string;
  image?: string;
  src?: string;
  imgwidth?: number;
  imgheight?: number;
  title?: string;
  description?: string;
};

interface GalleryPageProps {
  slides: Slide[];
}

export default function GalleryPage({ slides }: GalleryPageProps) {
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const openLightbox = (photo: Photo) => {
    console.log("Photo received in openLightbox: ", photo);
    if (photo.src) {
      setCurrentImage(photo.src);
      setLightboxOpen(true);
    } else {
      console.warn("Photo does not contain src:", photo);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const photos: Photo[] = slides.map((photo) => ({
    src: photo.image || photo.src || "", // Sicherstellen, dass src existiert
    width: photo.imgwidth || 600,
    height: photo.imgheight || 800,
    title: photo.title, // Titel kann optional sein
    description: photo.description, // Beschreibung kann optional sein
  }));

  console.log("slides (raw input): ", slides);
  console.log("photos (mapped): ", photos);

  return (
    <div>
      <h1>RowsPhotoAlbum in gallery</h1>
      <RowsPhotoAlbum
        photos={photos}
        targetRowHeight={300}
        onClick={({ photo }) => {
          console.log("onClick data:", photo);
          openLightbox(photo);
        }}
      />
      <Lightbox isOpen={isLightboxOpen} onClose={closeLightbox} imageSrc={currentImage} />
    </div>
  );
}
