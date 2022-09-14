let LINES = 13;

// 检测该位置是否有棋子
const checkChess = (x, y, chesses) => {
    if (x < 1 || x > LINES || y < 1 || y > LINES) return false;
    let fn = v => v[0] === x && v[1] === y;
    return chesses.some(fn);
}

const calWeight = (index, isStartLive, isEndLive) => {
    if (isStartLive ^ isEndLive && index < 5) {
        index--;
    }
    if (!(isStartLive | isEndLive) && index < 5) {
        index = 0;
    }
    // catInfo(index, isStartLive, isEndLive);
    return 10 ** index;
}

const getWeight = (x, y, chesses, other) => {
    let count = 0;
    count += getRowWeight(x, y, chesses, other);
    count += getColWeight(x, y, chesses, other);
    count += getLTRWeight(x, y, chesses, other);
    count += getRTLWeight(x, y, chesses, other);
    return count;
}

const getRowWeight = (x, y, chesses, other) => {
    let index = 0;
    let startX, endX;
    let isStartLive = true, isEndLive = true;
    //获取前面评估情况
    for (startX = x - 1; startX > 0; startX--) {
        if (!checkChess(startX, y, chesses)) {
            break;
        }
    }
    if (startX == 0 || checkChess(startX, y, other)) {
        isStartLive = false;
    }
    //获取后面评估情况
    for (endX = x + 1; endX <= LINES; endX++) {
        if (!checkChess(endX, y, chesses)) {
            break;
        }
    }
    if (endX > LINES || checkChess(endX, y, other)) {
        isEndLive = false;
    }
    // 计算row评估
    index += (endX - startX - 1);
    return calWeight(index, isStartLive, isEndLive);
}

const getColWeight = (x, y, chesses, other) => {
    let index = 0;
    let startY, endY;
    let isStartLive = true, isEndLive = true;
    //获取上面评估情况
    for (startY = y - 1; startY > 0; startY--) {
        if (!checkChess(x, startY, chesses)) {
            break;
        }
    }
    if (startY == 0 || checkChess(x, startY, other)) {
        isStartLive = false;
    }
    //获取下面评估情况
    for (endY = y + 1; endY <= LINES; endY++) {
        if (!checkChess(x, endY, chesses)) {
            break;
        }
    }
    if (endY > LINES || checkChess(x, endY, other)) {
        isEndLive = false;
    }
    // 计算row评估
    index += (endY - startY - 1);
    return calWeight(index, isStartLive, isEndLive);
}

// '\'
function getLTRWeight(x, y, chesses, other) {
    let index = 0;
    let startX, endX, startY, endY;
    let isStartLive = true, isEndLive = true;

    // 获取左上评估情况
    for (startX = x - 1, startY = y - 1; startX > 0 && startY > 0; startX--, startY--) {
        if (!checkChess(startX, startY, chesses)) {
            break;
        }
    }
    if (startY == 0 || startX == 0 || checkChess(startX, startY, other)) {
        isStartLive = false;
    }

    //获取右下评估情况
    for (endX = x + 1, endY = y + 1; endX <= LINES && endY <= LINES; endX++, endY++) {
        if (!checkChess(endX, endY, chesses)) {
            break;
        }
    }
    if (endX > LINES || endY > LINES || checkChess(endX, endY, other)) {
        isEndLive = false;
    }
    // 计算'\'评估
    index += (endX - startX - 1);
    return calWeight(index, isStartLive, isEndLive);

}

//获取'/'权值
function getRTLWeight(x, y, chesses, other) {
    let index = 0;
    let startX, endX, startY, endY;
    let isStartLive = true, isEndLive = true;

    // 获取左下评估情况
    for (startX = x - 1, startY = y + 1; startX > 0 && startY <= LINES; startX--, startY++) {
        if (!checkChess(startX, startY, chesses)) {
            break;
        }
    }
    if (startY > LINES || startX == 0 || checkChess(startX, startY, other)) {
        isStartLive = false;
    }

    //获取右上评估情况
    for (endX = x + 1, endY = y - 1; endX <= LINES && endY > 0; endX++, endY--) {
        if (!checkChess(endX, endY, chesses)) {
            break;
        }
    }
    if (endX > LINES || endY == 0 || checkChess(endX, endY, other)) {
        isEndLive = false;
    }
    // 计算'/'评估
    index += (endX - startX - 1);
    return calWeight(index, isStartLive, isEndLive);
}

//极大极小值搜索，思考一步，返回一个坐标
function getMax(person, robot) {
    let person_max = 0;
    let robot_max = 0;
    let temp = new Array();
    let temp_per_x, temp_per_y;
    let temp_rob_x, temp_rob_y;
    //person
    for (let i = 1; i <= LINES; i++) {
        for (let j = 1; j <= LINES; j++) {
            if (!checkChess(i, j, person) && !checkChess(i, j, robot) && !checkChess(i, j, temp)) {
                let temp_weight = getWeight(i, j, person, robot);
                if (temp_weight > person_max) {
                    temp_per_x = i;
                    temp_per_y = j;
                    person_max = temp_weight;
                }
            }
        }
    }
    //robot
    for (let i = 1; i <= LINES; i++) {
        for (let j = 1; j <= LINES; j++) {
            if (!checkChess(i, j, person) && !checkChess(i, j, robot) && !checkChess(i, j, temp)) {
                let temp_weight = getWeight(i, j, robot, person);
                if (temp_weight > robot_max) {
                    temp_rob_x = i;
                    temp_rob_y = j;
                    robot_max = temp_weight;
                }
            }
        }
    }

    if (robot_max > person_max) {
        return [temp_rob_x, temp_rob_y];
    } else {
        return [temp_per_x, temp_per_y];
    }

}

export const useRobot = (lines) => {
    LINES = lines || LINES;
    return {
        getRobotStep: getMax
    }
}
