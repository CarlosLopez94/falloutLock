function setup() {
	angleMode(DEGREES)
	createCanvas(600, 400);

	textSize(32);

	pin = new Pin(width / 2, height / 2);
	lock = new Lock(width / 2, height / 2);
}

function draw() {
	background(0);

	pin.update()
	let angle = pin.getCurrentAngle();
	let isBlocked = lock.update(angle);

	lock.show();
	pin.show(isBlocked);
}