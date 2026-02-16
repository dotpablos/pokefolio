"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { BackButton } from "../components/Buttons";
import ContentCard from "../components/ContentCard";
import SidePanel from "../components/SidePanel";
import { CardContext } from "../context/CardContext";
import { MenuIcon, XIcon } from "lucide-react";

export default function BoringPage() {
  const router = useRouter();
  const { selectedCardId, setSelectedCardId, setSidePanelOpen, sidePanelOpen } =
    useContext(CardContext);

  useEffect(() => {
    setSelectedCardId("aboutme");
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black overflow-hidden">
      <BackButton
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 z-20"
      />
      <div className="flex flex-row items-center justify-center gap-4 h-content">
        {sidePanelOpen ? (
          <SidePanel />
        ) : (
          <ContentCard selectedCardId={selectedCardId} />
        )}
        <div className="desktop-only h-full">
          <SidePanel />
        </div>
      </div>
      <div className="mobile-only absolute right-12 top-12 z-10 ">
        <button
          className={`p-3 flex items-center box justify-center cursor-pointer min-w-24 relative border-3 border-rounded-full border-black hover:bg-[#1a1a1a] ${
            sidePanelOpen ? "bg-[#1a1a1a]!" : ""
          }`}
          style={{
            width: "fit-content",
            minWidth: "6rem",
            borderStyle: "double",
          }}
          onClick={() => setSidePanelOpen(!sidePanelOpen)}
        >
          {sidePanelOpen ? (
            <XIcon className="w-4 h-4" />
          ) : (
            <MenuIcon className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
