"use client";
import { useRouter } from "next/navigation";
import { PixelStyleButton } from "./components/Buttons";
import { useContext, useEffect, useRef, useState } from "react";
import GBAIntro from "./art/Intro";
import { CardContext } from "./context/CardContext";

export default function Home() {
  const router = useRouter();
  const intro = useRef<GBAIntro>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setSelectedCardId } = useContext(CardContext);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    if (canvasRef.current) {
      // Set high-resolution internal canvas (3x scale for crisp rendering)
      const scale = 2;
      const baseWidth = 240;
      const baseHeight = 160;
      canvasRef.current.width = baseWidth * scale;
      canvasRef.current.height = baseHeight * scale;
      
      const ctx = canvasRef.current.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      
      // Scale the context so existing drawing code works at original coordinates
      ctx.scale(scale, scale);
      
      // Enable image smoothing for better quality (or disable for pixel art)
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      
      intro.current = new GBAIntro("POKÉFOLIO", "by: Luke Edwards", () => {
        setAnimating(false);
      });
      intro.current.start(ctx);
    }
  }, [canvasRef]);

  useEffect(() => {
    setSelectedCardId("no-display");
  }, [setSelectedCardId]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f6f9f7] font-sans">
      <canvas 
        ref={canvasRef} 
        className="z-10"
        style={{
          width: 'min(75vw, 600px)',
          height: 'auto',
          aspectRatio: '3/2', // 240:160 = 3:2
          imageRendering: 'pixelated' // Use 'pixelated' if you want pixel art style
        }}
      />
      <div
        className={`gameboy-menu-interface w-[75vw] flex flex-col gap-2 items-center text-sm text-wrap ${
          animating ? "opacity-0" : "opacity-100"
        }`}
      >
        <PixelStyleButton
          text="See my Portfolio"
          onClick={() => {
            router.push("/boring");
          }}
        />
        <PixelStyleButton
          text="Play Portfolio Game"
          onClick={() => {
            setSelectedCardId("no-display");
            router.push("/game");
          }}
        />
        <PixelStyleButton
          text="Credits"
          onClick={() => {
            router.push("/credits");
          }}
        />
      </div>
    </div>
  );
}
