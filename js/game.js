let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
 }

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
})

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
})

// window.addEventListener('keydown', function (event) {
//     if (event.key == 37) keyboard.LEFT = true;
//     if (event.key == 39) keyboard.RIGHT = true;
//     if (event.key == 38) keyboard.UP = true;
//     if (event.key == 40) keyboard.DOWN = true;
//     if (event.key == 32) keyboard.SPACE = true;
//     console.log(event);
// });

// window.addEventListener('keyup', function (event) {
//     if (event.key == 37) keyboard.LEFT = false;
//     if (event.key == 39) keyboard.RIGHT = false;
//     if (event.key == 38) keyboard.UP = false;
//     if (event.key == 40) keyboard.DOWN = false;
//     if (event.key == 32) keyboard.SPACE = false;
// });