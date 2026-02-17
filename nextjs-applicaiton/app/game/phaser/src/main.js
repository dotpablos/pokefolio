import * as Phaser from "phaser";
import TownScene from "./scenes/TownScene.js";
import Preload from "./scenes/Preload.js";
import IntroScene from "./scenes/IntroScene.js";
import ProjectScene from "./scenes/ProjectScene.js";
import {
  applyLayerDepthsAndCollision,
  hasCollision as hasCollisionImpl,
} from "./scenes/TownSceneLayerSetup.js";

class Boot extends Phaser.Scene {
  preload() {
    this.load.pack("pack", "/game/phaser/assets/preload-asset-pack.json");
  }

  create() {
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
    render: {
      roundPixels: true,
      antialias: false,
    },
  };

  const game = new Phaser.Game(config);

  // Apply z-index and wall collision from TownSceneLayerSetup (survives editor overwrites)
  const origTownCreate = TownScene.prototype.create;
  TownScene.prototype.create = function (data) {
    origTownCreate.call(this, data);
    applyLayerDepthsAndCollision(this);
  };
  TownScene.prototype.hasCollision = function (x, y) {
    return hasCollisionImpl(this, x, y);
  };

  game.scene.add("Boot", Boot, true);
  game.scene.add("Preload", Preload);
  game.scene.add("IntroScene", IntroScene);
  game.scene.add("TownScene", TownScene);
  game.scene.add("ProjectScene", ProjectScene);
  return game;
}
