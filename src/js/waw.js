
import { builWidget } from './template/construct.js';

import { states, saveStatesToLocalStorage, loadStatesFromLocalStorage, updateStatesToLocalStorage } from './states.js';
import { config, loadConfigFromLocalStorage, saveConfigToLocalStorage, updateConfigToLocalStorage } from './config.js';
import { setPosYMouse, setTouchdevice } from './variables.js';

import { fontSize } from './features/FontSize.js';
import { lineHeightSpacing } from './features/LineheightSpacing.js';
import { letterSpacing} from './features/LetterSpacing.js';
import { invertColor } from './features/InvertColor.js';
import { grayScale } from './features/Grayscale.js';
import { bigCursor } from './features/BigCursor.js';
import { readingLine } from './features/ReadingLine.js';
import { readingMask } from './features/ReadingMask.js';
import { voiceReading } from './features/VoiceReading.js';
import { hideImages } from './features/HideImages.js';
import { highlightLinks } from './features/HighlightLinks.js';
import { highlightHeaders } from './features/HighlightHeaders.js';
import { dyslexicFont } from './features/DyslexicFont.js';
import { mute } from './features/Mute.js';
import { animations } from './features/StopAnimation.js';

import '../css/style.css';

const WAW_SCRIPT_URL = document.currentScript?.src || "";

class WAW{
    static instance = null;
    constructor(){
        this.$widget = null // widget de accesibilidad
        this.$close_button = null
        this.$open_button = null
        this.widget_open = false // estado del widget
        if (WAW.instance) {
            console.warn("WAW ya fue instanciado. Se usará la instancia existente.");
            return WAW.instance;
        }
        this.basePath = this.#getBasePath();
        WAW.instance = this;
    }

