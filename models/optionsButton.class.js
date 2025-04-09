class OptionsButtons extends DrawableObject {
    IMAGES_OPTION_SOUND = [
        'img/laut.png',
        'img/mute.png'
    ];
    IMAGES_OPTION_FULLSCREEN = [
        'img/vollbild.png',

    ];

    /**
     * Constructor for the OptionsButtons class.
     * Sets the image paths and loads the images for the sound and fullscreen options.
     * Sets the initial position of the options buttons.
     * @constructor
     */
    constructor() {
        super().loadImage(this.IMAGES_OPTION_SOUND[0]);
        this.loadImages(this.IMAGES_OPTION_SOUND);
        this.loadImages(this.IMAGES_OPTION_FULLSCREEN);
        this.x = 50;
        this.y = 50;
        this.width = 50;
        this.height = 50;
        this.currentImage = 0;
    }

    /**
     * Draws the options buttons on the given canvas context.
     * The buttons are drawn at the position specified by the `x` and `y` properties.
     * The buttons have a white background, black text, and are centered horizontally and vertically.
     * The first button is labeled 'Mute Music'.
     * @param {CanvasRenderingContext2D} ctx - The context to draw the options buttons onto.
     */
    draw(ctx) {
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
        ctx.font = '24px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Mute Music', buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
    }
}