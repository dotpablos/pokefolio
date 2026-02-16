import { EventEmitter } from "events";

/** Must match Phaser tile layer names (project_tiles). */
export type SceneName =
  | "krumbz"
  | "dmginc"
  | "novamaps"
  | "algovisual"
  | "pokefolio"
  | "aboutme";

/** Empty string means no project (title card hidden). */
export type SceneContextStatus = {
  projectName: SceneName | "";
};

export const SceneContextEmitter = new EventEmitter();

export const listenToSceneContext = (
  callback: (status: SceneContextStatus) => void
) => {
  SceneContextEmitter.on("scene-context-change", callback);
};

export const removeSceneContextListener = (
  callback: (status: SceneContextStatus) => void
) => {
  SceneContextEmitter.off("scene-context-change", callback);
};

export const emitSceneContext = (status: SceneContextStatus) => {
  SceneContextEmitter.emit("scene-context-change", { ...status });
};

/** Call from React when user clicks back. Game (ProjectScene) listens and returns to town if active. */
export const emitRequestBack = () => {
  SceneContextEmitter.emit("request-back");
};

/** Call from React to know if game handled the back (so we don't navigate to /). */
export const onBackHandled = (callback: () => void) => {
  SceneContextEmitter.once("back-handled", callback);
};