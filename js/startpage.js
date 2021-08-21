let startButton = document.querySelector('#start')
startButton.addEventListener('click', (event) => {
  let startPage = document.querySelector('#startscreen')
  let gamePage = document.querySelector('#playspace')
  startPage.style.display = 'none'
  gamePage.style.display = 'flex'
  spawnEnemies()
  const getHarder = setInterval(enemySpeedUp, 15000)
  player.cooldown = false
  window.addEventListener('keydown', keyDown)
  window.addEventListener('keyup', keyUp)
  let bgm = {
    sound: Object.assign(document.createElement('audio'), {
      src: 'assets/bgm.mp3',
      loop: true,
      volume: 0.2,
    })
  }
  bgm.sound.play()
})

let restartButton = document.querySelector('#restart')
restartButton.addEventListener('click', (event) => {
  window.location.reload()
})
