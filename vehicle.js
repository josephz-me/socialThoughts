// Particle Properties
// Big thanks to Dan Shiffman's Physics engine model
function Vehicle(x, y){
	this.vel = p5.Vector.random2D();
	this.acc = createVector();
	this.r = 8;
	this.maxspeed = 20;
	this.maxforce = 1;
	this.target = createVector(x,y);
	this.pos = createVector(random(-width, width),random(-height, height));
	this.alpha = 0;
}

Vehicle.prototype.fadeParticle = function(){
	this.alpha = 150;
}

Vehicle.prototype.hitWalls = function(){
	if(this.pos.x > width + 30 || this.pos.x < -width - 30){
		this.vel.x = -(this.vel.x);
	}

	else if(this.pos.y > height + 30 || this.pos.y < - height - 30){
		this.vel.y = -(this.vel.y);
	}
}

Vehicle.prototype.behaviors = function(){
	if( this.alpha < 255){
		this.alpha += 1;
	}
	var arrive = this.arrive(this.target);
	this.applyForce(arrive);
}

Vehicle.prototype.update = function() {
	this.pos.add(this.vel);	
	this.vel.add(this.acc);	
	this.acc.mult(0);
}

Vehicle.prototype.show = function () {
	if( this.alpha < 150){
		this.alpha += 10;
	}
	stroke(255,255,255, this.alpha);
	strokeWeight(2);
	point(this.pos.x, this.pos.y);
	// rectMode(CENTER);
	// rect(this.pos.x, this.pos.y, 10, 10);
	// circle(this.pos.x, this.pos.y, 10, 10);
}

Vehicle.prototype.applyForce = function(f) {
	this.acc.add(f);
}

Vehicle.prototype.seek = function(target) {
	var desired = p5.Vector.sub(target, this.pos);
	desired.setMag(this.maxSpeed);
	var steer = p5.Vector.sub(desired, this.vel);
	steer.limit(this.maxforce);
	return steer;
}

Vehicle.prototype.arrive = function(target) {
	var desired = p5.Vector.sub(target, this.pos);
	var d = desired.mag();
	var speed = this.maxspeed;
	if (d < 100) {
		speed = map(d, 0, 100, 0, this.maxspeed);
	}
	desired.setMag(speed);
	var steer = p5.Vector.sub(desired, this.vel);
	steer.limit(this.maxforce);
	return steer;
}