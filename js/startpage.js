let startButton = document.querySelector('#start')
startButton.addEventListener('click', (event) => {
  let startPage = document.querySelector('#startscreen')
  let gamePage = document.querySelector('#playspace')
  startPage.style.display = 'none'
  gamePage.style.display = 'flex'
  console.log(gamePage.style.display)
  spawnEnemies()

  window.addEventListener('keydown', keyDown)
  window.addEventListener('keyup', keyUp)
})
