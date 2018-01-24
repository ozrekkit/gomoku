var p1 = new Player('Vasja', 'X');
var p2 = new Player('Tola', 'O');
// var players = [p1, p2];

var currentSymbol = p1.symbol;

var gameFieldElement = document.getElementById('game-field');
gameFieldElement.addEventListener('click', cellClick);

var resetBtnElement = document.getElementById('reset-btn');
resetBtnElement.addEventListener('click', resetGameField);

function cellClick(event) {
    var target = event.target;
    if (!isTurnAvailable(target)) {
        return;
    }
    doTurn(target);
}

function resetGameField() {
    var cellElements = gameFieldElement.getElementsByTagName('TD');
    for (var i = 0; i < cellElements.length; i++) {
        cellElements[i].innerHTML = '';
    }
}

function doTurn(target) {
    console.log('turn: ' + currentSymbol);
    target.innerHTML = currentSymbol;
    currentSymbol = currentSymbol === p1.symbol ? p2.symbol : p1.symbol;
    getWinner();
}

function isTurnAvailable(target) {
    return target.tagName === 'TD' && !target.innerHTML;
}

function getWinner() {
    var winnerSymbol = findWinnerSymbol();
    if (winnerSymbol) {
        return getPlayerBySymbol(winnerSymbol);
    }
}

function findWinnerSymbol() {
    //TODO
    return '...';
}

function getPlayerBySymbol(symbol) {
    if (symbol === p1.symbol) {
        return p1;
    }
    return p2;
}

// function getPlayerBySymbol(symbol) {
//     return players.filter(function(player) {
//        return player.symbol === symbol;
//     })[0];
// }

function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
    this.score = 0;
}
