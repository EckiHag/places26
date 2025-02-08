"use client";
import React, { useState } from "react";
import Lightbox from "./Lightbox";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

export default function GalleryPage({ slides }) {
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const openLightbox = (photo) => {
    console.log("Photo received in openLightbox: ", photo);
    if (photo && photo.src) {
      setCurrentImage(photo.src);
      setLightboxOpen(true);
    } else {
      console.warn("Photo does not contain src:", photo);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const photos = Array.isArray(slides)
    ? slides.map((photo, index) => ({
        key: photo.id || index,
        src: photo.image || photo.src || "", // Sicherstellen, dass src existiert
        width: photo.imgwidth || 600,
        height: photo.imgheight || 800,
        title: photo.title || "",
        description: photo.description || "",
      }))
    : [];

  console.log("slides (raw input): ", slides);
  console.log("photos (mapped): ", photos);

  return (
    <div>
      <h1>RowsPhotoAlbum in gallery</h1>
      <RowsPhotoAlbum
        photos={photos}
        targetRowHeight={300}
        onClick={(data) => {
          console.log("onClick data:", data);
          if (data.photo) {
            openLightbox(data.photo); // Übergabe des angeklickten Fotos
          } else {
            console.warn("Photo is undefined in onClick");
          }
        }}
      />
      <Lightbox isOpen={isLightboxOpen} onClose={closeLightbox} imageSrc={currentImage} />
    </div>
  );
}
