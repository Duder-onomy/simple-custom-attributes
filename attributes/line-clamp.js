'use strict';

var clamp = require('clamp-js');

module.exports = {
    bind : bind,
    unbind : unbind
};

function bind(el, linesToClamp) {
    clamp(el, { clamp : linesToClamp || 'auto' });
}

function unbind() {

}