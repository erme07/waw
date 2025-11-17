import { states } from '../states.js';
import { lineHeightTargets, excludeSelector, blacklist, lineHeightLevels, isVisibleText, hasTextNode } from './utils.js';

class LineHeightSpacing{
    constructor(){
        this.$btn = null
        this.$level_indicator = null;
    }

    init(){
        this.$btn = document.getElementById('btn-lineheight')
        this.$level_indicator = document.getElementById("lineheight-levels");
    }

    #selectTargets(){
        let targets = Array.from(document.querySelectorAll('*')).filter(el => {
            if (blacklist.has(el.tagName)) return false;
            if (excludeSelector && el.closest(excludeSelector)) return false;
            if (!isVisibleText(el)) return false
            if (!hasTextNode(el)) return false
            const style = getComputedStyle(el);
            const lh = parseFloat(style.lineHeight);
            const fs = parseFloat(style.fontSize);
            const base = isNaN(lh) ? 1.25 * fs : lh; // si es 'normal', lo tratamos como 0
            el.dataset.lineHeight = base
            return true
        })
        lineHeightTargets.length = 0
        lineHeightTargets.push(...targets)
    }

    setLevel(){
        if(states.line_height === false) {
            states.line_height = 0
            this.activate();
        }
        else if(states.line_height +1 < 4){
            states.line_height += 1;
            this.#setLineHeightSpacing();
        }
        else this.deactivate();
    }

    #setLineHeightSpacing(){
        lineHeightTargets.forEach(el => {
            const base = el.dataset.lineHeight;
            const newVal = base * lineHeightLevels[states.line_height];
            el.style.lineHeight = `${newVal}px`;
        });
        Array.from(this.$level_indicator.children).forEach(item => item.classList.remove("active"));
        this.$level_indicator.children[states.line_height].classList.add("active");
    }

    activate(){
        this.#selectTargets()
        this.#setLineHeightSpacing();
        this.$btn.classList.add('active');
    }

    deactivate(){
        Array.from(document.querySelectorAll("[data-line-height]")).forEach(el=>{
            el.style.removeProperty("line-height")
            delete el.dataset.lineHeight
        })
        lineHeightTargets.length = 0
        this.$btn.classList.remove('active');
        states.line_height = false;
        Array.from(this.$level_indicator.children).forEach(item => item.classList.remove("active"));
    }
}

export const lineHeightSpacing = new LineHeightSpacing()