class Controller {
  constructor(){
    if(!Controller.instance){
      Controller.instance = this;
    }

    this.mousePos = {x: 0, y: 0}

    return Controller.instance;
  }

  setMousePos(pos){
    this.mousePos.x = pos.x;
    this.mousePos.y = pos.y;
  }
}

const instance = new Controller();
Object.freeze(Controller);

export default instance;