let level1;
/**
 * Initializes the first level by creating a new Level instance and
 * populating it with all the necessary objects such as enemies, clouds,
 * background objects, coins and bottles.
 * @function initLevel1
 * @since 0.1.0
 */
function initLevel1() {
    level1 = new Level(

        [
            new Chicken(),
            new SmallChicken(),
            new Endboss()
        ],
        [
            new Cloud()
        ],
        [
            new backgroundObject('img/main/5_background/layers/air.png', -719 * 2),
            new backgroundObject('img/main/5_background/layers/3_third_layer/1.png', -719 * 2),
            new backgroundObject('img/main/5_background/layers/2_second_layer/1.png', -719 * 2),
            new backgroundObject('img/main/5_background/layers/1_first_layer/1.png', -719 * 2),

            new backgroundObject('img/main/5_background/layers/air.png', -719),
            new backgroundObject('img/main/5_background/layers/3_third_layer/2.png', -719),
            new backgroundObject('img/main/5_background/layers/2_second_layer/2.png', -719),
            new backgroundObject('img/main/5_background/layers/1_first_layer/2.png', -719),

            new backgroundObject('img/main/5_background/layers/air.png', 0),
            new backgroundObject('img/main/5_background/layers/3_third_layer/1.png', 0),
            new backgroundObject('img/main/5_background/layers/2_second_layer/1.png', 0),
            new backgroundObject('img/main/5_background/layers/1_first_layer/1.png', 0),

            new backgroundObject('img/main/5_background/layers/air.png', 719),
            new backgroundObject('img/main/5_background/layers/3_third_layer/2.png', 719),
            new backgroundObject('img/main/5_background/layers/2_second_layer/2.png', 719),
            new backgroundObject('img/main/5_background/layers/1_first_layer/2.png', 719),

            new backgroundObject('img/main/5_background/layers/air.png', 719 * 2),
            new backgroundObject('img/main/5_background/layers/3_third_layer/1.png', 719 * 2),
            new backgroundObject('img/main/5_background/layers/2_second_layer/1.png', 719 * 2),
            new backgroundObject('img/main/5_background/layers/1_first_layer/1.png', 719 * 2),

            new backgroundObject('img/main/5_background/layers/air.png', 719 * 3),
            new backgroundObject('img/main/5_background/layers/3_third_layer/2.png', 719 * 3),
            new backgroundObject('img/main/5_background/layers/2_second_layer/2.png', 719 * 3),
            new backgroundObject('img/main/5_background/layers/1_first_layer/2.png', 719 * 3),

            new backgroundObject('img/main/5_background/layers/air.png', 719 * 4),
            new backgroundObject('img/main/5_background/layers/3_third_layer/1.png', 719 * 4),
            new backgroundObject('img/main/5_background/layers/2_second_layer/1.png', 719 * 4),
            new backgroundObject('img/main/5_background/layers/1_first_layer/1.png', 719 * 4),

            new backgroundObject('img/main/5_background/layers/air.png', 719 * 5),
            new backgroundObject('img/main/5_background/layers/3_third_layer/2.png', 719 * 5),
            new backgroundObject('img/main/5_background/layers/2_second_layer/2.png', 719 * 5),
            new backgroundObject('img/main/5_background/layers/1_first_layer/2.png', 719 * 5),

            new backgroundObject('img/main/5_background/layers/air.png', 719 * 6),
            new backgroundObject('img/main/5_background/layers/3_third_layer/1.png', 719 * 6),
            new backgroundObject('img/main/5_background/layers/2_second_layer/1.png', 719 * 6),
            new backgroundObject('img/main/5_background/layers/1_first_layer/1.png', 719 * 6),
        ],
        [
            new Coin()
        ],
        [
            new Bottles()
        ]
    );
}
