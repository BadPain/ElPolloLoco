class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  coin;
  level_end_x = 4400;

    /**
     * Initializes a new instance of the Level class.
     * @param {Enemy[]} enemies - The enemies in the level.
     * @param {Cloud[]} clouds - The clouds in the level.
     * @param {BackgroundObject[]} backgroundObjects - The background objects in the level.
     * @param {Bottle[]} bottle - The bottles in the level.
     * @param {Coin[]} coin - The coins in the level.
     */
    constructor(enemies, clouds, backgroundObjects, bottle, coin) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottle = bottle;
        this.coin = coin;
    }

}