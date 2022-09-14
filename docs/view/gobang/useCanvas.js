let WIDTH = 700;
let HEIGHT = 700;
let SP = 100;
let LINES = 13;
const WHITE = "#ffffff";
const BLACK = "#000000";
const STROKESTYLE = "#444444";
const FLUSHSTYLE = "#ff0000";

const drawBoard = (ctx) => {
    ctx.save();
    ctx.fillStyle = "rgb(165 136 104)";
    ctx.strokeStyle = "rgb(9 8 8)";
    ctx.rect(0, 0, WIDTH * 2, HEIGHT * 2);
    ctx.fill();
    for (let i = 1; i <= LINES; i++) {
        ctx.beginPath();
        ctx.moveTo(i * SP, SP);
        ctx.lineTo(i * SP, SP * LINES);
        ctx.closePath();
        ctx.stroke();
    }
    for (let i = 1; i <= LINES; i++) {
        ctx.beginPath();
        ctx.moveTo(SP, i * SP);
        ctx.lineTo(SP * LINES, i * SP);
        ctx.closePath();
        ctx.stroke();
    }
    ctx.restore();
}

const flushPiece = (ctx, point) => {
    let flushTime = 3 * 1000;
    let timer = setTimeout(() => {
        ctx.beginPath();
        ctx.arc(point[0] * SP, point[1] * SP, SP / 3, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.strokeStyle = STROKESTYLE;
        ctx.lineWidth = 2;
        ctx.stroke();
        clearTimeout(timer);
    }, flushTime);
}

const drawPiece = (ctx) => {
    return (point, isBlack) => {
        ctx.beginPath();
        ctx.arc(point[0] * SP, point[1] * SP, SP / 3, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = isBlack ? BLACK : WHITE;
        ctx.fill();
        ctx.strokeStyle = FLUSHSTYLE;
        ctx.lineWidth = 1;
        ctx.stroke();
        flushPiece(ctx, point);
    }
}

const drawGameOver = (ctx) => {
    return (text) => {
        ctx.fillStyle = "#7c757555";
        ctx.fillRect(0, 0, WIDTH * 2, HEIGHT * 2);
        ctx.font = "30px Arial";
        ctx.fillStyle = "#ff0000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, WIDTH, HEIGHT);
    }
}

const calcPoint = (x, y) => {
    let dist = SP / 2;
    // 判断点击点是否在交点附近
    if (((Math.floor(x / dist) > 0 && x % dist <= dist / 3) || (Math.ceil(x / dist) <= LINES && x % dist >= dist / 3 * 2)) &&
        ((Math.floor(y / dist) > 0 && y % dist <= dist / 3) || (Math.ceil(y / dist) <= LINES && y % dist >= dist / 3 * 2))) {
        return [Math.round(x / dist), Math.round(y / dist)];
    }
    return null;
}

export const useCanvas = (canvas, options) => {
    WIDTH = options.width || WIDTH;
    HEIGHT = options.height || HEIGHT;
    LINES = options.lines || LINES;
    // 纠正长度偏差
    WIDTH = Math.floor(WIDTH / (LINES + 1)) * (LINES + 1);
    HEIGHT = WIDTH;
    SP = WIDTH / (LINES + 1) * 2;
    canvas.width = WIDTH * 2;
    canvas.height = HEIGHT * 2;
    canvas.style.width = `${WIDTH}px`;
    canvas.style.height = `${HEIGHT}px`;
    const ctx = canvas.getContext("2d");
    drawBoard(ctx);
    return {
        drawPiece: drawPiece(ctx),
        calcPoint,
        drawGameOver: drawGameOver(ctx)
    };
}
