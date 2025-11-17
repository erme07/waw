
export const createReadingLine = () => {
    // Crear el contenedor principal
    const wawReadingLine = document.createElement('div');
    wawReadingLine.id = 'waw-reading-line';
    wawReadingLine.className = 'waw-reading-line hidden';
    wawReadingLine.setAttribute('role', 'region');
    wawReadingLine.setAttribute('aria-label', 'Guía de lectura en pantalla');
    wawReadingLine.setAttribute('aria-hidden', 'true');

    // Crear el contenedor interno de controles
    const readingControls = document.createElement('div');
    readingControls.className = 'reading-controls reading-controls--line';
    readingControls.id = 'reading-controls-line';

    // Crear el span que actúa como botón
    const spanButton = document.createElement('span');
    spanButton.setAttribute('role', 'button');
    spanButton.setAttribute('tabindex', '0');
    spanButton.setAttribute('aria-label', 'Mostrar controles de lectura');

    // Crear el botón de cerrar
    const closeButton = document.createElement('button');
    closeButton.id = 'btn-close-line';
    closeButton.className = 'reading-controls__button';
    closeButton.setAttribute('aria-label', 'Cerrar guía de lectura');
    closeButton.setAttribute('title', 'Cerrar guía de lectura');

    // Crear el SVG dentro del botón
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '#icon-close-circle');

    // Armar la estructura SVG
    svg.appendChild(use);
    closeButton.appendChild(svg);

    // Armar la jerarquía DOM completa
    readingControls.appendChild(spanButton);
    readingControls.appendChild(closeButton);
    wawReadingLine.appendChild(readingControls);

    return wawReadingLine;
}