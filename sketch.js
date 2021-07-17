var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backgr,backgrImage;
var car,carImage;

var coin,coinImage;
var drum,drumImage;

var obstacle,obstacleImage;
var black,blackImage;

var score;
function preload(){
  
  backgrImage = loadImage("Images/backgroun.png");
  carImage = loadImage("Images/car.png");
  
  coinImage = loadImage("Images/coin.png");
  drumImage = loadImage("Images/drum.jpg");
  
  obstacleImage = loadImage("Images/obstacle.png");
  blackImage = loadImage("Images/black.jpg");
}


function setup() {
  createCanvas(displayWidth - 20, displayHeight-120);
  
  backgr = createSprite(displayWidth/2 - 200,displayHeight/2 - 200, 1000,1000);
  backgr.addImage(backgrImage);
  backgr.scale = 4.5;
  backgr.velocityY = 4;

  
  car = createSprite(200,350,100,100);
  car.addImage(carImage);

  //car.velocityY = 4;
  car.scale = 0.25;

  car.setCollider("rectangle",0,0);
  car.debug = false;
  
  black = createSprite(200,200,100,100);
  black.addImage(blackImage);
  
  drumGroup = new Group();
  obstacleGroup = new Group();
  coinGroup = new Group();
  
  score = 0;
}


function draw(){
  background(0);
  if(gameState === PLAY){
    
    
  if(backgr.y > 800){
  backgr.y = 260;
 }

   camera.x = car.x;
   camera.y = car.y;
    
  black.visible = false;
    
 if(keyDown("left_Arrow")){
car.x = car.x-5;
 } 
  
 if(keyDown("right_Arrow")){
car.x = car.x+5; 
 }
    
 if(coinGroup.isTouching(car)){
  score = score + 10;
  coinGroup.destroyEach();
 }

 if(score === 100){
  stroke("white");
  textSize(20);

  fill("magenta");
  text("woahhh calm down dude!! ", displayWidth/2, displayHeight/2);
 }
      
  backgr.velocityY = (4+(score/2));
  
if(drumGroup.isTouching(car) || obstacleGroup.isTouching(car)){
  car.destroy();

  drumGroup.destroyEach(0);
  obstacleGroup.destroyEach(0);
  coinGroup.destroyEach(0);

  gameState = END;
 } 

  spawnDrum();
  spawnObstacle();
  spawnCoin();
  
  drawSprites();
  
  stroke("black");
  textSize(30);
  fill("white");
  text("Score : " + score,camera.x,50);
}
  
 else if (gameState === END){
   stroke("yellow");
    fill("yellow");
     textSize(30);
   
  text("Game 'unfortunately' OVER!!", 100,250);
    text("press 'R' to restart", 100,300);
     const audio = new Audio("mixkit-long-game-over-notification-276.mp3");
      audio.play();

   if(KeyDown("r")){
     gameState=PLAY;
  }
 }
} 

function spawnCoin(){
 
  if(frameCount % 180 === 0){

  coin = createSprite(400,200,100,100);
  coin.addImage(coinImage);
  coin.velocityY = 3;

  coin.x = Math.round(random(100,400));
  coin.scale = 0.05;
  coin.lifetime = 200;

  coinGroup.add(coin);
  coin.velocityY = (4+(score/2));
  coin.setCollider("circle",0,0);

  coin.debug = false;
  } 
}

function spawnDrum(){
  
  if(frameCount % 280 === 0){
    drum = createSprite (400,150,100,100);
    drum.addImage(drumImage);
    drum.velocityY = 3;

    drum.x = Math.round(random(100,400));
    drum.scale = 0.2;
    drum.lifetime = 300;

    drumGroup.add(drum);
    drum.setCollider("rectangle",0,0);
    drum.debug = false;
  }
}

function spawnObstacle(){
  
  if(frameCount % 380 === 0){
    obstacle = createSprite (400,100,100,100);
    obstacle.addImage(obstacleImage);
    obstacle.velocityY = 3;

    obstacle.x = Math.round(random(100,400));
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;

    obstacleGroup.add(obstacle);
    obstacle.setCollider("circle",0,0);
    obstacle.debug = false;
  }
}