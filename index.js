'use strict';

var keys = require('lodash/keys');

module.exports = {
    attributesMap : {
        'on-click' : require('.attributes/click'),
        'on-swipe-right' : require('.attributes/swipeRight'),
        'on-swipe-left' : require('.attributes/swipeLeft'),
        'on-mouse-in' : require('.attributes/onMouseIn'),
        'on-mouse-out' : require('.attributes/onMouseOut'),
        'line-clamp' : require('.attributes/line-clamp')
    },

    register : register,
    unregister : unregister
};

function register(object, rootElement) {
    keys(this.attributesMap).forEach(function(customAttribute) {
        [].forEach.call(rootElement.querySelectorAll('['+customAttribute+']'), function(element) {

            if(typeof object[element.getAttribute(customAttribute)] === 'function') {
                _registerFunction.call(this, object, element, customAttribute);
            } else {
                this.attributesMap[customAttribute].bind(element, element.getAttribute(customAttribute));
            }

        }.bind(this));
    }.bind(this));
}

function unregister(object, rootElement) {
    keys(this.attributesMap).forEach(function(customAttribute) {
        [].forEach.call(rootElement.querySelectorAll('['+customAttribute+']'), function(element) {

            if(typeof object[element.getAttribute(customAttribute)] === 'function') {
                _unregisterFunction.call(this, object, element, customAttribute);
            } else {
                this.attributesMap[customAttribute].unbind(element, element.getAttribute(customAttribute));
            }

        }.bind(this));
    }.bind(this));
}

function _registerFunction(object, element, customAttribute) {
    var handler =  object[element.getAttribute(customAttribute)].bind(object);

    object[element.getAttribute(customAttribute)] = handler;

    this.attributesMap[customAttribute].bind(element, handler);
}

function _unregisterFunction(object, element, customAttribute) {
    this.attributesMap[customAttribute].unbind(element, object[element.getAttribute(customAttribute)]);
}