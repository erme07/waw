import { states } from '../states.js';

class GrayScale{
    constructor(){
        this.$btn = null // botón para activar/desactivar la escala de grises
    }

    init(){
        this.$btn = document.getElementById('btn-greyscale'); // botón para activar/desactivar la escala de grises
    }

    activate(){
        document.documentElement.classList.add('WAWGreyscale');
        this.$btn.classList.add('active');
        states.greyscale = true;
    }
    deactivate(){
        document.documentElement.classList.remove('WAWGreyscale');
        this.$btn.classList.remove('active');
        states.greyscale = false;
    }

    toggle(){
        states.greyscale ? this.deactivate() : this.activate();
    }
}

export const grayScale = new GrayScale()