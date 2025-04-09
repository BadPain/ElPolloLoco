class StatusBar extends DrawableObject {
    IMAGES = [
        'img/main/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/main/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/main/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/main/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/main/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/main/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    percentage = 100;

    /**
     * Creates a new StatusBar instance.
     * Loads the images from the IMAGES array into the imageCache object.
     * Sets the initial position, width and height of the status bar.
     * Sets the initial percentage of the status bar to 100%
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 50;
        this.y = 20;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the status bar to the given value.
     * Updates the image of the status bar based on the new percentage.
     * @param {number} percentage - The new percentage value for the status bar.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path]
    }

    /**
     * Determines the index of the image to display for the status bar based on its current percentage value.
     * The index corresponds to an image in the `IMAGES` array.
     * 
     * @returns {number} The index of the image to display, ranging from 0 to 5.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}