//Necessary canvas functions
const canvas = document.querySelector('#playspace')
canvas.width = innerWidth
canvas.height = innerHeight
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

    //jump cooldown
    this.jump = false
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

//function to animate things
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (keys.left){
    player.x -= 3
  }
  if (keys.right){
    player.x += 3
  }
  player.draw()
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
}


//game initialization

const player = new Player(innerWidth/2, innerHeight/2, document.querySelector('#player'))
setInterval(animate, 22)

//setup variables for attack script
let attackTime
let attackInterval
//event listener for attack
window.addEventListener('keydown', function(e){
  if (e.keyCode == 32 && e.target == document.body && player.cooldown == false){
    //stop spacebar scroll
    e.preventDefault()
    console.log('space')
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
