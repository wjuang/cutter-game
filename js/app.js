//Necessary canvas functions
const canvas = document.querySelector('#playspace')
canvas.width = innerWidth
canvas.height = innerHeight
const ctx = canvas.getContext('2d')

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

//instance of game
const player = new Player(innerWidth/2, innerHeight/2, document.querySelector('#player'))
player.draw()
