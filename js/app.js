// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png'; // Image for enemies
    }

    // Update enemy's position
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x = this.x + this.speed * dt;
        if (this.x > 505) {
            this.x = -101;
        }

        const collisionX = (parseInt(this.x + 50) > player.x && parseInt(this.x) < player.x) || (parseInt(this.x + 50) > player.x + 50 && parseInt(this.x) < player.x + 50),
            collisionY = (this.y === player.y);

        // Check for collision
        if (collisionX && collisionY) {
            player.outOfLife();
        }
    }

    // Draw enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Player
class Player {
    constructor(sprite) {
        this.sprite = 'images/char-cat-girl.png'; // Image for player
        this.x = 203; // Initial position of player
        this.y = 403;
        this.life = 3; // Player Life
        this.controllable = true; // Keyboard controls
    }

    // Update
    update(dt) {
        if (this.y === -12) { // check if player is on water
            scoreEarned();
            water();
        }
    }

    // When player runs out of life
    outOfLife() {
        this.life -= 1;
        removeLife();

        if (this.life === 0) {
            this.controllable = false;
            resetLife();
            showModal();
        } else {
            this.x = 203;
            this.y =403;
        }
    }

    // Render
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // HandleInput
    handleInput(e) {
        const arrowLeft = (e === 'left' && this.x !== 1 && this.controllable === true),
            arrowRight = (e === 'right' && this.x !== 405 && this.controllable === true),
            arrowDown = (e === 'down' && this.y !== 403 && this.controllable === true),
            arrowUp = (e === 'up' && this.y !== -12 && this.controllable === true);

        if (arrowLeft) {
            this.x -= 101;
        } else if (arrowRight) {
            this.x += 101;
        } else if (arrowDown) {
            this.y += 83;
        } else if (arrowUp) {
            this.y -= 83;
        }
    }
}

// Place the player object in a variable called player
player = new Player;

// When player reached water put back into initial position
const water = () => {
    player.x = 203;
    player.y = 403;
}

// Random speed for enemy/ladybugs
const randomSpeed = {
    top: (() => Math.floor(Math.random() * 300) + 80)(),
    mid: (() => Math.floor(Math.random() * 300) + 145)(),
    bot: (() => Math.floor(Math.random() * 300) + 60)(),
}

// Enemy objects in an array called allEnemies
const enemyTop = new Enemy(1, 71, randomSpeed.top),
    enemyMid = new Enemy(1, 154, randomSpeed.mid),
    enemyBot = new Enemy(1, 237, randomSpeed.bot),
    allEnemies = [enemyTop, enemyMid, enemyBot];

// Player life
let lifeOne = document.getElementById('life-one'),
    lifeTwo = document.getElementById('life-two'),
    lifeThree = document.getElementById('life-three');

// Reset player life
const resetLife = () => {
    lifeThree.hidden = false;
    lifeTwo.hidden = false;
    lifeOne.hidden = false;
}

// Remove life from scoreboard
const removeLife = () => {
    if (player.life === 2) {
        lifeOne.hidden = true;
    } else if (player.life === 1) {
        lifeTwo.hidden = true;
    } else if (player.life === 0) {
        lifeThree.hidden = true;
    }
}

// Add 100 points to scoreboard
const scoreEarned = () => {
    let score = document.getElementById('score'),
        currentScore = parseInt(score.innerText);

    score.innerText = parseInt(currentScore += 100);
}

// Update scoreboard
const updateScore = () => {
    let scoreDiv = document.querySelector('.your-score'),
        score = document.getElementById('score');
        currentScore = parseInt(score.innerText);

    scoreDiv.innerText = currentScore;
}

// Hide modal
const hideModal = () => {
    const modal = document.getElementById('game-over'),
        modalX = document.getElementById('game-over').querySelectorAll('*');

        for (let i=0; i < modalX.length; i++) {
            modalX[i].hidden = true;
        }

    modal.className = 'hide';
}

// Show modal
const showModal = () => {
    const modal = document.getElementById('game-over'),
        modalX = document.getElementById('game-over').querySelectorAll('*'),
        scoreLabel = document.querySelector('.high-score-label'),
        score = document.getElementById('score'),
        endScore = document.querySelector('.your-score');
        currentScore = score.innerText;

    scoreLabel.innerText = 'Game Over! Your score is: ';
    endScore.innerText = currentScore;

        for (let i = 0; i < modalX.length; i++) {
            modalX[i].hidden = false;
        }

    modal.className = 'game-over-modal';
}

// This listens for key presses and sends the keys to your
// handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Play again button
const playAgainButton = document.getElementById('play-again-btn');
playAgainButton.addEventListener('click', () => playAgain())

// Initiate play again
const playAgain = () => {
    let score = document.getElementById('score');

    player.life = 3;
    player.controllable = true;
    score.innerText = 0;

    updateScore();
    hideModal();
}