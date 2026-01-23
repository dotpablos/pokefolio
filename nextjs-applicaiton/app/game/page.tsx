"use client";
import ContentCard from "../components/ContentCard";
import { useContext } from "react";
import { CardContext } from "../context/CardContext";
import PhaserGame from "./components/PhaserGame";

export default function GamePage() {
  const { selectedCardId } = useContext(CardContext);
  return (
    <div className="w-full h-full relative">
      {/* {selectedCardId !== "no-display" && (
        <div className="absolute top-25 left-35 h-content z-10">
          <ContentCard selectedCardId={selectedCardId} />
        </div>
      )} */}
      <PhaserGame />
    </div>
  );
}
