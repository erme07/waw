
import { states } from '../states.js';

class HighlightLinks{
    constructor(){
        this.$btn = null
    }

    init(){
        this.$btn = document.getElementById('btn-highlight-links'); // botón para activar/desactivar el resaltado de enlaces
    }

    activate(){
        const links = Array.from(document.querySelectorAll('a'))
        links.forEach(el=>{
            if(!el.closest('.waw'))
                el.classList.add("WAWHighlightLinks")
        });
        this.$btn.classList.add('active');
        states.highlight_links = true;
    }

    deactivate(){
        const links = Array.from(document.querySelectorAll(".WAWHighlightLinks"))
        links.forEach(el => el.classList.remove("WAWHighlightLinks"))
        this.$btn.classList.remove('active');
        states.highlight_links = false;
    }

    toggle(){
        states.highlight_links ? this.deactivate() : this.activate();
    }
}

export const highlightLinks = new HighlightLinks()