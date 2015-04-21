// the Game object used by the phaser.io library
var stateActions = {preload: preload, create: create, update: update};

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */

var score = 0;
var labelScore;
var player;
var pipes;

function preload() {
    game.load.image("kappa", "assets/kappa.png")
    game.load.audio("score", "assets/combobreak.mp3")
    game.load.image("pipe", "assets/pipe.png")
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#FF0000");
    game.add.text(10, 355, "Welcome to Flappy kappa",
        {font: "30px Comic Sans MS", fill: "#FFFFFF"});
    player = game.add.sprite(10, 200, "kappa");
    game.input.onDown.add(clickHandler);
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);
    game.input
        .keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);
    game.input
        .keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onUp.add(moveStop);
    game.input
        .keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);
    game.input
        .keyboard.addKey(Phaser.Keyboard.LEFT)
        .onUp.add(moveStop);
    game.input
        .keyboard.addKey(Phaser.Keyboard.UP)
        .onDown.add(moveUp);
    game.input
        .keyboard.addKey(Phaser.Keyboard.UP)
        .onUp.add(moveStop);
    game.input
        .keyboard.addKey(Phaser.Keyboard.DOWN)
        .onDown.add(moveDown);
    game.input
        .keyboard.addKey(Phaser.Keyboard.DOWN)
        .onUp.add(moveStop);
    //labelScore = game.add.text(20, 20, "0");
    pipes = game.add.group();
    console.log(score);
    generatePipe();
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.gravity.y = 300;
    //player.body.velocity.x = 100
    pipeInterval = 1.75;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
        generatePipe);
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
        changeScore);
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
        spaceHandler);
    game.add.text(10, 355, "Welcome to Flappy kappa",
        {font: "30px Comic Sans MS", fill: "#FFFFFF"});
    labelScore = game.add.text(20, 20, "0", {fill: "#FFFFFF"});
}

function changeScore() {
    score = score + 1;
    labelScore.setText(score.toString());
}

function clickHandler(event) {
    game.add.sprite(game.add.sprite(event.x, event.y, "kappa"));
    changeScore();
    //alert(event.x + ":" + event.y);
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function spaceHandler() {
    game.sound.play("score");
}

function moveRight() {
    //player.x = player.x + 10
    player.body.velocity.x = 100;
}
function moveLeft() {
    //player.x = player.x - 10
    player.body.velocity.x = -100;
}
function moveUp() {
    // player.y = player.y - 10
    player.body.velocity.y = -200;
}
function moveDown() {
    //player.y = player.y + 10
    player.body.velocity.y = 100;
}
function moveStop() {
    //player.body.velocity.x = 0
    //player.body.velocity.y = 0
}
function addPipeBlock(x,y) {
    var pipe = pipes.create(x,y, "pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;
}
function generatePipe() {
    var gapStart = game.rnd.integerInRange(1, 5);
    for (var count = 0; count < 8; count += 1) {
        if (count != gapStart && count != gapStart + 1) {
            //var block = game.add.sprite(900, 50 * count, "pipe");
            //game.physics.arcade.enable(block);
            // block.body.velocity.x = -100;
            addPipeBlock(800, count * 50)
        }
    }
}
function gameOver() {
    game.destroy();
}
function update() {
    game.physics.arcade
        .overlap(player,
        pipes,
        gameOver);
    if(player.y < -40){
        gameOver()
    }
    if(player.y > 440){
        gameOver()
    }
}






