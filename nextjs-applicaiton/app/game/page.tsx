"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BackButton } from "../components/Buttons";
import ContentCard from "../components/ContentCard";
import { type CardID } from "../data/InfoRegistry";
import {
  listenToSceneContext,
  removeSceneContextListener,
  emitRequestBack,
  onBackHandled,
  type SceneContextStatus,
} from "./phaser/src/global/SceneContextEmitter";
import PhaserGame from "./components/PhaserGame";

const BACK_HANDLED_TIMEOUT_MS = 200;

export default function GamePage() {
  const router = useRouter();
  const [projectName, setProjectName] = useState<SceneContextStatus["projectName"]>("");

  useEffect(() => {
    const handler = (status: SceneContextStatus) => setProjectName(status.projectName);
    listenToSceneContext(handler);
    return () => removeSceneContextListener(handler);
  }, []);

  const handleBack = () => {
    let handled = false;
    onBackHandled(() => {
      handled = true;
    });
    emitRequestBack();
    setTimeout(() => {
      if (!handled) router.push("/");
    }, BACK_HANDLED_TIMEOUT_MS);
  };

  const showTitleCard = projectName !== "";

  return (
    <div className="relative w-full h-full">
      {showTitleCard && (
        <>
          <BackButton
            onClick={handleBack}
            className="absolute top-4 left-4 z-20"
          />
          {projectName && (
            <div className="absolute top-25 left-35 h-content z-10">
              <ContentCard selectedCardId={projectName as CardID} />
            </div>
          )}
        </>
      )}
      <PhaserGame />
    </div>
  );
}
