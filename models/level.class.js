class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  coin;
  level_end_x = 4400;

    constructor(enemies, clouds, backgroundObjects, bottle, coin) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottle = bottle;
        this.coin = coin;
    }

}