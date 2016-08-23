'use strict';

module.exports = {
    bind : bind,
    unbind : unbind
};

function bind(el, handler) {
    el.addEventListener('progress', handler, false);
}

function unbind(el, handler) {
    el.removeEventListener('progress', handler, false);
}