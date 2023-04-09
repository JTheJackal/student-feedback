
const SIZEREDUCTION = 100;
const GRAPHICS      = new PIXI.Graphics();
let app             = null;
let width           = null;
let height          = null;

let labelsHeadings = [
    "Creative Elements",
    "Technical Elements"];

let labelsText      = [
    "Depth of idea/s",
    "Ambition",
    "Composition",
    "Drawing",
    "Media Control",
    "Realisation",
    "Colour",
    "Source work"];

window.setEnvironment = () => {

    // Get height of badge container to match it.
    width = document.getElementById("canvasHolder").offsetWidth;
    height = document.getElementById("badgeHolder").offsetHeight;
};

window.createPixi = () => {{ background: '#1099bb' }

    app = new PIXI.Application({
        width: width,
        height: height,
        background: '#fff',
        antialias: true
    });

    document.getElementById("canvasHolder").appendChild(app.view);
};

window.createCircle = () => {

    console.log("Creating circle");

    // Create a new background sprite
    const background = PIXI.Sprite.from('../images/spider-bg.png');
    background.width = height - SIZEREDUCTION;
    background.height = height - SIZEREDUCTION;
    background.anchor.set(0.5);
    background.x = width / 2;
    background.y = height / 2;
    app.stage.addChild(background);
}

window.createGraphOverlay = () => {

    console.log("Creating graph overlay");

    // Circle + line style 1

    GRAPHICS.lineStyle(2, 0x000, 1);
    GRAPHICS.beginFill(0x000, 0);
    GRAPHICS.drawCircle(width/2, height/2, 225);
    GRAPHICS.endFill();

    app.stage.addChild(GRAPHICS);
}

window.createLabels = () => {

    console.log("Creating labels");

    let text    = null;
    let style   = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 14
    });

    let matchDir = {
        north: 0,
        east: 2,
        south: 4,
        southwest: 5,
        west: 6
    };

    let modifierX = 1;
    let modifierY = 1;
    let defaultIncrement = 37;
    let increment = 0;
    let moveAmount = 125;

    let positionX = (width / 2) - moveAmount + defaultIncrement;
    let positionY = (height/2) - 195;

    for (let i = 0; i < labelsText.length; i++) {

        text = new PIXI.Text(labelsText[i], style);

        switch (i - 1) {

            case matchDir.north:

                increment = defaultIncrement;
                break;

            case matchDir.east:

                //console.log("Changing for i: " + i + " - East");
                modifierX = -1;
                increment = defaultIncrement * (modifierX);
                break;

            case matchDir.south:

                //console.log("Changing for i: " + i + " - South");
                modifierY = -1;
                modifierX = -1;
                increment = defaultIncrement;
                
                break;

            case matchDir.west:

                //console.log("Changing for i: " + i + " - West");
                modifierX = 1;
                increment = defaultIncrement * (-1);
                break;

            case matchDir.southwest:

                //console.log("Changing for i: " + i + " - South West");
                modifierX = -1;
                increment = defaultIncrement * (modifierX);
                break;

            default:

                increment = defaultIncrement * (modifierX * -1);
                break;
        }

        

        positionX += (moveAmount + increment) * modifierX;
        positionY += (65) * modifierY;

        console.log("i is: " + i);
        console.log("Movement amount is: " + ((moveAmount + increment) * modifierX));
        console.log("PositionX is: " + positionX);
        console.log("====================");

        text.x = positionX;
        text.y = positionY;
        text.anchor.set(0.5, 0.5);

        app.stage.addChild(text);

    }
}