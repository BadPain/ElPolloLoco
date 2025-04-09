class Cloud extends MovableObject {
    y = 20;
    height = 150;
    width = 500;

    /**
     * Constructor for Cloud class.
     * Initializes the cloud with the specified image and assigns its world.
     * Sets the initial values for the cloud's position, speed, width, height, and offset.
     * Calls the animate function to start animating the cloud.
     */
    constructor() {
        super().loadImage('img/main/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 500;
        this.animate();
    }

    /**
     * Initiates the animation interval for the cloud.
     * The cloud moves left at specified intervals.
     */
    animate() {
        this.moveLeft();
    }
}