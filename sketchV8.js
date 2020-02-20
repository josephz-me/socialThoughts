let font;
let vehicles = [];
let txt = '';
let pts;
let startBehavior = false;
let recentlyDeleted;
let startLength = 200;
let points;
let windowW;
let textW;
let fontSize = 150;

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

// Map to html inputarea textbox
let textarea = document.getElementById("textarea");
textarea.onkeyup = function(e){
	changeHandler(e);
}

function changeHandler(e) {
	//if this new value is not equal to the old value
	if (e.target.value !== txt) {
		txt = e.target.value;
		myInputEvent();
	}
	else {
		return;
	}
}

function myInputEvent(){
	// txt = this.value();
	
	//STEP 2
	windowW = windowWidth;
	textAlign(CENTER);
	points = font.textToPoints(txt, 20, windowHeight/1.5, fontSize);

	// textWidth = dist(points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].x);

	// print('fontSize ' + fontSize);
	// print('textWidth ' + textWidth);
	// print('windowW ' + windowW);

	// type new letter --> add new particles
	if(points.length + 40 > vehicles.length){
		let updatedLength = points.length - vehicles.length; //points need adding
		for ( i = 0; i < updatedLength + 100; i++){
			let vehicle = new Vehicle(points[i].x, points[i].y);
			vehicles.push(vehicle);

			for (k = 0; k < 3; k++){
				let vehicle2 = new Vehicle(random(width), random(height));
				vehicles.push(vehicle2);
			}
		}
	}



	//retrieve last char
	// if(keyCode != BACKSPACE){
	// 	recentlyDeleted = txt.charAt(txt.length-1);
	// }

	for( i = 0; i < points.length; i++){
		vehicles[i].target.x = points[i].x;
		vehicles[i].target.y = points[i].y;
	}

	startBehavior = true; //triggers behavior
}

function setup(){
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
}

let translateCount = 0;

function draw(){
	background(0);

	createCanvas(windowW, windowHeight);
	for ( let j = 0; j < vehicles.length; j++){
		//apply attraction
		if(startBehavior){
			//only apply behavior to certain dots
			if(j < points.length){
				vehicles[j].behaviors();
				// vehicles[j].perlinTarget();
			}
		}
		// print(translateCount);
		vehicles[j].update();
		//show particle/
		vehicles[j].show();
		vehicles[j].hitWalls();
		
	}

	// adapt size of particles
	// if(textWidth > windowW){
	// 	fontSize -= 10;
	// 	// points = font.textToPoints(txt, 20, windowHeight/2, fontSize);
	// 	print(points.length);
	// 	textWidth = dist(points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].x);
	// }
}

