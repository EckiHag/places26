"use client"
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Typ für Schneeflocken
interface Snowflake {
  id: number;
  left: number;
  delay: number;
  size: number;
  duration: number;
}

export default function SnowyScene() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: 100 }, () => ({
      id: Math.random(),
      left: Math.random() * 100, // Zufällige horizontale Position
      delay: Math.random() * 5, // Zufällige Verzögerung
      size: Math.random() * 3 + 2, // Zufällige Größe
      duration: Math.random() * 5 + 5, // Zufällige Fallgeschwindigkeit
    }));
    setSnowflakes(flakes);
  }, []);



  
  return (
    <div className="relative h-screen bg-gradient-to-b from-blue-900 to-blue-700 overflow-hidden">
      <Head>
        <title>Winterliche Schneelandschaft</title>
      </Head>

      {/* Tannenbäume */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`tree-${i}`}
          className="absolute bottom-0"
          style={{
            left: `${Math.random() * 90}%`,
            width: '80px',
            height: '120px',
            background: 'linear-gradient(to bottom, #004d00, #007f00)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
          }}
        ></div>
      ))}

      {/* Hütten */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`cabin-${i}`}
          className="absolute bottom-0"
          style={{
            left: `${Math.random() * 90}%`,
            width: '100px',
            height: '60px',
            background: '#8b4513',
            border: '3px solid #5e321b',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
            transform: `translateY(${Math.random() * -10}%)`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              left: '-20px',
              width: '140px',
              height: '70px',
              background: '#5e321b',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
          ></div>
        </div>
      ))}

      {/* Schneeflocken */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full opacity-75 pointer-events-none"
          style={{
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            left: `${flake.left}%`,
            top: `-${flake.size * 2}px`,
            animation: `snowfall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
          }}
        ></div>
      ))}

      {/* Button unten rechts */}
      <Link href="/" className="fixed bottom-4 right-4 w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
  ⇦
</Link>

      {/* Tailwind-Styles für Animation */}
      <style jsx global>{`
        @keyframes snowfall {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
}
