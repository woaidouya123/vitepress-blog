let whitePieces = [];
let blackPieces = [];

export const useEvents = (canvas, blackFirst, drawPiece, calcPoint) => {
    canvas.addEventListener("mouseup", (event) => {
        console.log(event, 999)
        let { offsetX, offsetY } = event;
        let point = calcPoint(offsetX, offsetY);
        point && drawPiece(point, true)
    })
}
