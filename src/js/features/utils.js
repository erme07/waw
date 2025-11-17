export let excludeSelector = '.waw'
export const blacklist = new Set(['SCRIPT','STYLE','NOSCRIPT','IFRAME','CANVAS','SVG']);

export const isVisibleText = (el) => {
        const s = getComputedStyle(el);
        if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) === 0 || el.offsetParent == null) return false;
        const r = el.getBoundingClientRect();
        return !(r.width === 0 && r.height === 0);
    };

export const hasTextNode = (el) => {
    for (const node of el.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) return true;
    }
    return false;
};

export let letterSpacingtargets=[];
export const letterSpacinglevels = {
    0: { letter: 2.0, word: 3.0 },
    1: { letter: 3.0, word: 4.0 }, 
    2: { letter: 5.0, word: 6.0 }, 
    3: { letter: 8.0, word: 8.0 } 
};

export let lineHeightTargets=[];
export const lineHeightLevels = {
    0: 0.8, 
    1: 1.2,
    2: 1.6,
    3: 2.0
};

export let fontSizeTargets=[];
export const fontSizeLevels = {
    0: 0.8,  // reducido
    1: 0.9,  // normal
    2: 1.1,  // aumentado
    3: 1.3,   // muy aumentado
    4: 1.6   // muy aumentado
};

