var d;
var p1x;
var p1y;

var p2x;
var p2y;

var pr;

var s1;
var s2;

var p1s;
var p2s;

var p;
var pu1;
var pu2;

var w;

var c1;
var c2;

///new set of global variables for the powerup functions///
var speedy;

var stop;

var re;
///framecount in setup///
var f;
var b;
var a;
var re1;
var re2;
var par1;
var par2;
var t;

function setup(){
  
  alert('Welcome to 2Ball. The Player on the left uses WASD keys to control the red ball and the person on the right uses the arrow keys to control the blue ball. The goal is to collect 15 white balls before the other person.');
  alert('Each colored square is a power up for a short time. Green: Speeds you up. Purple: Reverses opponents controls. Orange: Slows down opponent. Good Luck!')
  
  rectMode(CENTER);
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB);
  d = new Dot();
  
  speedy = new Speedy();
  
  stop = new Stop();
  
  re = new Reverse();
  
  f = frameCount;
  b = frameCount;
  a = frameCount;
  re1 = frameCount;
  re2 = frameCount;
  par1 = frameCount;
  par2 = frameCount;
  t = frameCount;
  p = frameCount;
  pu1 = frameCount;
  pu2 = frameCount;
  
  
///setting the players parameters///
///player 1 (RED)///
  p1x = windowWidth/8;
  p1y = windowHeight/2;

  p2x = windowWidth*(7/8);
  p2y = windowHeight/2;
///radius///
  pr = 10;
  
///speed///
  p1s = 10;
  p2s = 10;
  
///score//
  s1 = 0;
  s2 = 0;
  
///width and height///
  w = 20;
  
///color changer///
  c1 = 0;
  c2 = 230;
}

function draw(){
  background(0,0,40);

///placing methods into action///
  d.draw();
  d.score();
  d.speed();
  d.respawn();
  d.win();
  
  speedy.show();
  speedy.boost();
  speedy.time();
  
  stop.view();
  stop.parar();
  stop.tiempo();
  
  re.showme();
  re.rev();
  re.come();

///drawing in the players///
  fill(c1,100,90);
  ellipse(p1x,p1y,w,w);

  fill(c2,100,90);
  ellipse(p2x,p2y,w,w);

///establishing controls///
///PLAYER 2(BLUE///
  if(keyIsDown(DOWN_ARROW))
    p2y += p2s;
  if(keyIsDown(UP_ARROW))
    p2y -= p2s;
  if(keyIsDown(RIGHT_ARROW))
    p2x += p2s;
  if(keyIsDown(LEFT_ARROW))
    p2x -= p2s;
  
///PLAYER 1(RED)///
  if(keyIsDown(87))
    p1y -= p1s;
  if(keyIsDown(83))
    p1y += p1s;
  if(keyIsDown(68))
    p1x += p1s;
  if(keyIsDown(65))
    p1x -= p1s;
  
  
console.log(p1s,p2s);
///setting bounds of the players///
///Player 1(RED)///
  if(p1x > windowWidth){
    p1x = windowWidth}
  if(p1x < 0){
    p1x = 0}
  else if(p1y < 0){
    p1y = 0}
  else if (p1y > windowHeight){
    p1y = windowHeight}
  
///PLAYER 2(BLUE)///
  if(p2x > windowWidth){
    p2x = windowWidth}
  if(p2x < 0){
    p2x = 0}
  else if(p2y < 0){
    p2y = 0}
  else if (p2y > windowHeight){
    p2y = windowHeight}
}

