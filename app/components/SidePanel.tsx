"use client";
import { useContext, useMemo } from "react";
import { CardContext } from "../context/CardContext";
import { PARENT_FOLDERS, ParentFolder } from "../types/CardShapes";
import {
  FolderIcon,
  FolderKanbanIcon,
  EllipsisVerticalIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { CardID } from "../data/InfoRegistry";

import { InfoRegistry } from "../data/InfoRegistry";

const FolderCard = ({
  name,
  isOpen,
  onClick,
}: {
  name: ParentFolder;
  isOpen: boolean;
  onClick: (id: ParentFolder) => void;
}) => {
  return (
    <button
      onClick={() => onClick(name)}
      className="border-b border-[#333333] items-center border-opacity-50 w-64 flex flex-row justify-start px-4 gap-2 hover:bg-[#1a1a1a] cursor-pointer"
    >
      {isOpen ? (
        <>
          <FolderKanbanIcon className="w-4 h-4 text-white" />
          <h1 className="description mb-0! py-3 text-center text-white!">
            {name}
          </h1>
        </>
      ) : (
        <>
          <FolderIcon className="w-4 h-4 text-[#999999]" />
          <h1 className="description mb-0! py-3 text-center">{name}</h1>
        </>
      )}
    </button>
  );
};

const TopicCard = ({
  name,
  cardId,
  isSelected,
  onClick,
}: {
  name: string;
  cardId: CardID;
  isSelected: boolean;
  onClick: (id: CardID) => void;
}) => {
  return (
    <button
      onClick={() => onClick(cardId)}
      className="p-2 bg-[#121111] items-center border-opacity-50 w-64 flex flex-row justify-start px-4 gap-2 hover:bg-[#1a1a1a] cursor-pointer"
    >
      {isSelected ? (
        <>
          <ChevronsRightIcon className="w-4 h-4 text-white" />
          <h1 className="subtitle text-white!">{name}</h1>
        </>
      ) : (
        <>
          <EllipsisVerticalIcon className="w-4 h-4 text-[#999999]" />
          <h1 className="subtitle text-[#666666]!">{name}</h1>
        </>
      )}
    </button>
  );
};

export default function SidePanel() {
  const {
    openFolders,
    pushOpenFolder,
    popOpenFolder,
    setSelectedCardId,
    selectedCardId,
    setSidePanelOpen,
    sidePanelOpen,
  } = useContext(CardContext);
  const handleFolderClick = (id: ParentFolder) => {
    if (openFolders.includes(id)) {
      popOpenFolder(id);
    } else {
      pushOpenFolder(id);
    }
  };

  const handleTopicClick = (cardId: CardID) => {
    setSidePanelOpen(!sidePanelOpen);
    setSelectedCardId(cardId);
  };

  const categories = Object.values(PARENT_FOLDERS);

  return (
    <div className="box h-full overflow-y-auto">
      {categories.map((folder) => {
        const isOpen = openFolders.includes(folder);
        const topicCardsData =
          useMemo(() => {
            return Object.entries(InfoRegistry).reduce(
              (acc, [cardId, content]) => {
                if (!content.parentFolder) return acc;
                const folder = content.parentFolder;
                if (!acc[folder]) {
                  acc[folder] = [];
                }
                acc[folder].push({ cardId, content });
                return acc;
              },
              {} as Record<
                ParentFolder,
                Array<{
                  cardId: string;
                  content: (typeof InfoRegistry)[string];
                }>
              >
            );
          }, [InfoRegistry])[folder] || [];

        return (
          <div key={folder}>
            <FolderCard
              name={folder}
              isOpen={isOpen}
              onClick={handleFolderClick}
            />
            <div className={`topic-cards-container ${isOpen ? "open" : ""}`}>
              {topicCardsData.map(({ cardId, content }) => (
                <div key={cardId} className="topic-card">
                  <TopicCard
                    isSelected={selectedCardId === cardId}
                    name={content.title}
                    cardId={cardId as CardID}
                    onClick={handleTopicClick}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
