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
        this.texture        = null;
    }

    draw() {

        // Defined in subclass
    }

    makeSprite() {

        this.texture     = app.renderer.generateTexture(this.gfx);
        this.sprite     = new PIXI.Sprite(this.texture);
        this.sprite.x   = this.x;
        this.sprite.y   = this.y;
        this.sprite.anchor.set(0.5, 0.5);

        app.stage.addChild(this.sprite);
    }

    rotateSprite(rotation) {

        this.sprite.angle = rotation;
    }

    getSprite() {

        return this.sprite;
    }

    renderGFX() {

        app.stage.addChild(this.gfx);
    }

    renderSprite() {

        app.stage.addChild(this.sprite);
    }
}