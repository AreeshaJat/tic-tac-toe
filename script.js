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

let currentPlayer = playerOne;

//row then column
var winningCombinations = [
    [[0, 0], [0, 1], [0, 2]],   
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]], 
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
];

var modal = document.getElementById("myModal");
var btn = document.getElementById("addplayerNames");
var span = document.getElementById("close");
var cancel = document.getElementById("cancel");
var submit = document.getElementById("submit");

function openModal () {
    modal.style.display = "block";
}

function closeModal () {
    modal.style.display = "none";
}

btn.onclick = openModal;
span.onclick = closeModal;
cancel.onclick = closeModal;
submit.onclick = submitInfo;

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function displayOnPage () {
    var displayNameContainer = document.querySelector(".displayName");

    //clear existing content
    displayNameContainer.innerHTML = "";

    var names = document.createElement("div");
    names.className = "names";

    var playerOneContainer = document.createElement("div");
    playerOneContainer.className = "playerOneContainer";

    var player_one = document.createElement("h6");
    player_one.textContent = `Player One: ${playerOne.name}`;

    var playerTwoContainer = document.createElement("div");
    playerTwoContainer.className = "playerTwoContainer";

    var player_two = document.createElement("h6");
    player_two.textContent = `Player Two: ${playerTwo.name}`;

    names.append(playerOneContainer);
    playerOneContainer.append(player_one);
    names.append(playerTwoContainer);
    playerTwoContainer.append(player_two);
    displayNameContainer.append(names);
}

function submitInfo() {
    const playerOneName = document.getElementById("playerOne").value;
    const playerTwoName = document.getElementById("playerTwo").value;

    if (playerOneName && playerTwoName) {
        playerOne.name = playerOneName;
        playerTwo.name = playerTwoName;
        displayOnPage();
        closeModal();
    } else {
        alert("Please enter names for both players.");
    }

    //clear input fields
    document.getElementById("playerOne").value = "";
    document.getElementById("playerTwo").value = "";
}

//have a start game button

function startGame () {

    //ask user for player 1

    //playerOne.name = prompt("Enter a name for player 1");
    //ask user for player 2
    //playerTwo.name = prompt("Enter a name for player 2");

    //start game
    while (true) {
        drawBoard();
        let player;
        if (currentPlayer === playerOne) {
            player = playerOne;
        } else {
            player = playerTwo;
        }

        let symbol = currentPlayer.symbol;
        let playerName = currentPlayer.name;

        //ask player 1 to pick an area on grid for x then
        //ask player 2 to pick an area on grid for o
        let move = prompt(""+playerName+" Enter a number between 1-9 to place your "+symbol+"");

        //translates the user input string to int and then subtracts 1 since arrays are 0-8
        let position = parseInt(move) - 1;

        //checks if position variable is not a number, or less than 1, or greater than 9, or if the position is not already filled 
        //Math.floor(position / 3) to get row index and position % 3 to get column index
        if (isNaN(position) || position < 0 || position > 8 || Gameboard.gameboard[Math.floor(position / 3)][position % 3] !== "") {
            console.log("Invalid move. Try again.");
            continue;
        }

        //update gameboard
        Gameboard.gameboard[Math.floor(position / 3)][position % 3] = symbol;

        if(checkWin(currentPlayer)) {
            drawBoard();
            console.log(""+playerName+" won the game");
            break;
        }

        if (tie()) {
            drawBoard();
            console.log("It's a tie");
            break;
        }

        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
    }
}

//display current state of the game
function drawBoard () {
    console.log(" ");
    console.log(' ' + (Gameboard.gameboard[0][0] || ' ') + " | " + (Gameboard.gameboard[0][1] || '  ') + " | " + (Gameboard.gameboard[0][2] || '  '));
    console.log("---------------");
    console.log(' ' + (Gameboard.gameboard[1][0] || ' ') + " | " + (Gameboard.gameboard[1][1] || '  ') + " | " + (Gameboard.gameboard[1][2] || '  '));
    console.log("---------------");
    console.log(' ' + (Gameboard.gameboard[2][0] || ' ') + " | " + (Gameboard.gameboard[2][1] || '  ') + " | " + (Gameboard.gameboard[2][2] || '  '));
    console.log(" ");
}

//win function
function checkWin(player) {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        //used [0][1] to access row and column
        //the way the winningCombination is structured is that 
        //a[0] represents the row index of the first cell in the winning combination
        //and a[1] represents the column index of that cell
        //i.e. [[0, 0], [0, 1], [0, 2]] for a to access the first array and the first cordinates it would [a[0]][a[1]]
        if(Gameboard.gameboard[a[0]][a[1]] === player.symbol && Gameboard.gameboard[b[0]][b[1]] === player.symbol && Gameboard.gameboard[c[0]][c[1]] === player.symbol) {
            return true;
        }
    }
    return false;
}

//tie function
function tie() {
    //iterating over each cell of the game board
    for (let i = 0; i < Gameboard.gameboard.length; i++) {
        for (let j = 0; j < Gameboard.gameboard.length; j++) {
            //if any cells are still empty return false, not tie
            if (Gameboard.gameboard[i][j] === '') {
                return false;
            }
        }
    }
    //if it completes iteration w/o finding any empty cell return true, tie
    return true;
}