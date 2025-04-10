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
        this.checkBossAttacking = false;
        this.checkChickenAttacking = false;
    }

    get percentage() {
        return Math.min(this.playerInventory.length * 20, 100);
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setTrackedInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectCoins();
            this.checkCollectBottles();
            this.checkChickenCollisionsUp();
            this.checkBottleCollisions();
            this.removeNotCollisionBottle();
            this.activeBoss();
            this.checkESC();
            this.checkBossAttack();
        }, 10, 'run()');
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
            document.exitFullscreen();
        }
    }

    checkCollisions() {
        this.level.enemies.forEach(enemies => {
            if (this.character.isColliding(enemies) && this.character.isOnGround() && !this.character.isFallingDown() && !enemies.isDead && !this.checkChickenAttacking) {
                this.checkChickenAttacking = true;
                this.character.hit(enemies);
                this.statusBar.setPercentage(this.character.energy);
                setTimeout(() => {
                    this.checkChickenAttacking = false;
                }, 1000);
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

    checkBossAttack() {
        if (this.boss.isAttacking && Math.abs(this.boss.x - world.character.x) < 149 && !this.checkBossAttacking) {
            this.checkBossAttacking = true;
            this.character.hit(this.boss);
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    dieAnimation(chicken) {
        this.markChickenAsDead(chicken);
        this.setChickenDeathImage(chicken);
        this.removeChickenAfterDelay(chicken);
    }

    markChickenAsDead(chicken) {
        chicken.isDead = true;
        clearInterval(chicken.moveInterval);
        clearInterval(chicken.walkInterval);
    }

    setChickenDeathImage(chicken) {
        let IMAGES_DEAD = {
            normal: 'img/main/3_enemies_chicken/chicken_normal/2_dead/dead.png',
            small: 'img/main/3_enemies_chicken/chicken_small/2_dead/dead.png'
        };

        if (chicken instanceof SmallChicken) {
            chicken.loadImage(IMAGES_DEAD.small);
        } else {
            chicken.loadImage(IMAGES_DEAD.normal);
        }
    }

    removeChickenAfterDelay(chicken) {
        setTrackedTimeout(() => {
            let index = this.level.enemies.indexOf(chicken);
            if (index !== -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 1500, 'chicken die animation');
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
        this.throwableObjects.forEach(bottle => {
            if (this.boss.energy <= 0) {
                this.boss.isDead = true;
                return;
            }
            if (bottle.isColliding(this.boss) && !bottle.hasHit) {
                bottle.hasHit = true;
                let isThrow = true;
                this.boss.takeDamage(20);
                bottle.bottleSplash(isThrow);
                this.bossBar.setPercentage(this.boss.energy);
            }
        });
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
            let y = 380;
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
            this.bottleBar.setPercentage(this.playerInventory.length, 10);
        }
    }

    checkThrowObjects() {
        if (!window.gameIsRunning) return;
        if (this.keyboard.D && this.playerInventory.length > 0 && this.throwableObjects.length < 1) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 50);
            this.throwableObjects.push(bottle);
            this.playerInventory.pop();
            this.bottleBar.setPercentage(this.playerInventory.length, 10);
        }
    }

    draw() {
        this.drawCameraBackground();
        this.drawHUD();
        this.drawCharacters();
        this.requestNextFrame();
    }

    drawCameraBackground() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    drawHUD() {
        this.addToMap(this.statusBar);
        this.drawLifeBarText();
        this.addToMap(this.coinBar);
        this.drawCoinBarText();
        this.addToMap(this.bottleBar);
        this.drawBottleBarText();
        this.toggleBossBar();
    }

    drawCharacters() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        let boss = this.level.enemies.find(e => e instanceof Endboss);
        if (boss) {
            this.addToMap(boss);
        }
        this.addObjectsToMap(this.level.enemies.filter(e => !(e instanceof Endboss)));
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);
        this.ctx.translate(-this.camera_x, 0);
    }

    requestNextFrame() {
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
        if (!window.gameIsRunning) return;
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        if (!window.gameIsRunning) return;
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

    toWinAGame() {
        document.getElementById("toWinAGame").style.display = "block";
        document.getElementById("restartButton").style.display = "block";
        document.getElementById("footer").style.display = "none";
        if (!window.soundManager.isMuted()) {
            this.wasSoundMutedByEndscreen = true;
            window.soundManager.soundMuted = true;
            window.soundManager.updateMuteStatus();
        }
    }

    toLoseAGame() {
        document.getElementById("toLoseAGame").style.display = "block";
        document.getElementById("restartButton").style.display = "block";
        document.getElementById("footer").style.display = "none";
        if (!window.soundManager.isMuted()) {
            this.wasSoundMutedByEndscreen = true;
            window.soundManager.soundMuted = true;
            window.soundManager.updateMuteStatus();
        }
    }
}