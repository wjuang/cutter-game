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
  }
  //draw method for player
  draw(){
    ctx.drawImage(this.link, this.x, this.y)
  }
}

const player = new Player(100, 100, document.querySelector('#player'))
player.draw()
