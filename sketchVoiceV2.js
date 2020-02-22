let font;
let vehicles = [];
let txt = '';
let pts;
let startBehavior = false;
let recentlyDeleted;
let startLength = 700;
let points;
let windowW;
let textW;
let fontSize = 150;
let bg = 255;
let mostrecentword;
let storedWords = [];
let preStored;

function preload(){
	font = loadFont('neueHaus.ttf');
}

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

function parseResult()
{
	mostrecentword = myRec.resultString.substring(0,19);
	storedWords.push(mostrecentword.split(' '));

	// VOICE COMMANDS
	if(mostrecentword.indexOf('erase')!==-1) { mostrecentword = ''; } 
	// ZOOM out
	if(mostrecentword.indexOf('social') !== -1) {
		if(zoomOutCount < 2) {
			scaleOut = true; 
			zoomOutCount++;
			zoomInCount--;
		}

	} 
	if(mostrecentword.indexOf('personal') !== -1) {
		if(zoomInCount < 2){
			scaleIn = true;
			zoomInCount++;
			zoomOutCount--;
		}

		if(zoomOutCount > -1) {zoomOutCount++;}
	} 

	txt = mostrecentword;
	startBehavior = true;

	print(mostrecentword);
	myInputEvent();
}

function myInputEvent(){

	windowW = windowWidth;
	textAlign(CENTER);
	if(mostrecentword.length - 1 > 12){
		points = font.textToPoints(txt + '...', -400, 30, fontSize);
	}
	else{
		points = font.textToPoints(txt, -400 , 30, fontSize);
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

	for( i = 0; i < points.length; i++){
		vehicles[i].target.x = points[i].x;
		vehicles[i].target.y = points[i].y;
	}

	startBehavior = true; //triggers behavior
}


let scaleOut = false;
let scaleIn = false;

function setup(){
	createCanvas(windowWidth, windowHeight);
	points = font.textToPoints(txt, 0, 0, fontSize);
	windowW = windowWidth;
	initialPoints(); 
	myRec.start(); // start engine
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
	if(scaleOut){
		if(sf < PI / 2){
			scl = scl - map((sin(sf - PI / 2) + 1), 0, 2, 0, .02);
			sf += .02;
		}
		else{
			scaleOut = false;
			sf = 0;
		}
	}

	if(scaleIn){
		if( sf < PI / 2){
			scl = scl + map((sin(sf - PI / 2) + 1), 0, 2, 0, .02);
			sf += .02;
		}
		else{
			scaleIn = false;
			sf = 0;
		}
	}
}