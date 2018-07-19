class Pin {
	constructor(x, y) {
		this.pinPos = createVector(x, y)
		this.pWidth = 25;
		this.pHeight = 180;
		this.currentAngle = 0;
	}

	update() {
		//check mouse Y, movement only active if pointer is aboce half canvas
		this.currentAngle = map(mouseX, 0, width, -90, 90, true);
	};

	show() {
		push();
		translate(this.pinPos.x, this.pinPos.y);
		rotate(180);
		rotate(this.currentAngle);
		rect(-this.pWidth / 2, 0, this.pWidth, this.pHeight);
		pop();
	};
}