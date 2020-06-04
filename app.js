// Game winning combinations: 
// [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

// Gameboard Module
const gameBoard = (() =>
{
let gameSpaces = ['','','','','','','','',''];
console.log(gameSpaces)
const resetBoard = () => {
    gameSpaces = ['','','','','','','','',''];
    let board = document.getElementsByClassName('space');
        for (let space of board) {
            space.innerHTML = '';
        }
        console.log(gameSpaces);
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
        // this.innerHTML = 'X';
        if (gameBoard.gameSpaces[Number(this.dataset.space)] == "") {
            gameBoard.gameSpaces[Number(this.dataset.space)] = 'X'
        }
        console.log(gameBoard.gameSpaces);
        render()

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

const gameEnd = (totalMoves) => {
if (totalMoves >= 9) {
    // inner html blah blah game over screen or something
}
}

const gameCheck = () => {
    // Check the array each turn based on the winning combinations  
}

return { totalMoves, movesO, movesX };
})();



// Player Function Factory
const Player = (piece) => {
    const addPiece = (space) => {
        // piece is set to space in which data set is pulled from: 
        gameBoard.gameSpaces[space.dataset.space] = piece;
        displayController.render();
    } 
    return {addPiece}
}

//Players 
const playerX = Player('X');
const playerO = Player('O');