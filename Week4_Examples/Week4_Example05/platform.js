class Platform {
  constructor(x, y, w, h, col) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = col || "#999";
  }

  draw() {
    fill(this.col);
    rect(this.x, this.y, this.w, this.h);
  }
}
