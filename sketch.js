
var escapeCar,escapeCarImg;
var vehicleGroup;
var play=1,end=0;
var gameState=play;
var hit=3;
var blinkTime1 = 0;
function preload(){
    track1img = loadImage("Images/roadtrack2.png");
    track2img = loadImage("Images/roadtrack1.png");
    escapeCarImg = loadAnimation("Images/escapeCar.png");
    blinkCar=loadAnimation("Images/blinkCar.png","Images/blink.png");
    enemyCar1=loadImage("Images/enemyCar1.png");
    enemyCar2=loadImage("Images/enemyCar2.png");
    enemyCar3=loadImage("Images/enemyCar3.png");
    enemyCar4=loadImage("Images/enemyCar4.png");
    health3=loadImage("Images/3health.png");
    health2=loadImage("Images/2health.png");
    health1=loadImage("Images/1health.png");
    health0=loadImage("Images/0health.png");
    gameOverimg = loadImage("Images/GameOver.gif");

}

function setup(){
    createCanvas(displayWidth-20, displayHeight-30);

    track1= createSprite(displayWidth/2-300, 0,displayWidth, displayHeight*10);
    track1.addImage("track",track1img);
    track1.y =  displayHeight/2 -50;
    track1.scale = 2.3;

    track2= createSprite(displayWidth/2+300, 0,displayWidth, displayHeight*10);
    track2.addImage("track",track2img);
    track2.y =  displayHeight/2 -50;
    track2.scale = 2.3;

    escapeCar = createSprite(displayWidth/2,displayHeight/2+20,10,10);
    escapeCar.addAnimation("Car",escapeCarImg);
    escapeCar.addAnimation("blinkCar",blinkCar);
    escapeCar.scale = 0.5;
    escapeCar.setCollider("rectangle",0,0,150,300);

    lives=createSprite(displayWidth/2-500,displayHeight/2+200);
    lives.addImage(health3)
    lives.scale=2;

    gameOver = createSprite(displayWidth/2,displayHeight/2);
    gameOver.addImage(gameOverimg);
    gameOver.scale = 0.09;
    gameOver.visible = false;

    vehicleGroup=new Group ();
    
}

function draw(){
    background(74,134,24);
    if(gameState==play){
        track1.velocityY = 10;
        track2.velocityY = 10;
        if(track1.y > displayHeight){
            track1.y =  displayHeight/2 -50;
        } 
        if(track2.y > displayHeight){
            track2.y =  displayHeight/2 -50;
        } 
        if(keyDown(LEFT_ARROW)){
            escapeCar.x = escapeCar .x - 5;
        }
        if(keyDown(RIGHT_ARROW)){
            escapeCar.x = escapeCar .x + 5;
        }
        spawnVehicles();
        for(var i = 0 ; i < 2 ; i = i + 1)
        {
          if(hit == 2)
          {
            lives.addImage(health2);
          }
          
          if(hit == 1)
          {
            lives.addImage(health1);
          }
          
          if(hit == 0)
          {
            lives.addImage(health0);
            gameState = end;
          }
        } 
        if(vehicleGroup.isTouching(escapeCar)){
            hit=hit-1;
            gameState="respawn";
        }
    }
    if(gameState==end){
        track1.velocityY=0;
        track2.velocityY=0;
        vehicleGroup.setVelocityYEach(0);
        gameOver.visible = true;
    }
    

    drawSprites();
    if(gameState == "respawn"){
        textSize(50);
        fill("red");
        text("Respawning",displayWidth/2-100,displayHeight/2);
        vehicleGroup.destroyEach();
        track1.velocityY=0;
        track2.velocityY=0;
        if(World.frameCount % 30 == 0){
            blinkTime1 = blinkTime1 + 1;
        }
        if(blinkTime1 < 3){
            escapeCar.changeAnimation("blinkCar",blinkCar);
        }
        if(blinkTime1 == 3){
            escapeCar.changeAnimation("Car",escapeCarImg);
            gameState = play;
            blinkTime1 = 0;
        }
    }
}
function spawnVehicles(){
    if(World.frameCount%100==0){
       var vehicles=createSprite(random(displayWidth/2-350,displayWidth/2+350),displayHeight/2+200);
      
       vehicles.velocityY=-4;
       vehicles.scale=0.3;
       var rand=Math.round(random(1,4));
       switch(rand){
           case 1:  vehicles.addImage(enemyCar1);
           break;
           case 2: vehicles.addImage(enemyCar2);
           break;
           case 3: vehicles.addImage(enemyCar3);
           break;
           case 4: vehicles.addImage(enemyCar4);
           break;
       }
       vehicles.lifetime=800;
       vehicles.setCollider("rectangle",0,0,150,300);
       vehicleGroup.add(vehicles);
       
    }

}