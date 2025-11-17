
import WAW from './waw.js';

import { readingLine } from './features/ReadingLine.js';
import { readingMask } from './features/ReadingMask.js';
import { voiceReading } from './features/VoiceReading.js';

export const config = {
    widget:{
        position: "right", // left/right
    },
    reading_mask:{
        height: 100,
        opacity: 0.7
    },
    reading_line:{
        height: 10,
        opacity: 0.6,
        color: "#1cbe00",
    },
    voice_reading:{
        voice: null,
        speed: 1
    }
}

export const saveConfigToLocalStorage = () => {
    if (localStorage.getItem('wawConfig')) return;
    localStorage.setItem('wawConfig', JSON.stringify(config));
};

export const updateConfigToLocalStorage = () => localStorage.setItem('wawConfig', JSON.stringify(config));

export const loadConfigFromLocalStorage = () => {
    const saved = localStorage.getItem('wawConfig');
    if (saved) Object.assign(config, JSON.parse(saved));
    else return;
    readingMask.setOpacity(config.reading_mask.opacity);
    readingMask.setHeight(config.reading_mask.height);
    readingLine.setOpacity(config.reading_line.opacity);
    readingLine.setWeight(config.reading_line.height);
    readingLine.setColor(config.reading_line.color);
    WAW.instance.setPosition(config.widget.position);
    voiceReading.setSpeed(config.voice_reading.speed);
    voiceReading.setVoice(config.voice_reading.voice);
}   