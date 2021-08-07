var bg,bgImg;


  //adding the background image
 
var player, shooterImg, shooter_shooting;
var zombie, zombieGroup, bulletGroup, score = 0;
var PLAY = 1;
var END = 0;
var BULLET = 3;
var WIN;
var gameState = PLAY;
var live = 3;
var bullets = 200;


function preload(){
  
  shooterImg = loadImage("shooter_2.png");
  shooter_shooting = loadImage("shooter_3.png");

  bgImg = loadImage("bg.jpeg");

  bulletImg = loadImage("bullet.png");
  bullet1Img = loadImage("bullet1.png");
  bullet2Img = loadImage("bullet2.png");
  bullet3Img = loadImage("bullet3.png");
  bullet4Img = loadImage("bullet4.png");

  zombie1Img = loadImage("zombie1.png");
  zombie2Img = loadImage("zombie2.png");
  zombie3Img = loadImage("zombie3.png");
  zombie4Img = loadImage("zombie4.png");
  zombie5Img = loadImage("zombie5.png");

  restartImg = loadImage("restart.png");

  live1Img = loadImage("heart1.png");
  live2Img = loadImage("heart2.png");
  live3Img = loadImage("heart3.png");
  live0Img = loadImage("heart.png");

  s1 = loadSound("win.mp3");
  s2 = loadSound("lose.mp3");
  s3 = loadSound("explosion.mp3");

}

function setup() {

  createCanvas(windowWidth,windowHeight);
  
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.2;
  bg.x = bg.width/2;

  zombieGroup = new Group();
  bulletGroup = new Group();

//creating the player sprite
   player = createSprite(displayWidth-1155, displayHeight-283, 50, 50);
   player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)

   restart = createSprite(displayWidth/2, displayHeight/2, 20, 20);
   restart.visible = false;
   restart.addImage(restartImg);
   restart.scale = 1.0;

   live1 = createSprite(1165, 50, 40,40);
   live1.addImage(live1Img);
   live1.scale = 0.5;
   live1.visible = false;

   live2 = createSprite(1165, 50, 40,40);
   live2.addImage(live2Img);
   live2.scale = 0.5;
   live2.visible = false;

   live3 = createSprite(1165, 50, 40,40);
   live3.addImage(live3Img);
   live3.scale = 0.5;
   live3.visible = true;

   live0 = createSprite(1165, 50, 40, 40);
   live0.addImage(live0Img);
   live0.scale = 0.5;
   live0.visible = false;

   bE = createSprite(displayWidth/2, 633, 2000, 5);
   bE.visible = false;

   uE = createSprite(displayWidth/2, 11, 2000,5);
   uE.visible = false;
}

function draw() {

  if(gameState === PLAY)
  {

     if(keyWentDown("space"))
    {
      var bullet = createSprite(displayWidth-1180, player.y-20, 50, 50);
      bullet.scale = 0.15;
      bullet.velocityX = 15;
      bullet.visible = true;
      bullets = bullets-1;

      bullet.depth = live1.depth;
      bullet.depth = live2.depth;
      bullet.depth = live3.depth;

      var rando = Math.round(random(1,5));
  
      switch(rando)
      {
       case 1: bullet.addImage(bulletImg);
       break;
       case 2: bullet.addImage(bullet1Img);
       break;
       case 3: bullet.addImage(bullet2Img);
       break;
       case 4: bullet.addImage(bullet3Img);
       break;
       case 5: bullet.addImage(bullet4Img);
       break;
       default: break;
      }
     
       bulletGroup.add(bullet);
       s3.play();
   
    }

    bg.velocityX = 5;

    if(bg.x > 0)
    {
      bg.x = bg.width/2;
    }

    //moving the player up and down and making the game mobile compatible using touches
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30

  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
  player.y = player.y+30

  }

  if(bg.x < 0)
  {
    bg.x =n= bg.width;
  }

  //release bullets and change the image of shooter to shooting position when space is pressed
  if(keyWentDown("space")){
    player.addImage(shooter_shooting);
  }



  //player goes back to original standing image once we stop pressing the space bar
  else if(keyWentUp("space")){
    player.addImage(shooterImg) 
  }

    for(var i=0;i<zombieGroup.length;i++){     
        
     if(zombieGroup[i].isTouching(bulletGroup)){
          zombieGroup[i].destroy()
          bulletGroup.destroyEach()
          s1.play();
          score += 1
          } 

         else if(zombieGroup[i].isTouching(player))
  {
    zombieGroup[i].destroy();

    live = live - 1;
    s2.play();
    if(live === 2)
    {
      live2.visible = true;
      live3.visible = false;
      console.log("HI");
    }
   if(live === 1)
    {
      live1.visible = true;
      live2.visible = false;
    }

    if(live === 0)
    {
      live2.visible = false;
      live1.visible = false;
      live3.visible = false;
      live0.visible = true;

      gameState = END;
      
      console.log("YAY");
    }
  }
    
    }
  

  if(bullets == 0)
  {
    fill("blue");
    textSize(50);
    text("You ran out of bullets", 450, 325);
    gameState = BULLET;
  }

  if(score == 180)
  {
    fill("blue");
    textSize(50);
    text("You Have Won The Game", 450, 325);
    gameState = WIN;
  }

  player.collide(bE);
  player.collide(uE);
 }
    
    if(gameState === END)
  {
    bg.velocityX = 0;
    restart.visible = true;

    bulletGroup.destroyEach();
    zombieGroup.destroyEach();
    if(mousePressedOver(restart) || keyDown("SPACE"))
    {
     
      reset();
    }

  }
    if(gameState === BULLET)
  {

    restart.visible = true;
    bg.velocityX = 0;

    bulletGroup.destroyEach();
    zombieGroup.destroyEach(); 

    if(mousePressedOver(restart))
    {
      reset();
    }

  }

  if(gameState === WIN)
  {
    restart.visible = true;
    bg.velocityX = 0;

    bulletGroup.destroyEach();
    zombieGroup.destroyEach();

    if(mousePressedOver(restart))
    {
      reset();
    }

  }

    drawSprites();

  	createZombies();

    textSize(30);   
    fill(255);
    text("Score:"+ score, 50,60);
    text("Lives:", 900, 60);
    text("Bullets:" + bullets, 50, 100);
}

function createZombies()
{
  if(frameCount%50 === 0)
 {
  var zombie = createSprite(random(500,1100),random(100,500),40,40);

  zombie.velocityX = -5;
  zombie.scale = 0.2;
  var rand = Math.round(random(1,5));
 switch(rand)
 {
  case 1: zombie.addImage(zombie1Img);
  break;
  case 2: zombie.addImage(zombie2Img);
  break;
  case 3: zombie.addImage(zombie3Img);
  break;
  case 4: zombie.addImage(zombie4Img);
  break;
  case 5: zombie.addImage(zombie5Img);
  break;
  default: break;
 }

  player.depth = zombie.depth;
  player.depth += 1;

  zombieGroup.add(zombie);
 }
}


 function reset()
 {

  gameState = PLAY;

  bullets = 200;

  live = 3;
  live3.visible = true;
  score = 0;                                               
  restart.visible = false;
  player.visible = true;
  player.addImage(shooterImg);
  player.y = displayHeight-283;
 }
