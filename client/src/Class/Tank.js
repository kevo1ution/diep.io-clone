import { gridToScreen } from "./Util";

class Tank {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.priority = 0;
  }

  draw(ctx, viewPos, pixelsPerUnit) {
    const point = gridToScreen(ctx, viewPos, { x: this.x, y: this.y });

    ctx.beginPath();
    ctx.fillStyle = 'rgb(0, 255, 255)'
    ctx.arc(point.x, point.y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}

export default Tank;
