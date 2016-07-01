'use strict';

var parseKeyValuesFromObjectLiteralString = require('parse-keys-and-values-from-object-literal-strings');

module.exports = {
    bind: bind,
    unbind: unbind
};

function bind(el, value) {
    var parsedValues = parseKeyValuesFromObjectLiteralString(value);

    parsedValues.forEach(function(parsedValueObj) {
        var handler = this[parsedValueObj.value].bind(this);

        this[parsedValueObj.value] = handler;

        el.addEventListener(parsedValueObj.key, handler, {
            capture : false
        });
    }.bind(this));
}

function unbind(el, value) {
    var parsedValues = parseKeyValuesFromObjectLiteralString(value);

    parsedValues.forEach(function(parsedValueObj) {
        el.removeEventListener(parsedValueObj.key, this[parsedValueObj.value], {
            capture : false
        });
    }.bind(this));
}
