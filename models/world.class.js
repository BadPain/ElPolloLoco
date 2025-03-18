class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    coins = [];
    bottles = [];
    collectedCoin = 0;
    totalCoins = 5;
    collectedBottles = 0;
    totalBottles = 10;
    playerInventory = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.addCoins();
        this.addBottles();
        this.coinBar.totalCoins = 5;
        this.bottleBar.totalBottles = 10;
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectCoins();
            this.checkCollectBottles();
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkChickenCollisionsUp() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isCollidingUp(enemy)) {
                this.chickenDie();
            }
        });
    }

    chickenDie() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isCollidingUp(enemy)) {
                this.level.enemies.splice(index, 1);
            }
        });
    }

    addCoins() {
        for (let i = 0; i < 5; i++) {
            let x = -500 + Math.random() * 2500;
            let y = 200 + Math.random() * 100;
            let coin = new Coin();
            coin.x = x;
            coin.y = y;
            this.coins.push(coin);
        }
    }

    addBottles() {
        for (let i = 0; i < 10; i++) {
            let x = -500 + Math.random() * 2500;
            let y = 200 + Math.random() * 100;
            let bottle = new Bottles();
            bottle.x = x;
            bottle.y = y;
            this.bottles.push(bottle);
        }
    }

   

    checkCollectCoins() {
        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectCoin(coin);
                console.log('Coin collected');
            }
        });
    }

    checkCollectBottles() {
        this.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.collectBottle(bottle);
                console.log('Bottle collected');
            }
        });
    }

    collectCoin(coin) {
        let index = this.coins.indexOf(coin);
        if (index > -1) {
            this.coins.splice(index, 1);
            this.coinBar.setPercentage(5 - this.coins.length, 5);
            console.log('Coin deleted');
        }
    }

    collectBottle(bottle) {
        let index = this.bottles.indexOf(bottle);
        if (index > -1) {
            this.bottles.splice(index, 1);
            this.bottleBar.setPercentage(10 - this.bottles.length, 10);
            this.playerInventory.push('bottle');
            console.log('Bottle deleted');
            console.log(this.bottles.length);
            console.log(this.playerInventory.length); 
        }
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.playerInventory.length > 0) {
          let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 50);
          this.throwableObjects.push(bottle);
          this.playerInventory.pop();
          console.log(this.playerInventory.length);
        }
      }

    draw() {
        // console.log('Münzleiste: ', this.bottleBar);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);


        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);


        this.ctx.translate(-this.camera_x, 0); // statusbar field
        this.addToMap(this.statusBar);
        this.drawLifeBarText();
        this.addToMap(this.coinBar);
        this.drawCoinBarText();
        this.addToMap(this.bottleBar);
        this.drawBottleBarText();
        this.ctx.translate(this.camera_x, 0); // statusbar field

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    drawLifeBarText() {
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(`${this.character.energy}`, 200, 50);
    }

    drawCoinBarText() {
        if (this.coinBar && this.coinBar.totalCoins) {
            this.ctx.font = '12px Arial';
            this.ctx.fillStyle = 'black';
            this.ctx.textAlign = 'left';
            this.ctx.textBaseline = 'top';
            this.ctx.fillText(`${this.coinBar.collectedCoins || 0} / ${this.coinBar.totalCoins}`, 200, 100);
        }
    }

    drawBottleBarText() {
        if (this.bottleBar && this.bottleBar.totalBottles) {
            this.ctx.font = '12px Arial';
            this.ctx.fillStyle = 'black';
            this.ctx.textAlign = 'left';
            this.ctx.textBaseline = 'top';
            this.ctx.fillText(`${this.playerInventory.length} / ${this.bottleBar.totalBottles}`, 200, 150);
        }
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

}