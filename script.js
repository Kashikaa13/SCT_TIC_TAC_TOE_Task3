const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const twoPlayerModeBtn = document.getElementById('twoPlayerMode');
const vsComputerModeBtn = document.getElementById('vsComputerMode');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let isVsComputer = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    updateBoard(index);
    checkWinner();
    if (isVsComputer && isGameActive) {
        computerMove();
        checkWinner();
    }
};

const updateBoard = (index) => {
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer === 'X' ? 'O' : 'X'} has won!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusText.textContent = `It's a draw!`;
        isGameActive = false;
        return;
    }

    statusText.textContent = `${currentPlayer}'s turn`;
};

const computerMove = () => {
    let availableCells = board
        .map((cell, index) => (cell === '' ? index : null))
        .filter(index => index !== null);

    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    updateBoard(randomIndex);
};

const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => (cell.textContent = ''));
    statusText.textContent = `${currentPlayer}'s turn`;
};

const setTwoPlayerMode = () => {
    isVsComputer = false;
    restartGame();
};

const setVsComputerMode = () => {
    isVsComputer = true;
    restartGame();
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
twoPlayerModeBtn.addEventListener('click', setTwoPlayerMode);
vsComputerModeBtn.addEventListener('click', setVsComputerMode);

// Initialize the game
statusText.textContent = `${currentPlayer}'s turn`;
