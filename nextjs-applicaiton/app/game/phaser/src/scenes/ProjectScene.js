
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import {
  emitSceneContext,
  SceneContextEmitter,
} from "../global/SceneContextEmitter";
/* END-USER-IMPORTS */

export default class ProjectScene extends Phaser.Scene {

	constructor() {
		super("ProjectScene");

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

	create(data) {
		this.projectTileX = data?.projectTileX ?? 0;
		this.projectTileY = data?.projectTileY ?? 0;
		this.cameras.main.setBackgroundColor("#000000");
		this.projectMusic = this.sound.add("projectMusic", {
			loop: true,
			volume: 0.2,
		});
		this.projectMusic.play();
		this.cameras.main.fadeIn(400);
		// Notify React so it can show the title card for this project (layer name = card id)
		emitSceneContext({ projectName: data?.projectLayerName ?? "" });
		// Back button: fade out then return to town 1 tile down from the project tile
		SceneContextEmitter.once("request-back", () => {
			SceneContextEmitter.emit("back-handled");
			const cam = this.cameras.main;
			cam.fadeOut(400, 0, 0, 0);
			cam.once("camerafadeoutcomplete", () => {
				this.projectMusic.stop();
				this.scene.start("TownScene", {
					returnTileX: this.projectTileX,
					returnTileY: this.projectTileY,
				});
			});
		});
		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
