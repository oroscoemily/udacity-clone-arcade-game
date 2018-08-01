// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    
};

Enemy.prototype.update = function(dt) {
    //ensures that they move 
    //consistently across all computers
    this.x += this.speed * dt;
    document.querySelector('body').style.background = 'white';

    //makes enemies restart once
    //they reach the end of the canvas
    if (this.x >= 505) {
        this.x = 0;
        this.speed = Math.floor(Math.random() * Math.floor(300)  *level);
    };

    //handles collisions
    //restarts player
    if (this.x > (player.x - 50) &&
        this.x < (player.x + 50) &&
        this.y > (player.y - 50) && 
        this.y < (player.y + 50)) {

        player.x = 200;
        player.y = 400;
        level = 1;
        document.querySelector('div').innerHTML="Level : " + level;
        };
    };
        //flashes red and white to indicate loss

        
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

//update() method
Player.prototype.update = function () {
    //restricts player from 
    //being able to go off canvas
    if (this.x <= 0) {
        this.x = 0;
    }
    if (this.x >= 400){
        this.x = 400;
    }
    if (this.y >= 350) {
        this.y = 400;
    }
    //checks if player made it to water
    //adds to the level
    if (this.y < -50) {
        player.levelUp();
    };
};

//render() method
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handleInput() method 
Player.prototype.handleInput = function(keyPress) {
    if (keyPress === 'left'){
        this.x -= this.speed + 100;
    };

    if (keyPress === 'up') {
        this.y -= this.speed + 90;
    };

    if (keyPress === 'right') {
        this.x += this.speed + 100;
    };

    if (keyPress === 'down') {
        this.y += this.speed + 90;
    };
};

Player.prototype.levelUp = function(){

    this.x = 200;
    this.y = 400;
    level += 1;
    enemy.speed = Math.floor(Math.random() * Math.floor(300)  *level);
    document.querySelector('div').innerHTML = ("Level : " + level);


}

//instatiates level for player
var level = 1;
//enemy positions
var enemyYPositions=[60, 140, 220];
var allEnemies = [];

//creates enemies at each position
enemyYPositions.forEach( function(yPosition) {
    enemy = new Enemy(0, yPosition, Math.floor(Math.random() * Math.floor(300)  * level));
    allEnemies.push(enemy);
});


//instantiates player
var player = new Player(200, 400, 0);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
