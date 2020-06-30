var font;
var vehicles = [];
var txt = 'brain';
var pts;
var enterClicked = false;
var recentlyDeleted;
var addedDots = 0;

function preload(){
	font = loadFont('neueHaus.ttf');
}

function myInputEvent(){
	txt = this.value();
	// print('Current text: ' + txt);
	points = font.textToPoints(txt, 20, windowHeight/2, 300);

	var newLength = points.length;
	var updatedLength = newLength - vehicles.length;

	//adds new particles
	for ( i = 0; i < updatedLength; i++){
		var vehicle = new Vehicle(points[i].x, points[i].y);
		vehicles.push(vehicle);
		// addedDots++;
	}
	// print(addedDots);

	//retrieve last char
	if(keyCode != BACKSPACE){
		recentlyDeleted = txt.charAt(txt.length-1);
	}
	print(recentlyDeleted);

	// print('Current dot count: ' + vehicles.length);
	for( i = 0; i < vehicles.length; i++){
		vehicles[i].target.x = points[i].x;
		vehicles[i].target.y = points[i].y;
	}

	enterClicked = true; //triggers behavior

	// if(keyCode == BACKSPACE){
	// 	for( i = 0; i < vehicles.length; i++){
	// 		vehicles[i].target.x = null;
	// 		vehicles[i].target.y = null;
	// 	}
	// }
}

function setup(){
	createCanvas(displayWidth, displayHeight);
	var points = font.textToPoints(txt, 20, windowHeight / 2, 300);
	// print(points);
	// var maxLength = points.length;
	var maxLength = 200;
	for (var i = 0; i < maxLength; i++){
		//make new particle, do it once
		// var vehicle = new Vehicle(points[i].x, points[i].y);
		var vehicle = new Vehicle(points[i].x, points[i].y);
		vehicles.push(vehicle);
		// print(vehicles[i].target.x);
	}

	//input
	let inp = createInput('');
	inp.addClass('submission');
	inp.input(myInputEvent);
}

function draw(){
	background(0);

	for ( var j = 0; j < vehicles.length; j++){
		var v = vehicles[j];
		//apply attraction
		if(enterClicked){
			v.behaviors();
		}
		//moves particle
		v.update();
		//show particle/
		v.show();
	}
}

// function mousePressed(){
// 	txt = 'bean';
// 	points = font.textToPoints(txt, 20, windowHeight/2, 300);

// 	print('new texts length: ' + points.length);
// 	var newLength = points.length;
// 	var updatedLength = newLength - vehicles.length;
// 	print('Dots needed: ' + updatedLength);

// 	for ( i = 0; i < updatedLength; i++){
// 		var vehicle = new Vehicle(points[i].x, points[i].y);
// 		vehicles.push(vehicle);
// 	}
// 	print(vehicles.length);
	
// 	for( i = 0; i < vehicles.length; i++){
// 		vehicles[i].target.x = points[i].x;
// 		vehicles[i].target.y = points[i].y;
// 	}
// }