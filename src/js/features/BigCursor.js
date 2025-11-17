import { states } from '../states.js';

class BigCursor {
    constructor() {
        this.$btn = null;
    }

    init() {
        this.$btn = document.getElementById('btn-big-cursor');
    }

    activate() {
        document.documentElement.classList.add('WAWBigCursor');
        this.$btn.classList.add('active');
        states.big_cursor = true;
    }

    deactivate() {
        document.documentElement.classList.remove('WAWBigCursor');
        this.$btn.classList.remove('active');
        states.big_cursor = false;
    }

    toggle() {
        states.big_cursor ? this.deactivate() : this.activate();
    }
}

export const bigCursor = new BigCursor()