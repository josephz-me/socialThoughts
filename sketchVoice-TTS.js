let siriSpeech;
let utterance;

function preload() {
  siriSpeech = loadSound("sounds/test-audio.wav");
}

var myRec = new p5.SpeechRec("en-US", detectUtterance); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
// myRec.interimResults = true; // allow partial recognition (faster, less accurate)

let calls = [true, true];

function detectUtterance() {
  utterance = myRec.resultString;
  playSpeech("restaurant", 1, 2000);
  playSpeech("yes", 2, 2000);
}

function playSpeech(speechTrigger, callNum, pause) {
  if (utterance.indexOf(speechTrigger) !== -1 && calls[callNum] === true) {
    setTimeout(() => {
      siriSpeech.play();
    }, pause);
    // calls[callNum] = false;
    console.log(calls);
    console.log(utterance);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  windowW = windowWidth;
  myRec.start(); // start engine
}

let translateCount = 0;

function draw() {
  background(0);
  createCanvas(windowW, windowHeight);
}
