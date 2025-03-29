"use client";
import React from "react";
import Link from "next/link";

const RotatingCirclesPage = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      {/* Bewegende Kreise */}
      <div
        className="absolute bg-pink-400 rounded-full opacity-70 animate-move z-10"
        style={{
          width: "180px",
          height: "180px",
          top: "10%",
          left: "20%",
        }}
      ></div>
      <div
        className="absolute bg-blue-400 rounded-full opacity-70 animate-move-slower z-10"
        style={{
          width: "130px",
          height: "130px",
          top: "50%",
          left: "60%",
        }}
      ></div>
      <div
        className="absolute bg-yellow-400 rounded-full opacity-70 animate-move-reverse z-10"
        style={{
          width: "90px",
          height: "90px",
          top: "70%",
          left: "30%",
        }}
      ></div>

      {/* Text */}
      <h1 className="absolute inset-0 flex justify-center items-center z-20 text-white text-3xl font-bold drop-shadow-lg">Floating Circles</h1>

      <Link href="/" legacyBehavior>
        <a className="fixed bottom-4 right-4 w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 z-50">
          ⇦
        </a>
      </Link>

      {/* Debugging Overlay */}
      <div className="absolute inset-0 pointer-events-none z-40" style={{ border: "2px dashed red" }}>
        {/* Optionaler Debug-Bereich */}
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes move {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(50vw, -20vh);
          }
          50% {
            transform: translate(20vw, 30vh);
          }
          75% {
            transform: translate(-40vw, -10vh);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes move-reverse {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(-50vw, 20vh);
          }
          50% {
            transform: translate(-20vw, -30vh);
          }
          75% {
            transform: translate(40vw, 10vh);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes move-slower {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(30vw, -10vh);
          }
          50% {
            transform: translate(-20vw, 20vh);
          }
          75% {
            transform: translate(-50vw, -20vh);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        .animate-move {
          animation: move 10s linear infinite;
        }

        .animate-move-reverse {
          animation: move-reverse 12s linear infinite;
        }

        .animate-move-slower {
          animation: move-slower 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default RotatingCirclesPage;
