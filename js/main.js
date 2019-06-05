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
    document.querySelector('body').style.backgroundColor = color;
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
            console.log('circleShape');
            break;
    }
}

function drawSimple(shapeColor) {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = shapeColor;
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
}