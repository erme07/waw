
import { states } from '../states.js';

class HighlightHeaders{
    constructor(){
        this.$btn = null
    }

    init(){
        this.$btn = document.getElementById('btn-highlight-headers'); // botón para activar/desactivar el resaltado de enlaces
    }

    activate(){
        const headers = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
        headers.forEach(el=>{
            if(!el.closest(".waw"))
                el.classList.add("WAWHighlightHeaders")
        })
        this.$btn.classList.add('active');
        states.highlight_headers = true;
    }

    deactivate(){
        const headers = Array.from(document.querySelectorAll(".WAWHighlightHeaders"))
        headers.forEach(el => el.classList.remove("WAWHighlightHeaders"))
        this.$btn.classList.remove('active');
        states.highlight_headers = false;
    }

    toggle(){
        states.highlight_headers ? this.deactivate() : this.activate();
    }
}

export const highlightHeaders = new HighlightHeaders()