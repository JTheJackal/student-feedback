class Label {

    constructor(text, font, fontSize) {

        this.style          = this.defineStyle(font, fontSize);
        this.textObject     = new PIXI.Text(text, this.style);
    }

    defineStyle(font, fontSize) {

        return new PIXI.TextStyle({
            fontFamily: (font == null) ? 'Arial' : font,
            fontSize: (fontSize == null) ? 10 : fontSize
        });
    }

    rotate(rotation) {

        this.textObject.angle = rotation;
    }

    makeText(x, y) {

        this.textObject.x      = x;
        this.textObject.y      = y;
        this.textObject.anchor.set(0.5, 0.5);
    }

    render() {

        app.stage.addChild(this.textObject);
    }

    getObject() {

        return this.textObject;
    }
}