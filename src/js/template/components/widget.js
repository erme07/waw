import { createHeader } from './sections/header.js';
import { createBody } from './sections/body.js';
import { createFooter } from './sections/footer.js';

export function createWidget() {
    const waw = document.createElement('aside');
    waw.id = 'waw-widget';
    waw.className = 'waw';
    waw.setAttribute('aria-labelledby', 'waw-title');
    waw.setAttribute('inert', '');

    waw.append(
        createHeader(),
        createBody(),
        createFooter()
    );

    return waw;
} 