//Necessary canvas functions
const canvas = document.querySelector('#playspace')
canvas.width = 1000
canvas.height = 500
const ctx = canvas.getContext('2d')
let finishAll = false
let score = 0


//parameters for reality
const gravity = 0.6
const friction = 0.7


//key status
let keys = {
  right: false,
  left: false,
  up: false,
  space: false,
}


//player class
class Player {
  constructor(x, y, link){
    this.x = x
    this.y = y
    this.xSpeed = 0
    this.ySpeed = 0
    //placeholder for image element?
    this.link = link
    //need to know if flipped or not
    this.flip = false
    //attack cooldown
    this.cooldown = true

    //jump status
    this.jump = false
    this.jumpCooldown = false
  }
  //draw method for player
  draw(){
    ctx.drawImage(this.link, this.x, this.y)
  }
}

//player attack class
class Attack {
  constructor(x, y, link){
    this.x = x
    this.y = y
    this.link = link
  }
  draw(){
    ctx.drawImage(this.link, this.x, this.y)
  }
}

//enemy class
class Enemy {
  constructor(x, y, link, left){
    this.x = x
    this.y = y
    this.xSpeed = 1
    this.ySpeed = 0
    this.link = link
    this.left = left
    this.jump = false
    //walk animation sprite
    this.sprite = 1
    //this last one is for platform collision
    this.j = -1
  }
  draw(){
    ctx.drawImage(this.link, this.x, this.y)
  }
}

//function to spawn enemies
const enemies = []
let xOptions = [250, 500, 750]
let leftOptions = [false, true]
let leftChoice
let xChoice
const spawnEnemies = () => {
  let spawner = setInterval(() => {
  xChoice = xOptions[Math.round(Math.random() * 2)]
  leftChoice = leftOptions[Math.round(Math.random())]
    enemies.push(new Enemy(xChoice, 0, document.querySelector('#enemy'), leftChoice))
  }, 2000)
}

//function to alternate enemy sprite
const enemyMove = () => {
  enemies.forEach((enemy, index) => {
    if (enemy.left == true){
      if (enemy.sprite == 1){
        enemy.link = document.querySelector('#enemyflip')
        enemy.sprite = 2
      } else if (enemy.sprite == 2){
        enemy.link = document.querySelector('#enemy2flip')
        enemy.sprite = 1
      }
    }
    if (enemy.left == false){
      if (enemy.sprite == 1){
        enemy.link = document.querySelector('#enemy')
        enemy.sprite = 2
      } else if (enemy.sprite == 2){
        enemy.link = document.querySelector('#enemy2')
        enemy.sprite = 1
      }
    }
  })
}

//fuction to make enemies gradually move faster
let harder = 0
const enemySpeedUp = () => {
  harder += 0.1
}

//array for later dead enemies
const deadEnemies = []
let deathSound = {
  sound: Object.assign(document.createElement('audio'), {
    src: 'assets/death.mp3',
    loop: false,
    volume: 1,
  })
}

//array for attacks
const attacks = []

//make platforms
const platforms = []
//function to build platform into array
const createPlatform = (x, y, width) => {
  platforms.push({
    x: x,
    y: y,
    width: width,
    height: 20,
  })
}
//finished platforms below:
createPlatform(375, 200, 250)
createPlatform(100, 350, 250)
createPlatform(650, 350, 250)
createPlatform(0, 480, 1000)
//function to render array
const buildPlatforms = () => {
  ctx.fillStyle = "#544a2d"
  for (each in platforms){
    ctx.fillRect(platforms[each].x, platforms[each].y, platforms[each].width, platforms[each].height)
  }
}
//pull background
const bg = document.querySelector('#background')

/////IMPORTANT ANIMATION FUNCTION/////////////////

