

function Particle(x,y){
	this.pos = createVector(x,y);
	this.prev = createVector(x,y);
	this.vel = createVector(random(-30,30),random(-30,30));
	this.acc = createVector();
	
	this.update = function(){
		this.vel.add(this.acc);
		this.vel.limit(5);
		this.pos.add(this.vel);
		this.acc.mult(0);
	};

	this.show = function(){
		stroke(255);
		strokeWeight(random(0,10));
		line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);

		this.prev.x = this.pos.x;
		this.prev.y = this.pos.y;
	};

	this.attracted = function(target) {
		var force = p5.Vector.sub(target, this.pos);
		//distance from force
		var d = force.mag();
		d = constrain(d, 1, 25);
		//gravity
		var G = 50;
		var strength = G / (d * d);
		force.setMag(strength);
		if(d < 20) {
			force.mult(-5000);
		}
		this.acc.add(force);
	};
}