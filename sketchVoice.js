let font;
let vehicles = [];
let txt = "";
let pts;
let startBehavior = false;
let recentlyDeleted;
let startLength = 200;
let points;
let windowW;
let textW;
let fontSize = 150;
let bg = 255;
let mostrecentword;
let storedWords = [];
let preStored;

function preload() {
  font = loadFont("neueHaus.ttf");
}

// STEP 1
function initialPoints() {
  for (i = 0; i < startLength; i++) {
    let vehicle = new Vehicle(random(width), random(height));
    vehicles.push(vehicle);
  }
}

var myRec = new p5.SpeechRec("en-US", parseResult); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // allow partial recognition (faster, less accurate)

function parseResult() {
  mostrecentword = myRec.resultString.substring(0, 19);
  storedWords.push(mostrecentword.split(" "));

  if (mostrecentword.indexOf("erase") !== -1) {
    mostrecentword = "";
  }

  // var mostrecentword = myRec.resultString.split(' ').pop();
  startBehavior = true;
  // if(mostrecentword.indexOf("clear")!==-1) { background(255); }
  txt = mostrecentword;
  myInputEvent();
}

function myInputEvent() {
  // txt = this.value();

  //STEP 2
  windowW = windowWidth;
  textAlign(CENTER);
  if (mostrecentword.length - 1 > 12) {
    points = font.textToPoints(txt + "...", 30, windowHeight / 1.5, fontSize);
  } else {
    points = font.textToPoints(txt, 30, windowHeight / 1.5, fontSize);
  }

  // textWidth = dist(points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].x);

  // print('fontSize ' + fontSize);
  // print('textWidth ' + textWidth);
  // print('windowW ' + windowW);

  // type new letter --> add new particles
  let extraParticles = vehicles.length - points.length;

  if (points.length + 40 > vehicles.length) {
    let updatedLength = points.length - vehicles.length; //points need adding
    for (i = 0; i < updatedLength + 100; i++) {
      let vehicle = new Vehicle(points[i].x, points[i].y);
      vehicles.push(vehicle);

      for (k = 0; k < 3; k++) {
        let vehicle2 = new Vehicle(random(width), random(height));
        vehicles.push(vehicle2);
      }
    }
  } else {
    for (i = vehicles.length - extraParticles; i < vehicles.length - 1; i++) {
      vehicles[i].vel = p5.Vector.random2D();
      vehicles[i].fadeParticle();
    }
  }

  //retrieve last char
  // if(keyCode != BACKSPACE){
  // 	recentlyDeleted = txt.charAt(txt.length-1);
  // }

  for (i = 0; i < points.length; i++) {
    vehicles[i].target.x = points[i].x;
    vehicles[i].target.y = points[i].y;
  }

  startBehavior = true; //triggers behavior
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  points = font.textToPoints(txt, 20, windowHeight, fontSize);
  windowW = windowWidth;
  // for (let i = 0; i < startLength; i++){
  // 	//make new particle, do it once
  // 	let vehicle = new Vehicle(points[i].x, points[i].y);
  // 	vehicles.push(vehicle);
  // 	// print(vehicles[i].target.x);
  // }
  initialPoints();

  //input
  // let inp = createInput('');
  // inp.addClass('submission');
  // inp.input(myInputEvent);
  myRec.start(); // start engine
}

let translateCount = 0;

function draw() {
  background(0);
  createCanvas(windowW, windowHeight);
  for (let j = 0; j < vehicles.length; j++) {
    //apply attraction
    if (startBehavior) {
      //only apply behavior to certain dots
      if (j < points.length) {
        vehicles[j].behaviors();
        // vehicles[j].perlinTarget();
      }
    }
    // print(translateCount);
    vehicles[j].update();
    //show particle/
    vehicles[j].show();
    vehicles[j].hitWalls();
    // capParticles();
  }
  // adapt size of particles
  // if(textWidth > windowW){
  // 	fontSize -= 10;
  // 	// points = font.textToPoints(txt, 20, windowHeight/2, fontSize);
  // 	print(points.length);
  // 	textWidth = dist(points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].x);
  // }
}

// function capParticles(){
// 	if(vehicles.length > 1200){
// 		vehicles.pop();
// 	}
// }
