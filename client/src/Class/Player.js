import Tank from "./Tank";

const plrStateEnum = Object.freeze({
  idle: 1,
  inGame: 2,
  dead: 3
});

class Player {
  constructor(_id, _state, _username, _nickname, _mouseDir) {
    this.id = _id;
    this.state = _state;
    this.username = _username;
    this.nickname = _nickname;
    this.priority = 0;
    this.character = null;
    this.mouseDir = _mouseDir;
  }

  spawn(){
    //create a character for the main player
    if(this.state === plrStateEnum.idle || this.state === plrStateEnum.dead){
      this.character = new Tank()
    }
  }

  draw(ctx, viewPos, pixelsPerUnit) {
    if (this.character) {
      this.character.draw(ctx, viewPos, pixelsPerUnit);
    }
  }
}

export default Player;
export { plrStateEnum };