//function to animate things
function animate() {
  //frame refresh command
  ctx.clearRect(0, 0, 1000, 500)
  ctx.drawImage(bg, 0, 0, 1000, 500)
  ctx.restore()
  //acceleration rules
  if (player.jump == false){
    player.xSpeed *= friction
  } else{
    player.ySpeed += gravity
    player.xSpeed *= (friction)
  }
  if (keys.up){
    if (player.jump == false && player.jumpCooldown == false){
      player.ySpeed = -13
      player.jumpCooldown = true
      player.jump = true
    }
  }
  player.jump = true

  //acceleration rules for enemies
  enemies.forEach((enemy) => {
    if (enemy.jump == false){
      enemy.xSpeed *= friction
    } else {
      enemy.ySpeed += gravity
      enemy.xSpeed *= friction
    }
    enemy.jump = true
    if (enemy.x < 10){
      enemy.left = true
    }
    if (enemy.x > 920){
      enemy.left = false
    }
    if (enemy.left == false){
      enemy.xSpeed = -0.8 - harder
    } else {
      enemy.xSpeed = 0.8 + harder
    }
    enemy.y += enemy.ySpeed
    enemy.x += enemy.xSpeed
  })
  //left and right movement
  if (keys.left && player.x > 10){
    player.xSpeed -= 1.5
    player.flip = true
  }
  if (keys.right && player.x < 920){
    player.xSpeed += 1.5
    player.flip = false
  }
  player.y += player.ySpeed
  player.x += player.xSpeed

  //constantly make updated character
  player.draw()
  //constantly make platforms
  buildPlatforms()
  //constantly make enemies
  enemies.forEach((enemy) => {
    enemy.draw()
  })
  //display score
  ctx.font = '32px serif'
  ctx.fillStyle = "black"
  ctx.fillText(`Score: ${score}`, 20, 40)
  //platform collision for player
  let i = -1
  if (platforms[3].x-40 < player.x && player.x < platforms[3].x-40 + platforms[3].width+20 && platforms[3].y < player.y+64 && player.y < platforms[3].y + platforms[3].height){
    i = 3
  }
  if (platforms[0].x-40 < player.x && player.x < platforms[0].x-40 + platforms[0].width+20 && platforms[0].y < player.y+64 && player.y < platforms[0].y + platforms[0].height){
    i = 0
  }
  if (platforms[1].x-40 < player.x && player.x < platforms[1].x-40 + platforms[1].width+20 && platforms[1].y < player.y+64 && player.y < platforms[1].y + platforms[3].height){
    i = 1
  }
  if (platforms[2].x-40 < player.x && player.x < platforms[2].x-40 + platforms[2].width+20 && platforms[2].y < player.y+64 && player.y < platforms[2].y + platforms[2].height){
    i = 2
  }
  if (i > -1 && player.ySpeed >= 0){
    player.jump = false
    player.y = platforms[i].y-64
    player.ySpeed = 0
    setTimeout(() => {
      player.jumpCooldown = false
    }, 1000)
  }

  //enemy collision for player
  enemies.forEach((enemy, index) => {
    const dist = Math.hypot((player.x+32) - (enemy.x+32), (player.y+32) - (enemy.y+32))
    if (dist-40 < 1){
      gameOver()
    }
  })
  //collision for enemies
  enemies.forEach((enemy, index) => {
    //platforms
    enemy.j = -1
    if (platforms[3].x-40 < enemy.x && enemy.x < platforms[3].x-40 + platforms[3].width+20 && platforms[3].y < enemy.y+64 && enemy.y < platforms[3].y + platforms[3].height){
      enemy.j = 3
    }
    if (platforms[0].x-40 < enemy.x && enemy.x < platforms[0].x-40 + platforms[0].width+20 && platforms[0].y < enemy.y+64 && enemy.y < platforms[0].y + platforms[0].height){
      enemy.j = 0
    }
    if (platforms[1].x-40 < enemy.x && enemy.x < platforms[1].x-40 + platforms[1].width+20 && platforms[1].y < enemy.y+64 && enemy.y < platforms[1].y + platforms[3].height){
      enemy.j = 1
    }
    if (platforms[2].x-40 < enemy.x && enemy.x < platforms[2].x-40 + platforms[2].width+20 && platforms[2].y < enemy.y+64 && enemy.y < platforms[2].y + platforms[2].height){
      enemy.j = 2
    }
    if (enemy.j > -1){
      enemy.jump = false
      enemy.y = platforms[enemy.j].y-64
      enemy.ySpeed = 0
    }

    //attacks
    if (player.cooldown == true){
      const dist = Math.hypot((attack.x+32) - (enemy.x+32), (attack.y+32) - (enemy.y+32))
      if (dist - 48 < 1){
        setTimeout(() => {
        deadEnemies.push(enemies[index])
        enemies.splice(index, 1)
      }, 0)
      score++
      }
    }
  })
  //function to animate enemy deaths
  deadEnemies.forEach((enemy, index) => {
    enemy.link = document.querySelector('#enemydie')
    enemy.draw()
    setTimeout(() => {
      deadEnemies.splice(index, 1)
    }, 800)
  })
  //function to animate attacks
  attacks.forEach((attack, index) => {
    attack.draw()
    setTimeout(() => {
      attacks.splice(index, 1)
    }, 500)
  })
}

