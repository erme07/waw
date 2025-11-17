
export const createOpenButton = () => {
    const wawOpenButton = document.createElement('button');
    wawOpenButton.id = 'open-button';
    wawOpenButton.className = 'waw-button';
    wawOpenButton.setAttribute('aria-label', 'Abrir el widget de accesibilidad');
    wawOpenButton.setAttribute('aria-controls', 'waw-widget');
    wawOpenButton.setAttribute('aria-expanded', 'false');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#icon-accesibility');

    svg.appendChild(use);
    wawOpenButton.appendChild(svg);

    return wawOpenButton;
};
