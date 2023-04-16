class Badge {

    constructor(element) {

        this.name       = element.dataset.badge;
        this.selected   = false;
        this.element    = element;
    }

    getName(){

        return this.name;
    }

    getSelected(){

        return this.selected;
    }

    setSelected(bool){

        this.selected = bool;
        this.handleClass();
    }

    toggleSelected(){

        this.selected = !this.selected;
        this.handleClass();
    }

    getElement(){

        return this.element;
    }

    handleClass(){

        if(this.selected){

            this.element.classList.add("badge-selected");
        }else{

            this.element.classList.remove("badge-selected");
        }
    }
}