export const useAudio = () => {
  const pieceAudio = document.createElement('audio')
  pieceAudio.src = '/blog/audio/piecs_down.mp3'
  pieceAudio.autoplay = false
  pieceAudio.loop = false
  const playPiece = () => {
    pieceAudio.play()
  }
  return {
    playPiece,
  }
}
