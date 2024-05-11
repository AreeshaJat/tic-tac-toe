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
    player_one.innerHTML = `Player One: ${playerOne.name}<br>Symbol: X`;

    var playerTwoContainer = document.createElement("div");
    playerTwoContainer.className = "playerTwoContainer";

    var player_two = document.createElement("h6");
    player_two.innerHTML = `Player Two: ${playerTwo.name}<br>Symbol: O`;

    names.append(playerOneContainer);
    playerOneContainer.append(player_one);
    names.append(playerTwoContainer);
    playerTwoContainer.append(player_two);
    displayNameContainer.append(names);
}

function submitInfo() {
    const playerOneName = document.getElementById("playerOne").value;
    const playerTwoName = document.getElementById("playerTwo").value;

    //if playerOneName and playerTwoName are not empty or null
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

document.querySelectorAll('.cell').forEach(cell => {
    //set to false so that when the player clicks on a cell, the 
    //cellClickHandler is called during the bubbling phase(after 
    //reaching the target)
    cell.addEventListener('click', cellClickHandler, false); 
});

function cellClickHandler(event) {
    const clickedCell = event.target;
    const clickedRow = parseInt(clickedCell.dataset.row); //get row number
    const clickedCol = parseInt(clickedCell.dataset.col); //get column number

    //if cell is not empty or game has not started or is finished
    if (Gameboard.gameboard[clickedRow][clickedCol] !== "" || !gameActive) {
        return;
    }

    //sets the player's symbol to the specific row and column on the game board 
    //and then updates the UI to reflect this change
    Gameboard.gameboard[clickedRow][clickedCol] = currentPlayer.symbol;
    updateUI();
    if (checkWin(currentPlayer)) {
        endGame(currentPlayer.name + " won the game 🏆🥇🎊!");
        return;
    }
    if (tie()) {
        endGame("It's a tie!");
        return;
    }

    //if no win/tie then switch player
    switchPlayer();
}

function updateUI() {
    for (let i = 0; i < Gameboard.gameboard.length; i++) {
        for (let j = 0; j < Gameboard.gameboard[i].length; j++) {

            //selects the cell of the game being iterated over and also querySelector finds 
            //an element with `data-row` and `data-col` arrtibutes that match the current
            //row `i` and column `j`
            const cell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
            //sets the selected cell to the value stores in gameboard array
            cell.textContent = Gameboard.gameboard[i][j];
        }
    }
}

function switchPlayer() {
    let turn = document.getElementById('turn');
    if (currentPlayer === playerOne) {
        currentPlayer = playerTwo;
        turn.textContent = `Current Player's Turn: ${playerOne.name}`;
    } else {
        currentPlayer = playerOne;
        turn.textContent = `Current Player's Turn: ${playerTwo.name}`;
    }
}

function endGame(message) {
    document.getElementById('winner').innerHTML = "Game Over" + " " + message;
    document.getElementById('restartMessage').innerHTML = "Press Start Game button to play again";
    gameActive = false;
}

function startGame () {
    //resets the grid
    Gameboard.gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    currentPlayer = playerOne;
    gameActive = true;
    updateUI();
}

document.getElementById('startGame').addEventListener('click', startGame);

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