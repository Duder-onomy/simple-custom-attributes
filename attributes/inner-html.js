'use strict';

module.exports = {
    bind : bind,
    unbind : unbind
};

function bind(el, htmlToTemplate) {
    el.innerHTML = htmlToTemplate;
}

function unbind() {
    el.innerHTML = '';
}