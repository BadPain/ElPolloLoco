let canvis;
let world;

function init() {
    canvis = document.getElementById("canvas");
    world = new World(canvis);
    
    console.log('My Character is', world.character);
    
 }
