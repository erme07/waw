
import { states } from '../states.js';
import { config } from '../config.js';
import Hammer from 'hammerjs';

import { touchDevice, setPosYMouse, posYmouse } from '../variables.js';

import { readingLine } from './ReadingLine.js';

class ReadingMask{

    constructor(){
        this.$mask = null
        this.$mask_top = null
        this.$mask_middle = null
        this.$controls = null
        this.$btn_plus = null
        this.$btn_minus = null
        this.$btn_close = null
    
        this.$btn = null
        this.custom_height = 100;  // altura inicial de la máscara de lectura
        //custom_height = config.reading_mask.height

        this.min_height = 50 // altura mínima de la máscara de lectura
        this.max_height = 300; // altura máxima de la máscara de lectura
    }


    init(){
        this.$mask = document.getElementById('waw-reading-mask'); // máscara de lectura
        this.$mask_top = document.getElementById('waw-reading-mask__top'); // parte superior de la máscara de lectura
        this.$mask_middle = document.getElementById('waw-reading-mask__middle'); // parte central de la máscara de lectura
        this.$controls = document.getElementById('reading-controls-mask'); // controles de la máscara de lectura
        this.$btn_plus = document.getElementById('btn-plus-mask'); // botón para aumentar el tamaño de la máscara
        this.$btn_minus = document.getElementById('btn-minus-mask'); // botón para disminuir el tamaño de la máscara
        this.$btn_close = document.getElementById('btn-close-mask'); // botón para cerrar la máscara de lectura
        this.$btn = document.getElementById('btn-reading-mask'); // botón para activar/desactivar la máscara de lectura
    }

    #updatePosition = (e) => {
        setPosYMouse(e.clientY)
        if(posYmouse <= this.custom_height / 2)
            this.$mask_top.style.height = "0px";
        else if(posYmouse >= innerHeight - (this.custom_height / 2))
            this.$mask_top.style.height = (innerHeight - this.custom_height) + 'px';
        else
            this.$mask_top.style.height = posYmouse - (this.custom_height / 2) + 'px';
    }

    updateSize = () => {
        this.$mask_middle.style.height = this.custom_height + 'px';
        this.$mask_top.style.height = posYmouse - (this.custom_height / 2) + 'px';
    }

    controls(e){ // Controla botones de la máscara de lectura y sus acciones
        this.$controls.classList.add("active");
        if(e.target == this.$btn_plus)
            this.custom_height = (this.custom_height + 10 > this.max_height) ? this.max_height : this.custom_height + 10;
        else if(e.target == this.$btn_minus)
            this.custom_height = (this.custom_height - 10 < this.min_height) ? this.min_height : this.custom_height - 10;
        else if(e.target == this.$btn_close)
            this.deactivate();
        this.updateSize();
    }

    activate(){
        states.reading_mask = true;
        if(touchDevice){
            this.$mask.classList.add("mobile");
            this.$controls.classList.remove("desktop");
            this.#handleTouch()
            if(states.reading_line) readingLine.deactivate(); // Desactiva la línea guía si está activa
            //posYmouse = innerHeight / 2; // En dispositivos táctiles, fija la posición del mouse en el centro de la pantalla
            setPosYMouse(innerHeight/2)
        } 
        else{
            this.$mask.classList.remove("mobile");
            this.$controls.classList.add("desktop");
            document.addEventListener('mousemove', this.#updatePosition); // Añade el evento de movimiento del mouse para la máscara de lectura
        }
        this.updateSize();
        this.$mask.classList.remove('hidden');
        this.$btn.classList.add('active');
    }

    deactivate(){
        states.reading_mask = false;
        document.removeEventListener('mousemove', this.#updatePosition); // Elimina el evento de movimiento del mouse para la máscara de lectura
        this.$mask.classList.add('hidden');
        this.$controls.classList.remove("active");
        this.$btn.classList.remove('active');
    }

    toggle(){
        if(states.reading_mask) this.deactivate();
        else this.activate();
    }

    setOpacity(opacityValue){
        const opacity = parseFloat(opacityValue);
        if(opacity < 0 || opacity > 1) return;
        this.$mask.style.setProperty('--waw-mask-opacity' , opacity);
        config.reading_mask.opacity = opacity;
        const radio = document.querySelector(`input[name="waw-mask-opacity"][value="${opacityValue}"]`)
        if(radio) radio.checked = true;
    }

    setHeight(value){
        const height = parseInt(value);
        if(height < this.min_height || height > this.max_height) return;
        config.reading_mask.height = height;
        this.custom_height = height;
        if(states.reading_mask) this.updateSize();
        const radio = document.querySelector(`input[name="waw-mask-height"][value="${value}"]`);
        if(radio) radio.checked = true;
    }

    #handleTouch = () =>{
        let startY = 0;
        
        const mask = new Hammer(this.$mask_middle);
        
        mask.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
        mask.on("panstart", () => startY = parseFloat(this.$mask_top.style.height))
        mask.on("panmove", (ev) => {
            const newY = startY + ev.deltaY;
            this.$mask_top.style.height = `${newY}px`;
        });
        mask.on("swipe", (ev) => {
            if (ev.direction === Hammer.DIRECTION_LEFT) this.$controls.classList.add("active");
            if (ev.direction === Hammer.DIRECTION_RIGHT) this.$controls.classList.remove("active");
        });
    }
}

export const readingMask = new ReadingMask()