    async #init(){
        this.$widget = document.getElementById('waw-widget'); // widget de accesibilidad
        this.$close_button = document.getElementById('close-button');
        this.$open_button = document.getElementById('open-button');
        await this.#injectSprite();
    }

    #getBasePath() {
        if (!WAW_SCRIPT_URL) return "";
        console.log(WAW_SCRIPT_URL.substring(0, WAW_SCRIPT_URL.lastIndexOf("/") + 1))
        return WAW_SCRIPT_URL.substring(0, WAW_SCRIPT_URL.lastIndexOf("/") + 1);
    }

    async #injectSprite() {
        const basePath = this.#getBasePath();
        const spriteFiles = [
            basePath + "assets/icons/icons.svg",
            basePath + "assets/icons/options.svg"
        ];
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.width = 0;
        div.style.height = 0;
        div.style.display = "none"
        div.style.overflow = "hidden";
        const fetches = spriteFiles.map(async file => {
            const response = await fetch(file);
            if (!response.ok) {
                console.warn("No se pudo cargar el sprite:", file);
                return "";
            }
            return await response.text();
        });
        const svgs = await Promise.all(fetches);
        div.innerHTML = svgs.join("\n");
        document.body.prepend(div);
    }

    setLeft(){
        if(config.widget.position === 'left') return
        this.$widget.classList.add("left");
        this.$open_button.classList.add("left");
        document.getElementById("widget-pos-left").checked = true;
        document.getElementById("waw-mute-indicator").classList.add("right")
        config.widget.position = 'left';
    }

    setRight(){
        if(config.widget.position === 'right') return
        this.$widget.classList.remove("left");
        this.$open_button.classList.remove("left");
        document.getElementById("widget-pos-right").checked = true;
        document.getElementById("waw-mute-indicator").classList.remove("right")
        config.widget.position = 'right';
    }

    setPosition(positionValue){
        if(positionValue !== "left" && positionValue !== "right") return;
        (positionValue === "right") ? this.setRight() : this.setLeft()
    }
        
    #isMobile(){
        let mobileAgent = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (mobileAgent) {
            setTouchdevice(true)
            console.log("Estás en móvil o tablet");
            return true
        } else {
            setTouchdevice(false)
            console.log("Estás en PC");
            return false
        }
    }
    
    open(){
        this.$widget.classList.add('open');
        this.$widget.removeAttribute("inert");
        this.$close_button.focus();
        this.$open_button.setAttribute("inert","")
        this.widget_open = true;
    }

    close(){
        this.$widget.classList.remove('open');
        this.$widget.setAttribute("inert","");
        this.$open_button.removeAttribute("inert")
        this.$open_button.focus();
        this.widget_open = false;
    }

    toggleWidget(){
        !this.widget_open ? this.open() : this.close()
    }
        
    toggleTheme(){
        document.documentElement.classList.toggle("dark-theme")
        states.dark_theme = !states.dark_theme
    }

    resetFunctions(){
        bigCursor.deactivate()
        invertColor.deactivate()
        grayScale.deactivate()
        highlightHeaders.deactivate()
        highlightLinks.deactivate()
        readingLine.deactivate()
        readingMask.deactivate()
        voiceReading.deactivate()
        animations.enable()
        letterSpacing.deactivate()
        lineHeightSpacing.deactivate()
        dyslexicFont.deactivate()
        hideImages.deactivate()
        fontSize.deactivate()
        mute.deactivate()

        if(voiceReading.elementToRead) voiceReading.elementToRead.classList.remove("read-text");
    }

    run() {
        builWidget()
        this.#init()
        fontSize.init()
        readingMask.init()
        readingLine.init()
        voiceReading.init()
        dyslexicFont.init()
        grayScale.init()
        hideImages.init()
        hideImages.init()
        bigCursor.init()
        highlightHeaders.init()
        highlightLinks.init()
        invertColor.init()
        letterSpacing.init()
        lineHeightSpacing.init()
        mute.init()
        animations.init()
        
        document.addEventListener("click", (e) => {
            setPosYMouse(e.clientY)
            if(e.target.closest("#btn-fontsize")) fontSize.setLevel();
            else if(e.target.closest("#btn-lineheight")) lineHeightSpacing.setLevel();
            else if(e.target.closest("#btn-letterspacing")) letterSpacing.setLevel();
            else if(e.target.closest("#btn-color-invert")) invertColor.toggle();
            else if(e.target.closest("#btn-greyscale")) grayScale.toggle();
            else if(e.target.closest("#btn-big-cursor")) bigCursor.toggle();
            else if(e.target.closest("#btn-reading-line")) readingLine.toggle();
            else if(e.target.closest("#btn-reading-mask")) readingMask.toggle();
            else if(e.target.closest("#btn-voice-reading")) voiceReading.toggle();
            else if(e.target.closest('#btn-hide-img')) hideImages.toggle();
            else if(e.target.closest("#btn-highlight-links")) highlightLinks.toggle();
            else if(e.target.closest("#btn-highlight-headers")) highlightHeaders.toggle();
            else if(e.target.closest("#btn-apto-dislexia")) dyslexicFont.toggle();
            else if(e.target.closest("#btn-mute-sound")) mute.toggle();
            else if(e.target.closest("#btn-animations")) animations.toggle();
        
            else if(e.target.closest("#open-button") || e.target.closest("#close-button")) this.toggleWidget(); 
            else if(e.target.closest('[data-waw-function="toggle-theme"]')) this.toggleTheme();
        
            else if(e.target.closest('[data-waw-function="reset"]')) this.resetFunctions();
            else if(e.target.closest('#reading-controls-mask')) readingMask.controls(e);
            else if(e.target.closest('#reading-controls-line')) readingLine.controls(e);
            else if(e.target.closest('#test-voicereading')) voiceReading.readElement("Texto de prueba para la función de lectura de pantalla");
            else if(this.widget_open && !this.$widget.contains(e.target)) this.toggleWidget() // cierra el widget al hacer click fuera del mismo
        
            updateStatesToLocalStorage();
            if(states.voice_reading) voiceReading.selectElementToRead(e.target);
        });
        
        document.addEventListener('input', (e) => {
            if(e.target.id === "voices-list") voiceReading.setVoice(e.target.value);
            else if(e.target.name === "waw-screenreader-velocity") voiceReading.setSpeed(e.target.value);
            else if(e.target.name === "waw-mask-opacity") readingMask.setOpacity(e.target.value);
            else if(e.target.name === "waw-mask-height") readingMask.setHeight(e.target.value);
            else if(e.target.name === "waw-line-opacity") readingLine.setOpacity(e.target.value);
            else if(e.target.name === "waw-line-weight") readingLine.setWeight(e.target.value);
            else if(e.target.name === "waw-line-color") readingLine.setColor(e.target.value);
            else if(e.target.name === "waw-widget-position") this.setPosition(e.target.value);
            updateConfigToLocalStorage();
        });

        this.#isMobile();
        saveStatesToLocalStorage();
        loadStatesFromLocalStorage();
        
        speechSynthesis.addEventListener('voiceschanged', () => {
            loadConfigFromLocalStorage();
            voiceReading.getAvailableVoices()
            saveConfigToLocalStorage();
        });
        
        if(this.#isMobile) speechSynthesis.getVoices() // en dispositivos moviles puede no dipararse el evento 'voicechanged', fuerzo a que se dispare
    }
}

export default WAW;