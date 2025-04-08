class DrawableObject {
    x = 120;
    y = 320;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Bild konnte nicht gezeichnet werden', e);
        }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Bottles) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
    
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