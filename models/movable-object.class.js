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

    /**
     * Applies gravity to the object by decreasing its vertical speed and
     * its position. If the object is above the ground or moving upwards,
     * it will accelerate downwards. If the object is on the ground, its
     * vertical speed will be set to 0.
     * 
     * @returns {void} No return value
     */
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

    /**
     * Checks if the object is falling down.
     * 
     * Returns true if the object is above the ground and its vertical speed is negative.
     * 
     * @returns {boolean} True if the object is falling down, false otherwise
     */
    isFallingDown() {
        return this.y < 220 && this.speedY < 0;
    }

    /**
     * Checks if the object is above the ground.
     * 
     * Returns true if the object is a ThrowableObject or if its y position is less than 278.
     * This method is used to determine if the object is above the ground or not.
     * 
     * @returns {boolean} True if the object is above the ground, false otherwise
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 278;
        }
    }

    /**
     * Checks if the object is on the ground.
     * 
     * Returns true if the object is a ThrowableObject or if its y position is greater than or equal to 278.
     * This method is used to determine if the object is on the ground or not.
     * 
     * @returns {boolean} True if the object is on the ground, false otherwise
     */
    isOnGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y >= 278;
        }
    }

    /**
     * Reduces the object's energy by 20 and updates the last hit time.
     * If the object's energy is less than 0, it is set to 0.
     * This is called when the object is hit by a bottle or a chick.
     * @returns {void} No return value
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Returns true if the object is dead, i.e. its energy is 0.
     * @returns {boolean} True if the object is dead, false otherwise
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Determines if the object is currently in a "hurt" state.
     * The object is considered hurt if less than 1 second has passed
     * since the last hit occurred.
     * 
     * @returns {boolean} True if the object is hurt, false otherwise
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the object is colliding with another object.
     * 
     * This method takes into account the object's offset values when checking for collisions.
     * The offset values are subtracted from the object's width and height when checking for collisions.
     * This allows the object to have a different collision box than its bounding box.
     * 
     * @param {MovableObject} mo The object to check for collision with.
     * @returns {boolean} True if the object is colliding with the other object, false otherwise
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Plays an animation using an array of image paths.
     * The images are looped and the current index is stored in the object's `currentImage` property.
     * The `animationSpeed` property is set to 1 to indicate that the animation is running.
     * If the game is not running, the method does nothing.
     * @param {string[]} images - An array of image paths to use for the animation
     * @returns {void} No return value
     */
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

    /**
     * Moves the object to the right by its speed.
     * If the game is not running, this method does nothing.
     * @returns {void} No return value
     */
    moveRight() {
        if (!window.gameIsRunning) return;
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed.
     * If the game is not running, this method does nothing.
     * @returns {void} No return value
     */
    moveLeft() {
        if (!window.gameIsRunning) return;
        this.x -= this.speed;
    }

    /**
     * Initiates a jump by setting the vertical speed.
     * Resets the current image index to start the jump animation from the beginning.
     * If the game is not running, the method does nothing.
     * @returns {void} No return value
     */
    jump() {
        if (!window.gameIsRunning) return;
        this.currentImage = 0;
        this.speedY = 20;
    }
}