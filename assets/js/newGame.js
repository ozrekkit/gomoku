var submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener('click', function () {
    var form = document.forms['new-game-form'];
    var sizeSelectElem = form.size;
    var initConfig = {
        player1: form.player1.value,
        player2: form.player2.value,
        size: sizeSelectElem.options[sizeSelectElem.selectedIndex].value
    };
    localStorage.setItem('initConfig', JSON.stringify(initConfig));
});