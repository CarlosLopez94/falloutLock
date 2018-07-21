class Hairpin {
	constructor(x, y, lockSound, brokenSound) {
		this.pinPos = createVector(x, y)
		this.pWidth = 10;
		this.pHeight = 180;
		this.currentAngle = 0;

		this.MAX_LIFE = 60;
		this.currentLife = this.MAX_LIFE;
		this.isBroken = false;

		this.lockSound = lockSound;
		this.brokenSound = brokenSound;
	}

	updateAngle() {
		//check mouse Y, movement only active if pointer is aboce half canvas
		if (!this.isBroken) {
			this.currentAngle = map(mouseX, 0, width, 90, 270, true);
		}
	};

	updateBrokenStatus(isBlocked) {
		if (this.currentLife > 0 && isBlocked) {
			this.currentLife -= 1;
		} else if (!this.isBroken && this.currentLife <= 0) {
			this.isBroken = true;
			this.brokenSound.play();
			return true;
		} else if (this.isBroken && this.currentLife < this.MAX_LIFE) {
			this.currentLife += 1;
		} else if (this.isBroken && this.currentLife >= this.MAX_LIFE) {
			this.isBroken = false;
		}

		return false;
	}

	show(isBlocked) {
		if (!this.isBroken) {
			push();
			translate(this.pinPos.x, this.pinPos.y);

			if (isBlocked) {
				this.lockSound.play();
				let blockedAngle = random(this.currentAngle - 2, this.currentAngle + 2);
				rotate(blockedAngle);
			} else {
				this.lockSound.stop();
				rotate(this.currentAngle);
			}
			fill(183, 65, 14);//rusty color
			rect(-this.pWidth / 2, 0, this.pWidth, this.pHeight, 60);
			pop();
		}
	};

	getCurrentAngle() {
		return this.currentAngle;
	}
}