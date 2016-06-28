'use strict';

module.exports = {
    bind : bind,
    unbind : unbind
};

function bind(el, handler) {
    el.addEventListener('mouseout', handler);
}

function unbind(el, handler) {
    el.removeEventListener('mouseout', handler);
}