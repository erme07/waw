import { createSettingsSection } from './setting.js';
import { createAboutSection } from './about.js';
import { createSVG, createButton } from '../../utilities.js';

const createOption = (id, iconHref, label, options = {}) => {
    const { progressItems = 0, progressId = '' } = options;
    const button = document.createElement('button');
    button.id = id;
    button.className = `opcion opcion--${id.replace('btn-', '')}`;

    const svgIcon = createSVG(iconHref, 'opcion__icono');
    const status = document.createElement('span');
    status.className = 'opcion__status';
    status.appendChild(createSVG('#icon-check'));

    const name = document.createElement('span');
    name.className = 'opcion__nombre';
    name.textContent = label;

    let progressSection = null;
    if (progressItems > 0) {
        progressSection = document.createElement('div');
        progressSection.className = 'progress';
        if (progressId) progressSection.id = progressId;

        for (let i = 0; i < progressItems; i++) {
            const item = document.createElement('span');
            item.className = 'progress__item';
            progressSection.appendChild(item);
        }
    }

    if (progressSection)
        button.append(svgIcon, status, name, progressSection);
    else 
        button.append(svgIcon, status, name);
    return button;
};

export const createBody = () => {
    const section = document.createElement('section');
    section.className = 'waw__body';

    const grid = document.createElement('div');
    grid.className = 'grid';

    const span = document.createElement('span');
    span.textContent = 'Restablecer Ajustes'
    span.className = 'opcion__nombre'
    const btnReset = createButton({
        className: 'opcion opcion--reset',
        dataset: { wawFunction: 'reset' },
        children: [span ,createSVG('#icon-reset')]
    });

    grid.append(
        createOption('btn-fontsize', '#text', 'Tamaño del Texto', { progressItems: 5, progressId: 'fontsize-levels' }),
        createOption('btn-lineheight', '#lineheight', 'Altura de Línea', { progressItems: 4, progressId: 'lineheight-levels' }),
        createOption('btn-letterspacing', '#letterSpacing', 'Espaciado de Texto', { progressItems: 4, progressId: 'letterSpacing-levels' }),
        createOption('btn-color-invert', '#inverted', 'Invertir Colores'),
        createOption('btn-greyscale', '#greyscale', 'Escala de Grises'),
        createOption('btn-big-cursor', '#cursor', 'Cursor Grande'),
        createOption('btn-reading-line', '#line', 'Guía de Lectura'),
        createOption('btn-reading-mask', '#mask', 'Máscara de Lectura'),
        createOption('btn-voice-reading', '#voice', 'Lector de Pantalla'),
        createOption('btn-hide-img', '#noimage', 'Ocultar Imágenes'),
        createOption('btn-highlight-links', '#links', 'Resaltar Enlaces'),
        createOption('btn-highlight-headers', '#headers', 'Resaltar Encabezados'),
        createOption('btn-apto-dislexia', '#dyslexia', 'Apto Para Dislexia'),
        createOption('btn-animations', '#stopAnimation', 'Detener Animaciones'),
        createOption('btn-mute-sound', '#mute', 'Silenciar Sonidos'),
        btnReset
    );
    section.append(grid);
    section.append(createSettingsSection())
    section.append(createAboutSection())

    return section;
};