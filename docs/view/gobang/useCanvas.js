let WIDTH = 700;
let HEIGHT = 700;
let SP = 100;
let LINES = 13;
const WHITE = "#ffffff";
const BLACK = "#000000";

const drawBoard = (ctx) => {
    for (let i = 1; i <= LINES; i++) {
        ctx.moveTo(i * SP, SP);
        ctx.lineTo(i * SP, SP * LINES);
        ctx.stroke();
    }
    for (let i = 1; i <= LINES; i++) {
        ctx.moveTo(SP, i * SP);
        ctx.lineTo(SP * LINES, i * SP);
        ctx.stroke();
    }
}

const drawPiece = (ctx) => {
    return (point, isBlack) => {
        ctx.beginPath();
        ctx.arc(point[0] * SP, point[1] * SP, SP / 3, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = isBlack ? BLACK : WHITE;
        ctx.fill();
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
    SP = WIDTH / (LINES + 1) * 2;
    canvas.width = WIDTH * 2;
    canvas.height = HEIGHT * 2;
    canvas.style.width = `${WIDTH}px`;
    canvas.style.height = `${HEIGHT}px`;
    const ctx = canvas.getContext("2d");
    drawBoard(ctx);
    return {
        drawPiece: drawPiece(ctx),
        calcPoint
    };
}
