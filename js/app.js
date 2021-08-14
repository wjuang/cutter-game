//Necessary canvas functions
const canvas = document.querySelector('#playspace')
canvas.width = 1000
canvas.height = 500
const ctx = canvas.getContext('2d')


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
    this.cooldown = false

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
  constructor(x, y, link){
    this.x = x
    this.y = y
    this.link = link
  }
  draw(){
    ctx.drawImage(this.link, this.x, this.y)
  }
}

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
  ctx.fillStyle = "#000000"
  for (each in platforms){
    ctx.fillRect(platforms[each].x, platforms[each].y, platforms[each].width, platforms[each].height)
  }
}



//function to animate things
function animate() {
  //frame refresh command
  ctx.clearRect(0, 0, canvas.width, canvas.height)
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
  //left and right movement
  if (keys.left){
    player.xSpeed -= 1.5
  }
  if (keys.right){
    player.xSpeed += 1.5
  }
  player.y += player.ySpeed
  player.x += player.xSpeed
  //constantly make updated character
  player.draw()
  //constantly make platforms
  buildPlatforms()
  //platform collision
  let i = -1
  if (platforms[3].x < player.x && player.x < platforms[3].x + platforms[3].width && platforms[3].y < player.y+65 && platforms[3].y + platforms[3].height){
    i = 3
    console.log('hit')
  }
  if (i > -1){
    player.jump = false
    player.y = platforms[i].y-65
    player.ySpeed = 0
    player.jumpCooldown = false
  }
}

//function to react to key press down
const keyDown = (e) => {
  e.preventDefault()
  if (e.keyCode == 37 || e.keyCode == 65){
    keys.left = true
  }
  if (e.keyCode == 39 || e.keyCode == 68){
    keys.right = true
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


//game initialization

const player = new Player(10, 485, document.querySelector('#player'))
setInterval(animate, 22)

//setup variables for attack script
let attackTime
let attackInterval
//event listener for attack
window.addEventListener('keydown', function(e){
  if (e.keyCode == 32 && e.target == document.body && player.cooldown == false){
    //stop spacebar scroll
    e.preventDefault()
    const attack = new Attack(player.x + 50, player.y, document.querySelector('#attack'))
    keys.space = true
    player.cooldown = true
    setTimeout(function(){
      keys.space = false
      player.cooldown = false
    }, 1000)
    //trial function to make attack happen for x seconds
    attackTime = 1
    attackInterval = setInterval(function(){
      if (attackTime <= 80){
        attack.draw()
        attackTime++
      } else{
        clearInterval(attackInterval)
      }
    }, 1)
  }
})

window.addEventListener('keydown', keyDown)
window.addEventListener('keyup', keyUp)
