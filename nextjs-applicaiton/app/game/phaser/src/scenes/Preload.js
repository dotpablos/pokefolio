// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import * as Phaser from "phaser";
/* END-USER-IMPORTS */

export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorPreload() {
    this.load.pack("asset-pack", "/game/phaser/assets/asset-pack.json");
  }

  /** @returns {void} */
  editorCreate() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;
    const barWidth = 400;
    const barHeight = 24;

    // progressBarBg - Dark background with border
    const progressBarBg = this.add.rectangle(
      centerX,
      centerY + 20,
      barWidth,
      barHeight,
      0x000000,
    );
    progressBarBg.setStrokeStyle(2, 0x333333);

    // progressBar - Filled progress indicator
    const progressBar = this.add.rectangle(
      centerX - barWidth / 2,
      centerY + 20,
      0,
      barHeight,
      0x333333,
    );
    progressBar.setOrigin(0, 0.5);
    progressBar.isFilled = true;

    // loadingText - Centered above progress bar
    const loadingText = this.add.text(
      centerX,
      centerY - 20,
      "Loading Assets...",
      {
        color: "#e0e0e0",
        fontFamily: "monospace",
        fontSize: "18px",
        align: "center",
      },
    );
    loadingText.setOrigin(0.5, 0.5);

    this.progressBar = progressBar;
    this.progressBarBg = progressBarBg;

    this.events.emit("scene-awake");
  }

  /** @type {Phaser.GameObjects.Rectangle} */
  progressBar;

  /* START-USER-CODE */

  // Write your code here

  preload() {
    console.log("🔄 [Scene Transition] Entering Preload scene");
    this.editorCreate();

    this.editorPreload();
    this.cameras.main.setBackgroundColor("#000000");

    const maxWidth = 400; // Match barWidth from editorCreate

    this.load.on("progress", (progress) => {
      this.progressBar.width = progress * maxWidth;
    });
  }

  create() {
    console.log(
      "✅ [Scene Transition] Preload scene created, transitioning to IntroScene",
    );
    this.scene.start("IntroScene");
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
