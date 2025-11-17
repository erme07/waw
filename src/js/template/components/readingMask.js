
export const createReadingMask = () => {

    const wawReadingMask = document.createElement('div');
    wawReadingMask.id = 'waw-reading-mask';
    wawReadingMask.className = 'waw-reading-mask hidden';

    const readingMaskTop = document.createElement('div');
    readingMaskTop.id = 'waw-reading-mask__top';
    readingMaskTop.className = 'waw-reading-mask__top';
    wawReadingMask.appendChild(readingMaskTop);

    const readingMaskMiddle = document.createElement('div');
    readingMaskMiddle.id = 'waw-reading-mask__middle';
    readingMaskMiddle.className = 'waw-reading-mask__middle';

    const controls = document.createElement('div');
    controls.className = 'reading-controls desktop';
    controls.id = 'reading-controls-mask';
    controls.appendChild(document.createElement('span'));

    const makeIconButton = (id, title, iconHref) => {
        const btn = document.createElement('button');
        btn.id = id;
        btn.className = 'reading-controls__button';
        btn.title = title;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        
        use.setAttribute('href', iconHref);
        svg.appendChild(use);
        btn.appendChild(svg);
        return btn;
    };

    controls.appendChild(makeIconButton('btn-plus-mask', 'Aumentar tamaño de la máscara', '#icon-plus'));
    controls.appendChild(makeIconButton('btn-minus-mask', 'Disminuir tamaño de la máscara', '#icon-minus'));
    controls.appendChild(makeIconButton('btn-close-mask', 'Cerrar máscara de lectura', '#icon-close-circle'));

    readingMaskMiddle.appendChild(controls);
    wawReadingMask.appendChild(readingMaskMiddle);

    const readingMaskBottom = document.createElement('div');
    readingMaskBottom.className = 'waw-reading-mask__bottom';
    wawReadingMask.appendChild(readingMaskBottom);

    return wawReadingMask;
}