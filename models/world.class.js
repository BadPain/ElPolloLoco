class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud(),
    ]
    backgroundObjects = [
        new backgroundObject('img/main/5_background/layers/air.png', 0),
        new backgroundObject('img/main/5_background/layers/3_third_layer/1.png', 0),
        new backgroundObject('img/main/5_background/layers/2_second_layer/1.png', 0),
        new backgroundObject('img/main/5_background/layers/1_first_layer/1.png', 0)
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        
        

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}