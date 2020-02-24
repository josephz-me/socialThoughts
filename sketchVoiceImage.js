let font;
let vehicles = [];
let txt = '';
let pts;
let startBehavior = false;
let recentlyDeleted;
let startLength = 700;
let points = [];
let windowW;
let textW;
let fontSize = 150;
let bg = 255;
let mostrecentword;
let storedWords = [];
let preStored;
let drawingCounter = 0;
let isText = true;

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

// STEP 1
function initialPoints(){
	for( i = 0; i < startLength; i++){
		let vehicle = new Vehicle(random(width), random(height));
		vehicles.push(vehicle);
	}
}

var myRec = new p5.SpeechRec('en-US', parseResult); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // allow partial recognition (faster, less accurate)

async function parseResult()
{
	await wait(300);
	if(myRec.resultString.indexOf('erase')!==-1) {
		mostrecentword = ''; 
		txt = mostrecentword;
		startBehavior = true;
		myInputEvent();
	}

	if(myRec.resultString.indexOf('flower')!==-1) {
		for(r = 0; r < img.width; r++){
			for( c = 0; c < img.height; c++){
				if(brightness(img.get(r,c)) < 20){
					let newDot = {
						x: r - width / 2,
						y: c - height / 2, 
					}
					points.push(newDot);
					drawingCounter++;
				}
			}
		}
		print(drawingCounter);


		mostrecentword = ''; 
		txt = mostrecentword;
		startBehavior = true;
		isText = false;
		myInputEvent();
	}


	
	if(myRec.resultString.indexOf('type') === 0) {
		// mostrecentword = myRec.resultString.substring(0,19);
		mostrecentword = myRec.resultString.slice(myRec.resultString.indexOf('type') + 5, myRec.resultString.length);
		storedWords.push(mostrecentword.split(' '));

		// VOICE COMMANDS
		if(mostrecentword.indexOf('erase')!==-1) { mostrecentword = ''; } 
		// ZOOM out
		if(mostrecentword.includes('social')) {
			if(zoomOutCount < 2) {
				scaleOut = true; 
				zoomOutCount++;
				zoomInCount--;
			}
		}

		if(mostrecentword.includes('personal')) {
			
			if(zoomInCount < 2){
				scaleIn = true;
				zoomInCount++;
				zoomOutCount--;
			}

			if(zoomOutCount > -1) {zoomOutCount++;}
		} 

		txt = mostrecentword;
		startBehavior = true;
		myInputEvent();
	}
	print(myRec.resultString);
	
}

function myInputEvent(){
	windowW = windowWidth;
	textAlign(CENTER);

	// creates text particles *if statement
	if(isText){
		if(mostrecentword.length - 1 > 12){
			points = font.textToPoints(txt + '...', -400, 30, fontSize);
		}
		else{
			points = font.textToPoints(txt, -400 , 30, fontSize);
		}
	}

	// type new letter --> add new particles
	let extraParticles = vehicles.length - points.length;

	if(points.length + 40 > vehicles.length){
		let updatedLength = points.length - vehicles.length; //points need adding
		for ( i = 0; i < updatedLength + 300; i++){
			let vehicle = new Vehicle(points[i].x, points[i].y);
			vehicles.push(vehicle);

			for (k = 0; k < 3; k++){
				let vehicle2 = new Vehicle(random(width), random(height));
				vehicles.push(vehicle2);
			}
		}
	}
	else{
		for(i = (vehicles.length - extraParticles); i < vehicles.length -1 ; i++){
			vehicles[i].vel = p5.Vector.random2D();
			vehicles[i].fadeParticle();
		}
	}

	makeTarget();
	startBehavior = true; //triggers behavior
	isText = true;
}

function makeTarget(){
	for( i = 0; i < points.length; i++){
		vehicles[i].target.x = points[i].x;
		vehicles[i].target.y = points[i].y;
	}
}


let scaleOut = false;
let scaleIn = false;
let img;

function preload(){
	font = loadFont('neueHaus.ttf');
	img = loadImage('testImage.jpg');
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	points = font.textToPoints(txt, 0, 0, fontSize);
	windowW = windowWidth;
	initialPoints(); 
	myRec.start(); // start engine

	img.loadPixels();
	// imageMode(CENTER);
	image(img, 0, 0);
}

function draw(){
	background(0);
	translate(width / 2, height / 2);


	zoomScale();

	for ( let j = 0; j < vehicles.length; j++){
		//apply attraction
		if(startBehavior){
			//only apply behavior to certain dots
			if(j < points.length){
				vehicles[j].behaviors();
			}
		}
		
		vehicles[j].update();
		vehicles[j].show();
		vehicles[j].hitWalls();
	}	
}

// ZOOM IN AND OUT
let scl = 1;
let sf = 0;
let zoomInCount = 0;
let zoomOutCount = 0;

function zoomScale(){
	scale(scl);
	let sigmoid = Math.pow(Math.E, 5 * sf - 5) / (Math.pow(Math.E, 5 * sf - 5) + 1);
	if(scaleOut){
		if(sf < 2.5){
			scl = scl - map(sigmoid, 0, 1, 0, .01);
			sf += .04;
		}
		else{
			scaleOut = false;
			sf = 0;
		}
	}

	if(scaleIn){
		if( sf < PI){
			scl = scl + map(sigmoid, 0, 1, 0, .01);
			sf += .04;
		}
		else{
			scaleIn = false;
			sf = 0;
		}
	}
}