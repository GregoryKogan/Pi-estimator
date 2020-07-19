let block1;
let block2;
let clack;

let StartSimulationButton;
let DigitSlider;
let simulation = false;
let m1 = 0;
let m2 = 0;

let count = 0;
let digits = 7;
let countDiv;
let timeSteps = 10 ** (digits - 1);

function preload() {
  clack = loadSound('clack.wav');
}

function setup() {
  StartSimulationButton = createButton("Start simulation");
  StartSimulationButton.size(200, 30);
  StartSimulationButton.position(windowWidth / 2 - 75, 30);
  StartSimulationButton.style('font-size', '20px');
  let bg_color = color(18)
  StartSimulationButton.style('background-color', bg_color);
  StartSimulationButton.style('color', 'white');
  StartSimulationButton.mousePressed(StartSimulation)
  DigitSlider = createSlider(1, 7, 7, 1)
  DigitSlider.position(windowWidth / 2 + 150, 35)
  DigitSlider.style("width", "120px");
  createCanvas(windowWidth - 5, windowHeight - 5);
}

function StartSimulation(){
  simulation = true
  digits = DigitSlider.value()
  count = 0;
  timeSteps = 10 ** (digits - 1);
  block1 = new Block(100, 20, 1, 0, 0);
  const M2 = pow(100, digits - 1);
  block2 = new Block(300, 100, M2, -1 / timeSteps, 20);
  m1 = 100;
  m2 = M2 * 100;
}

function draw() {
  background(18);

  if (simulation){
    let clackSound = false;

    for (let i = 0; i < timeSteps; i++) {
      if (block1.collide(block2)) {
        const v1 = block1.bounce(block2);
        const v2 = block2.bounce(block1);
        block1.v = v1;
        block2.v = v2;
        clackSound = true;
        count++;
      }

      if (block1.hitWall()) {
        block1.reverse();
        clackSound = true;
        count++;
      }

      block1.update();
      block2.update();
    }

    if (clackSound) {
      clack.play();
    }
    block1.show();
    block2.show();
  }

  push();
  fill(255);
  textAlign(LEFT);
  textSize(30);
  text(count + " Collisions", 10, 50);
  textSize(28);
  text("3.141592 - Pi", 10, 90);
  text("m = " + m1, 20, windowHeight - 100);
  text("M = " + m2, 20, windowHeight - 70);
  textSize(22)
  text("Calculate " + DigitSlider.value() + " digits of Pi", windowWidth / 2 + 280, 50);
  stroke(246, 202, 9);
  strokeWeight(2);
  line(0, windowHeight - 301, windowWidth, windowHeight - 301);
  pop();
}
