// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class IntroScene extends Phaser.Scene {
  hasHitEnter = false;

  constructor() {
    super("IntroScene");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorCreate() {
    this.events.emit("scene-awake");
  }

  /* START-USER-CODE */

  // Write your code here

  create() {
    this.cameras.main.setBackgroundColor("#000000");
    this.editorCreate();

    // Get the center of the screen
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;
    // Create intro image (first part of sequence)
    this.introImage = this.add.image(centerX, centerY, "intro");
    // Scale image to fit screen if needed
    const scaleX = this.cameras.main.width / this.introImage.width;
    const scaleY = this.cameras.main.height / this.introImage.height;
    const scale = Math.min(scaleX, scaleY, 1); // Don't scale up, only down
    this.introImage.setScale(scale);

    // Create controls image (second part of sequence)
    this.controlsImage = this.add
      .image(centerX, centerY, "controls")
      .setVisible(false);
    const scaleControlsX = this.cameras.main.width / this.controlsImage.width;
    const scaleControlsY = this.cameras.main.height / this.controlsImage.height;
    const scaleControls = Math.min(scaleControlsX, scaleControlsY, 1);
    this.controlsImage.setScale(scaleControls);

    // Create title card image (third part of sequence)
    this.titleCard = this.add
      .image(centerX, centerY, "titleCard")
      .setVisible(false);
    // Scale image to fit screen if needed
    const scaleX2 = this.cameras.main.width / this.titleCard.width;
    const scaleY2 = this.cameras.main.height / this.titleCard.height;
    const scale2 = Math.min(scaleX2, scaleY2, 1); // Don't scale up, only down
    this.titleCard.setScale(scale2);

    // Create black overlay for middle transition
    this.blackScreen = this.add
      .rectangle(
        centerX,
        centerY,
        this.cameras.main.width * 2,
        this.cameras.main.height * 2,
        0x000000,
      )
      .setVisible(false);

    // Create white flash screen for enter key press
    this.whiteFlash = this.add
      .rectangle(
        centerX,
        centerY,
        this.cameras.main.width * 2,
        this.cameras.main.height * 2,
        0xffffff,
      )
      .setVisible(false)
      .setAlpha(0);

    // Create start prompt image (appears on title card)
    this.startPrompt = this.add
      .image(centerX, this.cameras.main.height - 80, "start")
      .setVisible(false);

    // Scale start prompt to match the width of the title card
    const titleCardScaledWidth = this.titleCard.width * this.titleCard.scaleX;
    const startPromptScale = titleCardScaledWidth / this.startPrompt.width;
    this.startPrompt.setScale(startPromptScale);

    // Start the intro sequence
    this.startIntroSequence();
  }

  startIntroSequence() {
    // Set initial state - intro image visible, others hidden
    this.introImage.setVisible(true).setAlpha(1);
    this.controlsImage.setVisible(false).setAlpha(1);
    this.titleCard.setVisible(false).setAlpha(1);
    this.blackScreen.setVisible(false).setAlpha(1);
    this.startPrompt.setVisible(false).setAlpha(1);

    // Start the fade sequence
    let currentDelay = 2000; // Show intro for 2 seconds first

    // Phase 1: Fade intro → black → controls
    this.time.delayedCall(currentDelay, () => {
      this.fadeTransition(this.introImage, this.controlsImage);
    });

    // Phase 2: Fade controls → black → titleCard (show controls for 2 seconds)
    currentDelay += 1000; // fade transition time
    currentDelay += 2000; // show controls for 2 seconds
    this.time.delayedCall(currentDelay, () => {
      this.fadeTransition(this.controlsImage, this.titleCard);
    });

    // Enable skip functionality and show blinking start prompt after titleCard is fully visible
    currentDelay += 1000; // fade transition time (controls → titleCard)
    this.time.delayedCall(currentDelay, () => {
      // Play title music when title card is visible
      this.titleMusic = this.sound.add("titleMusic", {
        loop: true,
        volume: 0.5,
      });
      this.titleMusic.play();

      // Show and start blinking the start prompt
      this.startPrompt.setVisible(true);
      this.startBlinking();

      this.input.keyboard.on("keydown", (event) => {
        if (event.key === "Enter" && !this.hasHitEnter) {
          this.hasHitEnter = true;
          this.handleEnterPress();
        }
      });
    });
  }

  startBlinking() {
    // Create blinking animation for the start prompt
    this.tweens.add({
      targets: this.startPrompt,
      alpha: 0,
      duration: 800,
      ease: "Power2.easeInOut",
      yoyo: true,
      repeat: -1, // Repeat infinitely
    });
  }

  handleEnterPress() {
    // Stop blinking animation and hide start prompt
    this.tweens.killTweensOf(this.startPrompt);
    this.startPrompt.setVisible(false);

    // Play ARCANINE sound effect
    this.sound.play("arcanineSound", { volume: 0.7 });

    // Fade out title music
    if (this.titleMusic && this.titleMusic.isPlaying) {
      this.titleMusic.setVolume(this.titleMusic.volume * 0.3);
    }

    // Step 1: White flash (quick fade in)
    this.whiteFlash.setVisible(true).setAlpha(0);
    this.tweens.add({
      targets: this.whiteFlash,
      alpha: 1,
      duration: 10,
      ease: "Power2.easeOut",
      onComplete: () => {
        // Step 2: Stay white for 0.2 seconds
        this.time.delayedCall(200, () => {
          // Step 3: Fade white out (reveal title card again)
          this.tweens.add({
            targets: this.whiteFlash,
            alpha: 0,
            duration: 500,
            ease: "Power2.easeInOut",
            onComplete: () => {
              // Step 4: Pause on title card before fading to black
              this.time.delayedCall(1500, () => {
                // Step 5: Fade everything to black
                this.blackScreen.setVisible(true).setAlpha(0);
                this.tweens.add({
                  targets: [this.titleCard, this.startPrompt],
                  alpha: 0,
                  duration: 500,
                  ease: "Power2.easeInOut",
                });
                this.tweens.add({
                  targets: this.blackScreen,
                  alpha: 1,
                  duration: 500,
                  ease: "Power2.easeInOut",
                  onComplete: () => {
                    // Stop title music if still playing
                    if (this.titleMusic && this.titleMusic.isPlaying) {
                      this.titleMusic.stop();
                    }
                    // Step 6: Transition to TownScene
                    this.scene.start("TownScene");
                  },
                });
              });
            },
          });
        });
      },
    });
  }

  /**
   * Fade transition between two images using black screen as intermediary
   * @param {Phaser.GameObjects.Image} fromImage - Image to fade out
   * @param {Phaser.GameObjects.Image} toImage - Image to fade in
   */
  fadeTransition(fromImage, toImage) {
    const fadeDuration = 500; // Duration for each fade (out and in)

    // Step 1: Fade out current image while fading in black
    this.blackScreen.setVisible(true).setAlpha(0);

    this.tweens.add({
      targets: fromImage,
      alpha: 0,
      duration: fadeDuration,
      ease: "Power2.easeInOut",
    });

    this.tweens.add({
      targets: this.blackScreen,
      alpha: 1,
      duration: fadeDuration,
      ease: "Power2.easeInOut",
      onComplete: () => {
        // Step 2: Hide old image, show new image (invisible), then fade in new image and fade out black
        fromImage.setVisible(false).setAlpha(1);
        toImage.setVisible(true).setAlpha(0);

        this.tweens.add({
          targets: toImage,
          alpha: 1,
          duration: fadeDuration,
          ease: "Power2.easeInOut",
        });

        this.tweens.add({
          targets: this.blackScreen,
          alpha: 0,
          duration: fadeDuration,
          ease: "Power2.easeInOut",
          onComplete: () => {
            this.blackScreen.setVisible(false).setAlpha(1);
          },
        });
      },
    });
  }

  /**
   * Fade to black then transition to a new scene
   * @param {string} sceneName - Name of the scene to transition to
   */
  fadeToScene(sceneName) {
    const fadeDuration = 500;

    // Fade everything to black
    this.blackScreen.setVisible(true).setAlpha(0);

    this.tweens.add({
      targets: [this.titleCard, this.introImage, this.controlsImage, this.startPrompt],
      alpha: 0,
      duration: fadeDuration,
      ease: "Power2.easeInOut",
    });

    this.tweens.add({
      targets: this.blackScreen,
      alpha: 1,
      duration: fadeDuration,
      ease: "Power2.easeInOut",
      onComplete: () => {
        this.scene.start(sceneName);
      },
    });
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
