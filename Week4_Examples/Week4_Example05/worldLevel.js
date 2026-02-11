class WorldLevel {
  constructor(data) {
    this.name = data.name;
    this.gravity = data.gravity;
    this.jumpV = data.jumpV;
    this.theme = data.theme;
    this.start = data.start;

    this.platforms = [];

    const rows = data.platformRows;

    // ---- Ground tiles (loop-generated) ----
    const g = rows.ground;
    for (let i = 0; i < g.count; i++) {
      this.platforms.push(
        new Platform(
          i * g.tileWidth,
          g.y,
          g.tileWidth,
          g.tileHeight,
          this.theme.platform,
        ),
      );
    }

    // ---- Step platforms (nested loops) ----
    for (let step of rows.steps) {
      for (let i = 0; i < step.count; i++) {
        this.platforms.push(
          new Platform(step.x + i * 40, step.y, 40, 12, this.theme.platform),
        );
      }
    }
  }

  drawWorld() {
    background(this.theme.bg);
    for (let p of this.platforms) {
      p.draw();
    }
  }

  inferWidth(defaultW) {
    return defaultW;
  }

  inferHeight(defaultH) {
    return defaultH;
  }
}
