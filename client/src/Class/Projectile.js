class Projectile {
  constructor(_id, _pos, _size, _type, _state) {
    this.id = _id;
    this.pos = _pos;
    this.size = _size;
    this.type = _type;
  }

  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}
