var font;
var vehicles = [];
var txt = 'brain';
var pts;
var enterClicked = false;

function preload(){
	font = loadFont('neueHaus.ttf');
}

function myInputEvent(){
	txt = this.value();
	points = font.textToPoints(txt, 20, windowHeight/2, 300);

	var newLength = points.length;
	print(newLength);
	var updatedLength = newLength - vehicles.length;

	//adds new particles
	for ( i = 0; i < updatedLength; i++){
		var vehicle = new Vehicle(points[i].x, points[i].y);
		vehicles.push(vehicle);
	}

	//retrieve last char
	var deletedChar = txt.charAt(txt.length-1);;
	var lastChar = txt.charAt(txt.length-1);
	print('last char:' + lastChar);


	// for ( i = 0; i < 

	enterClicked = true;

	for( i = 0; i < vehicles.length; i++){
		vehicles[i].target.x = points[i].x;
		vehicles[i].target.y = points[i].y;
	}

	// if(keyCode === BACKSPACE){
	// 	enterClicked = false;
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