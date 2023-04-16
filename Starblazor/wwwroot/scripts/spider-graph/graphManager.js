
window.setEnvironment = () => {

    // Get height of badge container to match it.
    width   = PERCENTAGE/100 * document.getElementById("canvasHolder").offsetWidth;
    height  = PERCENTAGE/100 * document.getElementById("canvasHolder").offsetWidth;
};

window.createPixi = () => {

    app = new PIXI.Application({
        width: width,
        height: height,
        background: '#fff',
        antialias: true
    });

    document.getElementById("canvasHolder").appendChild(app.view);
};

window.createBackground = () => {

    console.log("Creating background");

    // Create a new background sprite
    background          = PIXI.Sprite.from('../images/spider-bg.png');
    background.width    = height - SIZEREDUCTION;
    background.height   = height - SIZEREDUCTION;
    background.anchor.set(0.5);
    background.x        = width / 2;
    background.y        = height / 2;
    app.stage.addChild(background);

    radius = background.width/2;
}

window.createGraphOverlay = () => {

    console.log("Creating graph overlay");

    const SEGMENTS          = 8;
    const CIRCLES           = 4;

    let circRadius          = 0; 
    let positionX           = width/2;
    let positionY           = height/2;
    let arc                 = 360/SEGMENTS;
    let position            = null;
    let milliseconds        = 100;

    let circRadiusModifier  = 6.5;


    // Loop for each segment, draw a circle in the target location
    for (let i = 0; i < CIRCLES; i++) {

        setTimeout(function(){
            
            circRadius  = background.width/circRadiusModifier;
            
            let tempShape   = new Circle(background.x, background.y, 0x000, 0, 1.5, 0xFFFFFF, 0.8);
            tempShape.draw(circRadius * (i + 1), circRadius * (i + 1));
            tempShape.makeSprite();

            // Create a graphic to use as a texture
            // const tempGraphics  = new PIXI.Graphics();
            // tempGraphics.lineStyle(1.5, 0xFFFFFF, 0.8);
            // tempGraphics.beginFill(0x000, 0);
            // tempGraphics.drawCircle(0, 0, circRadius * (i + 1), circRadius * (i + 1));
            // tempGraphics.endFill();

            // // Create the texture and apply to a new sprite
            // let texture = app.renderer.generateTexture(tempGraphics);
            // let circle  = new PIXI.Sprite(texture);
            // circle.x    = background.x;
            // circle.y    = background.y;
            // circle.anchor.set(0.5, 0.5);

            // app.stage.addChild(circle);

            // Increase the modifier to increase the size of the next circles
            circRadiusModifier += 0.7;

        }, milliseconds * i);      
    }

    // Loop for each segment, draw a circle in the target location
    for (let i = 0; i < SEGMENTS; i++) {

        setTimeout(function(){
            
            angle       = arc * (i + 1);
            angle       = angle * (Math.PI/180);

            position    = getPointOnCircle(positionX, positionY, angle + LABELANGLEOFFSET, radius - 15);
            
            let tempShape   = new Circle(position.x, position.y, 0xFFFFFF, 1, 1, 0xFFFFFF, 1);
            tempShape.draw(10, 10);
            tempShape.makeSprite();

            /*
            // Create sprites for circle perimeter
            const tempGraphics  = new PIXI.Graphics();
            tempGraphics.lineStyle(1, 0xFFFFFF, 1);
            tempGraphics.beginFill(0xFFFFFF, 1);
            tempGraphics.drawCircle(0, 0, 10, 10);
            tempGraphics.endFill();

            let texture = app.renderer.generateTexture(tempGraphics);
            circle      = new PIXI.Sprite(texture);
            circle.x    = position.x;
            circle.y    = position.y;
            circle.anchor.set(0.5, 0.5);

            app.stage.addChild(circle);
            */
        }, milliseconds * i);      
    }

    // Loop for each segment, draw a circle in the target location
    for (let i = 0; i < SEGMENTS; i++) {

        setTimeout(function(){
            
            angle       = arc * (i + 1);
            angle       = angle * (Math.PI/180);

            position    = getPointOnCircle(positionX, positionY, angle + LABELANGLEOFFSET, radius - 15);
            
            // Create sprites for circle perimeter
            const TEMPGFX  = new PIXI.Graphics();
            TEMPGFX.lineStyle(1, 0xffffff)
            TEMPGFX.moveTo(background.x, background.y)
            TEMPGFX.lineTo(position.x, position.y);
            app.stage.addChild(TEMPGFX);


        }, milliseconds * i);

        if(i === 1){
            //break;
        }
    }
}

