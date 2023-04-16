class Shape {

    constructor(x, y, fillColour, fillOpacity, lineWidth, lineColour, lineOpacity) {

        this.x              = x;
        this.y              = y;
        this.fillColour     = fillColour;
        this.fillOpacity    = fillOpacity;
        this.lineWidth      = lineWidth;
        this.lineColour     = lineColour;
        this.lineOpacity    = lineOpacity;
        this.gfx            = new PIXI.Graphics();
        this.sprite         = null;
    }

    draw() {

        // Defined in subclass
    }

    makeSprite() {

        let texture     = app.renderer.generateTexture(this.gfx);
        this.sprite     = new PIXI.Sprite(texture);
        this.sprite.x   = this.x;
        this.sprite.y   = this.y;
        this.sprite.anchor.set(0.5, 0.5);

        app.stage.addChild(this.sprite);

        console.log(this.x, this.y);
    }

    rotateSprite(rotation) {

        this.sprite.angle = rotation;
    }

    getSprite() {

        return this.sprite;
    }
}