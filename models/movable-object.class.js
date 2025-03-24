class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            // console.log(this.speedY, 'Speed Y Apply Gravity');

            if (this.isOnGround()) {
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    isFallingDown() {
        // console.log( isFallingDown(), "Falling Down");
        
        // console.log(this.speedY, "Speed Y");
        return this.y < 220 && this.speedY < 0;
        // return this.speedY > 0;
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

    // isCollidingLeftRight(mo) {
    //     return this.x < mo.x + mo.width &&
    //         this.x + this.width > mo.x &&
    //         this.y > mo.y - this.height &&
    //         this.y < mo.y + this.height;
    // }

    // isCollidingUp(mo) {
    //     return this.x + this.width > mo.x &&
    //         this.y < mo.y + mo.height &&
    //         this.x < mo.x + mo.width &&
    //         this.y + this.height > mo.y;
    // }

    hit() {
        this.energy -= 1;
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


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    

    playAnimation(images, speed) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        this.animationSpeed = 1;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.currentImage = 0;
        this.speedY = 20;
    }



}


