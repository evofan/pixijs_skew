const WIDTH = 480;
const HEIGHT = 320;
const APP_FPS = 30;

// init
let app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT
});
let canvas = document.getElementById("canvas");
canvas.appendChild(app.view);
app.renderer.backgroundColor = 0x000000;
app.stage.interactive = true;
app.ticker.remove(app.render, app);
const fpsDelta = 60 / APP_FPS;

let elapsedTime = 0;
let bg;
let obj, obj2, obj3, obj4;
let isSkewDragging = false;

let container = new PIXI.Container();
container.width = 480;
container.height = 320;
container.x = 0;
container.y = 0;
container.pivot.x = 0;
container.pivot.y = 0;
container.interactive = true;
container.interactiveChildren = true;
app.stage.addChild(container);

// asset property
const ASSET_BG = "images/pic_bg.jpg";
const ASSET_OBJ = "images/pic_skew.png";

PIXI.loader.add("bg_data", ASSET_BG);
PIXI.loader.add("obj_data", ASSET_OBJ);
PIXI.loader.load(onAssetsLoaded);

/**
 * Asset load Complete
 * @param { object } loader object
 * @param { object } res asset data
 */
function onAssetsLoaded(loader, res) {
  // BG
  bg = new PIXI.Sprite(res.bg_data.texture);
  container.addChild(bg);
  bg.x = 0;
  bg.y = 0;

  // obj1
  obj1 = new PIXI.Sprite(res.obj_data.texture);
  container.addChild(obj1);
  obj1.anchor.set(0.5);
  obj1.x = WIDTH / 2 - 90;
  obj1.y = HEIGHT / 2 - 70;
  obj1.scale.set(1);
  obj1.skew.x = -90;
  obj1.skew.y = -100;

  // obj2
  obj2 = new PIXI.Sprite(res.obj_data.texture);
  container.addChild(obj2);
  obj2.anchor.set(0.5);
  obj2.x = WIDTH / 2 - 120;
  obj2.y = HEIGHT / 2 + 70;
  obj2.scale.set(0.75);

  // obj3
  obj3 = new PIXI.Sprite(res.obj_data.texture);
  container.addChild(obj3);
  obj3.anchor.set(0.5);
  obj3.x = WIDTH / 2;
  obj3.y = HEIGHT / 2;
  obj3.interactive = true;
  obj3.buttonMode = true;
  obj3.scale.set(1);
  obj3.setTransform(
    // x pos
    WIDTH / 2 + 100,

    // y pos
    HEIGHT / 2 - 50,

    // scaleX
    1,

    // scaleY
    0.5,

    // rotation(radian)
    -0.5235987755982988,

    // skewX(radian)
    100,

    // skewY(radian)
    50,

    // pivotX
    0.5,

    // pivotY
    0.5
  );
  obj3
    .on("pointerdown", onDragStart)
    .on("pointerup", onDragEnd)
    .on("pointerupoutside", onDragEnd)
    .on("pointermove", onDragMove);

  // obj
  obj4 = new PIXI.Sprite(res.obj_data.texture);
  container.addChild(obj4);
  obj4.anchor.set(0.5);
  obj4.x = WIDTH / 2;
  obj4.y = HEIGHT - 100;
  obj4.scale.set(1);
  obj4.setTransform(
    // x pos
    WIDTH / 2 + 150,

    // y pos
    HEIGHT - 50,

    // scaleX
    0.3,

    // scaleY
    0.3,

    // rotation(radian)
    -0.7853981633974483,

    // skewX(radian)
    6.283185307179586,

    // skewY(radian)
    3.141592653589793,

    // pivotX
    0.5,

    // pivotY
    0.5
  );

  // Text
  let text = new PIXI.Text("Skew Test\n(PixiJS 4.5.5)", {
    fontFamily: "Arial",
    fontSize: 30,
    fill: 0xf0fff0,
    align: "center",
    fontWeight: "bold",
    stroke: "#000000",
    strokeThickness: 4,
    dropShadow: false,
    dropShadowColor: "#666666",
    lineJoin: "round"
  });
  container.addChild(text);
  text.x = WIDTH / 2 - text.width / 2;
  text.y = 20;

  // Ticker
  let ticker = PIXI.ticker.shared;
  ticker.autoStart = false;
  ticker.stop();
  PIXI.settings.TARGET_FPMS = 0.06;
  app.ticker.add(tick);
}

/**
 * start drag
 * @param { object } e
 */
let onDragStart = e => {
  obj3.tint = 0x99999;
  isSkewDragging = true;
};

/**
 * stop drag
 */
let onDragEnd = e => {
  obj3.tint = 0xffffff;
  isSkewDragging = false;
};

/**
 * move drag
 */
let onDragMove = e => {
  if (isSkewDragging) {
    let point = e.data.global;
    obj3.x = point.x;
    obj3.y = point.y;
  }
};

/**
 * adjust fps
 * @param { number } delta time
 */
const tick = delta => {
  // console.log(delta);
  elapsedTime += delta;

  if (elapsedTime >= fpsDelta) {
    //enough time passed, update app
    update(elapsedTime);
    //reset
    elapsedTime = 0;
  }
};

/**
 * app rendering
 * @param { number } delta time
 */
const update = delta => app.render();
