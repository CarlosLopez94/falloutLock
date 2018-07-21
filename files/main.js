let pinLockSound;
let lockOpenedSound;
let pinBrokenSound;
let difficultyRadio;

let pinBrokenCont;

//This happens BEFORE setup
function preload() {
	pinLockSound = loadSound("soundEffects/locked_pin.mp3");
	lockOpenedSound = loadSound("soundEffects/opened_lock.mp3");
	pinBrokenSound = loadSound("soundEffects/broken_pin.mp3");
}

function setup() {
	angleMode(DEGREES)
	createCanvas(800, 600);
	textSize(32);

	pinLockSound.playMode('untilDone');
	pinLockSound.setVolume(0.5);

	pinBrokenSound.playMode('untilDone');

	pin = new Pin(width / 2, height / 2, pinLockSound, pinBrokenSound);
	lock = new Lock(width / 2, height / 2, lockOpenedSound, 5);
	pinBrokenCont = 0;

	//Create difficulty selector
	fill(255);
	difficultyRadio = createRadio();
	difficultyRadio.option('Easy');
	difficultyRadio.option('Medium');
	difficultyRadio.option('Hard');

	difficultyRadio.value('Medium'); //Default value

	difficultyRadio.position(500, 50);
	difficultyRadio.style("color", "#FFFFFF");
	difficultyRadio.style('border', 'solid white');
	difficultyRadio.style("font-size", "18pt");
	difficultyRadio.size(250);
	textAlign(RIGHT);

	//Create reset button
	resetButton = createButton("Reset");
	resetButton.mousePressed(resetGame);
	resetButton.position(500, 525);
	resetButton.style("color", "#000000");
	resetButton.style('border', 'solid black');
	resetButton.style("background", "#7D7D7D");
	resetButton.style("font-size", "18pt");
	resetButton.size(250);
}

function draw() {
	background(0);

	//Update difficulty
	changeDifficulty();

	//Update pin and lock
	pin.updateAngle()
	let angle = pin.getCurrentAngle();
	let isBlocked = lock.update(angle);
	let broken = pin.updateBrokenStatus(isBlocked);

	//update broken pin cont 
	if (broken) {
		pinBrokenCont++;
	}

	//Draw pin and lock
	lock.show();
	pin.show(isBlocked);

	//Draw cont pins text
	fill(255)
	text('Number of broken pins: ' + pinBrokenCont, 400, 550);

}

function changeDifficulty() {
	let selectedDifficulty = difficultyRadio.value();

	if (selectedDifficulty == 'Easy') {
		lock.setError(10);
	} else if (selectedDifficulty == 'Medium') {
		lock.setError(5);
	} else if (selectedDifficulty == 'Hard') {
		lock.setError(2);
	}
}

function resetGame() {
	pin = new Pin(width / 2, height / 2, pinLockSound, pinBrokenSound);
	lock = new Lock(width / 2, height / 2, lockOpenedSound, 5);
	pinBrokenCont = 0;
}