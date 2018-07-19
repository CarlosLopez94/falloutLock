class Lock {
	constructor(x, y) {
		this.lockPos = createVector(x, y)
		this.radius = 300
		this.lWidth = this.radius / 2;
		this.lHeight = 25;
		this.currentOpenAngle = 0;
	}

	update() {
		if (this.currentOpenAngle < 90) {
			this.currentOpenAngle += 1;
		}
	}

	show() {
		push()
		translate(this.lockPos.x, this.lockPos.y);
		rotate(this.currentOpenAngle);
		fill(125)
		ellipse(0, 0, this.radius);
		fill(80)
		rect(-this.lWidth / 10, -this.lHeight / 2, this.lWidth, this.lHeight);
		pop()
	}
}