
// :::::::::::::::::::::::::::::::: ELEMENTOS DEL DOM ::::::::::::::::::::::::::::::::::::::::::::::

const $widget = document.getElementById('waw-widget'); // widget de accesibilidad
const $close_button = document.getElementById('close-button');
const $open_button = document.getElementById('open-button');

const $mask = document.getElementById('waw-reading-mask'); // máscara de lectura
const $mask_top = document.getElementById('waw-reading-mask__top'); // parte superior de la máscara de lectura
const $mask_middle = document.getElementById('waw-reading-mask__middle'); // parte central de la máscara de lectura
const $mask_controls = document.getElementById('reading-controls-mask'); // controles de la máscara de lectura
const $bmask_plus = document.getElementById('btn-plus-mask'); // botón para aumentar el tamaño de la máscara
const $bmask_minus = document.getElementById('btn-minus-mask'); // botón para disminuir el tamaño de la máscara
const $bmask_close = document.getElementById('btn-close-mask'); // botón para cerrar la máscara de lectura

const $line = document.getElementById('waw-reading-line'); // línea guía de lectura
const $line_controls = document.getElementById('reading-controls-line'); // controles de la línea guía de lectura
const $bline_close = document.getElementById('btn-close-line'); // botón para cerrar la guía de lectura

const $btn_fontsize = document.getElementById('btn-fontsize')
const $btn_reading_mask = document.getElementById('btn-reading-mask'); // botón para activar/desactivar la máscara de lectura
const $btn_reading_line = document.getElementById('btn-reading-line'); // botón para activar/desactivar la línea guía de lectura
const $btn_big_cursor = document.getElementById('btn-big-cursor'); // botón para activar/desactivar el cursor grande
const $btn_color_invert = document.getElementById('btn-color-invert'); // botón para activar/desactivar la inversión de colores
const $btn_greyscale = document.getElementById('btn-greyscale'); // botón para activar/desactivar la escala de grises
const $btn_highlight_links = document.getElementById('btn-highlight-links'); // botón para activar/desactivar el resaltado de enlaces
const $btn_highlight_headers = document.getElementById('btn-highlight-headers'); // botón para activar/desactivar el resaltado de enlaces
const $btn_voice_reading = document.getElementById('btn-voice-reading'); // botón para activar/desactivar la lectura por voz
const $btn_animations = document.getElementById('btn-animations'); // botón para activar/desactivar las animaciones
const $btn_letter_spacing = document.getElementById('btn-letterspacing'); // botón para activar/desactivar el espaciado de letras
const $btn_lineheight_spacing = document.getElementById('btn-lineheight')
const $btn_hide_img = document.getElementById('btn-hide-img'); // botón para ocultar imágenes
const $btn_apto_dislexia = document.getElementById('btn-apto-dislexia'); // botón para activar fuente apta para dislexia
const $btn_mute_sound = document.getElementById('btn-mute-sound')
const $btn_detAnimaciones = document.getElementById('btn-animations'); //boton para activar/desactivar animaciones

const $voice_options = document.getElementById("voices-list");

let mask_height = 100;  // altura inicial de la máscara de lectura
let posYmouse = innerHeight / 2; // posición del mouse en el eje Y - para la máscara y linea de lectura

let widget_open = false // estado del widget

let touchDevice = false; // indica si el dispositivo es táctil

const min_height = 50 // altura mínima de la máscara de lectura
const max_height = 300; // altura máxima de la máscara de lectura



// :::::::::::::::::: ESTADOS Y CONFIGURACION DEL WIDGET :::::::::::::::::::::::

const states = {
    text_size: false, // tamaño del texto
    line_height: false,
    letter_spacing: false,

    color_invert: false, // estado de la inversión de colores
    greyscale: false, // estado de la escala de grises
    big_cursor: false, // estado del cursor grande

    reading_line: false, // estado de la guía de lectura
    reading_mask: false, // estado de la máscara de lectura
    voice_reading: false, // estado de la lectura por voz

    hide_images: false,
    highlight_links: false, // estado del resaltado de enlaces
    highlight_headers: false, // estado del resaltado de enlaces

    dyslexia_font:false,
    sound: true,
    animations: true, // estado de las animaciones
    dark_theme: false, // estado del tema oscuro
}

