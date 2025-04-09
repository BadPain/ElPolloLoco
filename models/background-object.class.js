class backgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates an instance of backgroundObject.
     * @constructor
     * @param {string} imagePath - The path to the background image to load.
     * @param {number} x - The x-coordinate where the background should be positioned.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}