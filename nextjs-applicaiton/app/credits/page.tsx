"use client";
import { useContext, useEffect } from "react";
import ContentCard from "../components/ContentCard";
import { CardContext } from "../context/CardContext";
import { BackButton } from "../components/Buttons";
import { useRouter } from "next/navigation";

export default function CreditsPage() {
  const { selectedCardId, setSelectedCardId } = useContext(CardContext);
  const router = useRouter();

  useEffect(() => {
    setSelectedCardId("credits");
  }, [setSelectedCardId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black overflow-hidden">
      <div className="flex flex-row items-center justify-center gap-4 h-content">
      <BackButton
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 z-20"
      />
        <ContentCard selectedCardId={selectedCardId} />
      </div>
    </div>
  );
}
