// Game winning combinations: 
// [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

// Gameboard Module
const gameBoard = (() =>
{
let gameSpaces = ['','','','','','','','',''];
console.log(gameSpaces)

const resetBoard = () => {
    for(let i = 0; i < gameSpaces.length; i++){
        if (gameSpaces[i] == 'X' || 'O') {
            gameSpaces[i] = '';
        }
    }
    let board = document.getElementsByClassName('space');
        for (let space of board) {
            space.innerHTML = '';
        }
        console.log(gameSpaces);
        
        // Reset currentPlayer
        gameState.currentPlayerisX = true;
        gameState.totalMoves = 0;
        gameState.movesO = 0;
        gameState.movesX = 0;
        console.log(gameState.totalMoves);
        console.log(gameState.movesX);
        console.log(gameState.movesO);

}
let resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', resetBoard);
return { gameSpaces, resetBoard }
})();

// HTML Display Module 
const displayController = (() => {
    const render = () => {
        let board = document.getElementsByClassName('space');
        Array.from(board).forEach(function(boardSpace){
            boardSpace.addEventListener('click', tileClick);
        });
        for (let space of board) {
            space.innerHTML = gameBoard.gameSpaces[Number(space.dataset.space)];
        }

    }
    const tileClick = function(event)
    {
        console.log('space was clicked!');
        console.log(this);
        if (gameState.currentPlayerisX === true ) {
            if (gameBoard.gameSpaces[Number(this.dataset.space)] == "") {
                gameBoard.gameSpaces[Number(this.dataset.space)] = 'X';
                gameState.movesX++;
                gameState.totalMoves++;
                gameState.currentPlayerisX = false;
            }
        } else if (gameState.currentPlayerisX === false) {
            if (gameBoard.gameSpaces[Number(this.dataset.space)] == "") {
                gameBoard.gameSpaces[Number(this.dataset.space)] = 'O';
                gameState.movesO++;
                gameState.totalMoves++;
                gameState.currentPlayerisX = true;
            }
        }
        console.log(gameBoard.gameSpaces);
        console.log(gameState.totalMoves);
        console.log(gameState.movesX);
        console.log(gameState.movesO);
        render();

    }
    return {render, tileClick}
})();

//Render the gameboard array onto HTML
displayController.render();


// Game State
const gameState = (() => {    
let totalMoves = 0;
let movesO = 0;
let movesX = 0;

// True is P1, False is P2
let currentPlayerisX = true;

// const gameEnd = (totalMoves) => {
// if (totalMoves >= 9) {
//     // inner html blah blah game over screen or something
// }
// }

const gameCheck = () => {
    // Check the array each turn based on the winning combinations  
}

return { totalMoves, movesO, movesX, currentPlayerisX };
})();



// Player Function Factory
const Player = () => {
let playerWins = 0;
let playerLosses = 0;
    return {playerWins, playerLosses}
}

//Players 
const playerX = Player('X');
const playerO = Player('O');