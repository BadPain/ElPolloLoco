let canvas;
let world;
let keyboard = new Keyboard();

function toStartAGame() {
    console.log(document.getElementById("panelMain"));
    // document.getElementById("startButton").style.display = "none";
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("canvas").style.display = "block";
    document.getElementById("closeControls").style.display = "none";
    document.getElementById("controls").style.display = "block"
    document.getElementById("panelMain").style.display = "flex";
    init();
}

function viewControls() {
    document.getElementById("startScreen").style.display = "none";
}

function closeControls() {
    document.getElementById("startScreen").style.display = "flex";
}

function fullscreen() {
    if (document.fullscreenElement) {
      // Wenn der Benutzer bereits im Fullscreen-Modus ist, schließe ihn
      document.exitFullscreen();
      document.getElementById("fullscreen").style.backgroundImage = "url('img/vollbild.png')";
    } else {
      // Wenn der Benutzer nicht im Fullscreen-Modus ist, öffne ihn
      document.getElementById("container").requestFullscreen();
      document.getElementById("fullscreen").style.backgroundImage = "url('img/minimieren.png')";
    }
  }

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

// function checkESC() {
//     if (this.keyboard.ESCAPE) {
//         fullscreen();
//     }
// }

function toggleMusic() {
    let music = document.getElementById('music');
    if (music.playing) {
        music.pause();
        document.getElementsById("muteMusicButton").style.backgroundImage = "url('img/laut.png')";
    } else {
        music.play();
        document.getElementsById("muteMusicButton").style.backgroundImage = "url('img/stumm.png')";
    }
}

function mute() {
    world.character.walking_sound.volume = 0.0;
    world.character.jumping_sound.volume = 0.0;
}

function play() {
    world.character.walking_sound.volume = 0.3;
    world.character.jumping_sound.volume = 0.1;
}


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
    if (e.keyCode == 27) {
        keyboard.ESCAPE = true;
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
    if (e.keyCode == 27) {
        keyboard.ESCAPE = false;
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

