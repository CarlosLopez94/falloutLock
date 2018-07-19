function setup() {
	angleMode(DEGREES)
	createCanvas(600, 400);

	pin = new Pin(width / 2, height / 2);
	lock = new Lock(width / 2, height / 2);
}

function draw() {
	background(0);

	lock.update()
	lock.show();

	pin.update()
	pin.show();
}

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
