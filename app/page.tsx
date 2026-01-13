"use client";
import { useRouter } from "next/navigation";
import { PixelStyleButton } from "./components/Buttons";
import { useContext } from "react";
import { CardContext } from "./context/CardContext";
import { LucideIcon } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans">
      {/* <img src="/media/logo.png" alt="Home" className="w-1/2 h-1/2 z-10" /> */}
      <h1 className="font-press-start-2p text-8xl font-bold italic p-4 pb-10 image-reveal revealed bg-linear-to-r from-blue-500 to-yellow-500 text-transparent bg-clip-text">
        POKÉFOLIO
      </h1>
      <h2 className="font-press-start-2p text-black text-16px font-bold pb-10 image-reveal revealed">
        by: Luke Edwards
      </h2>
      <div className="flex flex-col gap-2 items-center text-sm">
        <PixelStyleButton
          text="Portfolio without the game"
          onClick={() => {
            router.push("/boring");
          }}
        />
        <PixelStyleButton
          text="Play Game"
          onClick={() => {
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
