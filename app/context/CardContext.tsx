"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { ParentFolder } from "../types/CardShapes";
import { CardID } from "../data/InfoRegistry";

type CardContextType = {
  sidePanelOpen: boolean;
  setSidePanelOpen: (sidePanelOpen: boolean) => void;
  selectedCardId: CardID;
  setSelectedCardId: (cardId: CardID) => void;
  openFolders: ParentFolder[];
  popOpenFolder: (targetFolderId: ParentFolder) => void;
  pushOpenFolder: (openFolder: ParentFolder) => void;
};

export const CardContext = createContext<CardContextType>({
  sidePanelOpen: false,
  setSidePanelOpen: (sidePanelOpen: boolean) => {},
  selectedCardId: "about-me",
  setSelectedCardId: (cardId: CardID) => {},
  openFolders: [],
  popOpenFolder: (targetFolderId: ParentFolder) => {},
  pushOpenFolder: (targetFolderId: ParentFolder) => {},
});

export const CardContextProvider = ({ children }: { children: ReactNode }) => {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<CardID>("about-me");
  const [openFolders, setOpenFolders] = useState<ParentFolder[]>([]);
  const popOpenFolder = (targetFolderId: ParentFolder) =>
    setOpenFolders(openFolders.filter((item) => item !== targetFolderId));
  const pushOpenFolder = (targetFolderId: ParentFolder) =>
    setOpenFolders([...openFolders, targetFolderId]);

  const context = {
    sidePanelOpen,
    setSidePanelOpen,
    selectedCardId,
    setSelectedCardId,
    openFolders,
    popOpenFolder,
    pushOpenFolder,
  };

  return (
    <CardContext.Provider value={context}>{children}</CardContext.Provider>
  );
};

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext must be used within a CardContextProvider");
  }
  return context;
};
