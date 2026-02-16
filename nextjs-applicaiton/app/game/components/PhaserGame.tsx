"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function xzzPhaserGame() {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const container = gameRef.current;
    if (!container) return;

    let cancelled = false;

    const initGame = async () => {
      const { createGame } = await import("../phaser/src/main");
      if (cancelled || !container.isConnected) return;
      phaserGameRef.current = createGame(container);
    };

    initGame();

    // Cleanup when unmounting (e.g. navigate away from /game)
    return () => {
      cancelled = true;
      const game = phaserGameRef.current;
      phaserGameRef.current = null;
      if (!game) return;
      try {
        if (game.sound != null) {
          if (typeof game.sound.stopAll === "function") {
            game.sound.stopAll();
          }
          // Close the Web Audio context so the previous game's sounds fully stop.
          // Otherwise when we mount again, old context can still be playing.
          const ctx = game.sound.context;
          if (ctx != null && typeof ctx.close === "function" && ctx.state !== "closed") {
            ctx.close().catch(() => {});
          }
        }
        game.destroy(true);
      } catch (e) {
        console.warn("Phaser cleanup error:", e);
      }
    };
  }, []);

  // Stop sound when route changes away from game (backup for cases where unmount is delayed)
  useEffect(() => {
    if (pathname !== "/game" && phaserGameRef.current?.sound != null) {
      try {
        phaserGameRef.current.sound.stopAll();
      } catch (_) {}
    }
  }, [pathname]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div ref={gameRef} className="w-full h-full" />
    </div>
  );
}
