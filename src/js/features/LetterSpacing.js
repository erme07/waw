import { states } from '../states.js';
import { letterSpacingtargets, excludeSelector, blacklist, letterSpacinglevels, isVisibleText, hasTextNode } from './utils.js';

export class LetterSpacing{
    constructor(){
        this.$btn = null
        this.$level_indicator = null;
    }

    init(){
        this.$btn = document.getElementById('btn-letterspacing'); // botón para activar/desactivar el espaciado de letras
        this.$level_indicator = document.getElementById("letterSpacing-levels");
    }

    #selectTargets(){
        let targets = Array.from(document.querySelectorAll('*')).filter(el => {
            if (blacklist.has(el.tagName)) return false;
            if (excludeSelector && el.closest(excludeSelector)) return false;
            if (!isVisibleText(el)) return false
            if (!hasTextNode(el)) return false
            const style = getComputedStyle(el);
            const ls = parseFloat(style.letterSpacing);
            const ws = parseFloat(style.wordSpacing);

            const baseLetter = isNaN(ls) ? 0 : ls; // si es 'normal', lo tratamos como 0
            const baseWord = isNaN(ws) ? 0 : ws;
            el.dataset.letterSpacing = baseLetter
            el.dataset.wordSpacing = baseWord
            return true
        })
        letterSpacingtargets.length=0
        letterSpacingtargets.push(...targets)
    }

    #setLetterSpacing(){
        letterSpacingtargets.forEach(el => {
            const baseLetter = Number(el.dataset.letterSpacing);
            const baseWord = Number(el.dataset.wordSpacing)
            const newLetter = baseLetter + letterSpacinglevels[states.letter_spacing].letter;
            const newWord = baseWord + letterSpacinglevels[states.letter_spacing].word;
            el.style.letterSpacing = `${newLetter}px`;
            el.style.wordSpacing = `${newWord}px`;
        });
        Array.from(this.$level_indicator.children).forEach(item => item.classList.remove("active"));
        this.$level_indicator.children[states.letter_spacing].classList.add("active");
    }

    activate(){
        this.#selectTargets()
        this.#setLetterSpacing();
        this.$btn.classList.add('active');
    }

    setLevel(){
        if(states.letter_spacing === false) {
            states.letter_spacing = 0
            this.activate();
            return
        }
        if(states.letter_spacing +1 < 4){
            states.letter_spacing += 1;
            this.#setLetterSpacing();
        }
        else this.deactivate();
    }

    deactivate(){
        Array.from(document.querySelectorAll("[data-letter-spacing]")).forEach(el=>{
            el.style.removeProperty("letter-spacing")
            el.style.removeProperty("word-spacing")
            delete el.dataset.letterSpacing
            delete el.dataset.wordSpacing
        })
        letterSpacingtargets.length = 0
        this.$btn.classList.remove('active');
        states.letter_spacing = false;
        Array.from(this.$level_indicator.children).forEach(item => item.classList.remove("active"));
    }
}

export const letterSpacing = new LetterSpacing()