import config from "../Constants/config.json";
import { gridToScreen, getGridLines } from "./Util";

class Grid {
  draw(ctx, viewPos, pixelsPerUnit) {
    console.log(pixelsPerUnit)
    const gridSizeInUnits = config.gridSizeInUnits;

    // calculate location of four corner location and map to pixels on screen
    const corners = [
      { x: 0, y: 0 },
      { x: config.gridSizeInUnits, y: 0 },
      { x: 0, y: config.gridSizeInUnits },
      { x: config.gridSizeInUnits, y: config.gridSizeInUnits }
    ];

    corners.forEach((point, i) => {
      corners[i] = gridToScreen(ctx, point, viewPos);
    });

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(
      corners[0].x,
      corners[0].y,
      corners[3].x - corners[0].x,
      corners[3].y - corners[0].y
    );

    //draw grid lines
    ctx.strokeStyle = "rgb(150, 150, 150)";

    const [topLeft, bottomRight] = getGridLines(ctx, viewPos)

    //vertical lines
    for(var xPixel = topLeft.x; xPixel < ctx.canvas.width; xPixel += pixelsPerUnit){
      var roundedX = Math.round(xPixel);
      ctx.beginPath();
      ctx.moveTo(xPixel, 0);
      ctx.lineTo(xPixel, ctx.canvas.height);
      ctx.stroke();
    }
    
    //horizontal lines
    for(var yPixel = topLeft.y; yPixel < ctx.canvas.height; yPixel += pixelsPerUnit){
      var roundedX = Math.round(yPixel);
      ctx.beginPath();
      ctx.moveTo(0, yPixel);
      ctx.lineTo(ctx.canvas.width, yPixel);
      ctx.stroke();
    }    
  }
}

export default Grid;
