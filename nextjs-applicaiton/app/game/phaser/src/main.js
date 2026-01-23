import * as Phaser from "phaser";
import TownScene from "./scenes/TownScene.js";
import Preload from "./scenes/Preload.js";

class Boot extends Phaser.Scene {
  preload() {
    console.log("🔄 [Scene Transition] Entering Boot scene");
    this.load.pack("pack", "/game/phaser/assets/preload-asset-pack.json");
  }

  create() {
    console.log(
      "✅ [Scene Transition] Boot scene created, transitioning to Preload",
    );
    this.scene.start("Preload");
  }
}

export function createGame(container) {
  const config = {
    width: 1280,
    height: 720,
    type: Phaser.AUTO,
    backgroundColor: "#242424",
    parent: container,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  };

  const game = new Phaser.Game(config);

  console.log("🎮 [Game] Phaser game initialized, starting Boot scene");
  game.scene.add("Boot", Boot, true);
  game.scene.add("Preload", Preload);
  game.scene.add("TownScene", TownScene);
  return game;
}
