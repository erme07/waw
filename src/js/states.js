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

export const states = {
    text_size: false,
    line_height: false,
    letter_spacing: false,

    color_invert: false,
    greyscale: false,
    big_cursor: false,

    reading_line: false,
    reading_mask: false,
    voice_reading: false, 

    hide_images: false,
    highlight_links: false,
    highlight_headers: false,

    dyslexia_font:false,
    sound: true,
    animations: true,
    dark_theme: false,
}


export const saveStatesToLocalStorage = () => {
    if (localStorage.getItem('wawStates')) return;
    localStorage.setItem('wawStates', JSON.stringify(states));
};
export const updateStatesToLocalStorage = () => localStorage.setItem('wawStates', JSON.stringify(states));

export const loadStatesFromLocalStorage = () => {
    const saved = localStorage.getItem('wawStates');
    if (saved) Object.assign(states, JSON.parse(saved));
    else return;
    if(states.dark_theme) document.documentElement.classList.add("dark-theme");
    if(states.big_cursor) bigCursor.activate();
    if(states.greyscale) grayScale.activate();
    if(states.color_invert) invertColor.activate();
    if(states.highlight_links) highlightLinks.activate();
    if(states.highlight_headers) highlightHeaders.activate();
    if(states.reading_line) readingLine.activate();
    if(states.reading_mask) readingMask.activate();
    if(states.voice_reading) voiceReading.activate();
    if(!states.animations) animations.disable();
    if(states.letter_spacing !== false) letterSpacing.activate();
    if(states.text_size !== false) fontSize.activate();
    if(states.line_height !== false) lineHeightSpacing.activate();
    if(states.hide_images) hideImages.activate();
    if(states.dyslexia_font) dyslexicFont.activate();
    if(!states.sound) mute.activate();
}
