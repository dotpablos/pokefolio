"use client";

import { useEffect, useRef } from "react";
import * as Phaser from "phaser";
import { createGame } from "../phaser/src/main";

export default function PhaserGame() {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    // Initialize Phaser game
    phaserGameRef.current = createGame(gameRef.current);

    // Cleanup function
    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div ref={gameRef} className="w-full h-full" />
    </div>
  );
}
