
import { createButton, createSVG } from '../../utilities.js';

export const createHeader = () => {
    const header = document.createElement('header');
    header.className = 'waw__header';

    const h2 = document.createElement('h2');
    h2.id = 'waw-title';
    h2.textContent = 'Ajustes de accesibilidad';

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'header-options';

    const btnTheme = createButton({
        className: 'header-options__button header-options__button--small',
        ariaLabel: 'Activar tema oscuro',
        dataset: { wawFunction: 'toggle-theme' },
        children: [
            createSVG('#icon-light', 'light'),
            createSVG('#icon-dark', 'dark')
        ]
    });

    const btnReset = createButton({
        className: 'header-options__button header-options__button--small',
        ariaLabel: 'Restablecer ajustes',
        dataset: { wawFunction: 'reset' },
        children: [createSVG('#icon-reset')]
    });

    const btnClose = createButton({
        id: 'close-button',
        className: 'header-options__button',
        ariaLabel: 'Cerrar widget',
        children: [createSVG('#icon-close')]
    });

    optionsDiv.append(btnTheme, btnReset, btnClose);
    header.append(h2, optionsDiv);
    return header;
};
