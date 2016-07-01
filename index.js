'use strict';

module.exports = {
    attributesMap : {},

    register : register,
    unregister : unregister,

    addAttribute : addAttribute
};

function register(object, rootElement) {
    Object.keys(this.attributesMap).forEach(function(customAttribute) {
        [].forEach.call(rootElement.querySelectorAll('['+customAttribute+']'), function(element) {

            if(typeof object[element.getAttribute(customAttribute)] === 'function') {
                _registerFunction.call(this, object, element, customAttribute);
            } else if(object[element.getAttribute(customAttribute)] !== undefined){
                this.attributesMap[customAttribute].bind.call(object, element, object[element.getAttribute(customAttribute)]);
            } else {
                this.attributesMap[customAttribute].bind.call(object, element, element.getAttribute(customAttribute));
            }

        }.bind(this));
    }.bind(this));
}

function unregister(object, rootElement) {
    Object.keys(this.attributesMap).forEach(function(customAttribute) {
        [].forEach.call(rootElement.querySelectorAll('['+customAttribute+']'), function(element) {

            if(typeof object[element.getAttribute(customAttribute)] === 'function') {
                _unregisterFunction.call(this, object, element, customAttribute);
            } else if(object[element.getAttribute(customAttribute)] !== undefined) {
                this.attributesMap[customAttribute].unbind.call(object, element, object[element.getAttribute(customAttribute)]);
            } else {
                this.attributesMap[customAttribute].unbind.call(object, element, element.getAttribute(customAttribute));
            }

        }.bind(this));
    }.bind(this));
}

function addAttribute(attributeName, customAttributeObj) {
    this.attributesMap[attributeName] = customAttributeObj;
}

function _registerFunction(object, element, customAttribute) {
    var handler =  object[element.getAttribute(customAttribute)].bind(object);

    object[element.getAttribute(customAttribute)] = handler;

    this.attributesMap[customAttribute].bind.call(object, element, handler);
}

function _unregisterFunction(object, element, customAttribute) {
    this.attributesMap[customAttribute].unbind.call(object, element, object[element.getAttribute(customAttribute)]);
}