//////END IMPORTANT ANIMATION FUNCTION //////////////////

//function to react to key press down
const keyDown = (e) => {
  e.preventDefault()
  if (e.keyCode == 37 || e.keyCode == 65){
    keys.left = true
    let aText = document.querySelector('#attack')
    aText.outerHTML = "<img id='attack' src='assets/slashflip.png'>"
    player.link = document.querySelector('#playerflip')
  }
  if (e.keyCode == 39 || e.keyCode == 68){
    keys.right = true
    let aText = document.querySelector('#attack')
    aText.outerHTML = "<img id='attack' src='assets/slash.png'>"
    player.link = document.querySelector('#player')
  }
  if (e.keyCode == 87 || e.keyCode == 38){
    keys.up = true
    if (player.ySpeed < -2){
      player.ySpeed = -3
    }
  }
}

//function to react to releasing key
const keyUp = (e) => {
  e.preventDefault()
  if (e.keyCode == 37 || e.keyCode == 65){
    keys.left = false
  }
  if (e.keyCode == 39 || e.keyCode == 68){
    keys.right = false
  }
  if (e.keyCode == 87 || e.keyCode == 38){
    keys.up = false
  }
}

//function to end game
const gameOver = () => {
  clearInterval(playGame)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (player.flip == false){
    player.link = document.querySelector('#hit')
    player.draw()
    setTimeout(function(){
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      player.link = document.querySelector('#dead')
      player.draw()
      ctx.font = '108px serif'
      ctx.fillStyle = "white"
      ctx.fillText('YOU DIED', 250, 250)
      ctx.font = '48px serif'
      ctx.fillText(`Your score was: ${score}`, 300, 350)
    }, 1000)
  }
  if (player.flip == true){
    player.link = document.querySelector('#hitflip')
    player.draw()
    setTimeout(function(){
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      player.link = document.querySelector('#deadflip')
      player.draw()
      ctx.font = '108px serif'
      ctx.fillStyle = "white"
      ctx.fillText('YOU DIED', 250, 250)
      ctx.font = '48px serif'
      ctx.fillText(`Your score was: ${score}`, 300, 350)
    }, 1000)
  }
  deathSound.sound.play()
  player.cooldown = true
  let restartDiv = document.querySelector('#restartDiv')
  restartDiv.style.display = "flex"
}


//game initialization

const player = new Player(10, 485, document.querySelector('#player'))
const playGame = setInterval(animate, 22)
const enemySpriteMove = setInterval(enemyMove, 1000)


//setup variables for attack script
let attack
let attackTime
let attackInterval
let attacksound = {
  sound: Object.assign(document.createElement('audio'), {
    src: 'assets/slicesound.mp3',
    loop: false,
    volume: 0.2,
  })
}
//event listener for attack
window.addEventListener('keydown', function(e){
  if (e.keyCode == 32 && e.target == document.body && player.cooldown == false && keys.space == false){
    //stop spacebar scroll
    e.preventDefault()
    keys.space = true
    player.cooldown = true
    attacksound.sound.play()
    attack = new Attack(player.x, player.y, document.querySelector('#attack'))
    if (player.flip == false){
      attack.x += 50
      player.link = document.querySelector('#swingright')
    }
    if (player.flip == true){
      attack.x -=50
      player.link = document.querySelector('#swingleft')
    }
    attacks.push(attack)
    setTimeout(function(){
      keys.space = false
      player.cooldown = false
    }, 1000)
  }
})
