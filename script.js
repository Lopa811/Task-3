const board = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
const modeButton = document.getElementById('mode');

let currentPlayer = 'X';
let gameActive = true;
let playAgainstComputer = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function checkWinner() {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            status.textContent = `Player ${cells[a].textContent} wins!`;
            gameActive = false;
            return;
        }
    }
    if (cells.every(cell => cell.textContent)) {
        status.textContent = 'Draw!';
        gameActive = false;
    }
}


function handleClick(event) {
    const cell = event.target;
    if (cell.textContent || !gameActive) return;
    
    cell.textContent = currentPlayer;
    checkWinner();
    if (gameActive && playAgainstComputer && currentPlayer === 'O') {
        setTimeout(computerPlay, 500); // Added delay for better experience
    }
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}


function computerPlay() {
    const emptyCells = cells.filter(cell => !cell.textContent);
    if (emptyCells.length === 0) return;
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = 'O';
    checkWinner();
    if (gameActive) {
        currentPlayer = 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}


function resetGame() {
    cells.forEach(cell => cell.textContent = '');
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}


function toggleMode() {
    playAgainstComputer = !playAgainstComputer;
    modeButton.textContent = playAgainstComputer ? 'Play vs Player' : 'Play vs Computer';
    resetGame();
}


cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
modeButton.addEventListener('click', toggleMode);


resetGame();