function Dot(){
  this.x = windowWidth/2;
  this.y = random(0,windowHeight);
  
///drawing the dots///
  this.draw = function(){
  fill(0,0,90);
  ellipse(this.x,this.y,30,30);
  };
  
///adding score when ball is hit///
  this.score = function(){
    ///PLAYER 1 (RED) Impact///
    if(p1x + pr > this.x - 15 && p1x - pr < this.x + 15 && p1y + pr > this.y - 15 && p1y - pr < this.y + 15){
      s1 ++;
    }
    
///PLAYER 2 (BLUE) Impact///
    else if(p2x + pr > this.x - 15&& p2x - pr < this.x + 15 && p2y + pr > this.y - 15 && p2y - pr < this.y + 15){
      s2 ++;
    }

///displaying the score///
    textSize(60);
    textStyle(BOLD);
    textFont("Comic Sans MS");
    textAlign(CENTER);
    fill(0,100,90);
    stroke(0,0,0);
    text(s1,windowWidth/3,windowHeight/10);
    fill(239,100,90);
    text(s2,windowWidth*(2/3),windowHeight/10);
  };
  
///lowering the speed of each player///
  this.speed = function(){
    if(p1x + pr > this.x - 15 && p1x - pr < this.x + 15 && p1y + pr > this.y - 15 && p1y - pr < this.y + 15){
      if(s1 > s2){
        p2s += .75}
      if(p1s >= 1){
        p1s = p1s - 0.75}
      if(p1s <= -2){
        p1s += .75}
      if(p1s <= 1 && p1s >= -1){
        p1s = 1}
    }
    else if(p2x + pr > this.x - 15&& p2x - pr < this.x + 15 && p2y + pr > this.y - 15 && p2y - pr < this.y + 15){
      if(s2 > s1){
        p1s += .75}
      if(p2s >= 1){
        p2s = p2s - 0.75}
      if(p2s <= -2){
        p2s += .75}
      if(p2s <= 1 && p2s >= -1){
        p2s = 1}
    }
  };

///reaspawing the dot when it is hit///
  this.respawn = function(){
///PLAYER 1 (RED) Impact///
    if(p1x + pr > this.x - 15 && p1x - pr < this.x + 15 && p1y + pr > this.y - 15 && p1y - pr < this.y + 15){
        this.x = random(0,windowWidth);
        this.y = random(0,windowHeight);
        re1 = frameCount + 150;
    }
    
///PLAYER 2 (BLUE) Impact///
    else if(p2x + pr > this.x - 15&& p2x - pr < this.x + 15 && p2y + pr > this.y - 15 && p2y - pr < this.y + 15){
      this.x = random(0,windowWidth);
      this.y = random(0,windowHeight);
      re2 = frameCount + 150;
    }
///reseting the ball if they take too long///
    if(re1 == frameCount){
        this.x = random(0,windowWidth);
        this.y = random(0,windowHeight);
    }
    if(re2 == frameCount){
        this.x = random(0,windowWidth);
        this.y = random(0,windowHeight);
    }
    //console.log(re1,re2);
  };
  
///saying who won///
  this.win = function(){
    if(s1 >= 15){
      p2x = -200;
      p2y = -200;
      this.x = -500;
      this.y = -500;
      w = 20*(sin(.2*frameCount))+45;
      p1s = 30;
      textSize(160);
      textAlign(CENTER);
      fill(0,100,90);
      textStyle(BOLD);
      textFont("Comic Sans MS");
      text('RED WINS',windowWidth/2,windowHeight/2);
      textSize(100);
      fill(0,0,100);
      stroke(0,0,100);
      textStyle(NORMAL);
      text('Rematch',windowWidth/2,windowHeight/2+95);
      textSize(30);
      fill(0,0,5);
      stroke(0,0,90);
      text('(Refresh Page)',windowWidth/2,windowHeight/2+135);
    }
    if(s2 >= 15){
      p1x = -200;
      p1y = -200;
      this.x = -500;
      this.y = -500;
      w = 20*(sin(.2*frameCount))+45;
      p2s = 30;
      textSize(160);
      textAlign(CENTER);
      fill(239,100,90);
      textStyle(BOLD);
      textFont("Comic Sans MS");
      text('BLUE WINS',windowWidth/2,windowHeight/2);
      textSize(100);
      fill(0,0,100);
      stroke(0,0,100);
      textStyle(NORMAL);
      text('Rematch',windowWidth/2,windowHeight/2+95);
      textSize(30);
      fill(0,0,5);
      stroke(0,0,90);
      text('(Refresh Page)',windowWidth/2,windowHeight/2+135);
      }
  };
}
/////end ball function////

////power up function////
function Speedy(){
  this.x = random(0,width/3);
  this.y = random(0,windowHeight);
  
///method for actual powerup///
  this.show = function(){
    fill(140,100,90);
    rect(this.x,this.y,20,20);
  };
  
///method to give the player a boost if hitting the ball///
  this.boost = function(){
///PLAYER 1 IMPACT////
    if(p1x + pr > this.x - 10 && p1x - pr < this.x + 10 && p1y + pr > this.y - 10 && p1y - pr < this.y + 10){
      if(p1s > 0){
        p1s += 6}
      if(p1s < 0){
        p1s -= 6}
      b = frameCount+150;
    }
    if(frameCount >= b && frameCount <= b && p1s > 5){
      if(p1s > 0){
        p1s -= 6}
      if(p1s < 0){
        p1s += 6}
    }
///PLAYER 2 IMPACT///
    if(p2x + pr > this.x - 10 && p2x - pr < this.x + 10 && p2y + pr > this.y - 10 && p2y - pr < this.y + 10){
      if(p2s > 0){
        p2s += 6}
      if(p2s < 0){
        p2s -= 6}
      a = frameCount+150;
    }
    if(frameCount >= a && frameCount <= a && p2s > 5){
      if(p2s > 0){
        p2s -= 6}
      if(p2s < 0){
        p2s += 6}
    }
    //console.log(b)
    //console.log(p1s,p2s)
  };
///method to count the aount of time before another respawn///
  this.time = function(){
///PLAYER 1 IMPACT////
    if(p1x + pr > this.x - 10 && p1x - pr < this.x + 10 && p1y + pr > this.y - 10 && p1y - pr < this.y + 10){
      f = frameCount+300;
      this.x = -100;
      this.y = -100;
    }
///PLAYER 2 IMPACT///
    if(p2x + pr > this.x - 10 && p2x - pr < this.x + 10 && p2y + pr > this.y - 10 && p2y - pr < this.y + 10){
      f = frameCount+300;
      this.x = -100;
      this.y = -100;
    }
///Respawning after time///
    else if(frameCount >= f && frameCount <= f){
      this.x = random(0,width/3)
      this.y = random(0,windowHeight)
    }
    //console.log(f)
    //console.log(this.x,this.y);
  };
}