window.createHeadings = () => {

    console.log("Creating headings");

    const SEGMENTS          = 2;
    const HEADINGPADDING    = 5;
    let arc                 = 360/SEGMENTS;
    let text                = null;


    for (let i = 0; i < headingsText.length; i++) {

        text        = createText(headingsText[i], 18, PERIMETEROFFSET, arc, HEADINGANGLEOFFSET, i);
        collider    = createCollider(text, HEADINGPADDING, headingsColliders);

        app.stage.addChild(collider);
        app.stage.addChild(text);
    }
}

window.createLabels = () => {

    console.log("Creating labels");

    const SEGMENTS      = 8;
    const LABELPADDING  = 0;
    let arc             = 360/SEGMENTS;
    let text            = null;
    let collider        = null;


    for (let i = 0; i < labelsText.length; i++) {

        text        = createText(labelsText[i], 12, LABELSOFFSET, arc, LABELANGLEOFFSET, i);
        collider    = createCollider(text, LABELPADDING, labelsColliders);

        app.stage.addChild(collider);
        app.stage.addChild(text);
    }
}

window.createPerimeter = () => {

    console.log("Creating perimeter");
    
    const SEGMENTS      = 140;

    let arc             = 360/SEGMENTS;
    let position        = null;
    let milliseconds    = 10;


    // Loop for each segment, draw a circle in the target location
    for (let i = 0; i < SEGMENTS; i++) {

        setTimeout(function(){
            
            angle       = arc * (i + 1);
            angle       = angle * (Math.PI/180);

            position    = getPointOnCircle(background.x, background.y, angle + CIRCANGLEOFFSET, radius + PERIMETEROFFSET);
            
            // Create a new perimeter circle
            let tempShape   = new Circle(position.x, position.y, 0x000000, 1, 1, 0x000000, 1);
            tempShape.draw(1, 1);
            tempShape.makeSprite();
            
            // If the newly created circle collides with a heading, remove it
            for(let j = 0; j < headingsColliders.length; j++){

                if(checkCollision(tempShape.getSprite(), headingsColliders[j])){

                    app.stage.removeChild(tempShape.getSprite());
                }
            }

            if(i+1 === SEGMENTS){

                createGraphOverlay();
            }
        }, milliseconds * i);      
    }
}

let getPointOnCircle = function(startX, startY, angle, radius){

    let posX = startX + Math.cos(angle) * radius;
    let posY = startY + Math.sin(angle) * radius;

    return {"x": posX, "y": posY};
}

let checkCollision = function(a, b)
{
  let ab = a.getBounds();
  let bb = b.getBounds();
  return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

let createText = function(text, size, positionOffset, rotation, rotationOffset, multiplier){

    let style   = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: size
    });

    let positionX   = width/2;
    let positionY   = height/2;

    let textObject  = new PIXI.Text(text, style);
    let angle       = rotation * (multiplier + 1);
    angle           = angle * (Math.PI/180);

    let position    = getPointOnCircle(positionX, positionY, angle + rotationOffset, radius + positionOffset);

    textObject.x      = position.x;
    textObject.y      = position.y;
    textObject.angle  = rotation * multiplier;
    textObject.anchor.set(0.5, 0.5);

    return textObject;
}

let createCollider = function(object, padding, collection){

    let tempShape   = new Rectangle(object.x, object.y, 0xFFFFFF, 0, 0, 0xFFFFFF, 0);
    tempShape.draw(object.width + padding, object.height + padding);
    tempShape.makeSprite();
    tempShape.rotateSprite(object.angle);
    /*
    // Create sprites to sit over the top of the text to check collision
    const TEMPGFX  = new PIXI.Graphics();
    TEMPGFX.beginFill(0xFFFFFF);
    TEMPGFX.drawRect(0, 0, object.width + padding, object.height + padding);
    TEMPGFX.endFill();

    const TEXTURE   = app.renderer.generateTexture(TEMPGFX);
    let rectangle   = new PIXI.Sprite(TEXTURE);
    rectangle.x     = object.x;
    rectangle.y     = object.y;
    rectangle.angle = object.angle;
    rectangle.anchor.set(0.5, 0.5);
    */

    //collection.push(rectangle);
    collection.push(tempShape.getSprite());

    //return rectangle;
    return tempShape.getSprite();
}