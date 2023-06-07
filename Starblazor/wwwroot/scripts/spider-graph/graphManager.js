
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
    background.interactive = true;
    background.cursor = 'pointer';

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

        }, milliseconds * i);      
    }

    // Loop for each segment, draw a circle in the target location
    for (let i = 0; i < SEGMENTS; i++) {

        setTimeout(function(){
            
            angle       = arc * (i + 1);
            angle       = angle * (Math.PI/180);

            position    = getPointOnCircle(positionX, positionY, angle + LABELANGLEOFFSET, radius - 15);
            
            let tempShape   = new Line(background.x, background.y, 1, 0xFFFFFF, 1);
            tempShape.draw(background.x, background.y, position.x, position.y);
            tempShape.renderGFX();

        }, milliseconds * i);
    }
}

window.createHeadings = () => {

    console.log("Creating headings");

    const SEGMENTS          = 2;
    const HEADINGPADDING    = 5;
    let arc                 = 360/SEGMENTS;
    let size                = 18;
    let collider            = null;


    for (let i = 0; i < headingsText.length; i++) {


        // Create a label object
        let heading     = createText(headingsText[i], size, PERIMETEROFFSET, arc, HEADINGANGLEOFFSET, i);

        // Create collider for the heading
        collider    = createCollider(heading.getObject(), HEADINGPADDING, headingsColliders);

        app.stage.addChild(collider);
        heading.render();
    }
}

window.createAptitudes = () => {

    const APTANGLEOFFSET    = 337 * (Math.PI/180);
    let moveAmount          = 11/100 * background.width;
    let aptOffset           = -(background.width/2) + moveAmount;
    let arc                 = 360/1;
    let size                = 9;


    for (let i = 0; i < labelsText.length; i++) {
        
        // Create a label object
        let label       = createText(aptitudeText[i], size, aptOffset, arc, APTANGLEOFFSET, 0);

        // Apply our own rotation
        label.rotate(75);
        label.render();

        // Move the next label further away from center
        aptOffset += moveAmount;
    }
}

window.createLabels = () => {

    console.log("Creating labels");

    const SEGMENTS      = 8;
    const LABELPADDING  = 0;
    let arc             = 360/SEGMENTS;
    let collider        = null;
    let size            = 12;


    for (let i = 0; i < labelsText.length; i++) {
        
        // Create a label object
        let label       = createText(labelsText[i], size, LABELSOFFSET, arc, LABELANGLEOFFSET, i);

        // Create a collision object for the label
        collider    = createCollider(label.getObject(), LABELPADDING, labelsColliders);

        app.stage.addChild(collider);
        label.render();
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

window.setInteractions = () => {

    // Allow background to be clicked on
    background.on('pointertap', (event) => {
        
        placeMarker(event, markers);
    });
}

window.screenshotGraph = () => {

    app.render();
    const imageUrl = app.renderer.plugins.extract.base64().then(function (result) {

        console.log(result);
        let link = document.createElement("a");
        link.href = result;
        link.download = "picture.png";
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    });
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

    let angle       = rotation * (multiplier + 1);
    angle           = angle * (Math.PI/180);

    let position    = getPointOnCircle(background.x, background.y, angle + rotationOffset, radius + positionOffset);

    let tempText = new Label(text, 'Arial', size);
    tempText.makeText(position.x, position.y);
    tempText.rotate(rotation * multiplier);

    return tempText;
}

let createCollider = function(object, padding, collection){

    let tempShape   = new Rectangle(object.x, object.y, 0xFFFFFF, 1, 0, 0xFFFFFF, 0);
    tempShape.draw(object.width + padding, object.height + padding);
    tempShape.makeSprite();
    tempShape.rotateSprite(object.angle);

    collection.push(tempShape.getSprite());

    //return collider;
    return tempShape.getSprite();
}

let placeMarker = function(event, collection){

    let tempMarker = new Marker(event.data.global.x, event.data.global.y, 0x218C74, 1, 1, 0x218C74, 1);
    tempMarker.draw(6, 6);
    tempMarker.makeSprite();
    tempMarker.setInteractive();
    collection.push(tempMarker);
    //console.log(event.data.global);
}