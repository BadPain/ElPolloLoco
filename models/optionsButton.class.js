class OptionsButtons extends DrawableObject {

    IMAGES_OPTION_SOUND = [
        'img/laut.png',
        'img/mute.png'
    ];
    IMAGES_OPTION_FULLSCREEN = [
        'img/vollbild.png',

    ];

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

    draw(ctx) {
        // Draw the button
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

        // Add text to the button
        ctx.font = '24px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Mute Music', buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
    }
}