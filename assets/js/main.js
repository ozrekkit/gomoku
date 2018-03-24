//== 1 =========================================
var initConfig = JSON.parse(localStorage.getItem('initConfig'));
document.getElementById('player1').innerHTML = initConfig.player1;
document.getElementById('player2').innerHTML = initConfig.player2;
var p1 = new Player('Vasja', 'X', "player-1");
var p2 = new Player('Tola', 'O', "player-2");
var turningPlayer = p1;
var gridSize = initConfig.size;
var lineLengthForWin = 5;

var gameField = document.getElementById('game-field');
createGrid(initConfig.size);
gameField.addEventListener('click', cellClickHandler);
var continueGameBtn = document.getElementById("continue-game-btn");
continueGameBtn.addEventListener('click', resetClickHandler);

// gameField.removeEventListener('click', cellClickHandler);
// var resetBtnElement = document.getElementById('reset-btn');
// resetBtnElement.addEventListener('click', resetClickHandler);

//== 2 =========================================
function createGrid(size) {
    var grid = document.createDocumentFragment();
    for (var i = 1; i <= size; i++) {
        var row = document.createElement("tr");
        for (var j = 1; j <= size; j++) {
            var cell = document.createElement("td");
            cell.setAttribute('row', i);
            cell.setAttribute('col', j);
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
    gameField.appendChild(grid);
}

function cellClickHandler(event) {
    var target = event.target;
    if (isTurnAvailable(target)) {
        doTurn(target);
    }
}

function resetClickHandler() {
    var cellElements = gameField.getElementsByTagName('td');
    for (var i = 0; i < cellElements.length; i++) {
        cellElements[i].innerHTML = '';
    }
}

function Player(name, symbol, scoreLabelId) {
    this.name = name;
    this.symbol = symbol;
    this.score = 0;
    this.incrementScore = function () {
        var scoreLabel = document.getElementById(scoreLabelId);
        scoreLabel.innerHTML = ++this.score;
    }
}

//== 3 =========================================

function doTurn(cell) {
    var currentSymbol = turningPlayer.symbol;
    console.log('turn: ' + currentSymbol);
    cell.innerHTML = currentSymbol;
    var winnerLine = findWinnerLine(cell, turningPlayer);
    if (winnerLine.length) {
        turningPlayer.incrementScore();
        highlightLine(winnerLine);
        $('#modalInfo')
            .on('show.bs.modal', function () {
                var elementById = document.getElementById("winnerLabel");
                elementById.innerHTML = turningPlayer.name + " is winner!!!";
            })
            .modal({
                backdrop: 'static',
                keyboard: false
            })
            .modal('toggle');
    } else {
        turningPlayer = turningPlayer === p1 ? p2 : p1;
    }
}


function highlightLine(line) {
    for (var i = 0; i < line.length; i++) {
        line[i].style.backgroundColor = 'yellow';
    }
}

function isTurnAvailable(target) {
    return target.tagName === 'TD' && !target.innerHTML;
}

//== 4 =========================================
function findWinnerLine(cell, player) {
    var r = +cell.getAttribute('row');
    var c = +cell.getAttribute('col');
    var row = findWinnerRow(r, c, player);
    row.push(cell);
    if (row.length >= lineLengthForWin) {
        return row;
    }
    var coll = findWinnerCol(r, c, player);
    coll.push(cell);
    if (coll.length >= lineLengthForWin) {
        return coll;
    }
    var leftDiagonal = findWinnerLeftDiagonal(r, c, player);
    leftDiagonal.push(cell);
    if (leftDiagonal.length >= lineLengthForWin) {
        return leftDiagonal;
    }
    var rightDiagonal = findWinnerRightDiagonal(r, c, player);
    rightDiagonal.push(cell);
    if (rightDiagonal.length >= lineLengthForWin) {
        return rightDiagonal;
    }
    return [];
}

function findWinnerRow(row, col, player) {
    var resultLine = [];
    var directions = [
        {inc: 1, to: 0},
        {inc: -1, to: +gridSize}
    ];
    directions.forEach(function (direction) {
        var inc = direction.inc;
        for (var i = col - inc; i !== direction.to; i -= inc) {
            var selectors = 'td[row="' + row + '"][col="' + i + '"]';
            var cell = gameField.querySelector(selectors);
            if (cell.innerHTML !== player.symbol) {
                break;
            }
            resultLine.push(gameField.querySelector(selectors));
        }
    });
    return resultLine;
}

function findWinnerCol(row, col, player) {
    var resultLine = [];
    var directions = [
        {inc: 1, to: 0},
        {inc: -1, to: +gridSize}
    ];
    directions.forEach(function (direction) {
        var inc = direction.inc;
        for (var j = row - inc; j !== direction.to; j -= inc) {
            var selectors = 'td[row="' + j + '"][col="' + col + '"]';
            var cell = gameField.querySelector(selectors);
            if (cell.innerHTML !== player.symbol) {
                break;
            }
            resultLine.push(cell);
        }
    });
    return resultLine;
}

function findWinnerLeftDiagonal(row, col, player) {
    var resultLine = [];
    var directions = [
        {inc: 1, to: 0},
        {inc: -1, to: +gridSize}
    ];
    directions.forEach(function (direction) {
        var inc = direction.inc;
        for (var r = row - inc, c = col - inc; r !== direction.to || c !== direction.to; r -= inc, c -= inc) {
            var selectors = 'td[row="' + r + '"][col="' + c + '"]';
            var cell = gameField.querySelector(selectors);
            if (cell.innerHTML !== player.symbol) {
                break;
            }
            resultLine.push(cell);
        }
    });
    return resultLine;
}

function findWinnerRightDiagonal(row, col, player) {
    var resultLine = [];
    var directions = [
        {inc: 1, from: 0, to: +gridSize},
        {inc: -1, from: +gridSize, to: 0}
    ];
    directions.forEach(function (direction) {
        var offset = direction.inc;
        for (var r = row - offset, c = col + offset; r !== direction.from || c !== direction.to; r -= offset, c += offset) {
           var selectors = 'td[row="' + r + '"][col="' + c + '"]';
           var cell = gameField.querySelector(selectors);
           if (cell.innerHTML !== player.symbol) {
               break;
           }
           resultLine.push(cell);
        }
    });
    return resultLine;
}
