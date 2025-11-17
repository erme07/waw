
export const createSVG = (href, extraClass = '') => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    if (extraClass) svg.classList.add(extraClass);
    svg.setAttribute('aria-hidden', 'true');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', href);

    svg.appendChild(use);
    return svg;
};

export const createButton = ({ id, className, ariaLabel, text, dataset = {}, children = [] }) => {
    const btn = document.createElement('button');
    if (id) btn.id = id;
    if (className) btn.className = className;
    if (ariaLabel) btn.setAttribute('aria-label', ariaLabel);
    if (text) btn.textContent = text 

    Object.entries(dataset).forEach(([key, value]) => {
        btn.dataset[key] = value;
    });

    children.forEach(child => btn.appendChild(child));
    return btn;
};
