/**
 * Layer depth and wall collision for TownScene.
 * Keep this file separate so the Phaser editor can overwrite TownScene.js
 * without removing z-index and collision logic.
 */
import { get_depth_for_layer } from "../global/zDepth.js";
import { emitSceneContext } from "../global/SceneContextEmitter";

/** Layer names that belong to the parent "project_tiles" (stepping on any triggers ProjectScene). */
export const PROJECT_TILE_LAYER_NAMES = [
  "krumbz",
  "dmginc",
  "novamaps",
  "algovisual",
  "pokefolio",
  "aboutme",
];

/**
 * Apply z-index to all tile layers and set scene.collisionLayer.
 * Call this after editorCreate() (e.g. at end of create()).
 * @param {Phaser.Scene} scene - TownScene instance
 */
export function applyLayerDepthsAndCollision(scene) {
  if (!scene.children) return;

  scene.children.list.forEach((child) => {
    if (child.layer && typeof child.layer.name === "string") {
      child.setDepth(get_depth_for_layer(child.layer.name));
      if (child.layer.name === "collision_layer") {
        child.visible = false;
        scene.collisionLayer = child;
      }
    }
  });

  scene.checkProjectTileAndLaunch = () => checkProjectTileAndLaunch(scene);

  // No project = title card hidden
  emitSceneContext({ projectName: "" });
}

/**
 * If the player is standing on a tile in any "project_tiles" layer, launch ProjectScene.
 * Uses the tilemap's getTileAt(layerName) so we don't depend on display-list order.
 * @param {Phaser.Scene} scene - TownScene instance (must have player, tileSize, editabletilemap)
 */
function checkProjectTileAndLaunch(scene) {
  if (!scene.player || scene.tileSize == null) {
    return;
  }
  if (!scene.editabletilemap) {
    return;
  }

  const tileX = Math.floor(scene.player.x / scene.tileSize);
  const tileY = Math.floor(scene.player.y / scene.tileSize);

  const tilemap = scene.editabletilemap;
  for (const name of PROJECT_TILE_LAYER_NAMES) {
    const tile = tilemap.getTileAt(tileX, tileY, false, name);
    if (tile && tile.index !== -1) {
      const cam = scene.cameras.main;
      cam.fadeOut(400, 0, 0, 0);
      cam.once("camerafadeoutcomplete", () => {
        if (scene.naturalParkMusic) scene.naturalParkMusic.stop();
        scene.scene.start("ProjectScene", {
          projectLayerName: name,
          projectTileX: tileX,
          projectTileY: tileY,
        });
      });
      return;
    }
  }
}

/**
 * Wall collision: collision_layer + bounds. Used by movePlayerOneTile.
 * @param {Phaser.Scene} scene - TownScene instance (must have tileSize, collisionLayer)
 * @param {number} x - world x
 * @param {number} y - world y
 * @returns {boolean} true if movement should be blocked
 */
export function hasCollision(scene, x, y) {
  if (!scene.collisionLayer) return false;

  const tileSize = scene.tileSize ?? 32;
  const tileX = Math.floor(x / tileSize);
  const tileY = Math.floor(y / tileSize);

  const width = scene.collisionLayer.width;
  const height = scene.collisionLayer.height;
  if (tileX < 0 || tileX >= width || tileY < 0 || tileY >= height) {
    return true;
  }

  const tile = scene.collisionLayer.getTileAt(tileX, tileY);
  if (tile === null || tile.index === -1) return false;
  return true;
}
