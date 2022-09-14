let whitePieces = [];
let blackPieces = [];
let isBlack = true;

// 检测该位置是否有棋子
const isOccupied = (point) => {
    let fn = v => v[0] === point[0] && v[1] === point[1];
    return whitePieces.some(fn) || blackPieces.some(fn);
}


export const useEvents = (canvas, blackFirst, robot, methods) => {
    const { drawPiece, calcPoint, judgeWin, drawGameOver, getRobotStep, judgeDraw } = methods;
    isBlack = blackFirst;
    whitePieces = [];
    blackPieces = [];
    let moving = false;
    const putPiece = (point) => {
        if (point && !isOccupied(point)) {
            drawPiece(point, isBlack);
            if (isBlack) {
                blackPieces.push(point);
                if (judgeWin(point, blackPieces)) {
                    drawGameOver(`Black Win!`);
                    canvas.removeEventListener("mouseup", onMouseUp)
                };
            } else {
                whitePieces.push(point);
                if (judgeWin(point, whitePieces)) {
                    drawGameOver(`White Win!`)
                    canvas.removeEventListener("mouseup", onMouseUp)
                };
            }
            isBlack = !isBlack;
            if (judgeDraw(whitePieces, blackPieces)) {
                drawGameOver('平局');
            }
            return true;
        }
        return false;
    }
    const onMouseUp = (event) => {
        if (moving) return;
        let { offsetX, offsetY } = event;
        let point = calcPoint(offsetX, offsetY);
        let putRet = putPiece(point);
        if (putRet && robot) {
            let robotPoint = isBlack ? getRobotStep(blackPieces, whitePieces) : getRobotStep(whitePieces, blackPieces);
            moving = true;
            setTimeout(() => {
                putPiece(robotPoint);
                moving = false;
            }, 1000);

        }
    }
    canvas.addEventListener("mouseup", onMouseUp);
}
