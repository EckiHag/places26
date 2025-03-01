import React, { useEffect } from "react";
import Image from "next/image";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
}

const Lightbox: React.FC<LightboxProps> = ({ isOpen, onClose, imageSrc }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  console.log("Lightbox imageSrc: ", imageSrc);
  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      {imageSrc ? (
        <Image src={imageSrc} alt={"Lightbox"} width={900} height={900} />
      ) : (
        // <img
        //   src={imageSrc}
        //   alt="Lightbox"
        //   style={{
        //     maxWidth: "90%",
        //     maxHeight: "90%",
        //     boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
        //   }}
        // />

        <p style={{ color: "white" }}>Bild wird geladen...</p>
      )}
    </div>
  );
};

export default Lightbox;
