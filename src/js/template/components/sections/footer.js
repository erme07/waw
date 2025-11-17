
import { createSVG } from '../../utilities.js';

export const createFooter = () => {
    const footer = document.createElement('footer');
    footer.className = 'waw__footer';

    const logo = createSVG('#logo');
    const p = document.createElement('p');
    p.textContent = 'Widget de Accesibilidad Web';

    footer.append(logo, p);
    return footer;
};