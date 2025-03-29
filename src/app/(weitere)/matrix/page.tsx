"use client";

import { useEffect, useRef } from "react";
import Link from 'next/link';
const MatrixEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to fill the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1); // Starting points for each column

    const draw = () => {
      // Clear canvas with a semi-transparent black rectangle
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.fillStyle = "#0f0"; // Green color
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      drops.forEach((y, index) => {
        const text = String.fromCharCode(0x30a0 + Math.random() * 96); // Random Katakana character
        const x = index * fontSize;

        ctx.fillText(text, x, y * fontSize);

        // Reset drop or move it down
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[index] = 0;
        }
        drops[index]++;
      });

      requestAnimationFrame(draw);
    };

    draw();

    // Adjust canvas size on resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-screen h-screen">
      {/* Canvas for the Matrix Effect */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Button unten rechts */}
      <Link href="/" className="fixed bottom-4 right-4 w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
  ⇦
</Link>
    </div>
  );
};

export default MatrixEffect;
