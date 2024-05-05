const Gameboard = {
    gameboard: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
};

const playerOne = {
    name: "Player One",
    symbol: "X"
};

const playerTwo = {
    name: "Player Two",
    symbol: "O"
}

var winningCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
];

let name1 = prompt("Enter a name for player 1");
console.log(""+name1+" will be assigned the symbol X");
let name2 = prompt("Enter a name for player 2");
console.log(""+name2+" will be assigned the symbol O");
drawBoard();
//ask user for player 1
//ask user for player 2
//start game
//ask player 1 to pick an area on grid for x
//ask player 2 to pick an area on grid for o
//continue till someone wins

function drawBoard () {
    console.log(" ");
    console.log(' ' + (Gameboard.gameboard[0][0] || '1 ') + " | " + (Gameboard.gameboard[0][1] || ' 2 ') + " | " + (Gameboard.gameboard[0][2] || ' 3 '));
    console.log("---------------");
    console.log(' ' + (Gameboard.gameboard[1][0] || '4 ') + " | " + (Gameboard.gameboard[1][1] || ' 5 ') + " | " + (Gameboard.gameboard[1][2] || ' 6 '));
    console.log("---------------");
    console.log(' ' + (Gameboard.gameboard[2][0] || '7 ') + " | " + (Gameboard.gameboard[2][1] || ' 8 ') + " | " + (Gameboard.gameboard[1][2] || ' 9 '));
    console.log(" ");
}

//win function
function checkWin(playerOne, playerTwo) {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if(Gameboard[a] === playerOne && Gameboard[b] === playerOne && Gameboard[c] === playerOne) {
            return true
        } else if (Gameboard[a] === playerTwo && Gameboard[b] === playerTwo && Gameboard[c] === playerTwo) {
            return true
        }
    }
    return false;
}

//tie function
function tie() {
    for (let i = 0; i < Gameboard.length; i++) {
        if (Gameboard[i] === '') {
            return false;
        }
    }
    return true;
}