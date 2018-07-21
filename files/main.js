let hairpinLockSound;
let lockOpenedSound;
let hairpinBrokenSound;
let difficultyRadio;

let hairpinBrokenCont;

//This happens BEFORE setup
function preload() {
	hairpinLockSound = loadSound("soundEffects/locked_pin.mp3");
	lockOpenedSound = loadSound("soundEffects/opened_lock.mp3");
	hairpinBrokenSound = loadSound("soundEffects/broken_pin.mp3");
}

function setup() {
	angleMode(DEGREES)
	createCanvas(800, 600);
	textSize(32);

	hairpinLockSound.playMode('untilDone');
	hairpinLockSound.setVolume(0.5);

	hairpinBrokenSound.playMode('untilDone');

	hairpin = new Hairpin(width / 2, height / 2, hairpinLockSound, hairpinBrokenSound);
	lock = new Lock(width / 2, height / 2, lockOpenedSound, 5);
	hairpinBrokenCont = 0;

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

	//Update hairpin and lock
	hairpin.updateAngle()
	let angle = hairpin.getCurrentAngle();
	let isBlocked = lock.update(angle);
	let broken = hairpin.updateBrokenStatus(isBlocked);

	//update broken hairpin cont 
	if (broken) {
		hairpinBrokenCont++;
	}

	//Draw hairpin and lock
	lock.show();
	hairpin.show(isBlocked);

	//Draw cont pins text
	fill(255)
	text('Number of broken hairpins: ' + hairpinBrokenCont, 400, 550);

}

//Changes difficulty of the lock (error will decrease if it becomes more difficult, 
//so player has to be increase his accuracy)
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

//Creates a new lock and reset hairpins cont
function resetGame() {
	hairpin = new Pin(width / 2, height / 2, hairpinLockSound, hairpinBrokenSound);
	lock = new Lock(width / 2, height / 2, lockOpenedSound, 5);
	hairpinBrokenCont = 0;
}