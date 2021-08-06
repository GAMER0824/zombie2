const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground
var wall_right
var wall_left
var bridge
var jointPoint
var jointLink
var stones = []

function preload(){
  backgroundImg = loadImage("assets/background.png")
  zombieImg = loadImage("assets/zombie.png")
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 8, width * 2, 20, "green")
  wall_left = new Base(170, height / 2 + 50, 600, 100, "brown")
  wall_right = new Base(width - 90, height / 2 + 50, 600, 100, "brown")
  bridge = new Bridge(16, { x: width / 2 - 350, y: height / 2 })
  jointPoint = new Base(width - 450, height / 2 + 10, 40, 20)
  Composite.add(bridge.body, jointPoint)
  jointLink = new link(bridge, jointPoint)

  for (var i = 0; i <= 10; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 100);
    var stone = new Stone(x, y, 40);
    stones.push(stone);
  }
 zombie = createSprite(width / 2,height - 110)
 zombie.loadImage("zombieImg")
 zombie.scale = 0.1
 zombie.velocityX = 10

 breakbutton = createButton("")
 breakbutton.position(width - 10, height / 2 - 50)
 breakbutton.class("breakbutton")
 breakbutton.mousePressed(handleButtonPressed)

}

function draw() {
  background(backgroundImg);
  Engine.update(engine);

  ground.display()
  wall_left.display()
  wall_right.display()
  bridge.show()

  for (var stone of stones) {
    stone.display();
  }
  //jointPoint.display()

}
function handleButtonPressed(){
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  }, 1500)
}