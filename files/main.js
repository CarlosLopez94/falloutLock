let pinLockSound;
let lockOpenedSound;

//This happens BEFORE setup
function preload() {
	pinLockSound = loadSound("soundEffects/pin_locked.mp3");
	lockOpenedSound = loadSound("soundEffects/lock_opened.mp3");
}

function setup() {
	angleMode(DEGREES)
	createCanvas(600, 400);
	textSize(32);

	pinLockSound.playMode('untilDone');
	pinLockSound.setVolume(0.5);

	pin = new Pin(width / 2, height / 2, pinLockSound);
	lock = new Lock(width / 2, height / 2, lockOpenedSound);
}

function draw() {
	background(0);

	pin.update()
	let angle = pin.getCurrentAngle();
	let isBlocked = lock.update(angle);

	lock.show();
	pin.show(isBlocked);
}