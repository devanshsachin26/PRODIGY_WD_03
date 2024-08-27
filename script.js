let currentPlayer = 'X';
let gameBoard = [];
let gameOver = false;

for (let i = 1; i <= 9; i++) {
    gameBoard.push(document.getElementById(`cell-${i}`));
}

gameBoard.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

document.getElementById('reset').addEventListener('click', resetGame);

function handleCellClick(event) {
    if (gameOver) return;
    const cell = event.target;
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        checkForWin();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkForWin() {
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

    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        if (gameBoard[combination[0]].textContent === gameBoard[combination[1]].textContent &&
            gameBoard[combination[1]].textContent === gameBoard[combination[2]].textContent &&
            gameBoard[combination[0]].textContent !== '') {
            gameOver = true;
            alert(`Player ${gameBoard[combination[0]].textContent} wins!`);
            return;
        }
    }

    if (!gameBoard.some(cell => cell.textContent === '')) {
        gameOver = true;
        alert('It\'s a draw!');
    }
}

function resetGame() {
    gameBoard.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    currentPlayer = 'X';
    gameOver = false;
}