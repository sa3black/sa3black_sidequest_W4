/*
Week 4 — Example 5: Blob Platformer (JSON + Classes)
Course: GBDA302
*/

let data;
let levelIndex = 0;

let world;
let player;

function preload() {
  data = loadJSON("levels.json");
}

function setup() {
  player = new BlobPlayer();
  loadLevel(0);

  noStroke();
  textFont("sans-serif");
  textSize(14);
}

function draw() {
  // Draw world
  world.drawWorld();

  // Update + draw player
  player.update(world.platforms);
  player.draw(world.theme.blob);

  // HUD
  fill(0);
  text(world.name, 10, 18);
  text("Move: A/D or ←/→ • Jump: Space/W/↑", 10, 36);

  // -------- AUTO LEVEL PROGRESSION --------
  if (player.pos.x > width - 20) {
    const next = (levelIndex + 1) % data.levels.length;
    loadLevel(next);
  }
}

function keyPressed() {
  if (key === " " || key === "W" || key === "w" || keyCode === UP_ARROW) {
    player.jump();
  }
}

function loadLevel(i) {
  levelIndex = i;
  world = new WorldLevel(data.levels[levelIndex]);

  const W = world.inferWidth(640);
  const H = world.inferHeight(360);
  resizeCanvas(W, H);

  player.spawnFromLevel(world);
}
