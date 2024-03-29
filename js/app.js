/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- If a player rolls 6 twice he loses all of his GLOBAL points

*/

let scores, roundScore, activePlayer, dice, diceImage, gamePlaying, previousDice

init();

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    resetAll();
}

function rollDice() {
    if (gamePlaying) {
        createDice();

        if (previousDice == 6 && dice == 6) {
            rollTwoSixes();
        } else if (dice !== 1) {
            addRoundScore();
        } else {
            GameStateIfDiceRollsOne();
        }
        previousDice = dice;
    }
}

function hold() {
    if (gamePlaying) {
        gameWon();
        saveCurrentScore();
        changeActivePlayer();
        changeActivePanel();
    }

}

document.querySelector(".btn-roll").addEventListener('click', rollDice)
document.querySelector(".btn-hold").addEventListener('click', hold)
document.querySelector(".btn-new").addEventListener('click', init)


function createDice() {
    dice = Math.floor(Math.random() * 6) + 1;
    diceImage = document.querySelector(".dice")
    diceImage.style.display = 'block';
    diceImage.src = 'images/dice-' + dice + ".png"
}

function addRoundScore() {
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).innerHTML = roundScore;
}

function diceRolledOne() {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).innerHTML = roundScore;
}

function changeActivePlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
}

function changeActivePanel() {
    document.querySelector(".player-0-panel").classList.toggle('active')
    document.querySelector(".player-1-panel").classList.toggle('active')
}

function removeDice() {
    diceImage = document.querySelector(".dice")
    diceImage.style.display = 'none';

}

function saveCurrentScore() {
    scores[activePlayer] += roundScore
    document.getElementById('score-' + activePlayer).innerHTML = scores[activePlayer]
    document.querySelector('#current-' + activePlayer).innerHTML = 0;
    removeDice();
    roundScore = 0;
}

function gameWon() {

    let input = document.querySelector('.final-score').value;
    
    if(input) {
       winningScore = input;
    } else {
        winningScore = 10
    }

    if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = ' Winner';
        changeToWinnerPanel()
        gamePlaying = false;
    }
}

function changeToWinnerPanel() {
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
}

function resetAll() {
    document.querySelector(".dice").style.display = 'none';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.add('active')
}

function rollTwoSixes() {
    scores[activePlayer] = 0;
    document.querySelector('#score-' + activePlayer).textContent = '0';
    changeActivePlayer();
    changeActivePanel();
}

function GameStateIfDiceRollsOne(){
    diceRolledOne();
    changeActivePlayer();
    changeActivePanel();
    removeDice();
}