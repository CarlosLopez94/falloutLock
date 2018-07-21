let pinLockSound;
let lockOpenedSound;
let difficultyRadio;

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
	lock = new Lock(width / 2, height / 2, lockOpenedSound, 20);

	fill(255);
	difficultyRadio = createRadio();
	difficultyRadio.option('Easy');
	difficultyRadio.option('Medium');
	difficultyRadio.option('Hard');

	difficultyRadio.value('Medium'); //Default value

	difficultyRadio.position(30, 360);
	difficultyRadio.style("color", "#FFFFFF");
	difficultyRadio.style('border', 'solid white');
	difficultyRadio.style("font-size", "18pt");
	difficultyRadio.size(250);
	textAlign(RIGHT);
}

function draw() {
	background(0);

	//Update difficulty
	changeDifficulty();

	//Update pin and lock
	pin.update()
	let angle = pin.getCurrentAngle();
	let isBlocked = lock.update(angle);


	//Draw pin and lock
	lock.show();
	pin.show(isBlocked);
}

function changeDifficulty() {
	let selectedDifficulty = difficultyRadio.value();

	if (selectedDifficulty == 'Easy') {
		lock.setError(15);
	} else if (selectedDifficulty == 'Medium') {
		lock.setError(10);
	} else if (selectedDifficulty == 'Hard') {
		lock.setError(5);
	}
}