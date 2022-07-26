const STAR_WIDTH = 20;

export function getRatingStarWidth(rating: number, width: number = STAR_WIDTH) {
  return `${width * Math.round(rating)}%`;
}
