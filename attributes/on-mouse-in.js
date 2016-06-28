'use strict';

module.exports = {
    bind : bind,
    unbind : unbind
};

function bind(el, handler) {
    el.addEventListener('mouseover', handler);
}

function unbind(el, handler) {
    el.removeEventListener('mouseover', handler);
}