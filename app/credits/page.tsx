"use client";
import { useContext, useEffect } from "react";
import ContentCard from "../components/ContentCard";
import { CardContext } from "../context/CardContext";

export default function CreditsPage() {
  const { selectedCardId, setSelectedCardId } = useContext(CardContext);

  useEffect(() => {
    setSelectedCardId("credits");
  }, [setSelectedCardId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black overflow-hidden">
      <div className="flex flex-row items-center justify-center gap-4 h-content">
        <ContentCard selectedCardId={selectedCardId} />
      </div>
    </div>
  );
}
