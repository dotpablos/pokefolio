"use client";
import { useContext, useEffect } from "react";
import { CardContext } from "./context/CardContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const { setSelectedCardId } = useContext(CardContext);
  const router = useRouter();

  useEffect(() => {
    setSelectedCardId("no-display");
  }, [setSelectedCardId]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#e0e3dc] font-serif py-12 px-4">
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-4xl md:text-5xl font-serif text-black">
          Luke Edwards
        </h1>
        <h2 className="text-xl font-serif text-gray-500">
          Software developer
        </h2>
        <h3 className="text-sm font-serif text-gray-500">
          Based in Calgary, Alberta, Canada
        </h3>
      </div>

      <div className="mb-8">
        <img
          src="/media/me/meAndJenna.webp"
          alt="me and my girlfriend Jenna"
          className="max-w-full min-w-[20vw] h-[60vh]"
        />
      </div>

      <div className="flex flex-col gap-2 text-black font-serif text-lg mb-8">
        <button
          onClick={() => router.push("/boring")}
          className="hover:underline cursor-pointer"
        >
          {"Portfolio"}
        </button>
        <button
          onClick={() => {
            setSelectedCardId("no-display");
            router.push("/game");
          }}
          className="hover:underline cursor-pointer"
        >
          {"Play my portfolio game"}
        </button>
        <button
          onClick={() => router.push("/credits")}
          className="hover:underline cursor-pointer"
        >
          {"Credits"}
        </button>
      </div>
    </div>
  );
}
