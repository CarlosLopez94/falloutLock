class Lock {
	constructor(x, y) {
		this.lockPos = createVector(x, y)
		this.radius = 300
		this.lWidth = 25;
		this.lHeight = this.radius / 2;
		this.currentLockAngle = 0;
		this.solutionAngle = 135;//random(-90, 90);
		this.isOpen = false;
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
			let angleDif = abs(this.solutionAngle - angleToCheck)
			print("sol: " + this.solutionAngle + "  check: " + angleToCheck + "  diff:" + angleDif)

			let openDifAngle = map(angleDif, 45, 135, 0, 90);
			if (this.currentLockAngle < openDifAngle) {
				this.currentLockAngle += 1;
			} else {
				return true;
			}
		} else if (!this.isOpen && this.currentLockAngle > 0 && !this.isOpening()) { //check !isOpen
			//returns lock to its initial position
			this.currentLockAngle -= 1;
		} else if (this.currentLockAngle >= 90) {
			this.isOpen = true;
		}
		return false;
	}

	show() {
		push()
		if (this.isOpen) {
			fill(0, 255, 0)
			text('Open', 10, 30);
		} else {
			fill(255, 0, 0)
			text('Close', 10, 30);
		}


		translate(this.lockPos.x, this.lockPos.y);
		rotate(this.currentLockAngle);
		fill(125);
		ellipse(0, 0, this.radius);
		fill(80);
		rect(-this.lWidth / 2, -this.lHeight / 10, this.lWidth, this.lHeight);
		stroke(255, 0, 0);
		line(0, 0, this.radius / 2 * cos(this.solutionAngle), this.radius / 2 * sin(this.solutionAngle))
		pop()
	}

	getIsOpen() {
		return this.isOpen;
	}
}