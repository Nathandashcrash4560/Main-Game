var bg, bgImg;
var player, shooterImg, shooter_shooting;
var enemy, enemyIMG
var enemiesGroup
var gameState = 0
var P1_hp=3
function preload() {

  shooterImg = loadImage("assets/mario-walking.gif")
  shooter_shooting = loadImage("assets/shooter_3.png")
  enemyIMG = loadImage("assets/Enemy1.png")
  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {


  createCanvas(windowWidth+500, windowHeight+500);

  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.1


  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)
enemiesGroup= new Group() 

}
camera.positionX = player.x;
camera.positionY = player.y
function draw() {
  background(0);
  if (gameState == 0) {
    enemySpawn()
  }
  else {

  }


  //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30
  }
  if (keyDown("LEFT_ARROW") || touches.length > 0) {
    player.x = player.x - 30
  }
  if (keyDown("RIGHT_ARROW") || touches.length > 0) {
    player.x = player.x + 30
  }


  //release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {

    player.addImage(shooter_shooting)

  }

  //player goes back to original standing image once we stop pressing the space bar
  else if (keyWentUp("space")) {
    player.addImage(shooterImg)
  }

  if (enemiesGroup.isTouching(player)) {
    for (let index = 0; index < enemiesGroup.length; index++) {
      if (enemiesGroup[index].isTouching(player)) {
       console.log("hi") 
        gamestate = 1
        player.x = windowWidth + 500
        player.y = windowHeight + 500
        P1_hp-=1
      }

    }
  }

console.log(P1_hp)

  drawSprites();
if (P1_hp==0){
textSize(100)
fill("red")
text("HP is ZERO",100,100)
}

}




function enemySpawn() {
  if (frameCount % 200 === 0) {
    enemy = createSprite(player.x + random(-230, 230), player.y + random(-230, 230), 20, 20)
    enemy.addImage(enemyIMG)
    enemy.scale = 0.5
    v = random(1, 4)
    switch (v) {
      case 1:
        enemy.velocityX = -3
        break;
      case 2:
        enemy.velocityX = 3
        break;
      case 3:
        enemy.velocityY = -3
        break;
      case 4:
        enemy.velocityY = 3
        break;
      default:
        break;
    }
    enemy.lifetime = 400
    enemy.debug = true
    enemy.setCollider("rectangle", 0, 0, 30, 30)
enemiesGroup.add(enemy)
  }



}

