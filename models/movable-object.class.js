class MovableObject extends DrawableObject{
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 278;
        }
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    isCollidingUp(mo) {
        return this.x + this.width > mo.x &&
            this.y < mo.y + mo.height &&
            this.x < mo.x + mo.width &&
            this.y + this.height > mo.y;
    }

    hit() {
        this.energy -= 20;
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

    // isColliding(mo) {
    //     return (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) &&
    //         (this.y + this.offsetY + this.height) >= mo.y &&
    //         (this.y + this.offsetY) <= (mo.y + mo.height);
    // }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 20;
    }

    isJumping() {
        return this.speedY > 0;
    }

    stopJump() {
        this.speedY = 0;
    }
}


