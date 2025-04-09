class BottleBar extends DrawableObject {
    IMAGES = [
        'img/main/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/main/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/main/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/main/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/main/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/main/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    percentage = 0;

    /**
     * Creates an instance of BottleBar.
     * Loads the images for the bottle status bar,
     * sets the initial position and size of the bar,
     * and sets the initial percentage of the bar to 0.
     * @param {number} [totalBottles=10] - The total number of bottles
     * to be collected. Defaults to 10.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 50;
        this.y = 120;
        this.width = 200;
        this.height = 50;
        this.setPercentage(0, 10);
        this.totalBottles = 10;
        this.collectedBottles = 0;
    }

    /**
     * Sets the percentage of the bottle bar based on the number of bottles collected and the total number of bottles.
     * Updates the image of the bottle bar accordingly.
     * @param {number} collectedBottles - The number of bottles collected.
     * @param {number} totalBottles - The total number of bottles.
     */
    setPercentage(collectedBottles, totalBottles) {
        this.collectedBottles = collectedBottles;
        this.totalBottles = totalBottles;
        this.percentage = (this.collectedBottles / this.totalBottles) * 100;
        let path = this.IMAGES[this.bottleBar()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the bottle bar image to display based on the current percentage.
     * The percentage is categorized into six levels, each corresponding to a different image index.
     * 
     * @returns {number} The index of the image to use for the bottle bar, ranging from 0 to 5.
     */
    bottleBar() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage <= 20) {
            return 1;
        } else if (this.percentage <= 40) {
            return 2;
        } else if (this.percentage <= 60) {
            return 3;
        } else if (this.percentage <= 80) {
            return 4;
        } else if (this.percentage <= 100) {
            return 5;
        }
    }
}