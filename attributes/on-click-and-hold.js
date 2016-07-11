'use strict';

var clickAndHold = require('click-and-hold');

module.exports = {
    bind : bind,
    unbind : unbind
};

function bind(el, handler) {
    clickAndHold.register(el, handler, 100);
}

function unbind(el, hanlder) {
    clickAndHold.register(el);
}