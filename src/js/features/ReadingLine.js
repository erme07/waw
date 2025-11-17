
import { states } from '../states.js';
import { config } from '../config.js';
import Hammer from 'hammerjs';

import { touchDevice, setPosYMouse, posYmouse } from '../variables.js';

import { readingMask } from './ReadingMask.js';

class ReadingLine{
    constructor(){
        this.$btn = null
        this.$btn_close = null
        this.$line = null
        this.$controls = null
        this.allowedColors = [
            "#000000",
            "#1cbe00",
            "#2323ff",
            "#ffea00",
            "#f80000",
            "#ffffff"
        ];
    }


    init(){
        this.$line = document.getElementById('waw-reading-line'); // línea guía de lectura
        this.$controls = document.getElementById('reading-controls-line'); // controles de la línea guía de lectura
        this.$btn_close = document.getElementById('btn-close-line'); // botón para cerrar la guía de lectura
        this.$btn = document.getElementById('btn-reading-line'); // botón para activar/desactivar la línea guía de lectura
    }

    activate(){
        states.reading_line = true;
        let posY = 0;
        if(touchDevice){
            this.$line.classList.add("mobile");
            this.$controls.classList.remove("desktop");
            this.#handleTouch()
            if(states.reading_mask) readingMask.deactivate(); // Desactiva la máscara de lectura si está activa
            posY = innerHeight / 2; // En dispositivos táctiles, fija la posición del mouse en el centro de la pantalla
        } 
        else{
            this.$line.classList.remove("mobile");
            this.$controls.classList.add("desktop");
            posY = posYmouse
            document.addEventListener('mousemove', this.#update); // Añade el evento de movimiento del mouse para la línea guía
        }
        this.#update({clientY: posY}); // Inicializa la posición de la línea guía al abrirla
        this.$line.classList.remove('hidden');
        this.$btn.classList.add('active');
    }

    deactivate(){
        document.removeEventListener('mousemove', this.#update); // Elimina el evento de movimiento del mouse para la línea guía
        this.$line.classList.add('hidden');
        this.$controls.classList.remove("active");
        this.$btn.classList.remove('active');
        states.reading_line = false;
    }

    toggle(){
        if(states.reading_line) this.deactivate();
        else this.activate();
    }

    #update = (e) =>{ // Actualiza la posición de la línea guía
        setPosYMouse(e.clientY)
        this.$line.style.top = (posYmouse - 4) + 'px'; 
    }

    controls(e){ // Controla el boton de cierre de la guía de lectura
        this.$controls.classList.add("active");
        if(e.target == this.$btn_close){
            this.$line.classList.add('hidden');
            this.$controls.classList.remove("active");
            states.reading_line = false;
            this.$btn.classList.remove('active'); // Desactiva el botón de la guía de lectura
        }
    }

    setOpacity(opacityValue){
        const opacity = parseFloat(opacityValue);
        if(opacity < 0 || opacity > 1) return;
        this.$line.style.setProperty('--waw-line-background' ,`rgba(0,0,0,${opacity})`);
        config.reading_line.opacity = opacity;
        const radio = document.querySelector(`input[name="waw-line-opacity"][value="${opacityValue}"]`)
        if(radio) radio.checked = true;
    }

    setWeight(weightValue){
        if(weightValue!=="4" && weightValue!=="10" && weightValue!=="20") return;
        this.$line.style.setProperty ('--waw-line-weight', weightValue+'px');
        this.$controls.style.setProperty ('--waw-line-control',`calc(-50% + ${parseInt(weightValue)/2}px)`);
        config.reading_line.height = weightValue;
        const radio = document.querySelector(`input[name="waw-line-weight"][value="${weightValue}"]`)
        if(radio) radio.checked = true;
    }

    setColor(colorValue){
        if (!this.allowedColors.includes(colorValue)) return;
        this.$line.style.setProperty('--waw-line-color',colorValue);
        config.reading_line.color = colorValue;
        const radio = document.querySelector(`input[name="waw-line-color"][value='${colorValue}']`)
        if(radio) radio.checked = true
    }

    #handleTouch = () =>{
        let startY = 0;
        const line = new Hammer(this.$line);

        line.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
        line.on("panstart", () => startY = parseFloat(this.$line.style.top))
        line.on("panmove", (ev) => {
            const newY = startY + ev.deltaY;
            this.$line.style.top = `${newY - 4}px`;
        });
        line.on("panend", () => startY = parseFloat(this.$line.style.top));
        line.on("swipe", (ev) => {
            if (ev.direction === Hammer.DIRECTION_RIGHT) this.$line_controls.classList.add("active");
            if (ev.direction === Hammer.DIRECTION_LEFT) this.$line_controls.classList.remove("active");
        });
    }
}

export const readingLine = new ReadingLine()