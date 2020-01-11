import config from "../Constants/config.json";

function normalize(vect) {
  const length = Math.sqrt(vect.x * vect.x + vect.y * vect.y);
  return { x: vect.x / length, y: vect.y / length };
}

let pixelsPerUnit;
function getPixelsPerUnit(ctx) {
  //calculate gridsize, (assume that max size is a 1:1 ratio)
  const largestDimension = Math.max(ctx.canvas.width, ctx.canvas.height);
  const numberOfUnitsInLargestDimension =
    config.numberOfUnitsInLargestDimension;
  pixelsPerUnit = largestDimension / numberOfUnitsInLargestDimension;
  return pixelsPerUnit;
}

function gridToScreen(ctx, point, viewPos) {
  return {
    x: (point.x - viewPos.x) * pixelsPerUnit + ctx.canvas.width / 2,
    y: (point.y - viewPos.y) * pixelsPerUnit + ctx.canvas.height / 2
  };
}

function screenToGrid(ctx, point, viewPos) {
  return {
    x: (point.x - ctx.canvas.width / 2) / pixelsPerUnit + viewPos.x,
    y: (point.y - ctx.canvas.height / 2) / pixelsPerUnit + viewPos.y
  };
}

function getGridLines(ctx, viewPos) {
  const topLeft = screenToGrid(ctx, { x: 0, y: 0 }, viewPos);
  const bottomRight = screenToGrid(
    ctx,
    { x: ctx.canvas.width, y: ctx.canvas.height },
    viewPos
  );

  topLeft.x = Math.ceil(topLeft.x);
  topLeft.y = Math.ceil(topLeft.y);
  bottomRight.x = Math.floor(bottomRight.x);
  bottomRight.y = Math.floor(bottomRight.y);

  return [
    gridToScreen(ctx, topLeft, viewPos),
    gridToScreen(ctx, bottomRight, viewPos)
  ];
}

export { normalize, gridToScreen, getPixelsPerUnit, getGridLines };
