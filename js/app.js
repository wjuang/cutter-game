//Necessary canvas functions
const canvas = document.querySelector('#playspace')
canvas.width = innerWidth
canvas.height = innerHeight
const ctx = canvas.getContext('2d')
const gravity = 0.6
const friction = 0.7
//frame counter
//let frame = 0

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
  moveLeft(){
    this.x -= 5
  }
  moveRight(){
    this.x += 5
  }
  moveUp(){
    this.y -= 5
  }
  fallDown(){
    if (player.jump == false) {
      player.xSpeed *= friction
    } else{
      player.ySpeed += gravity
      }
    player.jump = true
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
  requestAnimationFrame(animate)
  // frame++
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  player.draw()
  player.fallDown()
}

//game initialization
window.addEventListener('keydown', function(e){
  keyPress(e)
})
const player = new Player(innerWidth/2, innerHeight/2, document.querySelector('#player'))
setInterval(animate, 22)


//event listener for attack
window.addEventListener('keydown', function(e){
  if (e.keyCode == 32 && e.target == document.body){
    //stop spacebar scroll
    e.preventDefault()
    console.log('space')
    const attack = new Attack(player.x + 50, player.y, document.querySelector('#attack'))
    attack.draw()
    // setTimeout(function(){
    //   //delete attack here
    // }, 1000)
  }
})

//event listeners for player movement

function keyPress(e) {
  e.preventDefault()
  if (e.keyCode == 65 || e.keyCode == 37){
    player.moveLeft()}
  if (e.keyCode == 68 || e.keyCode == 39){
    player.moveRight()
  }
}


// window.addEventListener('keydown', function(e){
//   if (e.keyCode == 65 || e.keyCode == 37){
//     e.preventDefault()
//     //move left
//     console.log('left')
//     player.moveLeft()
//     player.draw()
//   }
// })
//
// window.addEventListener('keydown', function(e){
//   if (e.keyCode == 68 || e.keyCode == 39){
//     e.preventDefault()
//     //move right
//     console.log('right')
//     player.moveRight()
//     player.draw()
//   }
// })

window.addEventListener('keydown', function(e){
  if (e.keyCode == 87 || e.keyCode == 38){
    e.preventDefault
    //jump
    console.log('jump')
    if (player.jump == false){
      player.ySpeed = -10
    }
    // player.gravitySpeed = 0
    // player.speedY = 0
    // player.gravity = -0.0005
    // setTimeout(function(){
    //   player.gravity = 0.00005
    // }, 88)
    }
  })

window.addEventListener('keyup', function(e){
    if (e.keyCode == 87 || e.keyCode == 38){
      if (player.ySpeed < -2){
        player.ySpeed = -3
      }
    }
  })
