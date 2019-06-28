var canvas = document.getElementById("Canvas");
//var buyBtn = document.getElementById("buy");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height/2;
//Скорость движения шара
var dx = 0.2;
var dy = 0.2;

var dxFactor = 1;
var dyFactor = 1;
//Шар
var ballRadius = 10;
var radius = ballRadius/2 + (ballRadius/7.5);

var edit = true;

//Ракетка
var paddleHeight = 10;
var paddleWidth = 70;
var paddleStartX = (canvas.width-paddleWidth)/2;

//Движение ракетки
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var score = 0;
var price = 1;
var colorPrice = 120;

var login = "dev";
var password = "6";
var acess = false;

var mooveSpeedW = "mooveSpeedWrite";
var addMoney = "addMoney";
var mooveSpeedBeforeDX = 0;
var mooveSpeedBeforeDY = 0;

if (localStorage.getItem("money") > 0) {
    score = localStorage.getItem("money");
}

else {
    score = 0;
}

acess = localStorage.getItem("acess");

localStorage.getItem("price") > 1 ? price = localStorage.getItem("price") : price = 1;

//if (localStorage.getItem("speedX") != 0.1 || localStorage.getItem("speedX") != -0.1){
    dx = localStorage.getItem("speedX");
//}
if (dx == 0 || dx == null){
    dx = 0.2;
}


var colorID = 0;

// else {
//     dx = 1.3;
// }

// if (localStorage.getItem("speedY") != 0.2 || localStorage.getItem("speedY") != -0.2){
    dy = localStorage.getItem("speedY");
// }

// else {
//     dy = 1;
// }
if (dy == 0 || dy == null) {
    dy = 0.3;
}




// if (dxFactor == null) {
//     dxFactor = 1;
// }

// if (dyFactor == null) {
//     dyFactor = 1.3;
// }

function colorIDCheck() {
    if (colorID == 0) {
        ctx.fillStyle = "#0095DD";
    }
    if (colorID == 1) {
        ctx.fillStyle = "#FF3900"; // Оранжевый
    }
    if (colorID == 2) {
        ctx.fillStyle = "#BE008A"; // Pink
    }
    if (colorID == 3) {
        ctx.fillStyle = "#530FAD"; // Фиолетовый
    }
    if (colorID == 4) {
        ctx.fillStyle = "#00AC6B"; // izumrud
    }
    if (colorID == 5) {
        ctx.fillStyle = "#67E300"; // salat
    }
    if (colorID == 6) {
        ctx.fillStyle = "#2618B1"; // dark blude
    }
    if (colorID == 7) {
        ctx.fillStyle = "#FEE600"; // yellow
    }
    if (colorID == 8) {
        ctx.fillStyle = "#009F89"; // Бесплатный цвет
    }
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function wallsColission() {
    if (y + dy - radius < 0) {
        dy = -dy;
        score++;
    }

    if (y + dy + radius > canvas.height) {
        dy = -dy;
        score++;
    }

    if (x + dx - radius < 0){
        dx = -dx;
        score++;
    }

    if (x + dx + radius > canvas.width){
        dx = -dx;
        score++;
    }
}



function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    colorIDCheck();
    ctx.fill();
    ctx.closePath();
}




document.getElementById('buy').onclick = function() {
    if (score < price) {
        alert("Недостаточно средств");
    }

    else {
        if (edit == false) {
            alert ("Скорость слишком высока, купите другое улучшение");
        }
        else{
            score -= price;
            price *= 2;
            dx *= 1.3;
            dy *= 1.3;
        }
    }
  }

document.getElementById('check').onclick = function() {
    alert ("В данный момент цена улучшения составляет: " + price + "$") 
}

document.getElementById('buyColor').onclick = function() {
    var colorCheck = 0;
    colorCheck = prompt ("Введите ID цвета", "");
    if (score >= colorPrice) {
        colorID = colorCheck;
        score -= colorPrice;
    }
    else {
        if (colorCheck == 8) {
            colorID = colorCheck;
        }
        else{
            alert("Для покупки недостаточно средств");
        }
    }
}


document.getElementById('delete').onclick = function() {
    localStorage.clear();
}

document.getElementById('developerPanel').onclick = function() {
    if (acess == true) {
        alert("Вы уже находитесь в панели разработчика");
    }
    else{
    var logId = prompt("Введите логин", "");
    if (logId == login){
        var passId = prompt("Введите пароль", "");
        if (passId == password){
            alert ("Вы вошли в меню разработчика!")
            acess = true;
        }
        else {alert("Введённый пароль не верен")}
    }
    else {alert("Введённый логин не верен")}
  }
}

document.getElementById('save').onclick = function() {
    
    localStorage.setItem("money", score);
    localStorage.setItem("price", price);
    localStorage.setItem("speedX", dx);
    localStorage.setItem("speedy", dy);
    localStorage.setItem("acess", acess);
  }


function mooveSpeed(){
    var mooveFactor = prompt ("Введи множитель скорости", "");
    mooveSpeedBeforeDX = dx;
    mooveSpeedBeforeDY = dy;
    dx *= mooveFactor;
    dy *= mooveFactor;
}
function moneyAdd() {
    var moneyVar = prompt("Введите количество денег, которое хотите добавить", "");
    score = +score + +moneyVar;
}

document.getElementById('cmd').onclick = function() {
    if (acess == true){
    var code = prompt("Введите команду", "");

        if (code == mooveSpeedW) {
            mooveSpeed();
        }
        if (code == addMoney) {
            moneyAdd();
        }
        if (code == "cancelAll"){
            dx = mooveSpeedBeforeDX;
            dy = mooveSpeedBeforeDY;
        }
        if (code == "showSpeed") {
            alert(dx);
            alert(dy);
            alert(dxFactor);
            alert(dyFactor);
        }
    }
    else {
        alert("Вы не являетесь разработчиком");
    }

 
    
  }



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    if (dx>=12){
        edit = false;
    }
    wallsColission();  
    x += dx;
    y += dy;
    ctx.fillStyle = "#00F";
    ctx.font = "30px Verdana";
    ctx.fillText(String(score) + "$", 20, 50);

    if (acess == true){
        devPanel();
    }


    
}


setInterval(draw, 10);

