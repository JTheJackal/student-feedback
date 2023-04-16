class Circle extends Shape {

    constructor(x, y, fillColour, fillOpacity, lineWidth, lineColour, lineOpacity) {

        super(x, y, fillColour, fillOpacity, lineWidth, lineColour, lineOpacity);
    }

    draw(width, height) {

        this.gfx.lineStyle(this.lineWidth, this.lineColour, this.lineOpacity);
        this.gfx.beginFill(this.fillColour, this.fillOpacity);
        this.gfx.drawCircle(0, 0, width, height);
        this.gfx.endFill();
    }
}