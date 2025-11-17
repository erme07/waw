
import { states } from '../states.js';
import { voiceReading } from './VoiceReading.js';

class Mute{
    constructor(){
        this.$btn = null
        this.$mute_indicator = null;
    }

    init(){
        this.$btn = document.getElementById('btn-mute-sound')
        this.$mute_indicator = document.getElementById("waw-mute-indicator")
    }

    activate(){
        document.querySelectorAll('audio, video').forEach(el => {
            el.dataset.muteStatus = el.muted;  // guardamos su estado original
            el.muted = true;
        });
        if(states.voice_reading) {
            voiceReading.deactivate();
            voiceReading.readElement("lectura de pantalla desactivada");
        }
        this.$mute_indicator.classList.add("active")
        this.$btn.classList.add('active');
        states.sound = false;
    }

    deactivate(){
        document.querySelectorAll('[data-mute-status]').forEach(el => {
            el.muted = el.dataset.muteStatus;
            delete el.dataset.muteStatus;
        });
        this.$mute_indicator.classList.remove("active")
        this.$btn.classList.remove('active');
        states.sound = true;
    }

    toggle(){
        !states.sound ? this.deactivate() : this.activate();
    }
}

export const mute = new Mute()