import { createOpenButton } from './components/buttonOpen.js';
import { createWidget } from './components/widget.js';
import { createMuteIndicator } from './components/muteIndicator.js';
import { createReadingMask } from './components/readingMask.js';
import { createReadingLine } from './components/readingLine.js';

export function builWidget() {
    const fragment = document.createDocumentFragment();

    fragment.append(
        createOpenButton(),
        createWidget(),
        createMuteIndicator(),
        createReadingMask(),
        createReadingLine()
    );

    document.body.appendChild(fragment);
}