'use strict';

var Hammer = require('hammerjs');

module.exports = {
    bind : bind,
    unbind : unbind
};

function bind(el, handler) {
    var mc = new Hammer.Manager(el),
        swipeRecognizer = new Hammer.Swipe();

    mc.add(swipeRecognizer);

    mc.on('swiperight', handler);

    el.swipeRightHammerInstance = mc;
}

function unbind(el, handler) {
    el.swipeRightHammerInstance.off('swiperight', handler);
    el.swipeRightHammerInstance.destroy();
    el.swipeRightHammerInstance = null;
}