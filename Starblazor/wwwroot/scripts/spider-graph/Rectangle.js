class Rectangle extends Shape {

    constructor(x, y, fillColour, fillOpacity, lineWidth, lineColour, lineOpacity) {

        super(x, y, fillColour, fillOpacity, lineWidth, lineColour, lineOpacity);
    }

    draw(width, height) {

        // Create sprites to sit over the top of the text to check collision
        this.gfx.beginFill(this.fillColour, this.fillOpacity);
        this.gfx.drawRect(0, 0, width, height);
        this.gfx.endFill();
    }
}