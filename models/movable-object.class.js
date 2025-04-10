class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    applyGravity() {
        setTrackedInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (this.isOnGround()) {
                this.speedY = 0;
            }
        }, 1000 / 25, 'gravity');
    }

    isFallingDown() {
        return this.y < 220 && this.speedY < 0;
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 278;
        }
    }

    isOnGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y >= 278;
        }
    }

    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    playAnimation(images) {
        if (!window.gameIsRunning) return;
        if (images.length > 0) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            this.animationSpeed = 1;
        }
    }

    moveRight() {
        if (!window.gameIsRunning) return;
        this.x += this.speed;
    }

    moveLeft() {
        if (!window.gameIsRunning) return;
        this.x -= this.speed;
    }

    jump() {
        if (!window.gameIsRunning) return;
        this.currentImage = 0;
        this.speedY = 20;
    }
}