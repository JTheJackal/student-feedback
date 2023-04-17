class Marker extends Circle {

    constructor(x, y, fillColour, fillOpacity, lineWidth, lineColour, lineOpacity) {

        super(x, y, fillColour, fillOpacity, lineWidth, lineColour, lineOpacity);

        this.hoverGFX       = null;
        this.hoverTexture   = null;
        
        this.minWidth       = null;
        this.minHeight      = null;
        this.maxWidth       = null;
        this.maxHeight      = null;
        this.isHovering     = false;

        this.growthRate     = 0.1;
    }

    // Prepare the texture the sprite uses for an on hover event
    prepareHover(){

        let tempGFX = new PIXI.Graphics();
        tempGFX.lineStyle(this.lineWidth, this.lineColour, this.lineOpacity);
        tempGFX.beginFill(0xAAAAAA, this.fillOpacity);
        tempGFX.drawCircle(0, 0, this.width, this.height);
        tempGFX.endFill();

        app.ticker.add(() => {

            if(this.isHovering){


                if(this.sprite.width + (this.growthRate*2) >= this.maxWidth || this.sprite.width + this.growthRate <= this.minWidth){
                    
                    this.growthRate = -this.growthRate;
                }
        
                this.sprite.width += this.growthRate;
                this.sprite.height += this.growthRate;
            }
        });

        return tempGFX;
    }

    // Prepare the sprite for mouseover, mouseout and click events
    setInteractive(){

        this.hoverGFX = this.prepareHover();
        this.hoverTexture   = app.renderer.generateTexture(this.hoverGFX);
        this.maxWidth   = this.sprite.width + 5;
        this.maxHeight  = this.sprite.height + 5;
        this.minWidth   = this.sprite.width;
        this.minHeight  = this.sprite.height;

        this.sprite.interactive = true;
        this.sprite.cursor = 'pointer';

        this.sprite.on('pointertap', () => {
        
            this.remove();
        });

        this.sprite.on('pointerover', () => {
        
            this.onHover();
        });

        this.sprite.on('pointerout', () => {
        
            this.onOut();
        });
    }


    // React to an pointerover event
    onHover(){

        this.isHovering     = true;

        this.sprite.texture = this.hoverTexture;
    }

    // React to a pointerout event
    onOut(){

        this.sprite.texture = this.texture;

        this.isHovering     = false;

        this.sprite.width   = this.minWidth;
        this.sprite.height  = this.minHeight;
    }

    // Remove the sprite from the screen
    remove(collection){

        app.stage.removeChild(this.sprite);
    }
}