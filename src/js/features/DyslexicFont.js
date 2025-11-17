import { states } from '../states.js';

class DyslexicFont{
    constructor(){
        this.$btn = null; // botón para activar fuente apta para dislexia
    }

    init(){
        this.$btn = document.getElementById('btn-apto-dislexia');
    }

    activate(){
        document.documentElement.classList.add('WAWDyslexicFont');
        if (this.$btn) this.$btn.classList.add('active');
        states.dyslexia_font = true;
    }

    deactivate() {
        document.documentElement.classList.remove('WAWDyslexicFont');
        if (this.$btn) this.$btn.classList.remove('active');
        states.dyslexia_font = false;
    }

    toggle(){
        states.dyslexia_font ? this.deactivate() : this.activate();
    }
}

export const dyslexicFont = new DyslexicFont()