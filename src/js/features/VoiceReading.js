
import { states } from '../states.js';
import { config, updateConfigToLocalStorage } from '../config.js';

class VoiceReading{
    constructor(){
        this.$btn = null // botón para activar/desactivar la lectura por voz
        this.$voice_options = null
        this.voiceSelected = null;

        this.focusByKeyboard = false;
        this.elementToRead = null;
        this.tag_list={ //lista de etiquetas comunes para la lectura de pantalla
            p: "Párrafo",
            h1: "Título Nivel 1",
            h2: "Título Nivel 2",
            h3: "Título Nivel 3",
            h4: "Título Nivel 4",
            h5: "Título Nivel 5",
            h6: "Título Nivel 6",
            img: "Imagen",
            span:"",
            strong: "",
            mark: "",
            i: ""
        }
    }

    init(){
        this.$btn = document.getElementById('btn-voice-reading'); // botón para activar/desactivar la lectura por voz
        this.$voice_options = document.getElementById("voices-list");
    }

    #focusByTab(e){if (e.key === 'Tab') focusByKeyboard = true;}
    #focusByMousedown(){this.focusByKeyboard = false}
    #handleFocusIn(e){
        if (!this.focusByKeyboard) return;
        this.readElement(this.#generateDescription(e.target))
    }

    toggle(){
        if(states.voice_reading) {
            this.deactivate();
            this.readElement("lectura de pantalla desactivada");
        }
        else this.activate();
    }

    activate(){
        if(!states.sound) return
        states.voice_reading = true;
        document.addEventListener('keydown', this.#focusByTab);
        document.addEventListener('mousedown', this.#focusByMousedown);
        document.addEventListener('focusin', this.#handleFocusIn);
        this.$btn.classList.add('active');
        this.readElement("lectura de pantalla activada");

    }

    deactivate(){
        states.voice_reading = false;
        document.removeEventListener('keydown', this.#focusByTab);
        document.removeEventListener('mousedown', this.#focusByMousedown);
        document.removeEventListener('focusin', this.#handleFocusIn);
        this.$btn.classList.remove('active');
        if(this.elementToRead) this.elementToRead.classList.remove("read-text");
        this.elementToRead = null;
    }

    #generateDescription = (target) => {
        let description = '';
        let tag = target.tagName.toLowerCase();
        let rol = target.getAttribute('role');
        let label = target.getAttribute('aria-label') || target.alt || target.innerText || target.value || target.placeholder || "Sin descripción";

        if (rol) description += rol + ': ';
        else if (tag === 'a') description += 'Enlace: ';
        else if (tag === 'button') description += 'Botón: ';
        else if (tag === 'input') description += 'Campo: ';
        else if(tag in this.tag_list) description += this.tag_list[tag] + ': '

        return description + label.trim();
    }

    readElement(message){
        const text = new SpeechSynthesisUtterance(message);
        text.rate = config.voice_reading.speed;
        if(this.voiceSelected) text.voice = this.voiceSelected;
        speechSynthesis.cancel();
        speechSynthesis.speak(text);
    }

    selectElementToRead(element){
        if(element.tagName.toLowerCase() in this.tag_list){
            if(element.closest(".opcion")) return; // evita leer los elementos del widget
            if(this.elementToRead) this.elementToRead.classList.remove("read-text");
            this.elementToRead = element
            this.elementToRead.classList.add("read-text");
            this.readElement(this.#generateDescription(element))
        }
    }

    #getLanguage = () => navigator.language.split(/[-_]/)[0].toLowerCase();

    #generateoptionsVoices = (voicelist) => { // Genera el html con las opciones de voces disponibles para elegir
        this.$voice_options.innerHTML = '';
        voicelist.forEach(voice => {
            const option = document.createElement('option');
            option.value = voice.name;
            option.textContent = voice.name + (voice.lang ? ` [${voice.lang}]` : '');
            if(voice.name === config.voice_reading.voice)
                option.selected = true
            this.$voice_options.appendChild(option);
        });
    }

    getAvailableVoices = () => { // Obtiene una lista de las voces disponibles segun el idioma establecido
        const language = this.#getLanguage();
        let voicelist = speechSynthesis.getVoices().filter(v => v && v.lang && v.lang.startsWith(language));
        if(config.voice_reading.voice == null) {
            this.voiceSelected = voicelist.find(v => v.default) || voicelist[0];
            config.voice_reading.voice = this.voiceSelected.name;
        }
        else{
            this.voiceSelected = voicelist.find(v=> v.name == config.voice_reading.voice)
        }
        this.#generateoptionsVoices(voicelist);
        updateConfigToLocalStorage()
    };

    #changeVoiceReading = (selectedVoiceName)=>{
        let selectedVoice = speechSynthesis.getVoices().find(v => v.name === selectedVoiceName);
        return selectedVoice || null;
    }

    setVoice(voiceValue){
        this.voiceSelected = this.#changeVoiceReading(voiceValue);
        config.voice_reading.voice = this.voiceSelected.name;
    }

    setSpeed(speedValue){
        const speed = parseFloat(speedValue);
        if(speed < 0.5 || speed > 1.5) return;
        config.voice_reading.speed = speed;
        const radio = document.querySelector(`input[name="waw-screenreader-velocity"][value="${speedValue}"]`)
        if(radio) radio.checked = true;
    }
}

export const voiceReading = new VoiceReading()