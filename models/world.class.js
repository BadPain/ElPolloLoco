class World {
    character;
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    bossBar = new BossBar();
    coins = [];
    bottles = [];
    collectedCoin = 0;
    totalCoins = 5;
    collectedBottles = 0;
    totalBottles = 10;
    playerInventory = [];
    showBossBar = false;
    isActive = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character = new Character();
        this.level = level1;
        this.boss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        this.initFullscreenListener();
        this.draw();
        this.setWorld();
        this.run();
        this.checkESC();
        this.addCoins();
        this.addBottles();
        this.addChickens();
        this.addSmallChickens();
        this.coinBar.totalCoins = 5;
        this.bottleBar.totalBottles = 10;
        this.isBossActivated = false;
        this.toggleBossBarBegin = false;
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
            this.checkChickenCollisionsUp();
            this.checkBottleCollisions();
            this.removeNotCollisionBottle();
            this.activeBoss();
            this.checkESC();
        }, 10);
        setInterval(() => {
            this.mainConsoleLog();
        }, 500);
    }

    mainConsoleLog() {
        // console.log(this.throwableObjects.length);
        // console.log(world.throwableObjects[0].y);
        // console.log(this.keyboard.ESCAPE, 'ESC');
        // console.log(this.checkCollisions(), 'Collisions');
        // console.log(this.character.isColliding(chicken), 'isColliding with chicken');
        // console.log(this.character.isAboveGround(), 'isAboveGround');
        // console.log(this.character.isFallingDown(), 'isFallingDown');
        // console.log(world.isActive, 'isActive');
        // console.log(this.endboss.isActive, 'isActiveEndboss');
    }

    initFullscreenListener() {
        document.addEventListener("fullscreenchange", () => {
            const fullscreenIcon = document.getElementById("fullscreen");
            if (document.fullscreenElement) {
                fullscreenIcon.style.backgroundImage = "url('img/minimieren.png')";
            } else {
                fullscreenIcon.style.backgroundImage = "url('img/vollbild.png')";
            }
        });
    }

    checkESC() {
        if (this.keyboard.ESCAPE && document.fullscreenElement) {
            console.log('ESC');
            document.exitFullscreen();
        }
    }

    checkCollisions() {
        this.level.enemies.forEach(enemies => {
            if (this.character.isColliding(enemies) && this.character.isOnGround() && !this.character.isFallingDown() && !enemies.isDead) {
                this.character.hit(enemies);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkChickenCollisionsUp() {
        this.level.enemies.forEach(chicken => {
            if (this.character.isColliding(chicken)) {
                if (chicken instanceof Endboss) {
                    return;
                } else if (this.character.isAboveGround() && this.character.speedY < 0) {
                    this.chicken = chicken;
                    this.dieAnimation(this.chicken);
                }
            }
        });
    }

    dieAnimation(chicken) {
        let IMAGES_DEAD = {
            normal: 'img/main/3_enemies_chicken/chicken_normal/2_dead/dead.png',
            small: 'img/main/3_enemies_chicken/chicken_small/2_dead/dead.png'
        };
        chicken.isDead = true;
        clearInterval(chicken.moveInterval);
        clearInterval(chicken.walkInterval);
        if (chicken instanceof SmallChicken) {
            chicken.loadImage(IMAGES_DEAD.small);
        } else {
            chicken.loadImage(IMAGES_DEAD.normal);
        }
        setTimeout(() => {
            let index = this.level.enemies.indexOf(chicken);
            if (index !== -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 10000);
    }

    checkBottleCollisions() {
        this.level.enemies.forEach(chicken => {
            if (this.throwableObjects.length > 0) {
                if ((chicken instanceof Endboss)) {
                    this.checkBottleCollisionBoss();
                } else if (this.throwableObjects[0].isColliding(chicken)) {
                    let isThrow = true;
                    this.chicken = chicken;
                    this.dieAnimation(this.chicken);
                    this.throwableObjects[0].bottleSplash(isThrow);
                    this.isThrow = false;
                }
            }
        });
    }

    checkBottleCollisionBoss() {
        if (this.throwableObjects.length > 0) {
            let bottle = this.throwableObjects[0];
            if (this.boss.energy <= 0) {
                this.boss.isDead = true;
                console.log('Boss ist tot!');
                return;
            }
            this.level.enemies.forEach(enemy => {
                if (enemy instanceof Endboss && bottle.isColliding(enemy) && !bottle.hasHit) {
                    console.log(this.boss.energy, 'Bossenergy');
                    bottle.hasHit = true;
                    let isThrow = true;
                    this.boss.hit(bottle);
                    bottle.bottleSplash(isThrow);
                    this.bossBar.setPercentage(this.boss.energy);
                    this.isThrow = false;
                    console.log(this.boss.energy, 'Bossenergy');
                }
            });
        }
    }

    removeNotCollisionBottle() {
        if (this.throwableObjects.length > 0) {
            if (this.throwableObjects[0].y > 400 && !this.isCollidingWithChicken) {
                this.removeObjectFromGame();
            } else {
                return;
            }
        }
    }

    removeObjectFromGame() {
        this.throwableObjects.forEach(bottleRemove => {
            this.throwableObjects.splice(this.throwableObjects.indexOf(bottleRemove), 1);
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

    addChickens() {
        for (let i = 0; i < 10; i++) {
            let minLeftBoundary = 1750;
            let maxRightBoundary = 3500;
            let x = minLeftBoundary + Math.random() * (maxRightBoundary - minLeftBoundary);
            let chicken = new Chicken();
            chicken.x = x;
            this.level.enemies.push(chicken);
        }
    }

    addSmallChickens() {
        for (let i = 0; i < 10; i++) {
            let minLeftBoundary = 1750;
            let maxRightBoundary = 3500;
            let x = minLeftBoundary + Math.random() * (maxRightBoundary - minLeftBoundary);
            let smallChicken = new SmallChicken();
            smallChicken.x = x;
            this.level.enemies.push(smallChicken);
        }
    }

    checkCollectCoins() {
        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectCoin(coin);
            }
        });
    }

    checkCollectBottles() {
        this.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.collectBottle(bottle);
            }
        });
    }

    collectCoin(coin) {
        let index = this.coins.indexOf(coin);
        if (index > -1) {
            this.coins.splice(index, 1);
            this.coinBar.setPercentage(5 - this.coins.length, 5);
        }
    }

    collectBottle(bottle) {
        let index = this.bottles.indexOf(bottle);
        if (index > -1) {
            this.bottles.splice(index, 1);
            this.bottleBar.setPercentage(10 - this.bottles.length, 10);
            this.playerInventory.push('bottle');
        }
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.playerInventory.length > 0 && this.throwableObjects.length < 1) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 50);
            this.throwableObjects.push(bottle);
            this.playerInventory.pop();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.drawLifeBarText();
        this.addToMap(this.coinBar);
        this.drawCoinBarText();
        this.addToMap(this.bottleBar);
        this.drawBottleBarText();
        this.toggleBossBar();
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);

        let boss = this.level.enemies.find(e => e instanceof Endboss);
        if (boss) {
            this.addToMap(boss);
        }
        this.addObjectsToMap(this.level.enemies.filter(e => !(e instanceof Endboss)));

        // this.addObjectsToMap(this.level.enemies);
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

    drawBossBarText() {
        if (this.character.x > 1500) {
            this.ctx.font = '12px Arial';
            this.ctx.fillStyle = 'black';
            this.ctx.textAlign = 'left';
            this.ctx.textBaseline = 'top';
            let textWidth = this.ctx.measureText('nomnom').width;
            let x = 720 - textWidth - 55;
            this.ctx.fillText('Bosslife', x, 43);
        }
    }

    activeBoss() {
        if (!this.isBossActivated && Math.abs(this.boss.x - world.character.x) < 700) {
            this.toggleBossBarBegin = true;
            this.isBossActivated = true;
            this.boss.animate();
            console.log(this.isBossActivated, 'isBossActivated first time');
        }
    }

    toggleBossBar() {
        if (this.toggleBossBarBegin == true) {
            this.addToMap(this.bossBar);
            this.drawBossBarText();
        }
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawFrameOffset(this.ctx)

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

    toWinAGame() {
        document.getElementById("toWinAGame").style.display = "block";
        document.getElementById("restartButton").style.display = "block";
        console.log('You Win!');

    }

    toLoseAGame() {
        document.getElementById("toLoseAGame").style.display = "block";
        document.getElementById("restartButton").style.display = "block";

        console.log('You Lose!');
    }

    stopAllIntervals() {
        let highestIntervalId = setInterval(() => { }, 1000);
        for (let i = 0; i < highestIntervalId; i++) {
            clearInterval(i);
        }
    }
}