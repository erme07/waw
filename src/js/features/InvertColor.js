
import { states } from '../states.js';

class InvertColor{
    constructor(){
        this.$btn = null // botón para activar/desactivar la inversión de colores
    }

    init(){
        this.$btn = document.getElementById('btn-color-invert'); // botón para activar/desactivar la inversión de colores
    }

    activate(){
        document.documentElement.classList.add('WAWInvertedColor');
        this.$btn.classList.add('active');
        states.color_invert = true;
    }

    deactivate(){
        document.documentElement.classList.remove('WAWInvertedColor');
        this.$btn.classList.remove('active');
        states.color_invert = false;
    }
    
    toggle(){
        states.color_invert ? this.deactivate() : this.activate();
    }
}

export const invertColor = new InvertColor()