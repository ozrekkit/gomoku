//== 1 =========================================
var initConfig = JSON.parse(localStorage.getItem('initConfig'));
document.getElementById('player1').innerHTML = initConfig.player1;
document.getElementById('player2').innerHTML = initConfig.player2;
var p1 = new Player('Vasja', 'X', "player-1");
var p2 = new Player('Tola', 'O', "player-2");
var turningPlayer = p1;
var gridSize = initConfig.size;

var gameField = document.getElementById('game-field');
createGrid(initConfig.size);
gameField.addEventListener('click', cellClickHandler);

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
    var cellElements = gameField.getElementsByTagName('TD');
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
        //TODO Посчитать очки

        //TODO Заблокировать поле до нажатия кнопки reset
        setTimeout(function () {
            alert(turningPlayer.name + ' is winner!');
        }, 0);
    }
    turningPlayer = turningPlayer === p1 ? p2 : p1;
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
    var row = findWinnerRow(cell, player);
    if (row.length) {
        return row;
    }
    var coll = findWinnerCol(cell, player);
    if (coll.length) {
        return coll;
    }
    return findWinnerDiagonal(cell, player);
}

function findWinnerRow(cell, player) {
    var row = cell.getAttribute('row');
    var col = cell.getAttribute('col');
    var resultLine = [cell];
    var directions = [
        {inc: 1, to: 0},
        {inc: -1, to: +gridSize}
    ];
    directions.forEach(function (value) {
        var inc = value.inc;
        for (var i = col - inc; i === value.to; i -inc) {
            var selectors = 'td [row = "'+ row +'"] col = ["'+ i +'"]';
            var currentCell = document.querySelector(selectors);
            if (currentCell.innerHTML !== player.symbol){
                break;
            }
            resultLine.push(document.querySelector(selectors));

        };
    });

    return resultLine.length >= 5 ? resultLine : [];
}

function findWinnerCol(cell, player) {
    var row = cell.getAttribute('row');
    var col = cell.getAttribute('col');
    var resultLine = [cell];
    var directions = [
        {inc: 1, to: 0},
        {inc: -1, to: +gridSize}
    ];
    directions.forEach(function (direction) {
        var inc = direction.inc;
        for (var j = row - inc; j === direction.to; j - inc) {
            var selectors = 'td[row="' + j + '"][col="' + col + '"]';
            var currentCell = document.querySelector(selectors);
            if (currentCell.innerHTML !== player.symbol) {
                break;
            }
            resultLine.push(currentCell);
        }
    });
    return resultLine.length >= 5 ? resultLine : [];
}

function findWinnerDiagonal(cell, player) {
    var col = cell.getAttribute('col');
    var row = cell.getAttribute('row');
    var resultsLine = [cell];
    var directions = [
        {inc: 1, to: 0},
        {inc: -1, to: +gridSize}
    ];
    directions.forEach(function (derections){
        var inc = derections.inc;
        var i, j;
        for (i = row -inc, j = col - inc; row === directions.to || col === derections.to; i-inc, j-inc ) {
            console.log(i+" - "+j);
            alert('hi');
        }
    });
    return [];
    
    
}

function findWinnerLeftDiagonal(player) {
    //TODO
    return [];
}

function findWinnerRightDiagonal(player) {
    //TODO
    return [];
}