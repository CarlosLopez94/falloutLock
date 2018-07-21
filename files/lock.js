class Lock {
	constructor(x, y, lockOpenedSound, initError) {
		this.lockPos = createVector(x, y)
		this.radius = 300
		this.lWidth = 25;
		this.lHeight = this.radius / 2;
		this.lockOpenedSound = lockOpenedSound;

		this.currentLockAngle = 0;
		this.solutionAngle = Math.round(random(0, 180));
		this.isOpen = false;
		this.error = initError;
	}

	isOpening() {
		return keyIsPressed && (key == 'a' || key == 'A');
	}

	/**
	 * Returns True if lock is blocked
	 * @param {*} angleToCheck 
	 */
	update(angleToCheck) {
		if (!this.isOpen && this.currentLockAngle < 90 && this.isOpening()) {
			let parseCheckAngle = map(angleToCheck, 90, 270, 180, 0);
			let angleDif = abs(this.solutionAngle - parseCheckAngle)
			if (this.currentLockAngle < 90 - angleDif + this.error) {
				this.currentLockAngle += 1;
			} else {
				//then the lock is blocked
				return true;
			}
		} else if (!this.isOpen && this.currentLockAngle > 0 && !this.isOpening()) { //check !isOpen
			//returns lock to its initial position
			this.currentLockAngle -= 1;
		} else if (!this.isOpen && this.currentLockAngle >= 90) {
			this.isOpen = true;
			this.lockOpenedSound.play();
		}

		return false;
	}

	show() {
		push()
		if (this.isOpen) {
			fill(0, 255, 0)
			text('Open', 730, 730);
		} else {
			fill(255, 0, 0)
			text('Close', 730, 730);
		}
		translate(this.lockPos.x, this.lockPos.y);
		rotate(this.currentLockAngle);
		fill(125);
		ellipse(0, 0, this.radius);
		fill(80);
		rect(-this.lWidth / 2, -this.lHeight / 10, this.lWidth, this.lHeight);
		pop()
	}

	getIsOpen() {
		return this.isOpen;
	}

	setError(newErrorValue){
		this.error = newErrorValue;
	}
}