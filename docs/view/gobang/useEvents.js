let whitePieces = []
let blackPieces = []
let isBlack = true

// 检测该位置是否有棋子
const isOccupied = (point) => {
  const fn = (v) => v[0] === point[0] && v[1] === point[1]
  return whitePieces.some(fn) || blackPieces.some(fn)
}

export const useEvents = (canvas, emit, blackFirst, robot, methods) => {
  const { drawPiece, calcPoint, judgeWin, drawGameOver, getRobotStep, judgeDraw, playPiece } = methods
  isBlack = blackFirst
  whitePieces = []
  blackPieces = []
  let moving = false
  const putPiece = (point, isRobot) => {
    if (point && !isOccupied(point)) {
      drawPiece(point, isBlack)
      playPiece()
      emit('on-piece', { point, isBlack, isRobot })
      if (isBlack) {
        blackPieces.push(point)
        if (judgeWin(point, blackPieces)) {
          drawGameOver('黑棋胜!')
          canvas.removeEventListener('mouseup', onMouseUp)
          emit('on-game-over', { isBlack, isRobot })
          return false
        }
      } else {
        whitePieces.push(point)
        if (judgeWin(point, whitePieces)) {
          drawGameOver('白棋胜!')
          canvas.removeEventListener('mouseup', onMouseUp)
          emit('on-game-over', { isBlack, isRobot })
          return false
        }
      }
      isBlack = !isBlack
      if (judgeDraw(whitePieces, blackPieces)) {
        drawGameOver('平局!')
        emit('on-game-over', { isDraw: true })
        return false
      }
      return true
    }
    return false
  }
  const onMouseUp = (event) => {
    if (moving) return
    const { offsetX, offsetY } = event
    const point = calcPoint(offsetX, offsetY)
    const putRet = putPiece(point, false)
    if (putRet && robot) {
      const robotPoint = isBlack ? getRobotStep(blackPieces, whitePieces) : getRobotStep(whitePieces, blackPieces)
      moving = true
      setTimeout(() => {
        putPiece(robotPoint, true)
        moving = false
      }, 800)
    }
  }
  canvas.addEventListener('mouseup', onMouseUp)
}
