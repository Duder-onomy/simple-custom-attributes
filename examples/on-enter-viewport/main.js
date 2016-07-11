'use strict';

var simpleCustomAttributes = require('../../index');

simpleCustomAttributes.addAttribute('on-enter-viewport', require('../../attributes/on-enter-viewport'));

simpleCustomAttributes.register({
    handleEnterViewport : handleEnterViewport
}, document.querySelector('#wrapper'));

function handleEnterViewport(percentInViewport) {
    console.log(percentInViewport);
}