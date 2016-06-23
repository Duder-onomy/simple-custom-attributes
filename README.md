# Simple Custom Attributes

This will allow you to define and use custom attributes in the DOM.

## About

If you are used to using any modern front end frameworks, you are probably also used to doing things like:

``` html
<div ng-click='someMethod'> // Angular
<div rv-on-click='someMethod'> // Rivets
<div on-click='someMethod'> // Riot.js
```

This library makes custom attribute binding super easy without having to use some massive lame framework.

You can define your own with a simple attribute binding API.

Right now, we support the following:

line-clamp='model.linesToClamp'
```html
<div line-clamp='4'>
    This text will be clamped to 4 lines with an ellipsis at the end.
</div>
```

on-mouse-in='someMethod'
```html
<div on-mouse-in='someMethod'></div>
```

on-mouse-out='someMethod'
```html
<div on-mouse-out='someMethod'></div>
```

on-swipe-left='someMethod'
```html
<div on-swipe-left='someMethod'></div>
```

on-swipe-right='someMethod'
```html
<div on-swipe-right='someMethod'></div>
```

on-click='someMethod'
```html
<div on-click='someMethod'></div>
```

## Using The Library

1. `npm install --save-dev simple-custom-attributes`
2. Require it in, and run the `register` method passing a dom element and a scope object.
    ```javascript
    var simpleCustomAttributes = require('simple-custom-attributes');

    simpleCustomAttributes.register(object, rootElement);
    ```
    Then when you are done, you `unregister`.
    ```javascript
    simpleCustomAttributes.register(object, rootElement);
    ```

This will register all custom attributes in the root element. No need to do it one at a time like I have done in the examples below.

Note: The `this` scope of the method (if you are passing a method to the binding) is the object you registered.

## Examples

1. Lets say you have a off-canvas menu and you wanted to make a swipe gesture close it.  You would add a `on-swipe-right` attribute passing a method you want to call when the swipe right is complete.

    The DOM.
```html
<div class='off-canvas-nav-thing' on-swipe-right='closeNav'>
  // Nav HTML HERE
</div>
```

The view
```javascript
var simpleCustomAttributes = require('simple-custom-attributes'),
    view = {
        closeNav : function() {
            // code to close the nav.
            // Note: `this` in here === the `view`
        }
    };

simpleCustomAttributes.register(view, document.querySelector('.off-canvas-nav-thing'));
```

When the user swipes right, it will call that `closeNav` function.


2. Lets say you had a element that has some fat paragraph of text in it and you wanted to clamp that to 3 lines.

The DOM.
```html
<div class='some-fat-text-in-here' line-clamp='model.linesToClampTheFatText'>
    400 lines of lorem ipsum.
</div>
```

The View.
```javascript
var simpleCustomAttributes = require('simple-custom-attributes'),
    model = {
        linesToClampTheFatText : 3
    };

simpleCustomAttributes.register(view, document.querySelector('.some-fat-text-in-here'));
```

After the registration is complete, that pile of text will be truncated to 3 lines.

3. Simple click handler.

The DOM.
```html
<div class='clicky-mc-click-face' on-click='yeahBuddy'>
</div>
```

The View.
```javascript
var simpleCustomAttributes = require('simple-custom-attributes'),
    view = {
        yeahBuddy : function() {

        }
    };

simpleCustomAttributes.register(view, document.querySelector('.clicky-mc-click-face'));
```

Will call the `yeahBuddy` method when the element is clicked.


## Define your own.

Each custom attribute must have the following methods.
```javascript
{
    bind : function(el, value) {
        // el === The element in question.
        // value === could be a function, a value, anything really. Depends on what you passed the binding.

        // You add event listeners, do work etc here.
    },
    unbind : function(el, value) {
        // undo everything you did in the previous method.
    }
}
```

To include this custom attribute into the library, either make a pull request. OR. Call the `addAttribute` method.

When you call `addAttribute` you will pass a string corresponding with the attribute name and a object containing the above mentioned properties. (you can also use this to override existing attributes.)

If I wanted to define a `on-input` handler for an input element.
Like so:
```javascript
var simpleCustomAttributes = require('simple-custom-attributes');

simpleCustomAttributes.addAttribute('on-input', {
    bind : function(el, value) {
        el.addEventListener('input', value, false);
    },
    unbind : function(el, value) {
        el.removeEventListener('input', value, false);
    }
})
```

Let me know how it goes!!!
