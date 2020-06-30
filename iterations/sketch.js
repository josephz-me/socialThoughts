// var blobs = [];
// var count = 50;

var particles =[];
var attractors = [];
var font;
var vehicles = [];

function preload(){
	font = loadFont('neueHaus.ttf');
}

function setup(){
	createCanvas(displayWidth, displayHeight);
	// particle = new Particle(100,100);
	// attractor = createVector(200,200);
	// for ( i = 0; i < 50; i++) {
	// 	blobs.push(createBlob());
	// }
}

function mousePressed(){
	attractors.push(createVector(mouseX, mouseY));
}

function keyPressed(){
	for ( i = 0; i < 5; i++){
		particles.push(new Particle(random(width), random(height)));
	}
}

function draw(){

	background(0);

	// building out text
	// textFont(font);
	// textSize(128);
	// fill(255);
	// text('train', windowWidth/3, windowHeight/2);

	var points = font.textToPoints('train', windowWidth/3, windowHeight/2, 300);
	for (var i = 0; i < points.length; i++){
		var pt = points[i];
		var vehicle = new Vehicle(pt.x, pt.y);
		vehicles.push(vehicle);
	}

	stroke(0);
	fill(255,255,255,100);
	ellipse(mouseX + 2,mouseY + 5, 50,50);
	stroke(255);
	strokeWeight(4);
	
	// put max cap on # of dots
	if(particles.length > 200){
		particles.splice(0, 1);
	}

	for(var i = 0; i < attractors.length; i++){
		stroke(0, 255, 0);
		point(attractors[i].x, attractors[i].y);
	}

	
	var att = createVector(mouseX,mouseY);
	for (var i = 0; i < particles.length; i++){
		var particle = particles[i];
		// if((mouseX > 0 && mouseX < width) && (mouseY > 0 && mouseY < height)){
			particle.attracted(att);
		// }
		for (var j = 0; j < attractors.length; j++) {
			particle.attracted(attractors[j]);
		  }
	
		particle.update();
		particle.show();
	}	

	// for ( j = 0; j < blobs.length; j++){
	// 	blobs[j].drawBlob();
	// 	blobs[j].moveBlob();
	// }
}

//creates the blobObject
// function createBlob(){
// 	var blobObj = {
// 		w: random(10,10),
// 		xPos: random(40,displayWidth - 40),
// 		yPos: random(40,displayHeight - 40),
// 		velX: random(-10,10),
// 		velY: random(-10,10),
// 		drawBlob: function(){
// 			fill('white');
// 			ellipse(this.xPos, this.yPos, this.w, this.w);
// 		},
// 		moveBlob: function(){
// 			this.xPos += this.velX;
// 			this.yPos += this.velY;

// 			//walls
// 			if(this.xPos < 0 || this.xPos > width - 30){
// 				this.velX = -this.velX;
// 			}
// 			if(this.yPos < 0 || this.yPos > height){
// 				this.velY = -this.velY;
// 			}
// 		}
// 	}
// 	return blobObj;
// }