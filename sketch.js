var monkey,invisibleGround,ground,gravity;
var jungleImage,monkeyRunning;
var PLAY=1;
var END=0;
var gameState=PLAY;
var mdead;
function preload(){
 monkeyRunning=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png"); 
  jungleImage=loadImage("jungle.png");
  stoneObstacle=loadImage("stone.png");
  bananaFood=loadImage("banana.png");
  mdead=loadAnimation("Monkey_09.png");
}
function setup() {
  createCanvas(600,200);
  monkey=createSprite(40,165,20,20);
  monkey.addAnimation("monkeyRunning",monkeyRunning);
  monkey.addAnimation("mdead",mdead);
  monkey.scale=0.15;
  monkey.setCollider("circle",13,100,50);
  jungle=createSprite(0,0,600,5);
  jungle.addImage("jungle.png",jungleImage);
  jungle.depth=0;
  jungle.scale=2.7;
  jungle.velocityX=-5;
  jungle.x=jungle.width/2;
  invisibleGround=createSprite(300,185,600,5);
  invisibleGround.visible=false;
  gravity=0.5;
  score=0;
  bananaGroup=new Group();
  stoneGroup=new Group();
  
}

function draw() {
 background(180);
  
  
  if(gameState==PLAY){
   jungle.velocityX=-5;
    
    if(jungle.x<0){
      jungle.x=jungle.width/2;
    }
    if(keyDown("space")){
      monkey.velocityY=-5;
    }
    monkey.velocityY=monkey.velocityY+gravity;
    spawnObstacles();
    spawnBananas();
    if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
      score=score+2;
  }
    if(stoneGroup.isTouching(monkey)){
      gameState=END;
      
    }
    
  
  }
  else if(gameState==END){
    monkey.changeAnimation("mdead",mdead);
    jungle.velocityX=0;
    bananaGroup.setVelocityXEach(0);
    stoneGroup.setVelocityXEach(0);
    monkey.velocityY=0;
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  
  
  monkey.collide(invisibleGround);
  drawSprites();
  fill(0);
  textSize(30)
  text("Score:"+score,480,20);
  
  
}
function spawnObstacles(){
  if(frameCount % 60 === 0) {
  var stone=createSprite(600,165,20,20);
    stone.velocityX=-5;
    stone.addImage("stone.png",stoneObstacle);
    stone.scale=0.15;
    stone.lifetime=120;
    stoneGroup.add(stone);
    }
}
function spawnBananas(){
 if(frameCount % 60===0){
  var banana=createSprite(600,120,20,20);
   banana.velocityX=-5;
   banana.y=Math.round(random(100,120));
   banana.addImage("banana.png",bananaFood);
   banana.scale=0.10;
   banana.lifetime=120;
   bananaGroup.add(banana);
   
 }
}

