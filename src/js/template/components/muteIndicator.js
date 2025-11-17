
export const createMuteIndicator = () => {
    const wawMuteIndicator = document.createElement('div');
    wawMuteIndicator.className = 'waw-mute-indicator';
    wawMuteIndicator.id = 'waw-mute-indicator';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#mute');

    svg.appendChild(use);
    wawMuteIndicator.appendChild(svg);

    return wawMuteIndicator;
}