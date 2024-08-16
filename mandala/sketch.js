let c1; let c2; let c3;
let r = 180; let angle = 0;
let amt = 0; let startingAngle = 0;
let frameCount = 0;
let capturer;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  c1 = color(255, 0, 0);
  c2 = color(255, 255, 0);
  c3 = color(187, 30, 100)
  capturer = new CCapture({ format: 'gif', framerate: 60 });
}

function draw() {

  if (angle === 60 * 5) {
    capturer.start();
  }

  background(220);
  
  setGradientBlock(0, width/4, 0, height, c1, c2);
  setGradientBlock(width/4, 2*width/4, 0, height, c2, c3);
  setGradientBlock(2*width/4, 3*width/4, 0, height, c3, c2);
  setGradientBlock(3*width/4, width, 0, height, c2, c1);
  
  translate(width/2, height/2);
  
  setGradientEllipse(0 + angle, 360, c1, c2);
  setGradientEllipse(90 + angle, 180, c2, c3);
  setGradientEllipse(180 + angle, 270, c3, c2);
  setGradientEllipse(270 + angle, 360, c2, c1);
  
  angle += 1;
  angle = startingAngle + easeInQuad(amt) * 90;
  if (amt > 1) {
    amt = 0;
    startingAngle += 90;
  } else {
    amt += 0.01;
  }
 
}

function setGradientBlock(min, max, y, h, c1, c2) {
  for (let i=min; i<=max; i++) {
  let amt = map(i, min, max, 0, 1);
  let c3 = lerpColor(c1, c2, amt);
    
  
  stroke(c3);
  line(i, y, i, y + h);
  
  }
}

function setGradientEllipse(min, max, c1, c2) {
   for ( let i=min; i<max; i+= 3) {
    let amt = map(i, min, max, 0, 1 );
    let c3 = lerpColor(c1, c2, amt)
  
  stroke(c3);
  
   let x = r*cos(i);
   let y = r*sin(i);
   line(0, 0, x, y);  
  }

  if (angle < 60 * 5) {
    capturer.capture(canvas)
  } else if (angle === 60) {
    capturer.save()
    capturer.stop()

  }
}