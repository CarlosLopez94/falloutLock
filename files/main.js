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