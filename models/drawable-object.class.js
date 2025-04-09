class DrawableObject {
    x = 120;
    y = 320;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads an image from the given path into the `img` property.
     * @param {string} path - The path to the image file to load.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object onto the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The context to draw the object onto.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Bild konnte nicht gezeichnet werden', e);
        }
    }

    /**
     * Loads multiple images from the given array of paths into the `imageCache` object.
     * Each path is used as a key in the cache, and the value is the loaded image.
     * @param {string[]} arr - Array of paths to image files to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws a blue frame around the object on the given canvas context.
     * The frame is only drawn if the object is an instance of Character, Chicken, Coin, or Bottles.
     * This is a debugging tool to help visualize the object's hitbox.
     * @param {CanvasRenderingContext2D} ctx - The context to draw the frame onto.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Bottles) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
    
    /**
     * Draws a red offset frame around the object on the given canvas context.
     * The frame is only drawn if the object is an instance of Character, Chicken, Coin, or Bottles.
     * This is a debugging tool to help visualize the object's adjusted hitbox with applied offsets.
     * @param {CanvasRenderingContext2D} ctx - The context to draw the offset frame onto.
     */
    drawFrameOffset(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Bottles) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            const { adjustedX, adjustedY, adjustedWidth, adjustedHeight } = this.adjustOffsetFrame();
            ctx.rect(adjustedX, adjustedY, adjustedWidth, adjustedHeight);
            ctx.stroke();
        }
    }

    /**
     * Calculates the adjusted bounding box coordinates and dimensions of the object,
     * taking into account the offset values from the object's offset property.
     * The method returns an object with the following properties:
     * - adjustedX (number): The x-coordinate of the adjusted bounding box.
     * - adjustedY (number): The y-coordinate of the adjusted bounding box.
     * - adjustedWidth (number): The width of the adjusted bounding box.
     * - adjustedHeight (number): The height of the adjusted bounding box.
     * @returns {Object} An object containing the adjusted bounding box coordinates and dimensions.
     */
    adjustOffsetFrame() {
        const adjustedX = this.x + this.offset.left;
        const adjustedY = this.y + this.offset.top;
        const adjustedWidth = this.width - this.offset.left - this.offset.right;
        const adjustedHeight = this.height - this.offset.top - this.offset.bottom;
        return {
          adjustedX,
          adjustedY,
          adjustedWidth,
          adjustedHeight
        };
      }
}