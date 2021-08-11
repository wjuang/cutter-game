//Necessary canvas functions
const canvas = document.querySelector('#playspace')
canvas.width = innerWidth
canvas.height = innerHeight
const ctx = canvas.getContext('2d')
//frame counter
let frame = 0

//player class
class Player {
  constructor(x, y, link){
    this.x = x
    this.y = y
    //placeholder for image element?
    this.link = link
    //need to know if flipped or not
    this.flip = false
    //attack cooldown
    this.cooldown = false
  }
  //draw method for player
  draw(){
    ctx.drawImage(this.link, this.x, this.y)
  }
  moveLeft(){
    this.x -= 8
  }
  moveRight(){
    this.x += 8
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
  frame++
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  player.draw()
}

//game initialization
const player = new Player(innerWidth/2, innerHeight/2, document.querySelector('#player'))
animate()


//event listener for attack
window.addEventListener('keydown', function(e){
  if (e.keyCode == 32 && e.target == document.body){
    //stop spacebar scroll
    e.preventDefault()
    e.stopPropagation()

    const attack = new Attack(player.x + 50, player.y, document.querySelector('#attack'))
    attack.draw()
    setTimeout(function(){
      //delete attack here
    }, 1000)
  }
})

//event listeners for player movement
window.addEventListener('keydown', function(e){
  if (e.keyCode == 65 || e.keyCode == 37){
    e.preventDefault()
    //move left
    console.log('left')
    player.moveLeft()
    player.draw()
  }
})

window.addEventListener('keydown', function(e){
  if (e.keyCode == 68 || e.keyCode == 39){
    e.preventDefault()
    //move right
    console.log('right')
    player.moveRight()
    player.draw()
  }
})

window.addEventListener('keydown', function(e){
  if (e.keyCode == 87 || e.keyCode == 38){
    e.preventDefault
    //jump
    console.log('jump')
  }
})
