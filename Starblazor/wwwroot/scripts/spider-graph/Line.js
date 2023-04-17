class Line extends Shape {

    constructor(x, y, lineWidth, lineColour, lineOpacity) {

        super(x, y, null, null, lineWidth, lineColour, lineOpacity);
    }

    draw(originX, originY, toX, toY) {

        this.gfx.lineStyle(this.lineWidth, this.lineColour)
        this.gfx.moveTo(originX, originY)
        this.gfx.lineTo(toX, toY);
    }
}