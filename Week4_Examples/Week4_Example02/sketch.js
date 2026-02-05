/*
Week 4 — Example 2: Level class (hard-coded grid)

Goal of this example:
- Keep the exact same *visual output* as Example 1 (a drawn maze).
- Change the *structure* of the code so that “a level” becomes a reusable object.

Key teaching idea:
- A class lets you bundle data (the grid) + behavior (draw, size helpers)
  into one thing you can reuse later (especially once you start loading
  multiple levels from JSON).
*/

// ----------------------------
// 1) Global constants
// ----------------------------

// Tile Size (TS) = how many pixels wide/tall each grid cell is.
// If TS=32, then each number in the 2D grid draws as a 32x32 square.
const TS = 32;

// ----------------------------
// 2) Level class definition
// ----------------------------

/*
A Level is responsible for:
- storing the grid (2D array of numbers)
- knowing how big it is (rows/cols and pixel dimensions)
- drawing itself

Important concept:
- The sketch (setup/draw) should not need to know the details
  of how the level draws—just that it can draw.
*/
class Level {
  /*
  The constructor runs when you do: new Level(grid, TS)

  Parameters:
  - grid: a 2D array like grid[row][col]
  - tileSize: TS (pixels per tile)
  */
  constructor(grid, tileSize) {
    this.grid = grid;
    this.ts = tileSize;
  }

  // How many columns are in the grid?
  // (We assume each row has the same number of columns.)
  cols() {
    return this.grid[0].length;
  }

  // How many rows are in the grid?
  rows() {
    return this.grid.length;
  }

  // Pixel width of the level = columns * tileSize
  pixelWidth() {
    return this.cols() * this.ts;
  }

  // Pixel height of the level = rows * tileSize
  pixelHeight() {
    return this.rows() * this.ts;
  }

  /*
  Draw the whole grid.

  Tile legend (same as Example 1):
  - 0 = floor
  - 1 = wall

  This method contains the “nested for loop” logic, so the sketch doesn’t have to.
  Later, you can extend this to:
  - draw special tiles
  - draw decorations
  - expose collision checks (isWall, etc.)
  */
  draw() {
    // Loop over each row...
    for (let r = 0; r < this.rows(); r++) {
      // ...and each column in that row.
      for (let c = 0; c < this.cols(); c++) {
        const tileValue = this.grid[r][c];

        // Choose a colour based on the tile.
        if (tileValue === 1) {
          fill(30, 50, 60); // wall colour (dark teal)
        } else {
          fill(230); // floor colour (light gray)
        }

        // Convert grid coordinates (row/col) into pixel coordinates (x/y).
        // - x goes with column
        // - y goes with row
        const x = c * this.ts;
        const y = r * this.ts;

        // Draw the tile rectangle.
        rect(x, y, this.ts, this.ts);
      }
    }
  }
}

// ----------------------------
// 3) Hard-coded grid data (same as Example 1)
// ----------------------------

/*
This is identical in concept to Example 1: it’s still “the level as a 2D array.”
- We are not introducing new data structures here.
- We’re showing that classes are mainly about organization + reuse.

The grid is structured as:
grid[row][col]

So grid[0] is the first row, grid[0][0] is the top-left cell.
*/
const grid = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]; // based on your Example 1 grid

// ----------------------------
// 4) Sketch state
// ----------------------------

// We’ll store our Level instance here so draw() can access it.
let level;

// ----------------------------
// 5) p5.js lifecycle functions
// ----------------------------

function setup() {
  /*
  Create a Level instance from the grid.

  Think of this like:
  - “Here is some raw data (grid)”
  - “Wrap it in a Level object that knows what to do with it”
  */
  level = new Level(grid, TS);

  // Make the canvas exactly fit the level size.
  // This is a nice practical reason to have pixelWidth/pixelHeight helpers.
  createCanvas(level.pixelWidth(), level.pixelHeight());

  // Setup drawing styles.
  noStroke(); // cleaner tiles (no outlines) [file:11]
  textFont("sans-serif");
  textSize(14);
}

function draw() {
  // Clear the screen each frame.
  background(240);

  // Delegate drawing the maze to the level object.
  // This is the key structural difference from Example 1.
  level.draw();

  // Draw a small label so students can tell examples apart.
  fill(0);
  text("Level class → grid render", 10, 16);
}
