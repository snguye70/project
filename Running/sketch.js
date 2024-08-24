// Global constants for canvas layout
const CANVAS = {
  WIDTH: 2000,
  HEIGHT: 800,
  MARGIN: 100,
  GRAPH_HEIGHT: 100,
  X_MAX: 2000 - 100,
  X_MIN: 100,
  DISPLAY_WIDTH: 2000 - 100 - 100
};

// Journal entry modal
const GRAPH = {
  Y_MIN: 800 - (100 + 100),
  Y_MAX: 800 - 100
};

// Data map mdoal
const MAP = {
  Y_MAX: 800 - (100 + 100 * 2),
  Y_MIN: 100,
  HEIGHT: 800 - (100 + 100 * 2) - 100
};

const COLORS = {
  BG: '#ffffff',
  TEXT: '#000000'
};

// Tooltip
const TOOLTIP = {
  TEXT_SIZE: 12,
  IMAGE_WIDTH: 600,
  IMAGE_HEIGHT: 400
};

// Global variables
let table;
let previousMap = { x: CANVAS.X_MAX, y: MAP.Y_MAX };
let previousGraphX = CANVAS.X_MAX;

let currentPage = "login";
let usernameInput, passwordInput, loginButton;

// Images for tooltip lookup table
let images = {};

// Load images and setup lookup table
function preload() {
  table = loadTable("Strava Data.csv", "csv", "header");

  images = {
      "Bay Bridge Trail": loadImage("assets/BayBridge.jpg"),
      "Alameda Bayfarm": loadImage("assets/Alameda.jpg"),
      "Kaiser 10k, SF Golden Gate Park": loadImage("assets/GoldenGate.jpg"),
      "Oakland Running Festival 2022 | Half Marathon 😱🎉🦆": loadImage("assets/OaklandRun.jpg"),
      "Big Sur": loadImage("assets/BigSur.jpg"),
      "Lake Twenty Two ✌️": loadImage("assets/Lake22.jpg"),
      "Gasworks Park": loadImage("assets/Gasworks.jpg"),
      "San Leandro Marina Park, Bay Trail (12 mi)": loadImage("assets/SanLeandro.jpg"),
      "Public shore bay trail": loadImage("assets/Marina.jpg"),
      "Donut run 🍩": loadImage("assets/Lakemerrit.jpg"),
      "Alameda Creek trail in Fremont (6mi)": loadImage("assets/Fremont.jpg"),
      "NYE Bay Bridge ☔️🌧️": loadImage("assets/rainy.jpg"),
      "Morning Walk": loadImage("assets/Concord.jpg"),
      "Evening Run": loadImage("assets/beach.jpg")
  };
}

function setup() {
  createCanvas(CANVAS.WIDTH, CANVAS.HEIGHT);
  textFont('Inter');

  usernameInput = createInput();
  usernameInput.position(CANVAS.WIDTH / 2 - 100, CANVAS.HEIGHT / 2 - 80);
  usernameInput.size(200);
  usernameInput.attribute('placeholder', 'Username');

  passwordInput = createInput('', 'password');
  passwordInput.position(CANVAS.WIDTH / 2 - 100, CANVAS.HEIGHT / 2 - 20);
  passwordInput.size(200);
  passwordInput.attribute('placeholder', 'Password');

  loginButton = createButton('Login');
  loginButton.position(CANVAS.WIDTH / 2 - 40, CANVAS.HEIGHT / 2 + 30);
  loginButton.mousePressed(handleLogin);
}

// Create canvas for login elements
function draw() {
  background(COLORS.BG);

  if (currentPage === "login") {
      drawLoginPage();
  } else if (currentPage === "main") {
      drawMainPage();
  }
}

// Login form displayed here
function drawLoginPage() {
}

function handleLogin() {
  const username = usernameInput.value();
  const password = passwordInput.value();

// Example account
  if (username === "hello" && password === "world") {
      currentPage = "main";
      usernameInput.hide();
      passwordInput.hide();
      loginButton.hide();
  } else {
      alert("Incorrect username or password. Please try again.");
  }
}

