/*Create a Tic-Tac-Toe game grid using your HTML element of choice.
When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
A heading should say whether it is X's or O's turn and change with each move made.
A button should be available to clear the grid and restart the game.
When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.*/

const $boxes = $('.box');
const $alertStart = $('#alertStart');
const $alertWinner = $('#alertWinner');
const $alertDraw = $('#alertDraw');
const $p1 = $('#p1');
const $p2 = $('#p2');
const $symbolSelect = $('#symbolSelect');
const $startBtn = $('#startBtn');
const $resetBtn = $('#resetBtn');

let player1 = 'X';
let player2 = 'O';
let turn = 0;
let winner = false;
let currentPlayer = '';

// these are all possible winning combos for the 5x5 grid
const winningOutcomes = [
    [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19], [20, 21, 22, 23, 24], 
    [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23], [4, 9, 14, 19, 24], 
    [0, 6, 12, 18, 24], [4, 8, 12, 16, 20] 
];

$alertStart.hide();
$alertWinner.hide();
$alertDraw.hide();

// this function is to check if there is a winner or draw
const checkWinner = () => {
    for (const combo of winningOutcomes) {
        const [a, b, c, d, e] = combo;
        const boxA = $boxes.eq(a).text() || $boxes.eq(a).find('img').attr('alt');
        const boxB = $boxes.eq(b).text() || $boxes.eq(b).find('img').attr('alt');
        const boxC = $boxes.eq(c).text() || $boxes.eq(c).find('img').attr('alt');
        const boxD = $boxes.eq(d).text() || $boxes.eq(d).find('img').attr('alt');
        const boxE = $boxes.eq(e).text() || $boxes.eq(e).find('img').attr('alt');

        if (boxA && boxA === boxB && boxB === boxC && boxC === boxD && boxD === boxE) {
            $alertWinner.text(`Slayer ${currentPlayer === player1 ? '1' : '2'} wins!`).show().fadeOut(5000);
            winner = true;
            return;
        }
    }

    if (turn === 24 && !winner) {
        $alertDraw.show().fadeOut(5000);
    }
};

// this is to reset the game
const resetGame = () => {
    $boxes.html('');
    turn = 0;
    winner = false;
    currentPlayer = player1;
    $p1.addClass('glass-container');
    $p2.removeClass('glass-container');
};

// my favorite function, this gives the players a choice of symbols
$symbolSelect.on('change', function () {
    const choice = $(this).val();

    if (choice === '1') {
        player1 = 'X';
        player2 = 'O';
    } else if (choice === '2') {
        player1 = '<img src="images/ghostdonut_green.gif" alt="A">';
        player2 = '<img src="images/ghostdonut_pink.gif" alt="B">';
    } else if (choice === '3') {
        player1 = '<img src="images/latte_mint.gif" alt="C">';
        player2 = '<img src="images/latte_rose.gif" alt="D">';
    } else if (choice === '4') {
        player1 = '<img src="images/maca_strawb.png" alt="E">';
        player2 = '<img src="images/maca_lavender.png" alt="F">';
    }

    resetGame();
});

// this will start the game and handle box clicks
const startGame = () => {
    currentPlayer = player1;
    $alertStart.show().fadeOut(3000);
    $alertWinner.hide();
    $alertDraw.hide();
    $p1.addClass('glass-container');
    $p2.removeClass('glass-container');

    $('#grid').on('click', '.box', function () {
        if ($(this).html() === '' && !winner) {
            $(this).html(currentPlayer);
            turn++;

            if (turn > 4) {
                checkWinner();
            }

            if (!winner) {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                $p1.toggleClass('glass-container');
                $p2.toggleClass('glass-container');
            }
        }
    });
};

//buttons to start and reset the game
$startBtn.on('click', startGame);
$resetBtn.on('click', resetGame);