let font;
let vehicles = [];
let txt = '';
let pts;
let startBehavior = false;
let recentlyDeleted;
let startLength = 700;
let points;

let fontSize = 300;
let windowW;
let textW;

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


// console.log(document.getElementById("textarea"));
// console.log(document.getElementById("textarea").name);
let textarea = document.getElementById("textarea");
textarea.onkeyup = function(e){
	changeHandler(e);
}

// Map to html inputarea textbox
function changeHandler(e) {
	// console.log(e.target.value);
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
	points = font.textToPoints(txt, 20, windowHeight/2, fontSize);

	textWidth = dist(points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].x);

	// print('fontSize ' + fontSize);
	// print('textWidth ' + textWidth);
	// print('windowW ' + windowW);

	// type new letter --> add new particles
	if(points.length > vehicles.length){
		let updatedLength = points.length - vehicles.length; //points need adding
		for ( i = 0; i < updatedLength; i++){
			let vehicle = new Vehicle(points[i].x, points[i].y);
			vehicles.push(vehicle);
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
	points = font.textToPoints(txt, 20, windowHeight / 1.3, 300);
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
	print(vehicles);
	if(vehicles[vehicles.length-1].pos.x > windowW){
		windowW += 10;
		window.scroll(windowW,0);
		// for( i = 0; vehicles.length - 1; i++){
		// 	vehicles.length + 
		// }
	}

	createCanvas(windowW, windowHeight);
	for ( let j = 0; j < vehicles.length; j++){
		//apply attraction
		if(startBehavior){
			//only apply behavior to certain dots
			if(j < points.length){
				vehicles[j].behaviors();
			}
		}
		// print(translateCount);
		vehicles[j].update();
		//show particle/
		vehicles[j].show();
	}

	//adapt size of particles
	// if(textWidth > windowW){
	// 	fontSize -= 10;
	// 	// points = font.textToPoints(txt, 20, windowHeight/2, fontSize);
	// 	print(points.length);
	// 	textWidth = dist(points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].x);
	// }
}