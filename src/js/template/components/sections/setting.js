
import { createButton, createSVG } from '../../utilities.js';

// ---------- SECCIÓN "CONFIGURACIÓN" ----------

// Subgrupos de valores
const createValueGroup = (titleText) => {
    const div = document.createElement('div');
    div.className = 'setting__value';
    const h4 = document.createElement('h4');
    h4.textContent = titleText;
    div.appendChild(h4);
    return div;
};

const createRadioLabel = (text, name, id, value, checked = false, className = 'setting__label') => {
    const label = document.createElement('label');
    label.htmlFor = id;
    label.className = className;
    label.textContent = text;

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = name;
    input.id = id;
    input.value = value;
    if (checked) input.checked = true;

    label.appendChild(input);
    return label;
};


export const createSettingsSection = () => {
    const details = document.createElement('details');
    details.className = 'accordion setting';
    details.open = true;

    // Summary
    const summary = document.createElement('summary');
    summary.className = 'accordion__head';
    summary.textContent = 'Configuración';
    summary.appendChild(createSVG('#icon-arrow'));
    details.appendChild(summary);

    // Body
    const body = document.createElement('div');
    body.className = 'accordion__body';

    // ----- ITEM: Posición del widget -----
    const itemWidgetPosition = document.createElement('div');
    itemWidgetPosition.className = 'setting__item';

    const titleWidget = document.createElement('div');
    titleWidget.className = 'setting__tittle';
    const h3Widget = document.createElement('h3');
    h3Widget.textContent = 'Posicion del widget';
    titleWidget.appendChild(h3Widget);
    itemWidgetPosition.appendChild(titleWidget);

    itemWidgetPosition.append(
        createRadioLabel('Izquierda', 'waw-widget-position', 'widget-pos-left', 'left'),
        createRadioLabel('Derecha', 'waw-widget-position', 'widget-pos-right', 'right', true)
    );

    // ----- ITEM: Guía de lectura -----
    const itemReadingLine = document.createElement('div');
    itemReadingLine.className = 'setting__item';

    const titleLine = document.createElement('div');
    titleLine.className = 'setting__tittle';
    const h3Line = document.createElement('h3');
    h3Line.textContent = 'Guia de Lectura';
    titleLine.appendChild(h3Line);
    itemReadingLine.appendChild(titleLine);

    // Opacidad (línea)
    const groupOpacity = createValueGroup('Opacidad');
    groupOpacity.append(
        createRadioLabel('Nula', 'waw-line-opacity', 'line-opacity-null', '0'),
        createRadioLabel('Baja', 'waw-line-opacity', 'line-opacity-low', '0.4'),
        createRadioLabel('Media', 'waw-line-opacity', 'line-opacity-medium', '0.6', true),
        createRadioLabel('Alta', 'waw-line-opacity', 'line-opacity-high', '0.8')
    );

    // Grosor (línea)
    const groupWeight = createValueGroup('Grosor');
    groupWeight.append(
        createRadioLabel('Pequeño', 'waw-line-weight', 'mask-weight-low', '4'),
        createRadioLabel('Mediano', 'waw-line-weight', 'mask-weight-medium', '10', true),
        createRadioLabel('Grande', 'waw-line-weight', 'mask-weight-high', '20')
    );

    // Colores (línea)
    const groupColor = createValueGroup('Color');
    const colors = [
        ['green', '#1cbe00', true],
        ['yellow', '#ffea00'],
        ['red', '#f80000'],
        ['blue', '#2323ff'],
        ['white', '#ffffff'],
        ['black', '#000000']
    ];

    colors.forEach(([name, value, checked]) => {
        const label = document.createElement('label');
        label.className = `box-color box-color--${name}`;
        label.htmlFor = `box-color-${name}`;
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'waw-line-color';
        input.id = `box-color-${name}`;
        input.value = value;
        if (checked) input.checked = true;
        label.appendChild(input);
        groupColor.appendChild(label);
    });

    itemReadingLine.append(groupOpacity, groupWeight, groupColor);

    // ----- ITEM: Máscara de lectura -----
    const itemMask = document.createElement('div');
    itemMask.className = 'setting__item';

    const titleMask = document.createElement('div');
    titleMask.className = 'setting__tittle';
    const h3Mask = document.createElement('h3');
    h3Mask.textContent = 'Mascara de Lectura';
    titleMask.appendChild(h3Mask);
    itemMask.appendChild(titleMask);

    // Opacidad máscara
    const groupMaskOpacity = createValueGroup('Opacidad');
    groupMaskOpacity.append(
        createRadioLabel('Baja', 'waw-mask-opacity', 'mask-opacity-low', '0.4'),
        createRadioLabel('Media', 'waw-mask-opacity', 'mask-opacity-medium', '0.7', true),
        createRadioLabel('Alta', 'waw-mask-opacity', 'mask-opacity-high', '0.8')
    );

    // Altura máscara
    const groupMaskHeight = createValueGroup('Altura');
    groupMaskHeight.append(
        createRadioLabel('Pequeña', 'waw-mask-height', 'mask-height-small', '60'),
        createRadioLabel('Mediana', 'waw-mask-height', 'mask-height-medium', '100', true),
        createRadioLabel('Grande', 'waw-mask-height', 'mask-height-large', '150'),
        createRadioLabel('Extra Grande', 'waw-mask-height', 'mask-height-xlarge', '200')
    );

    itemMask.append(groupMaskOpacity, groupMaskHeight);

    // ----- ITEM: Lector de pantalla -----
    const itemScreenReader = document.createElement('div');
    itemScreenReader.className = 'setting__item';

    const titleReader = document.createElement('div');
    titleReader.className = 'setting__tittle';
    const h3Reader = document.createElement('h3');
    h3Reader.textContent = 'Lector de Pantalla';
    titleReader.appendChild(h3Reader);
    itemScreenReader.appendChild(titleReader);

    // Voces
    const groupVoice = createValueGroup('Voz');
    const select = document.createElement('select');
    select.id = 'voices-list';
    groupVoice.appendChild(select);

    // Velocidad
    const groupVelocity = createValueGroup('Velocidad');
    groupVelocity.append(
        createRadioLabel('Lento', 'waw-screenreader-velocity', 'velocity-low', '0.5'),
        createRadioLabel('Normal', 'waw-screenreader-velocity', 'velocity-normal', '1', true),
        createRadioLabel('Medio', 'waw-screenreader-velocity', 'velocity-medium', '1.2'),
        createRadioLabel('Rápido', 'waw-screenreader-velocity', 'velocity-high', '1.5')
    );

    // Botón probar
    const btnPlay = createButton({
        id: 'test-voicereading',
        className: 'button-play',
        text: 'Probar',
        children: [createSVG('#icon-play')]
    });

    itemScreenReader.append(groupVoice, groupVelocity, btnPlay);

    // Armar cuerpo del details
    body.append(itemWidgetPosition, itemReadingLine, itemMask, itemScreenReader);
    details.appendChild(body);

    return details;
};