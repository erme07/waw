
import { states } from '../states.js';

class Animations{

    constructor(){
        this.$btn = null
        this._waw_replacedGifs = [];
        this._waw_videoStates = []; 
    }

    init(){
        this.$btn = document.getElementById('btn-animations'); // botón para activar/desactivar las animaciones
    }

    disable(){
        document.documentElement.classList.add('WAWNoAnimations');
        this.$btn.classList.add('active');
        states.animations = false;
        this.#pauseAllVideos();
        this.#replaceGifsWithCanvas();
    }

    enable(){
        document.documentElement.classList.remove('WAWNoAnimations');
        this.$btn.classList.remove('active');
        states.animations = true;
        this.#restoreGifs();
        this.#resumeAllVideos();
    }

    toggle(){
        if (states.animations) this.disable();
        else this.enable();
    }

    #pauseAllVideos(){
        this._waw_videoStates = [];
        document.querySelectorAll('video').forEach(v => {
            try {
                const wasPlaying = !!(v.currentTime > 0 && !v.paused && !v.ended && v.readyState > 2);
                this._waw_videoStates.push({ video: v, wasPlaying });
                v.pause();
            } catch (err) { }
        });
    }

    #resumeAllVideos(){
        this._waw_videoStates.forEach(({ video, wasPlaying }) => {
            try {
            if (wasPlaying) video.play().catch(()=>{});
            } catch (err) {}
        });
        this._waw_videoStates = [];
    }

    #replaceGifsWithCanvas(){
        this._waw_replacedGifs = [];
        const imgs = Array.from(document.querySelectorAll('img'));
        imgs.forEach(img => {
            const src = img.src || '';
            if (!/\.gif(\?.*)?$/i.test(src)) return;
            if (img.dataset.wawGifReplaced) return;

            const cs = getComputedStyle(img);

            const canvas = document.createElement('canvas');
            canvas.className = (img.className ? img.className + ' ' : '') + 'waw-gif-placeholder';
            canvas.style.cssText = img.getAttribute('style') || '';
            canvas.style.display = cs.display;
            canvas.style.verticalAlign = cs.verticalAlign;
            
            if (cs.getPropertyValue('max-width') && cs.getPropertyValue('max-width') !== 'none') canvas.style.maxWidth = cs.getPropertyValue('max-width');
            if (cs.getPropertyValue('max-height') && cs.getPropertyValue('max-height') !== 'none') canvas.style.maxHeight = cs.getPropertyValue('max-height');

            const objectFit = cs.getPropertyValue('object-fit');
            if (objectFit) canvas.style.objectFit = objectFit;

            canvas.style.width = img.style.width || cs.width;
            canvas.style.height = img.style.height || cs.height;

            const naturalW = img.naturalWidth || parseInt(cs.width) || 100;
            const naturalH = img.naturalHeight || parseInt(cs.height) || 100;
            canvas.width = naturalW;
            canvas.height = naturalH;

            const ctx = canvas.getContext('2d');

            const image = new Image();
            image.crossOrigin = 'anonymous';
            let drawn = false;
            image.onload = () => {
            try {
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                drawn = true;
            } catch (err) {
                drawn = false;
            }
            };
            image.onerror = () => { drawn = false; };

            image.src = src;

            setTimeout(() => {
            const parent = img.parentNode;
            if (!parent) return;

            if (drawn) {
                img.dataset.wawGifReplaced = '1';
                img.dataset.wawGifOrigStyle = img.getAttribute('style') || '';
                img.dataset.wawGifOrigInlineWidth = img.getAttribute('width') || '';
                img.dataset.wawGifOrigInlineHeight = img.getAttribute('height') || '';
                parent.replaceChild(canvas, img);
                this._waw_replacedGifs.push({ original: img, canvas });
            } else {
                img.dataset.wawGifCouldNotFreeze = '1';
                img.classList.add('waw-gif-could-not-freeze');
            }
            }, 60);
        });
    }

    #restoreGifs(){
        if (!Array.isArray(this._waw_replacedGifs) || this._waw_replacedGifs.length === 0) return;
        this._waw_replacedGifs.forEach(entry => {
            if (!entry) return;
            const { original, canvas } = entry;
            if (!original || !canvas) return;
            try {
            if (canvas.parentNode) canvas.parentNode.replaceChild(original, canvas);
            try {
                if (original.dataset.wawGifOrigStyle !== undefined) {
                if (original.dataset.wawGifOrigStyle) original.setAttribute('style', original.dataset.wawGifOrigStyle);
                else original.removeAttribute('style');
                }
                if (original.dataset.wawGifOrigInlineWidth) original.setAttribute('width', original.dataset.wawGifOrigInlineWidth);
                else original.removeAttribute('width');
                if (original.dataset.wawGifOrigInlineHeight) original.setAttribute('height', original.dataset.wawGifOrigInlineHeight);
                else original.removeAttribute('height');
            } catch (e) { }
            delete original.dataset.wawGifReplaced;
            delete original.dataset.wawGifOrigStyle;
            delete original.dataset.wawGifOrigInlineWidth;
            delete original.dataset.wawGifOrigInlineHeight;
            } catch (e) {
            }
        });
        this._waw_replacedGifs = [];

        document.querySelectorAll('img[data-waw-gif-could-not-freeze="1"]').forEach(img => {
            img.classList.remove('waw-gif-could-not-freeze');
            delete img.dataset.wawGifCouldNotFreeze;
        });
    }
}

export const animations = new Animations()