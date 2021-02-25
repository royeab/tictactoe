const xTurn = 0;
const oTurn = 1;
const emptyCell = -1;

var player = xTurn;
var cells;
var cellsStatus = new Array(9).fill(emptyCell);

window.onload = loadGrid;

function loadGrid() {
   cells = document.getElementsByClassName("tictaccell");
   for (let i = 0; i < cells.length; i++) {
        cells[i].onclick = function(){cellClicked(i)};
    }
}

function cellClicked(cellIndex) {
    if (cellsStatus[cellIndex] == emptyCell) {
        cellsStatus[cellIndex] = player;
        setImage(cellIndex, player);

        if (checkVictory(player)) {
            alert ("Player " + (player + 1) + " wins!");
            location.reload();
        }

        else if (checkEnd()) {
            alert ("Tie!");
            location.reload();
        }
        

        switchTurn();
    }
}

function setImage(cellIndex, player) {
    if (player == xTurn) {
        cells[cellIndex].querySelectorAll("img")[0].src = "https://image.freepik.com/free-icon/x-symbol_318-1407.jpg";
    }

    else {
        cells[cellIndex].querySelectorAll("img")[0].src = "https://image.freepik.com/free-icon/black-circle-white_318-10912.jpg";
    }
    
}

function checkRow(toCheck, player) {
    return toCheck.every(cell => cell == player);
}

function checkVictory(player) {
    if (checkRow(cellsStatus.slice(0, 3), player)) {
        return true;
    }

    else if (checkRow(cellsStatus.slice(3, 6), player)) {
        return true;
    }

    else if (checkRow(cellsStatus.slice(6, 9), player)) {
        return true;
    }

    else if (checkRow([cellsStatus[0], cellsStatus[3], cellsStatus[6]], player)) {
        return true;
    }

    else if (checkRow([cellsStatus[1], cellsStatus[4], cellsStatus[7]], player)) {
        return true;
    }

    else if (checkRow([cellsStatus[2], cellsStatus[5], cellsStatus[8]], player)) {
        return true;
    }

    else if (checkRow([cellsStatus[0], cellsStatus[4], cellsStatus[8]], player)) {
        return true;
    }

    else if (checkRow([cellsStatus[2], cellsStatus[4], cellsStatus[6]], player)) {
        return true;
    }

    else {
        return false;
    }
}

function checkEnd() {
    return cellsStatus.every(status => status != emptyCell);
}

function switchTurn() {
    player = 1 - player;
}