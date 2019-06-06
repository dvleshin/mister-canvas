'user strict';
let canvas;
let ctx;
let flag;
let prevX;
let prevY;
let currX;
let currY;



function init() {
    canvas = document.querySelector('#paintArea');
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.addEventListener("mousemove", function (ev) {
        onDraw('move', ev)
    }, false);
    canvas.addEventListener("mousedown", function (ev) {
        onDraw('down', ev)
    }, false);
    canvas.addEventListener("mouseup", function (ev) {
        onDraw('up', ev)
    }, false);

}

function onChangeBgColor() {
    let color = document.querySelector('#bgColor').value
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.fill();
}

function onDraw(action, ev) {
    if (action === 'down') {
        currX = ev.offsetX;
        currY = ev.offsetY;
        prevX = currX;
        prevY = currY;
        flag = true;
        draw(ev);
    }

    if (action === 'move') {
        if (flag) {
            //console.log('move');
            prevX = currX;
            prevY = currY;
            currX = ev.offsetX;
            currY = ev.offsetY;
            draw(ev);
        }
    }

    if (action === 'up') {
        flag = false;
        prevX = null;
        prevY = null;
        clearInterval(loop);
    }

}

function draw(ev) {
    let shape = document.querySelector('#shape').value;
    let shapeColor = document.querySelector('#shapeColor').value



    switch (shape) {
        case 'simpleShape':
            drawSimple(shapeColor)
            break;
        case 'circleShape':
            drawCircle(shapeColor)
            break;
        case 'glowShape':
            drawGlow(shapeColor)
            break;
        case 'rectShape':
            drawRect(shapeColor)
            break;
    }
}

function drawSimple(shapeColor) {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = shapeColor;
    ctx.lineWidth = 5;
    ctx.shadowBlur = 0;
    ctx.stroke();
    ctx.closePath();
}

function drawCircle(shapeColor) {
    ctx.beginPath();
    ctx.arc(currX, currY, 50, 0, 2 * Math.PI);
    ctx.lineWidth = 5;
    ctx.shadowBlur = 0;
    ctx.strokeStyle = shapeColor;
    ctx.stroke();
}


function drawGlow(shapeColor) {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.lineWidth = 30;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.strokeStyle = shapeColor;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgb(58, 225, 0)';
    ctx.stroke();
}

function drawRect(shapeColor) {
    var changeSizeX = getRandomInt(5, 50)
    var changeSizeY = getRandomInt(5, 50)

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.rect(currX, currY, changeSizeX, changeSizeY);
    ctx.lineWidth = 0.5;
    ctx.shadowBlur = 0;
    ctx.strokeStyle = shapeColor;
    ctx.stroke();
}



function saveCanvas(elLink) {
    const data = canvas.toDataURL();
    elLink.href = data
    elLink.download = 'my-img.jpg';

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}