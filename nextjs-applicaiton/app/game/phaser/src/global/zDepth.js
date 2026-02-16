export const Z_DEPTH = {
  PLAYER: 2,
  FLOOR: 0,
  BEHIND: 1,
  IN_FRONT: 3,
};

export const get_depth_for_layer = (layerName) => {
  if (layerName.includes("in_front")) {
    return Z_DEPTH.IN_FRONT;
  } else if (layerName.includes("behind")) {
    return Z_DEPTH.BEHIND;
  } else if (layerName.includes("player")) {
    return Z_DEPTH.PLAYER;
  }
  return Z_DEPTH.FLOOR;
};