const config = {
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

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// ::::::::: ALMACENAMIENTO EN LOCAL DE LOS ESTADOS DE LAS FUNCIONALIDADES DEL WIDGET :::::::::::

const saveStatesToLocalStorage = () => {
    if (localStorage.getItem('wawStates')) return;
    localStorage.setItem('wawStates', JSON.stringify(states));
};
const updateStatesToLocalStorage = () => localStorage.setItem('wawStates', JSON.stringify(states));

const loadStatesFromLocalStorage = () => {
    const saved = localStorage.getItem('wawStates');
    if (saved) Object.assign(states, JSON.parse(saved));
    else return;
    if(states.dark_theme) document.documentElement.classList.add("dark-theme");
    if(states.big_cursor) activateBigCursor();
    if(states.greyscale) activateGrayscale();
    if(states.color_invert) activateColorInvert();
    if(states.highlight_links) activateHighlightLinks();
    if(states.highlight_headers) activateHighlightHeaders();
    if(states.reading_line) activateReadingLine();
    if(states.reading_mask) activateReadingMask();
    if(states.voice_reading) activateVoiceReading();
    if(!states.animations) disableAnimations();
    if(states.letter_spacing) activeLetterSpacing(states.letter_spacing);
    if(states.text_size) activeFontSize(states.text_size);
    if(states.line_height) activeLineHeightSpacing(states.line_height);
    if(states.hide_images) activateHideImages();
    if(states.dyslexia_font) activateDyslexiaFont();
    if(!states.sound) activateMuteSound();
}

///:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// :::::: ALMACENAMIENTO EN LOCAL DE LA CONFIGRUACION DEL WIDGET ::::::

const saveConfigToLocalStorage = () => {
    if (localStorage.getItem('wawConfig')) return;
    localStorage.setItem('wawConfig', JSON.stringify(config));
};

const updateConfigToLocalStorage = () => localStorage.setItem('wawConfig', JSON.stringify(config));

const loadConfigFromLocalStorage = () => {
    const saved = localStorage.getItem('wawConfig');
    if (saved) Object.assign(config, JSON.parse(saved));
    else return;
    setMaskOpacity(config.reading_mask.opacity);
    setLineOpacity(config.reading_line.opacity);
    setLineWeight(config.reading_line.height);
    setLineColor(config.reading_line.color);
    setWidgetPosition(config.widget.position);
    setVoiceReadingSpeed(config.voice_reading.speed);
    setVoiceReadingVoice(config.voice_reading.voice);
}   

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// :::::::::::::::::::: MASCARA DE LECTURA :::::::::::::::::::::::::::::

const updateMaskPosition = (e) => {
    posYmouse = e.clientY; // Actualiza la posición del mouse
    if(posYmouse <= mask_height / 2)
        $mask_top.style.height = "0px";
    else if(posYmouse >= innerHeight - (mask_height / 2))
        $mask_top.style.height = (innerHeight - mask_height) + 'px';
    else
        $mask_top.style.height = posYmouse - (mask_height / 2) + 'px';
}

const updateMaskSize = () => {
    $mask_middle.style.height = mask_height + 'px';
    $mask_top.style.height = posYmouse - (mask_height / 2) + 'px';
}

const readingMaskControls = (e)=>{ // Controla botones de la máscara de lectura y sus acciones
    $mask_controls.classList.add("active");
    if(e.target == $bmask_plus)
        mask_height = (mask_height + 10 > max_height) ? max_height : mask_height + 10;
    else if(e.target == $bmask_minus)
        mask_height = (mask_height - 10 < min_height) ? min_height : mask_height - 10;
    else if(e.target == $bmask_close)
        deactivateReadingMask();
    updateMaskSize();
}

const activateReadingMask = () => {
    states.reading_mask = true;
    if(touchDevice){
        if(states.reading_line) deactivateReadingLine(); // Desactiva la línea guía si está activa
        posYmouse = innerHeight / 2; // En dispositivos táctiles, fija la posición del mouse en el centro de la pantalla
    } 
    else
        document.addEventListener('mousemove', updateMaskPosition); // Añade el evento de movimiento del mouse para la máscara de lectura
    updateMaskSize();
    $mask.classList.remove('hidden');
    $btn_reading_mask.classList.add('active');
}

const deactivateReadingMask = () => {
    states.reading_mask = false;
    document.removeEventListener('mousemove', updateMaskPosition); // Elimina el evento de movimiento del mouse para la máscara de lectura
    $mask.classList.add('hidden');
    $mask_controls.classList.remove("active");
    $btn_reading_mask.classList.remove('active');
}

const toggleReadingMask = () => {
    if(states.reading_mask) deactivateReadingMask();
    else activateReadingMask();
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// ::::::::::::::::::::: LINEA GUIA DE LECTURA ::::::::::::::::::::::::::

const activateReadingLine = () => {
    states.reading_line = true;
    if(touchDevice){
        if(states.reading_mask) deactivateReadingMask(); // Desactiva la máscara de lectura si está activa
        posY = innerHeight / 2; // En dispositivos táctiles, fija la posición del mouse en el centro de la pantalla
    } 
    else{
        posY = posYmouse
        document.addEventListener('mousemove', updateReadingLine); // Añade el evento de movimiento del mouse para la línea guía
    }
    updateReadingLine({clientY: posY}); // Inicializa la posición de la línea guía al abrirla
    $line.classList.remove('hidden');
    $btn_reading_line.classList.add('active');
}

const deactivateReadingLine = () => {
    document.removeEventListener('mousemove', updateReadingLine); // Elimina el evento de movimiento del mouse para la línea guía
    $line.classList.add('hidden');
    $line_controls.classList.remove("active");
    $btn_reading_line.classList.remove('active');
    states.reading_line = false;
}

const toggleReadingLine = () => {
    if(states.reading_line) deactivateReadingLine();
    else activateReadingLine();
}

const updateReadingLine = (e) => { // Actualiza la posición de la línea guía
    posYmouse = e.clientY; // Actualiza la posición del mouse
    $line.style.top = (posYmouse - 4) + 'px'; 
}

const readingLineControls = (e)=>{ // Controla el boton de cierre de la guía de lectura
    $line_controls.classList.add("active");
    if(e.target == $bline_close){
        $line.classList.add('hidden');
        $line_controls.classList.remove("active");
        states.reading_line = false;
        $btn_reading_line.classList.remove('active'); // Desactiva el botón de la guía de lectura
    }
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::





// :::::::::::::::::::::: INVERSOR DE COLORES :::::::::::::::::::::::

const activateColorInvert = () =>{
    document.documentElement.classList.add('WAWInvertedColor');
    $btn_color_invert.classList.add('active');
    states.color_invert = true;
}
const deactivateColorInvert = () =>{
    document.documentElement.classList.remove('WAWInvertedColor');
    $btn_color_invert.classList.remove('active');
    states.color_invert = false;
}
const toggleColorInvert = () =>{
    if(states.color_invert) deactivateColorInvert();
    else activateColorInvert();
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// :::::::::::::::::::::  CURSOR GRANDE  ::::::::::::::::::::::::::::

const activateBigCursor = () =>{
    document.documentElement.classList.add('WAWBigCursor');
    $btn_big_cursor.classList.add('active');
    states.big_cursor = true;
}
const deactivateBigCursor = () =>{
    document.documentElement.classList.remove('WAWBigCursor');
    $btn_big_cursor.classList.remove('active');
    states.big_cursor = false;
}
const toggleBigCursor = () =>{
    if(states.big_cursor) deactivateBigCursor();
    else activateBigCursor();
}

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// :::::::::::::::::::::: ESCALA DE GRISES :::::::::::::::::::::::::

const activateGrayscale = () =>{
    document.documentElement.classList.add('WAWGreyscale');
    $btn_greyscale.classList.add('active');
    states.greyscale = true;
}
const deactivateGrayscale = () =>{
    document.documentElement.classList.remove('WAWGreyscale');
    $btn_greyscale.classList.remove('active');
    states.greyscale = false;
}

const toggleGrayscale = () =>{
    if(states.greyscale) deactivateGrayscale();
    else activateGrayscale();
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// :::::::::::::::::::::::: RESALTAR ENLACES ::::::::::::::::::::::::

const activateHighlightLinks = () =>{
    const links = Array.from(document.querySelectorAll('a'))
    links.forEach(el=>{
        if(!el.closest('.waw'))
            el.classList.add("WAWHighlightLinks")
    });
    $btn_highlight_links.classList.add('active');
    states.highlight_links = true;
}
const deactivateHighlightLinks = () =>{
    const links = Array.from(document.querySelectorAll(".WAWHighlightLinks"))
    links.forEach(el => el.classList.remove("WAWHighlightLinks"))
    $btn_highlight_links.classList.remove('active');
    states.highlight_links = false;
}

const toggleHighlightLinks = () =>{
    if(states.highlight_links) deactivateHighlightLinks();
    else activateHighlightLinks();
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// :::::::::::::::::::::::: RESALTAR ENCABEZADOS ::::::::::::::::::::::::

const activateHighlightHeaders = () =>{
    const headers = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
    headers.forEach(el=>{
        if(!el.closest(".waw"))
            el.classList.add("WAWHighlightHeaders")
    })
    $btn_highlight_headers.classList.add('active');
    states.highlight_headers = true;
}
const deactivateHighlightHeaders = () =>{
    const headers = Array.from(document.querySelectorAll(".WAWHighlightHeaders"))
    headers.forEach(el => el.classList.remove("WAWHighlightHeaders"))
    $btn_highlight_headers.classList.remove('active');
    states.highlight_headers = false;
}

const toggleHighlightHeaders = () =>{
    if(states.highlight_headers) deactivateHighlightHeaders();
    else activateHighlightHeaders();
}

// :::::::::::::::::::::::: SILENCIAR SONIDOS ::::::::::::::::::::::::


const activateMuteSound=()=>{
    document.querySelectorAll('audio, video').forEach(el => {
        el.dataset.muteStatus = el.muted;  // guardamos su estado original
        el.muted = true;
    });
    if(states.voice_reading) {
        deactivateVoiceReading();
        readElement("lectura de pantalla desactivada");
    }
    document.getElementById("waw-mute-indicator").classList.add("active")
    $btn_mute_sound.classList.add('active');
    states.sound = false;
}

const deactivateMuteSound = () =>{
    document.querySelectorAll('[data-mute-status]').forEach(el => {
        el.muted = el.dataset.muteStatus;
        delete el.dataset.muteStatus;
    });
    document.getElementById("waw-mute-indicator").classList.remove("active")
    $btn_mute_sound.classList.remove('active');
    states.sound = true;
}

const toggleMuteSound = () =>{
    if(!states.sound) deactivateMuteSound();
    else activateMuteSound();
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// ::::::::::::::::::: CONTROL DEL TAMAÑO DE TEXTO ::::::::::::::::::


const isVisibleText = (el) => {
        const s = getComputedStyle(el);
        if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) === 0 || el.offsetParent == null) return false;
        const r = el.getBoundingClientRect();
        return !(r.width === 0 && r.height === 0);
    };

const hasTextNode = (el) => {
    for (const node of el.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) return true;
    }
    return false;
};


let fontSizeTargets=[];

const selectFontSizeTargets = () =>{
    let excludeSelector = '.waw'
    const blacklist = new Set(['SCRIPT','STYLE','NOSCRIPT','IFRAME','CANVAS','SVG']);
    let targets = Array.from(document.querySelectorAll('*')).filter(el => {
        if (blacklist.has(el.tagName)) return false;
        if (excludeSelector && el.closest(excludeSelector)) return false;
        if (!isVisibleText(el)) return false
        if (!hasTextNode(el)) return false
        const style = getComputedStyle(el);
        const fs = parseFloat(style.fontSize);
        const base = isNaN(fs) ? 16 : fs; // si es 'normal', lo tratamos como 0
        el.dataset.fontSize = base
        return true
    })
    return targets
}

const fontSizeLevels = {
    0: 0.8,  // reducido
    1: 0.9,  // normal
    2: 1.1,  // aumentado
    3: 1.3,   // muy aumentado
    4: 1.6   // muy aumentado
};

const setFontSizeLevel = () =>{
    if(states.text_size === false) {
        states.text_size = 0
        activeFontSize(states.text_size);
    }
    else if(states.text_size +1 < 5){
        states.text_size += 1;
        setFontSize(states.text_size);
    }
    else deactiveFontsize();
}

const setFontSize = (level)=>{
    fontSizeTargets.forEach(el => {
        const base = el.dataset.fontSize;
        const newSize = base * fontSizeLevels[level];
        el.style.fontSize = `${newSize}px`;
    });
    const $level_indicator = document.getElementById("fontsize-levels");
    Array.from($level_indicator.children).forEach(item => item.classList.remove("active"));
    $level_indicator.children[level].classList.add("active");
}

const activeFontSize = (level) =>{
    fontSizeTargets = selectFontSizeTargets()
    setFontSize(level);
    $btn_fontsize.classList.add('active');
}

const deactiveFontsize = () =>{
    Array.from(document.querySelectorAll("[data-font-size]")).forEach(el=>{
        el.style.removeProperty("font-size")
        delete el.dataset.fontSize
    })
    fontSizeTargets = []
    $btn_fontsize.classList.remove('active');
    states.text_size = false;
    const $level_indicator = document.getElementById("fontsize-levels");
    Array.from($level_indicator.children).forEach(item => item.classList.remove("active"));
}



// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// :::::::::::::::::::::::::::: DETECCION DE DISPOSITIVOS TACTILES O ESCRITORIO :::::::::::::::::::::::::::::::::

const isMobile = () => {
    let mobileAgent = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (mobileAgent) {
        touchDevice = true;
        $mask.classList.add("mobile");
        $line.classList.add("mobile");
        $mask_controls.classList.remove("desktop");
        $line_controls.classList.remove("desktop");
        console.log("Estás en móvil o tablet");
    } else {
        touchDevice = false;
        $mask.classList.remove("mobile");
        $line.classList.remove("mobile");
        $mask_controls.classList.add("desktop");
        $line_controls.classList.add("desktop");
        console.log("Estás en PC");
    }
}

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// ::::::::::::::: RESET DE LAS FUNCIONES DEL WIDGET ::::::::::::::::

const resetWidgetFunctions = () => {
    deactivateBigCursor();
    deactivateColorInvert();
    deactivateGrayscale();
    deactivateHighlightLinks();
    deactivateHighlightHeaders();
    deactivateReadingLine();
    deactivateReadingMask();
    deactivateVoiceReading();
    enableAnimations();
    deactiveLetterSpacing();
    deactiveLineHeightSpacing();
    deactivateDyslexiaFont();
    deactivateHideImages();
    deactiveFontsize();
    deactivateMuteSound();
    if(elementToRead) elementToRead.classList.remove("read-text");
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// :::::::::::::: ACTIVAR O DESACTIVAR TEMA OSCURO ::::::::::::::::::

const toggleTheme = () => {
    document.documentElement.classList.toggle("dark-theme")
    states.dark_theme = !states.dark_theme
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// ::::::::::::::::::::: ABRIR Y CERRAR EL WIDGET :::::::::::::::::::

const toggleWidget = () => {
    $widget.classList.toggle('open');
    widget_open = !widget_open;
    if(widget_open) {
        $widget.removeAttribute("inert");
        $close_button.focus();
        $open_button.setAttribute("inert","")
    }
    else {
        $widget.setAttribute("inert","");
        $open_button.removeAttribute("inert")
        $open_button.focus();
    }
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// :::::::::::::::::::::::::::::: OCULTAR IMAGENES ::::::::::::::::::::::::::::::::::

let _waw_hiddenImages = []; 

const hideAllImages = () => {
    _waw_hiddenImages = [];
    const els = Array.from(document.querySelectorAll('img, picture, canvas.waw-gif-placeholder'));
    els.forEach(el => {
        if (el.dataset.wawHidden) return;
        el.dataset.wawOrigDisplay = el.style.display || '';
        el.style.display = 'none';
        el.dataset.wawHidden = '1';
        _waw_hiddenImages.push(el);
    });
}

const restoreAllImages = () => {
    _waw_hiddenImages.forEach(el => {
        try {
        el.style.display = el.dataset.wawOrigDisplay || '';
        delete el.dataset.wawHidden;
        delete el.dataset.wawOrigDisplay;
        } catch (e) { }
    });
    _waw_hiddenImages = [];
}

const activateHideImages = () => {
    if ($btn_hide_img) $btn_hide_img.classList.add('active');
    states.hide_images = true;
    hideAllImages();
}

const deactivateHideImages = () => {
    if ($btn_hide_img) $btn_hide_img.classList.remove('active');
    states.hide_images = false;
    restoreAllImages();
}

const toggleHideImages = () => {
    if (states.hide_images) deactivateHideImages();
    else activateHideImages();
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// :::::::::::::::::: DESACTIVAR LAS ANIMACIONES ::::::::::::::::::::

const disableAnimations = () => {
    document.documentElement.classList.add('WAWNoAnimations');
    $btn_detAnimaciones.classList.add('active');
    states.animations = false;

    pauseAllVideos();
    replaceGifsWithCanvas();
}

const enableAnimations = () => {
    document.documentElement.classList.remove('WAWNoAnimations');
    $btn_detAnimaciones.classList.remove('active');
    states.animations = true;

    restoreGifs();
    resumeAllVideos();
}

const toggleAnimations = () => {
    if (states.animations) disableAnimations();
    else enableAnimations();
}
    
let _waw_replacedGifs = [];
let _waw_videoStates = []; 

const pauseAllVideos = () => {
    _waw_videoStates = [];
    document.querySelectorAll('video').forEach(v => {
        try {
            const wasPlaying = !!(v.currentTime > 0 && !v.paused && !v.ended && v.readyState > 2);
            _waw_videoStates.push({ video: v, wasPlaying });
            v.pause();
        } catch (err) { }
    });
}

const resumeAllVideos = () => {
    _waw_videoStates.forEach(({ video, wasPlaying }) => {
        try {
        if (wasPlaying) video.play().catch(()=>{});
        } catch (err) {}
    });
    _waw_videoStates = [];
}

const replaceGifsWithCanvas = () => {
    _waw_replacedGifs = [];
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
            _waw_replacedGifs.push({ original: img, canvas });
        } else {
            img.dataset.wawGifCouldNotFreeze = '1';
            img.classList.add('waw-gif-could-not-freeze');
        }
        }, 60);
    });
}

const restoreGifs = () => {
    if (!Array.isArray(_waw_replacedGifs) || _waw_replacedGifs.length === 0) return;
    _waw_replacedGifs.forEach(entry => {
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
    _waw_replacedGifs = [];

    document.querySelectorAll('img[data-waw-gif-could-not-freeze="1"]').forEach(img => {
        img.classList.remove('waw-gif-could-not-freeze');
        delete img.dataset.wawGifCouldNotFreeze;
    });
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// ::::::::::::::::: FUENTE APTA PARA DISLEXIA ::::::::::::::::::::::::

const activateDyslexiaFont = () => {
    document.documentElement.classList.add('WAWDyslexicFont');
    if ($btn_apto_dislexia) $btn_apto_dislexia.classList.add('active');
    states.dyslexia_font = true;
}

const deactivateDyslexiaFont = () => {
    document.documentElement.classList.remove('WAWDyslexicFont');
    if ($btn_apto_dislexia) $btn_apto_dislexia.classList.remove('active');
    states.dyslexia_font = false;
}

const toggleDyslexiaFont = () => {
    if (states.dyslexia_font) deactivateDyslexiaFont();
    else activateDyslexiaFont();
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// :::::::::::::::::::::::::::::::::::::::::::: CAMBIAR ESPACIADO DE TEXTO ::::::::::::::::::::::::::::::::::::::::::::::

let letterSpacingtargets=[];

const selectLetterSpacingTargets = () =>{
    let excludeSelector = '.waw'
    const blacklist = new Set(['SCRIPT','STYLE','NOSCRIPT','IFRAME','CANVAS','SVG']);
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
    return targets
}

const letterSpacinglevels = {
    0: { letter: 2.0, word: 3.0 },
    1: { letter: 3.0, word: 4.0 }, 
    2: { letter: 5.0, word: 6.0 }, 
    3: { letter: 8.0, word: 8.0 } 
};

const setLetterSpacing = (level) =>{
    letterSpacingtargets.forEach(el => {
        const baseLetter = Number(el.dataset.letterSpacing);
        const baseWord = Number(el.dataset.wordSpacing)
        const newLetter = baseLetter + letterSpacinglevels[level].letter;
        const newWord = baseWord + letterSpacinglevels[level].word;
        el.style.letterSpacing = `${newLetter}px`;
        el.style.wordSpacing = `${newWord}px`;
    });
    const $level_indicator = document.getElementById("letterSpacing-levels");
    Array.from($level_indicator.children).forEach(item => item.classList.remove("active"));
    $level_indicator.children[level].classList.add("active");
}


const activeLetterSpacing = (level) =>{
    letterSpacingtargets = selectLetterSpacingTargets()
    setLetterSpacing(level);
    $btn_letter_spacing.classList.add('active');
}


const setLetterSpacingLevel = () =>{
    if(states.letter_spacing === false) {
        states.letter_spacing = 0
        activeLetterSpacing(states.letter_spacing);
        return
    }
    if(states.letter_spacing +1 < 4){
        states.letter_spacing += 1;
        setLetterSpacing(states.letter_spacing);
    }
    else deactiveLetterSpacing();
}


const deactiveLetterSpacing = () =>{
    Array.from(document.querySelectorAll("[data-letter-spacing]")).forEach(el=>{
        el.style.removeProperty("letter-spacing")
        el.style.removeProperty("word-spacing")
        delete el.dataset.letterSpacing
        delete el.dataset.wordSpacing
    })
    letterSpacingtargets = []
    $btn_letter_spacing.classList.remove('active');
    states.letter_spacing = false;
    const $level_indicator = document.getElementById("letterSpacing-levels");
    Array.from($level_indicator.children).forEach(item => item.classList.remove("active"));
}



// ::::::::::::::::::::::::::::::::::::::::::: CAMBIAR ALTURA DE LINEA ::::::::::::::::::::::::::::::::::::::::

let lineHeightTargets=[];

const selectLineHeightTargets = () =>{
    let excludeSelector = '.waw'
    const blacklist = new Set(['SCRIPT','STYLE','NOSCRIPT','IFRAME','CANVAS','SVG']);
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
    return targets
}

const lineHeightLevels = {
    0: 0.8, 
    1: 1.2,
    2: 1.6,
    3: 2.0
};

const setLineHeightSpacingLevel = () =>{
    if(states.line_height === false) {
        states.line_height = 0
        activeLineHeightSpacing(states.line_height);
    }
    else if(states.line_height +1 < 4){
        states.line_height += 1;
        setLineHeightSpacing(states.line_height);
    }
    else deactiveLineHeightSpacing();
}

const setLineHeightSpacing = (level)=>{
    lineHeightTargets.forEach(el => {
        const base = el.dataset.lineHeight;
        const newVal = base * lineHeightLevels[level];
        el.style.lineHeight = `${newVal}px`;
    });
    const $level_indicator = document.getElementById("lineheight-levels");
    Array.from($level_indicator.children).forEach(item => item.classList.remove("active"));
    $level_indicator.children[level].classList.add("active");
}

const activeLineHeightSpacing = (level) =>{
    lineHeightTargets = selectLineHeightTargets()
    setLineHeightSpacing(level);
    $btn_lineheight_spacing.classList.add('active');
}

const deactiveLineHeightSpacing = () =>{
    Array.from(document.querySelectorAll("[data-line-height]")).forEach(el=>{
        el.style.removeProperty("line-height")
        delete el.dataset.lineHeight
    })
    lineHeightTargets = []
    $btn_lineheight_spacing.classList.remove('active');
    states.line_height = false;
    const $level_indicator = document.getElementById("lineheight-levels");
    Array.from($level_indicator.children).forEach(item => item.classList.remove("active"));
}

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// :::::::::::::::: FUNCIONES DE CONFIGURCION DEL WIDGET ::::::::::::::::::::::

const getLanguage = () => navigator.language.split(/[-_]/)[0].toLowerCase();

const generateoptionsVoices = (voicelist) => { // Genera el html con las opciones de voces disponibles para elegir
    $voice_options.innerHTML = '';
    voicelist.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = voice.name + (voice.lang ? ` [${voice.lang}]` : '');
        if(voice.name === config.voice_reading.voice)
            option.selected = true
        $voice_options.appendChild(option);
    });
}

const normalizarLang = lang => lang.replace('_', '-');

const getAvailableVoices = () => { // Obtiene una lista de las voces disponibles segun el idioma establecido
    const language = getLanguage();
    let voicelist = speechSynthesis.getVoices().filter(v => v && v.lang && v.lang.startsWith(language));
    if(config.voice_reading.voice == null) {
        voiceSelected = voicelist.find(v => v.default) || voicelist[0];
        config.voice_reading.voice = voiceSelected.name;
    }
    else{
        voiceSelected = voicelist.find(v=> v.name == config.voice_reading.voice)
    }
    generateoptionsVoices(voicelist);
    updateConfigToLocalStorage()
};

const changeVoiceReading = (selectedVoiceName)=>{
    let selectedVoice = speechSynthesis.getVoices().find(v => v.name === selectedVoiceName);
    return selectedVoice || null;
}

const setVoiceReadingVoice = (voiceValue) =>{
    voiceSelected = changeVoiceReading(voiceValue);
    config.voice_reading.voice = voiceSelected.name;
}

const setVoiceReadingSpeed = (speedValue) =>{
    const speed = parseFloat(speedValue);
    if(speed < 0.5 || speed > 1.5) return;
    config.voice_reading.speed = speed;
    const radio = document.querySelector(`input[name="waw-screenreader-velocity"][value="${speedValue}"]`)
    if(radio) radio.checked = true;
}

const setMaskOpacity = (opacityValue) =>{
    const opacity = parseFloat(opacityValue);
    if(opacity < 0 || opacity > 1) return;
    $mask.style.setProperty('--waw-mask-opacity' , opacity);
    config.reading_mask.opacity = opacity;
    const radio = document.querySelector(`input[name="waw-mask-opacity"][value="${opacityValue}"]`)
    if(radio) radio.checked = true;
}

const setLineOpacity = (opacityValue) =>{
    const opacity = parseFloat(opacityValue);
    if(opacity < 0 || opacity > 1) return;
    $line.style.setProperty('--waw-line-background' ,`rgba(0,0,0,${opacity})`);
    config.reading_line.opacity = opacity;
    const radio = document.querySelector(`input[name="waw-line-opacity"][value="${opacityValue}"]`)
    if(radio) radio.checked = true;
}

const setLineWeight = (weightValue) =>{
    if(weightValue!=="4" && weightValue!=="10" && weightValue!=="20") return;
    $line.style.setProperty ('--waw-line-weight', weightValue+'px');
    $line_controls.style.setProperty ('--waw-line-control',`calc(-50% + ${parseInt(weightValue)/2}px)`);
    config.reading_line.height = weightValue;
    const radio = document.querySelector(`input[name="waw-line-weight"][value="${weightValue}"]`)
    if(radio) radio.checked = true;
}

const setLineColor = (colorValue) =>{
    if(colorValue!=="#000000" && colorValue!== "#1cbe00" && colorValue!== "#2323ff" && colorValue!== "#ffea00" && colorValue!== "#f80000" && colorValue!== "#ffffff") return;
    $line.style.setProperty('--waw-line-color',colorValue);
    config.reading_line.color = colorValue;
    const radio = document.querySelector(`input[name="waw-line-color"][value='${colorValue}']`)
    if(radio) radio.checked = true
}

const setWidgetPosition = (positionValue) =>{
        if(positionValue !== "left" && positionValue !== "right") return;
        if(positionValue === "right"){
            $widget.classList.remove("left");
            $open_button.classList.remove("left");
            document.getElementById("widget-pos-right").checked = true;
            document.getElementById("waw-mute-indicator").classList.remove("right")
        }else{
            $widget.classList.add("left");
            $open_button.classList.add("left");
            document.getElementById("widget-pos-left").checked = true;
            document.getElementById("waw-mute-indicator").classList.add("right")
        }
        config.widget.position = positionValue;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// :::::::::::::::  control de la lectura de pantalla (en desarrollo)   :::::::::::::::

let elementToRead = null;
let focusByKeyboard = false;
let voiceSelected = null;


const focusByTab = (e) =>{if (e.key === 'Tab') focusByKeyboard = true;}
const focusByMousedown = () => focusByKeyboard = false
const handleFocusIn = (e) =>{
    if (!focusByKeyboard) return;
    readElement(generateDescription(e.target))
}

const toggleVoiceReading = () =>{
    if(states.voice_reading) {
        deactivateVoiceReading();
        readElement("lectura de pantalla desactivada");
    }
    else activateVoiceReading();
}

const activateVoiceReading = () =>{
    if(!states.sound) return
    states.voice_reading = true;
    document.addEventListener('keydown', focusByTab);
    document.addEventListener('mousedown', focusByMousedown);
    document.addEventListener('focusin', handleFocusIn);
    $btn_voice_reading.classList.add('active');
    readElement("lectura de pantalla activada");

}

const deactivateVoiceReading = () =>{
    states.voice_reading = false;
    document.removeEventListener('keydown', focusByTab);
    document.removeEventListener('mousedown', focusByMousedown);
    document.removeEventListener('focusin', handleFocusIn);
    $btn_voice_reading.classList.remove('active');
    if(elementToRead) elementToRead.classList.remove("read-text");
    elementToRead = null;
}

const generateDescription = (target) => {
    let description = '';
    let tag = target.tagName.toLowerCase();
    let rol = target.getAttribute('role');
    let label = target.getAttribute('aria-label') || target.alt || target.innerText || target.value || target.placeholder || "Sin descripción";

    if (rol) description += rol + ': ';
    else if (tag === 'a') description += 'Enlace: ';
    else if (tag === 'button') description += 'Botón: ';
    else if (tag === 'input') description += 'Campo: ';
    else if(tag in tag_list) description += tag_list[tag] + ': '

    return description + label.trim();
}

const readElement = (message) => {
    const text = new SpeechSynthesisUtterance(message);
    text.rate = config.voice_reading.speed;
    if(voiceSelected) text.voice = voiceSelected;
    speechSynthesis.cancel();
    speechSynthesis.speak(text);
}


const selectElementToRead = (element) => {
    if(element.tagName.toLowerCase() in tag_list){
        if(element.closest(".opcion")) return; // evita leer los elementos del widget
        if(elementToRead) elementToRead.classList.remove("read-text");
        elementToRead = element
        elementToRead.classList.add("read-text");
        readElement(generateDescription(element))
    }
}

const tag_list={ //lista de etiquetas comunes para la lectura de pantalla
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

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// ::::::::::::::::::: ESCUCHADORES DE EVENTOS ::::::::::::::::::::::::::

document.addEventListener("click", (e) => {
    posYmouse = e.clientY; // Actualiza la posición del mouse
    if(e.target.closest("#btn-fontsize")) setFontSizeLevel();
    else if(e.target.closest("#btn-lineheight")) setLineHeightSpacingLevel();
    else if(e.target.closest("#btn-letterspacing")) setLetterSpacingLevel();
    else if(e.target.closest("#btn-color-invert")) toggleColorInvert();
    else if(e.target.closest("#btn-greyscale")) toggleGrayscale();
    else if(e.target.closest("#btn-big-cursor")) toggleBigCursor();
    else if(e.target.closest("#btn-reading-line")) toggleReadingLine();
    else if(e.target.closest("#btn-reading-mask")) toggleReadingMask();
    else if(e.target.closest("#btn-voice-reading")) toggleVoiceReading();
    else if(e.target.closest('#btn-hide-img')) toggleHideImages();
    else if(e.target.closest("#btn-highlight-links")) toggleHighlightLinks();
    else if(e.target.closest("#btn-highlight-headers")) toggleHighlightHeaders();
    else if(e.target.closest("#btn-apto-dislexia")) toggleDyslexiaFont();
    else if(e.target.closest("#btn-mute-sound")) toggleMuteSound();
    else if(e.target.closest("#btn-animations")) toggleAnimations();

    else if(e.target.closest("#open-button") || e.target.closest("#close-button")) toggleWidget(); 
    else if(e.target.closest('[data-waw-function="toggle-theme"]')) toggleTheme();

    else if(e.target.closest("[data-waw-function='control-text']")) controlText(e.target)
    else if(e.target.closest('[data-waw-function="reset"]')) resetWidgetFunctions();
    else if(e.target.closest('#reading-controls-mask')) readingMaskControls(e);
    else if(e.target.closest('#reading-controls-line')) readingLineControls(e);
    else if(e.target.closest('#test-voicereading')) readElement("Texto de prueba para la función de lectura de pantalla");
    else if(widget_open && !$widget.contains(e.target)) toggleWidget() // cierra el widget al hacer click fuera del mismo

    updateStatesToLocalStorage();
    if(states.voice_reading) selectElementToRead(e.target);
});

document.addEventListener('input', (e) => {
    // if(e.target.id==='text-slider') updateFontSize(e);
    if(e.target === $voice_options) setVoiceReadingVoice(e.target.value);
    else if(e.target.name === "waw-screenreader-velocity") setVoiceReadingSpeed(e.target.value);
    else if(e.target.name === "waw-mask-opacity") setMaskOpacity(e.target.value);
    else if(e.target.name === "waw-line-opacity") setLineOpacity(e.target.value);
    else if(e.target.name === "waw-line-weight") setLineWeight(e.target.value);
    else if(e.target.name === "waw-line-color") setLineColor(e.target.value);
    else if(e.target.name === "waw-widget-position") setWidgetPosition(e.target.value);
    updateConfigToLocalStorage();
});



// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// ::::: MANEJO DE GESTOS TACTILES PARA LA MÁSCARA Y LINEA DE LECTURA :::::

let startY = 0;

const mask = new Hammer($mask_middle);

mask.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
mask.on("panstart", () => startY = parseFloat($mask_top.style.height))
mask.on("panmove", (ev) => {
    const newY = startY + ev.deltaY;
    $mask_top.style.height = `${newY}px`;
});
mask.on("swipe", (ev) => {
    if (ev.direction === Hammer.DIRECTION_LEFT) $mask_controls.classList.add("active");
    if (ev.direction === Hammer.DIRECTION_RIGHT) $mask_controls.classList.remove("active");
});

const line = new Hammer($line);

line.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
line.on("panstart", () => startY = parseFloat($line.style.top))
line.on("panmove", (ev) => {
    const newY = startY + ev.deltaY;
    $line.style.top = `${newY - 4}px`;
});
line.on("panend", () => startY = parseFloat($line.style.top));
line.on("swipe", (ev) => {
    if (ev.direction === Hammer.DIRECTION_RIGHT) $line_controls.classList.add("active");
    if (ev.direction === Hammer.DIRECTION_LEFT) $line_controls.classList.remove("active");
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

isMobile();
saveStatesToLocalStorage();
loadStatesFromLocalStorage();

speechSynthesis.addEventListener('voiceschanged', () => {
    loadConfigFromLocalStorage();
    getAvailableVoices()
    saveConfigToLocalStorage();
});

if(isMobile) speechSynthesis.getVoices() // en dispositivos moviles puede no dipararse el evento 'voicechanged', fuerzo a que se dispare