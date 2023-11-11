let money = 0;
let level = 1;
let weight = 20;
let moneyDiv = document.querySelector('.money > h2');
let levelDiv = document.querySelector('.level > h2 > em');
let weightDiv = document.querySelector('.weight > h2 > em');
let plusButton = document.querySelector('.plus');
let updateOneButton = document.querySelector('.update-one');
let updateTwoButton = document.querySelector('.update-two');
let updateThreeButton = document.querySelector('.update-three');
let updateFourButton = document.querySelector('.update-four');
let updateFiveButton = document.querySelector('.update-five');
let body = document.querySelector('body');
function lose(rule) {
    removeStatistics();
    if (rule == 1) {
        let body = document.querySelector('body');
        body.setAttribute('class', 'lose');
        body.innerHTML = '<h2>Поражение!</h2><p>У тебя кончились деньги.</p><a href="javascript:window.location.reload();">Начать сначала</a>';
    } else {
        let body = document.querySelector('body');
        body.setAttribute('class', 'lose');
        body.innerHTML = '<h2>Поражение!</h2><p>Ты потерял почти весь свой вес.</p><a href="javascript:window.location.reload();">Начать сначала</a>';
    }
}
function editStatistics(type, value) {
    if (type == 'money') {
        money = money + value;
        localStorage.setItem(type, money);
        moneyDiv.innerHTML = money + ' <img src="images/money.png">';
        if (money < 0) {
            lose(1);
        }
    } else if (type == 'level') {
        level = level + value;
        localStorage.setItem(type, level);
        levelDiv.innerHTML = level;
    } else if (type == 'weight') {
        weight = weight + value;
        localStorage.setItem(type, weight);
        weightDiv.innerHTML = weight + ' кг';
    }
}
function setInitialStatistics() {
    let storageMoney = localStorage.getItem('money');
    let storageLevel = localStorage.getItem('level');
    let storageWeight = localStorage.getItem('weight');
    if (storageMoney) {
        money = Number(storageMoney);
        moneyDiv.innerHTML = storageMoney + ' <img src="images/money.png">';
    } else {
        moneyDiv.innerHTML = money + ' <img src="images/money.png">';
    }
    if (storageLevel) {
        level = Number(storageLevel);
        levelDiv.innerHTML = storageLevel;
    } else {
        levelDiv.innerHTML = level;
    }
    if (storageWeight) {
        weight = Number(storageWeight);
        weightDiv.innerHTML = storageWeight + ' кг';
    } else {
        weightDiv.innerHTML = weight + ' кг';
    }
}
function buy(price, mass) {
    editStatistics('money', -price);
    editStatistics('weight', mass);
}
function removeStatistics() {
    localStorage.removeItem('money');
    localStorage.removeItem('level');
    localStorage.removeItem('weight');
}
plusButton.onclick = () => {
    editStatistics('money', level);
}
updateOneButton.onclick = () => {
    editStatistics('money', -100);
    editStatistics('level', 1);
}
updateTwoButton.onclick = () => {
    editStatistics('money', -300);
    editStatistics('level', 3);
}
updateThreeButton.onclick = () => {
    editStatistics('money', -500);
    editStatistics('level', 5);
}
updateFourButton.onclick = () => {
    editStatistics('money', -1000);
    editStatistics('level', 10);
}
updateFiveButton.onclick = () => {
    editStatistics('money', -5000);
    editStatistics('level', 50);
}
setInterval(() => {
    editStatistics('money', level - 1);
}, 1000);
setInterval(() => {
    editStatistics('weight', -1);
    if (weight <= 5) {
        lose(2);
    }
}, 10000);
body.onclick = () => {
    let audio = new Audio('sounds/tap.mp3');
    audio.play();
}
setInitialStatistics();