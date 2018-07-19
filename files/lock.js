class Lock {
	constructor(x, y) {
		this.lockPos = createVector(x, y)
		this.radius = 300
		this.lWidth = 25;
		this.lHeight = this.radius / 2;
		this.currentLockAngle = 0;
		this.solutionAngle = random(-90, 90);
		this.isOpen = false;
	}

	isOpening(){
		return keyIsPressed && key == 'a';
	}

	update(angleToCheck) {
		if(!this.isOpen && this.currentLockAngle<90 && this.isOpening()){
			
			
			this.currentLockAngle+=1;
		}else if(!this.isOpen && this.currentLockAngle>0 && !this.isOpening()){ //check !isOpen
			//returns lock to its initial position
			this.currentLockAngle-=1;
		}
	}

	show() {
		push()
		translate(this.lockPos.x, this.lockPos.y);
		rotate(this.currentLockAngle);
		fill(125)
		ellipse(0, 0, this.radius);
		fill(80)
		rect(-this.lWidth / 2, -this.lHeight / 10, this.lWidth, this.lHeight);
		pop()
	}

	getIsOpen(){
		return this.isOpen;
	}
}