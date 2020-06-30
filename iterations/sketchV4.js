var font;
var vehicles = [];
var txt = '';
var pts;
var enterClicked = false;
var recentlyDeleted;
var addedDots = 0;
var startLength = 300;

function preload(){
	font = loadFont('neueHaus.ttf');
}

function myInputEvent(){
	txt = this.value();
	// print('Current text: ' + txt);
	points = font.textToPoints(txt, 20, windowHeight/2, 300);
	
	var liveLength = points.length; //# of live points
	var updatedLength = liveLength - vehicles.length; // points need adding
	// print(liveLength);
	// print(updatedLength);
	//adds new particles
	if(updatedLength > 0){
		for ( i = 0; i < updatedLength; i++){
			var vehicle = new Vehicle(points[i].x, points[i].y);
			vehicles.push(vehicle);
			// addedDots++;
		}
	}
	
	else if (updatedLength < 0){
		for ( i = 0; i < abs(updatedLength); i++){
			var vehicle = new Vehicle(points[i].x, points[i].y);
			vehicles.splice(vehicle);
			// addedDots++;
		}
	}
	print(vehicles.length);


	//retrieve last char
	if(keyCode != BACKSPACE){
		recentlyDeleted = txt.charAt(txt.length-1);
	}

	// print('Current dot count: ' + vehicles.length);
	for( i = 0; i < vehicles.length; i++){
		vehicles[i].target.x = points[i].x;
		vehicles[i].target.y = points[i].y;
	}

	enterClicked = true; //triggers behavior
}

function setup(){
	createCanvas(displayWidth, displayHeight);
	var points = font.textToPoints(txt, 20, windowHeight / 2, 300); //creates points for text
	// for (var i = 0; i < startLength; i++){
	// 	//make new particle, do it once
	// 	var vehicle = new Vehicle(points[i].x, points[i].y);
	// 	vehicles.push(vehicle);
	// 	// print(vehicles[i].target.x);
	// }
	initialPoints(); 
	//input
	let inp = createInput('');
	inp.addClass('submission');
	inp.input(myInputEvent);
}


function initialPoints(){
	for( i = 0; i < startLength; i++){
		var vehicle = new Vehicle(random(width), random(height));
		vehicles.push(vehicle);
	}
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