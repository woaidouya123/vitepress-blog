let LINES = 13;

// 检测该位置是否有棋子
const checkChess = (x, y, chesses) => {
    if (x < 1 || x > LINES || y < 1 || y > LINES) return false;
    let fn = v => v[0] === x && v[1] === y;
    return chesses.some(fn);
}

// 检查行
const checkRow = (x, y, chesses) => {
    let index = 0;
    for (let i = x - 4; i <= x + 4; i++) {
        if (checkChess(i, y, chesses)) {
            index++;
        } else {
            index = 0;
        }
        if (index >= 5) {
            return true;
        }
    }
    return false;
}

// 检查列
const checkCol = (x, y, chesses) => {
    let index = 0;
    for (let i = y - 4; i <= y + 4; i++) {
        if (checkChess(x, i, chesses)) {
            index++;
        } else {
            index = 0;
        }
        if (index >= 5) {
            return true;
        }
    }
    return false;
}

// 检测斜向下
const checkLTR = (x, y, chesses) => {
    let index = 0;
    for (let i = x - 4, j = y - 4; i <= x + 4; i++, j++) {
        if (checkChess(i, j, chesses)) {
            index++;
        } else {
            index = 0;
        }
        if (index >= 5) {
            return true;
        }
    }
    return false;
}

// 检测斜向上
function checkRTL(x, y, chesses) {
    let index = 0;
    for (let i = x - 4, j = y + 4; i <= x + 4; i++, j--) {
        if (checkChess(i, j, chesses)) {
            index++;
        } else {
            index = 0;
        }
        if (index >= 5) {
            return true;
        }
    }
    return false;
}

export const useJudge = (lines) => {
    LINES = lines || LINES;
    const judgeWin = (point, spieces) => {
        if (checkRow(...point, spieces) || checkCol(...point, spieces) || checkRTL(...point, spieces) || checkLTR(...point, spieces)) {
            return true;
        }
    };
    return {
        judgeWin,
    }
}