function Stop(){
  this.x = random(width*2/3,width);
  this.y = random(0,windowHeight);

///method to show the square powerup///
  this.view = function(){
    fill(30,100,90);
    rect(this.x,this.y,20,20);
  };
  
///method to stop the opponet///
  this.parar = function(){
///PLAYER 1 IMPACT////
    if(p1x + pr > this.x - 10 && p1x - pr < this.x + 10 && p1y + pr > this.y - 10 && p1y - pr < this.y + 10){
      par1 = frameCount + 75;
      p2s = p2s/4;
    }
    else if(par1 >= frameCount && par1 <= frameCount && p2s < 4){
      p2s = p2s*4;
    }
    
///PLAYER 2 IMPACT///
    if(p2x + pr > this.x - 10 && p2x - pr < this.x + 10 && p2y + pr > this.y - 10 && p2y - pr < this.y + 10){
      par2 = frameCount + 75;
      p1s = p1s/4;
    }
    else if(par2 >= frameCount && par2 <= frameCount && p1s < 4){
      p1s = p1s*4;
    }
  };
  
///method to put the powerup away for a little///
  this.tiempo = function(){
///PLAYER 1 IMPACT///
    if(p1x + pr > this.x - 10 && p1x - pr < this.x + 10 && p1y + pr > this.y - 10 && p1y - pr < this.y + 10){
      this.x = -100;
      this.y = -100;
      t = frameCount+300;
    }
///PLAYER 2 IMPACT///
    if(p2x + pr > this.x - 10 && p2x - pr < this.x + 10 && p2y + pr > this.y - 10 && p2y - pr < this.y + 10){
      this.x = -100;
      this.y = -100;
      t = frameCount+300;
    }
///reappearing the powerup///
    else if(t >= frameCount && t <= frameCount){
      this.x = random(width*2/3,width);
      this.y = random(0,windowHeight);
    }
  };
}


function Reverse(){
  this.x = random(width/3,width*2/3);
  this.y = random(0,windowHeight);

///method to show the square powerup///
  this.showme = function(){
    fill(287,100,90);
    rect(this.x,this.y,20,20);
  };
  
///method to stop the opponet///
  this.rev = function(){
///PLAYER 1 IMPACT////
    if(p1x + pr > this.x - 10 && p1x - pr < this.x + 10 && p1y + pr > this.y - 10 && p1y - pr < this.y + 10){
      pu1 = frameCount + 200;
      p2s *= -1;
    }
    else if(pu1 == frameCount){
      p2s *= -1;
    }
    
///PLAYER 2 IMPACT///
    if(p2x + pr > this.x - 10 && p2x - pr < this.x + 10 && p2y + pr > this.y - 10 && p2y - pr < this.y + 10){
      pu2 = frameCount + 200;
      p1s *= -1;
    }
    else if(pu2 == frameCount){
      p1s *= -1;
    }
  };
  
///method to put the powerup away for a little///
  this.come = function(){
///PLAYER 1 IMPACT///
    if(p1x + pr > this.x - 10 && p1x - pr < this.x + 10 && p1y + pr > this.y - 10 && p1y - pr < this.y + 10){
      this.x = -100;
      this.y = -100;
      p = frameCount+800;
    }
///PLAYER 2 IMPACT///
    if(p2x + pr > this.x - 10 && p2x - pr < this.x + 10 && p2y + pr > this.y - 10 && p2y - pr < this.y + 10){
      this.x = -100;
      this.y = -100;
      p = frameCount+800;
    }
///reappearing the powerup///
    else if(p == frameCount){
      this.x = random(width/3,width*2/3);
      this.y = random(0,windowHeight);
    }
  };
}
