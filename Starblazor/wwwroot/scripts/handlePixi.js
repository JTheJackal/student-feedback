
const GRAPHICS  = new PIXI.Graphics();
let app         = null;
let width       = null;
let height      = null;

window.setEnvironment = () => {

    // Get height of badge container to match it.
    width = document.getElementById("canvasHolder").offsetWidth;
    height = document.getElementById("badgeHolder").offsetHeight;
};

window.createPixi = () => {{ background: '#1099bb' }

    app = new PIXI.Application({ width: width, height: height, background: '#fff' });

    document.getElementById("canvasHolder").appendChild(app.view);
};

window.createCircle = () => {

    console.log("Creating circle");

    // create a new background sprite
    const background = PIXI.Sprite.from('../images/spider-bg.png');
    background.width = height;
    background.height = height;
    background.anchor.set(0.5);
    background.x = width / 2;
    background.y = height / 2;
    app.stage.addChild(background);
    // Circle + line style 1
    /*
    GRAPHICS.lineStyle(2, 0xABABAB, 1);
    GRAPHICS.beginFill(0x7BED9F, 1);
    GRAPHICS.drawCircle(width/2, height/2, 200);
    GRAPHICS.endFill();

    GRAPHICS.lineStyle(2, 0xCDE67C, 1);
    GRAPHICS.beginFill(0xCDE67C, 1);
    GRAPHICS.drawCircle(width / 2, height / 2, 150);
    GRAPHICS.endFill();

    GRAPHICS.lineStyle(2, 0xE6C97C, 1);
    GRAPHICS.beginFill(0xE6C97C, 1);
    GRAPHICS.drawCircle(width / 2, height / 2, 100);
    GRAPHICS.endFill();

    GRAPHICS.lineStyle(2, 0xED8779, 1);
    GRAPHICS.beginFill(0xED8779, 1);
    GRAPHICS.drawCircle(width / 2, height / 2, 50);
    
    GRAPHICS.endFill();
    */


    //app.stage.addChild(GRAPHICS);
}

window.createGraphOverlay = () => {

    console.log("Creating graph overlay");

    // Circle + line style 1

    GRAPHICS.lineStyle(2, 0x000, 1);
    GRAPHICS.beginFill(0x000, 0);
    GRAPHICS.drawCircle(width/2, height/2, 250);
    GRAPHICS.endFill();

    app.stage.addChild(GRAPHICS);
}