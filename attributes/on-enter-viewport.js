'use strict';

var viewportObserver = null,
    observedElements = {},
    currentObservedId = 0;

module.exports = {
    bind : bind,
    unbind : unbind
}

function bind(el, handler) {
    if(!viewportObserver) {
        viewportObserver = new IntersectionObserver(handlerObserverEntries, {});
    }

    el.enterViewportObserverId = currentObservedId;

    observedElements[el.enterViewportObserverId] = handler;

    currentObservedId += 1;

    viewportObserver.observe(el);
}

function unbind(el) {
    viewportObserver.unobserve(el);
    observedElements[el.enterViewportObserverId] = null;
}

function handlerObserverEntries(entries) {
    entries.forEach(function(entry) {
        observedElements[entry.target.enterViewportObserverId] && observedElements[entry.target.enterViewportObserverId](entry.intersectionRatio);
    });
}
