
import { createSVG } from '../../utilities.js';

export const createAboutSection = () => {
    const details = document.createElement('details');
    details.className = 'accordion about';

    const summary = document.createElement('summary');
    summary.className = 'accordion__head';
    summary.textContent = 'Acerca de';
    summary.appendChild(createSVG('#icon-arrow'));
    details.appendChild(summary);

    const body = document.createElement('div');
    body.className = 'accordion__body';

    const createAboutItem = (title, content) => {
        const div = document.createElement('div');
        div.className = 'about__item';
        const h3 = document.createElement('h3');
        h3.textContent = title;
        div.appendChild(h3);
        if (Array.isArray(content)) {
            const ul = document.createElement('ul');
            ul.className = 'about__list';
            content.forEach(name => {
                const li = document.createElement('li');
                li.textContent = name;
                ul.appendChild(li);
            });
            div.appendChild(ul);
        } else if (typeof content === 'string') {
            const p = document.createElement('p');
            p.textContent = content;
            div.appendChild(p);
        } else {
            div.append(...content);
        }
        return div;
    };
    
    const aboutLinks = document.createElement('div');
    aboutLinks.className = 'about__item';

    const linkGit = document.createElement('a');
    linkGit.className = 'about__link';
    linkGit.setAttribute('aria-label', 'Repositorio en github');
    linkGit.href = 'https://github.com/erme07/waw';
    linkGit.appendChild(createSVG('#icon-github'));
    aboutLinks.appendChild(linkGit)

    const linkNpm = document.createElement('a');
    linkNpm.className = 'about__link';
    linkNpm.setAttribute('aria-label', 'Paquete en npm');
    linkNpm.href = 'https://www.npmjs.com/package/waw-widget';
    linkNpm.appendChild(createSVG('#icon-npm'));

    aboutLinks.appendChild(linkNpm)

    body.append(
        createAboutItem('Proyecto', 'Widget de Accesibilidad Web (WAW)'),
        createAboutItem('Institución', 'Universidad Nacional del Oeste (UNO)'),
        createAboutItem('Responsables', [
            'Pandolfo Pablo',
            'Andrada Alexander Alexis',
            'Elisey Larco Agustin',
            'Ramirez Walter',
            'Medina Erik',
            'Lobo Santiago',
            'Guzman Alexis',
            'Ruiz Abril'
        ]),
        aboutLinks
    );

    details.appendChild(body);
    return details;
};