
import { states } from '../states.js';

class HideImages{
    constructor(){
        this.$btn = null // botón para ocultar imágenes
        this._waw_hiddenImages = []; 
    }

    init(){
        this.$btn = document.getElementById('btn-hide-img'); // botón para ocultar imágenes
    }

    #hideAllImages(){
        this._waw_hiddenImages = [];
        const els = Array.from(document.querySelectorAll('img, picture, canvas.waw-gif-placeholder'));
        els.forEach(el => {
            if (el.dataset.wawHidden) return;
            el.dataset.wawOrigDisplay = el.style.display || '';
            el.style.display = 'none';
            // el.style.opacity = '0';
            el.dataset.wawHidden = '1';
            this._waw_hiddenImages.push(el);
        });
    }

    #restoreAllImages(){
        this._waw_hiddenImages.forEach(el => {
            try {
            el.style.display = el.dataset.wawOrigDisplay || '';
            delete el.dataset.wawHidden;
            delete el.dataset.wawOrigDisplay;
            } catch (e) { }
        });
        this._waw_hiddenImages = [];
    }

    activate(){
        if (this.$btn) this.$btn.classList.add('active');
        states.hide_images = true;
        this.#hideAllImages();
    }

    deactivate(){
        if (this.$btn) this.$btn.classList.remove('active');
        states.hide_images = false;
        this.#restoreAllImages();
    }

    toggle(){
        states.hide_images ? this.deactivate() : this.activate();
    }

}

export const hideImages = new HideImages()