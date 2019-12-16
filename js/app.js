/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores , roundScore , activePlayer , dice , diceImage

scores = [0,0]
roundScore = 0;
activePlayer= 0;
document.querySelector(".dice").style.display = 'none';

function rollDice() {
    dice = Math.floor(Math.random() * 6) + 1;

    diceImage = document.querySelector(".dice")
    diceImage.style.display = 'block';
    diceImage.src = 'images/dice-' + dice + ".png"
}

document.querySelector(".btn-roll").addEventListener('click' , rollDice)