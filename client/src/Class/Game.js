import Player, { plrStateEnum } from "./Player";
import config from "../Constants/config.json";
import Grid from "./Grid";
import Controller from "./Controller";
import { normalize, getPixelsPerUnit } from "./Util";
class Game {
  constructor(_entities) {
    this.entities = _entities;
    this.ctx = null;
    this.grid = new Grid();

    this.mainPlayer = new Player(
      0,
      plrStateEnum.idle,
      "kevo1ution",
      "kevo1ution"
    );
    this.entities.push(this.mainPlayer);
  }

  init(_ctx) {
    this.ctx = _ctx;

    //begin the gameLoop
    this.mainPlayer.spawn();
    this.gameLoop();

    const updateTime = 30;
    setInterval(() => {
      const speed = 5 * updateTime / 1000; //0.2 units per second
      const norm = normalize({
        x: Controller.mousePos.x - this.ctx.canvas.width / 2,
        y: Controller.mousePos.y - this.ctx.canvas.height / 2
      });

      const vel = { x: norm.x * speed, y: norm.y * speed };

      this.mainPlayer.character.x += vel.x;
      this.mainPlayer.character.y += vel.y;
    }, updateTime);
  }

  gameLoop() {
    this.render();

    //call render every 60th of a second
    window.requestAnimationFrame(() => {
      this.gameLoop();
    });
  }

  render() {
    const pixelsPerUnit = getPixelsPerUnit(this.ctx)
    //clear everything
    this.ctx.fillStyle = "rgb(100, 100, 100)";
    this.ctx.rect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fill();

    //calculate view based on position
    var viewPos;
    if (this.mainPlayer.character) {
      viewPos = {
        x: this.mainPlayer.character.x,
        y: this.mainPlayer.character.y
      };
    } else {
      viewPos = {
        x: 0,
        y: 0
      };
    }

    //draw grid
    this.grid.draw(this.ctx, viewPos, pixelsPerUnit);

    //sort entities
    this.entities.sort((entityA, entityB) => {
      return entityA.priority - entityB.priority;
    });

    this.entities.forEach(entity => {
      entity.draw(this.ctx, viewPos, pixelsPerUnit);
    });
  }
}

export default Game;
