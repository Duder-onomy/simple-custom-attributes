'use strict';

module.exports = {
    bind : bind,
    unbind : unbind
};

function bind(el, handler) {
    el.addEventListener('click', handler, false);
}

function unbind(el, handler) {
    el.removeEventListener('click', handler, false);
}