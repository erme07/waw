
import { states } from '../states.js';
import { fontSizeTargets, excludeSelector, blacklist, fontSizeLevels, isVisibleText, hasTextNode } from './utils.js';

class FontSize{
    constructor(){
        this.$btn = null
    }

    init(){
        this.$btn = document.getElementById('btn-fontsize')
    }

    #selectTargets(){
        let targets = Array.from(document.querySelectorAll('*')).filter(el => {
            if (blacklist.has(el.tagName)) return false;
            if (excludeSelector && el.closest(excludeSelector)) return false;
            if (!isVisibleText(el)) return false
            if (!hasTextNode(el)) return false
            const style = getComputedStyle(el);
            const fs = parseFloat(style.fontSize);
            const base = isNaN(fs) ? 16 : fs; // si es 'normal', lo tratamos como 0
            el.dataset.fontSize = base
            return true
        })
        fontSizeTargets.length = 0
        fontSizeTargets.push(...targets)
    }

    setLevel(){
        if(states.text_size === false) {
            states.text_size = 0
            this.activate();
        }
        else if(states.text_size +1 < 5){
            states.text_size += 1;
            this.#setFontSize();
        }
        else this.deactivate();
    }

    #setFontSize(){
        fontSizeTargets.forEach(el => {
            const base = el.dataset.fontSize;
            const newSize = base * fontSizeLevels[states.text_size];
            el.style.fontSize = `${newSize}px`;
        });
        const $level_indicator = document.getElementById("fontsize-levels");
        Array.from($level_indicator.children).forEach(item => item.classList.remove("active"));
        $level_indicator.children[states.text_size].classList.add("active");
    }

    activate(){
        this.#selectTargets()
        this.#setFontSize();
        this.$btn.classList.add('active');
    }

    deactivate(){
        Array.from(document.querySelectorAll("[data-font-size]")).forEach(el=>{
            el.style.removeProperty("font-size")
            delete el.dataset.fontSize
        })
        fontSizeTargets.length = 0
        this.$btn.classList.remove('active');
        states.text_size = false;
        const $level_indicator = document.getElementById("fontsize-levels");
        Array.from($level_indicator.children).forEach(item => item.classList.remove("active"));
    }
}

export const fontSize = new FontSize()