// Main page for data visualization
function drawMainPage() {
  frameRate(2);
  console.log(`Loaded table with ${table.getRowCount()} rows`);

  noStroke();
  fill('#F7F7F7');
  rect(CANVAS.X_MIN, MAP.Y_MIN, CANVAS.DISPLAY_WIDTH, MAP.HEIGHT);

  drawYAxis();
  drawXAxis();

  const index = frameCount % table.getRowCount();

  table.getRows().forEach((r, i) => {
      const mapX = map(i, 0, table.getRowCount(), CANVAS.X_MIN, CANVAS.X_MAX);
      const mapY = map(r.getNum("Distance (Mi)"), 0, max(float(table.getColumn("Distance (Mi)"))), MAP.Y_MAX, MAP.Y_MIN);
      const graphX = map(i, 0, table.getRowCount(), CANVAS.X_MIN, CANVAS.X_MAX);

      drawMapLine(i, mapX, mapY);
      drawTracePoints(i, index, mapX, mapY);
      updateJournalEntry(i, index, r, graphX);

      previousMap.x = mapX;
      previousMap.y = mapY;
      previousGraphX = graphX;
  });
}

// Draw map indicator line
function drawMapLine(i, mapX, mapY) {
  if (i < table.getRowCount() - 1) {
      noFill();
      stroke(COLORS.TEXT);
      line(previousMap.x, previousMap.y, mapX, mapY);
  }
}

// Show staggering trace points
function drawTracePoints(i, index, mapX, mapY) {
  const TRACE_COUNT = 50;
  if (i > index - TRACE_COUNT && i <= index) {
      noStroke();
      fill(COLORS.TEXT);
      circle(mapX, mapY, 5);
  }
}

// Visual style of journal entry modal
function updateJournalEntry(i, index, row, graphX) {
  if (i === index) {
      noStroke();
      fill('#F7F7F7');
      rect(CANVAS.X_MIN, GRAPH.Y_MIN, CANVAS.DISPLAY_WIDTH, CANVAS.GRAPH_HEIGHT);

      fill(COLORS.TEXT);
      textSize(18);
      text(row.getString("Journal Entry"), CANVAS.X_MIN + 100, GRAPH.Y_MIN + 20, CANVAS.DISPLAY_WIDTH, GRAPH.Y_MAX - GRAPH.Y_MIN);

      textSize(50);
      text(row.getString("Emotion"), graphX, MAP.Y_MIN + 50);

      stroke('#000000');
      line(graphX, GRAPH.Y_MIN, graphX, MAP.Y_MIN);

      displayTooltip(row, graphX + 60, MAP.Y_MIN + 25);
  }
}

// Label y axis as distance
function drawYAxis() {
  stroke(COLORS.TEXT);
  line(CANVAS.X_MIN, MAP.Y_MIN, CANVAS.X_MIN, MAP.Y_MAX);

  fill(COLORS.TEXT);
  textSize(14);
  textAlign(RIGHT, CENTER);

  const DISTANCES = [0, 5, 10, 15, 20];
  DISTANCES.forEach(distance => {
      const y = map(distance, 0, 20, MAP.Y_MAX, MAP.Y_MIN);
      text(`${distance} mi`, CANVAS.X_MIN - 10, y);
  });
}

// Label x axis as activity date
function drawXAxis() {
  stroke(COLORS.TEXT);
  line(CANVAS.X_MIN, MAP.Y_MAX, CANVAS.X_MAX, MAP.Y_MAX);

  fill(COLORS.TEXT);
  textSize(14);
  textAlign(CENTER, TOP);

  table.getRows().forEach((row, i) => {
      if (i % 5 === 0) {
          const date = row.getString("Activity Date");
          const x = map(i, 0, table.getRowCount(), CANVAS.X_MIN, CANVAS.X_MAX);
          text(date, x, MAP.Y_MAX + 5);
      }
  });
}

// Label metadata within tooltip
function displayTooltip(row, x, y) {
  fill(COLORS.TEXT);
  textSize(TOOLTIP.TEXT_SIZE);
  textAlign(LEFT, TOP);

  text(`Activity Name: ${row.getString("Activity Name")}`, x, y);
  text(`Medication Use: ${row.getString("Medication Use")}`, x, y + 15);
  text(`Difficulty: ${row.getString("Difficulty")}`, x, y + 30);
  text(`Average Speed: ${row.getString("Average Speed")} mph`, x, y + 45);
  text(`Milestone: ${row.getString("Milestone")}`, x, y + 60);

  // Show image with activity name in dataset
  const activityName = row.getString("Activity Name");
  const imageToShow = images[activityName] || null;

  //Image scale
  if (imageToShow) {
      image(imageToShow, x, y + 75, TOOLTIP.IMAGE_WIDTH, TOOLTIP.IMAGE_HEIGHT);
  }
}
