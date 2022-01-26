/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/wp-content/themes/regulora/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/*!
  * Bootstrap event-handler.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.EventHandler = factory());
})(this, (function () { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var getjQuery = function () {
    var jQuery = __webpack_provided_window_dot_jQuery;

    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return jQuery;
    }

    return null;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  var stripNameRegex = /\..*/;
  var stripUidRegex = /::\d+$/;
  var eventRegistry = {}; // Events storage

  var uidEvent = 1;
  var customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  var customEventsRegex = /^(mouseenter|mouseleave)/i;
  var nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
  /**
   * ------------------------------------------------------------------------
   * Private methods
   * ------------------------------------------------------------------------
   */

  function getUidEvent(element, uid) {
    return uid && (uid + "::" + (uidEvent++)) || element.uidEvent || uidEvent++;
  }

  function getEvent(element) {
    var uid = getUidEvent(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }

  function bootstrapHandler(element, fn) {
    return function handler(event) {
      event.delegateTarget = element;

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }

      return fn.apply(element, [event]);
    };
  }

  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      var domElements = element.querySelectorAll(selector);

      for (var target = event.target; target && target !== this; target = target.parentNode) {
        for (var i = domElements.length; i--;) {
          if (domElements[i] === target) {
            event.delegateTarget = target;

            if (handler.oneOff) {
              EventHandler.off(element, event.type, selector, fn);
            }

            return fn.apply(target, [event]);
          }
        }
      } // To please ESLint


      return null;
    };
  }

  function findHandler(events, handler, delegationSelector) {
    if ( delegationSelector === void 0 ) delegationSelector = null;

    var uidEventList = Object.keys(events);

    for (var i = 0, len = uidEventList.length; i < len; i++) {
      var event = events[uidEventList[i]];

      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
        return event;
      }
    }

    return null;
  }

  function normalizeParams(originalTypeEvent, handler, delegationFn) {
    var delegation = typeof handler === 'string';
    var originalHandler = delegation ? delegationFn : handler;
    var typeEvent = getTypeEvent(originalTypeEvent);
    var isNative = nativeEvents.has(typeEvent);

    if (!isNative) {
      typeEvent = originalTypeEvent;
    }

    return [delegation, originalHandler, typeEvent];
  }

  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    if (!handler) {
      handler = delegationFn;
      delegationFn = null;
    } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does


    if (customEventsRegex.test(originalTypeEvent)) {
      var wrapFn = function (fn) {
        return function (event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn.call(this, event);
          }
        };
      };

      if (delegationFn) {
        delegationFn = wrapFn(delegationFn);
      } else {
        handler = wrapFn(handler);
      }
    }

    var ref = normalizeParams(originalTypeEvent, handler, delegationFn);
    var delegation = ref[0];
    var originalHandler = ref[1];
    var typeEvent = ref[2];
    var events = getEvent(element);
    var handlers = events[typeEvent] || (events[typeEvent] = {});
    var previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

    if (previousFn) {
      previousFn.oneOff = previousFn.oneOff && oneOff;
      return;
    }

    var uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
    var fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
    fn.delegationSelector = delegation ? handler : null;
    fn.originalHandler = originalHandler;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, delegation);
  }

  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    var fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
      return;
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }

  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    var storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach(function (handlerKey) {
      if (handlerKey.includes(namespace)) {
        var event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  }

  function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, '');
    return customEvents[event] || event;
  }

  var EventHandler = {
    on: function on(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, false);
    },

    one: function one(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, true);
    },

    off: function off(element, originalTypeEvent, handler, delegationFn) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }

      var ref = normalizeParams(originalTypeEvent, handler, delegationFn);
      var delegation = ref[0];
      var originalHandler = ref[1];
      var typeEvent = ref[2];
      var inNamespace = typeEvent !== originalTypeEvent;
      var events = getEvent(element);
      var isNamespace = originalTypeEvent.startsWith('.');

      if (typeof originalHandler !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!events || !events[typeEvent]) {
          return;
        }

        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
        return;
      }

      if (isNamespace) {
        Object.keys(events).forEach(function (elementEvent) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        });
      }

      var storeElementEvent = events[typeEvent] || {};
      Object.keys(storeElementEvent).forEach(function (keyHandlers) {
        var handlerKey = keyHandlers.replace(stripUidRegex, '');

        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          var event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
        }
      });
    },

    trigger: function trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }

      var $ = getjQuery();
      var typeEvent = getTypeEvent(event);
      var inNamespace = event !== typeEvent;
      var isNative = nativeEvents.has(typeEvent);
      var jQueryEvent;
      var bubbles = true;
      var nativeDispatch = true;
      var defaultPrevented = false;
      var evt = null;

      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }

      if (isNative) {
        evt = document.createEvent('HTMLEvents');
        evt.initEvent(typeEvent, bubbles, true);
      } else {
        evt = new CustomEvent(event, {
          bubbles: bubbles,
          cancelable: true
        });
      } // merge custom information in our event


      if (typeof args !== 'undefined') {
        Object.keys(args).forEach(function (key) {
          Object.defineProperty(evt, key, {
            get: function get() {
              return args[key];
            }

          });
        });
      }

      if (defaultPrevented) {
        evt.preventDefault();
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }

      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
        jQueryEvent.preventDefault();
      }

      return evt;
    }

  };

  return EventHandler;

}));
//# sourceMappingURL=event-handler.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*!
  * Bootstrap selector-engine.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.SelectorEngine = factory());
})(this, (function () { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var isElement = function (obj) {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    if (typeof obj.jquery !== 'undefined') {
      obj = obj[0];
    }

    return typeof obj.nodeType !== 'undefined';
  };

  var isVisible = function (element) {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false;
    }

    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
  };

  var isDisabled = function (element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }

    if (element.classList.contains('disabled')) {
      return true;
    }

    if (typeof element.disabled !== 'undefined') {
      return element.disabled;
    }

    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  var NODE_TEXT = 3;
  var SelectorEngine = {
    find: function find(selector, element) {
      if ( element === void 0 ) element = document.documentElement;

      return (ref = []).concat.apply(ref, Element.prototype.querySelectorAll.call(element, selector));
      var ref;
    },

    findOne: function findOne(selector, element) {
      if ( element === void 0 ) element = document.documentElement;

      return Element.prototype.querySelector.call(element, selector);
    },

    children: function children(element, selector) {
      return (ref = []).concat.apply(ref, element.children).filter(function (child) { return child.matches(selector); });
      var ref;
    },

    parents: function parents(element, selector) {
      var parents = [];
      var ancestor = element.parentNode;

      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
        if (ancestor.matches(selector)) {
          parents.push(ancestor);
        }

        ancestor = ancestor.parentNode;
      }

      return parents;
    },

    prev: function prev(element, selector) {
      var previous = element.previousElementSibling;

      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }

        previous = previous.previousElementSibling;
      }

      return [];
    },

    next: function next(element, selector) {
      var next = element.nextElementSibling;

      while (next) {
        if (next.matches(selector)) {
          return [next];
        }

        next = next.nextElementSibling;
      }

      return [];
    },

    focusableChildren: function focusableChildren(element) {
      var focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(function (selector) { return (selector + ":not([tabindex^=\"-\"])"); }).join(', ');
      return this.find(focusables, element).filter(function (el) { return !isDisabled(el) && isVisible(el); });
    }

  };

  return SelectorEngine;

}));
//# sourceMappingURL=selector-engine.js.map


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*!
  * Bootstrap base-component.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(4), __webpack_require__(1)) :
  typeof define === 'function' && define.amd ? define(['./dom/data', './dom/event-handler'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Base = factory(global.Data, global.EventHandler));
})(this, (function (Data, EventHandler) { 'use strict';

  var _interopDefaultLegacy = function (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; };

  var Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
  var EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  var MILLISECONDS_MULTIPLIER = 1000;
  var TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  var getTransitionDurationFromElement = function (element) {
    if (!element) {
      return 0;
    } // Get transition-duration of the element


    var ref = window.getComputedStyle(element);
    var transitionDuration = ref.transitionDuration;
    var transitionDelay = ref.transitionDelay;
    var floatTransitionDuration = Number.parseFloat(transitionDuration);
    var floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };

  var triggerTransitionEnd = function (element) {
    element.dispatchEvent(new Event(TRANSITION_END));
  };

  var isElement = function (obj) {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    if (typeof obj.jquery !== 'undefined') {
      obj = obj[0];
    }

    return typeof obj.nodeType !== 'undefined';
  };

  var getElement = function (obj) {
    if (isElement(obj)) {
      // it's a jQuery object or a node element
      return obj.jquery ? obj[0] : obj;
    }

    if (typeof obj === 'string' && obj.length > 0) {
      return document.querySelector(obj);
    }

    return null;
  };

  var execute = function (callback) {
    if (typeof callback === 'function') {
      callback();
    }
  };

  var executeAfterTransition = function (callback, transitionElement, waitForTransition) {
    if ( waitForTransition === void 0 ) waitForTransition = true;

    if (!waitForTransition) {
      execute(callback);
      return;
    }

    var durationPadding = 5;
    var emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    var called = false;

    var handler = function (ref) {
      var target = ref.target;

      if (target !== transitionElement) {
        return;
      }

      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };

    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(function () {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var VERSION = '5.1.3';

  var BaseComponent = function BaseComponent(element) {
    element = getElement(element);

    if (!element) {
      return;
    }

    this._element = element;
    Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
  };

var staticAccessors = { VERSION: {},NAME: {},DATA_KEY: {},EVENT_KEY: {} };

  BaseComponent.prototype.dispose = function dispose () {
      var this$1 = this;

    Data__default.default.remove(this._element, this.constructor.DATA_KEY);
    EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);
    Object.getOwnPropertyNames(this).forEach(function (propertyName) {
      this$1[propertyName] = null;
    });
  };

  BaseComponent.prototype._queueCallback = function _queueCallback (callback, element, isAnimated) {
      if ( isAnimated === void 0 ) isAnimated = true;

    executeAfterTransition(callback, element, isAnimated);
  };
  /** Static */


  BaseComponent.getInstance = function getInstance (element) {
    return Data__default.default.get(getElement(element), this.DATA_KEY);
  };

  BaseComponent.getOrCreateInstance = function getOrCreateInstance (element, config) {
      if ( config === void 0 ) config = {};

    return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
  };

  staticAccessors.VERSION.get = function () {
    return VERSION;
  };

  staticAccessors.NAME.get = function () {
    throw new Error('You have to implement the static method "NAME", for each component!');
  };

  staticAccessors.DATA_KEY.get = function () {
    return ("bs." + (this.NAME));
  };

  staticAccessors.EVENT_KEY.get = function () {
    return ("." + (this.DATA_KEY));
  };

Object.defineProperties( BaseComponent, staticAccessors );

  return BaseComponent;

}));
//# sourceMappingURL=base-component.js.map


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*!
  * Bootstrap data.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Data = factory());
})(this, (function () { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var elementMap = new Map();
  var data = {
    set: function set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }

      var instanceMap = elementMap.get(element); // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used

      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error(("Bootstrap doesn't allow more than one instance per element. Bound instance: " + (Array.from(instanceMap.keys())[0]) + "."));
        return;
      }

      instanceMap.set(key, instance);
    },

    get: function get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }

      return null;
    },

    remove: function remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }

      var instanceMap = elementMap.get(element);
      instanceMap.delete(key); // free up element references if there are no instances left for an element

      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }

  };

  return data;

}));
//# sourceMappingURL=data.js.map


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*!
  * Bootstrap manipulator.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Manipulator = factory());
})(this, (function () { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  function normalizeData(val) {
    if (val === 'true') {
      return true;
    }

    if (val === 'false') {
      return false;
    }

    if (val === Number(val).toString()) {
      return Number(val);
    }

    if (val === '' || val === 'null') {
      return null;
    }

    return val;
  }

  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, function (chr) { return ("-" + (chr.toLowerCase())); });
  }

  var Manipulator = {
    setDataAttribute: function setDataAttribute(element, key, value) {
      element.setAttribute(("data-bs-" + (normalizeDataKey(key))), value);
    },

    removeDataAttribute: function removeDataAttribute(element, key) {
      element.removeAttribute(("data-bs-" + (normalizeDataKey(key))));
    },

    getDataAttributes: function getDataAttributes(element) {
      if (!element) {
        return {};
      }

      var attributes = {};
      Object.keys(element.dataset).filter(function (key) { return key.startsWith('bs'); }).forEach(function (key) {
        var pureKey = key.replace(/^bs/, '');
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      });
      return attributes;
    },

    getDataAttribute: function getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(("data-bs-" + (normalizeDataKey(key)))));
    },

    offset: function offset(element) {
      var rect = element.getBoundingClientRect();
      return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
      };
    },

    position: function position(element) {
      return {
        top: element.offsetTop,
        left: element.offsetLeft
      };
    }

  };

  return Manipulator;

}));
//# sourceMappingURL=manipulator.js.map


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(7);
module.exports = __webpack_require__(19);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__autoload_bootstrap_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_modernizr__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_modernizr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__util_modernizr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_Router__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routes_common__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__routes_home__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__routes_about__ = __webpack_require__(18);
// import external dependencies


// Import everything from autoload



// import local dependencies





/** Populate Router instance with DOM routes */
var routes = new __WEBPACK_IMPORTED_MODULE_3__util_Router__["a" /* default */]({
  // All pages
  common: __WEBPACK_IMPORTED_MODULE_4__routes_common__["a" /* default */],
  // Home page
  home: __WEBPACK_IMPORTED_MODULE_5__routes_home__["a" /* default */],
  // About Us page, note the change from about-us to aboutUs.
  aboutUs: __WEBPACK_IMPORTED_MODULE_6__routes_about__["a" /* default */],
});

// Load Events
jQuery(document).ready(function () { return routes.loadEvents(); });

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bootstrap_js_dist_collapse__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bootstrap_js_dist_collapse___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bootstrap_js_dist_collapse__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bootstrap_js_dist_scrollspy__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bootstrap_js_dist_scrollspy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bootstrap_js_dist_scrollspy__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bootstrap_js_dist_tab__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bootstrap_js_dist_tab___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_bootstrap_js_dist_tab__);
// import 'bootstrap';


// import 'bootstrap/js/dist/alert';
// import 'bootstrap/js/dist/button';
// import 'bootstrap/js/dist/carousel';

// import 'bootstrap/js/dist/dropdown';
// import 'bootstrap/js/dist/modal';
// import 'bootstrap/js/dist/popover';


// import 'bootstrap/js/dist/toast';
// import 'bootstrap/js/dist/tooltip';

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/*!
  * Bootstrap collapse.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(4), __webpack_require__(1), __webpack_require__(5), __webpack_require__(2), __webpack_require__(3)) :
  typeof define === 'function' && define.amd ? define(['./dom/data', './dom/event-handler', './dom/manipulator', './dom/selector-engine', './base-component'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Collapse = factory(global.Data, global.EventHandler, global.Manipulator, global.SelectorEngine, global.Base));
})(this, (function (Data, EventHandler, Manipulator, SelectorEngine, BaseComponent) { 'use strict';

  var _interopDefaultLegacy = function (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; };

  var Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
  var EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
  var Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
  var SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
  var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var toType = function (obj) {
    if (obj === null || obj === undefined) {
      return ("" + obj);
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  };

  var getSelector = function (element) {
    var selector = element.getAttribute('data-bs-target');

    if (!selector || selector === '#') {
      var hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273

      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
        return null;
      } // Just in case some CMS puts out a full URL with the anchor appended


      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
        hrefAttr = "#" + (hrefAttr.split('#')[1]);
      }

      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
    }

    return selector;
  };

  var getSelectorFromElement = function (element) {
    var selector = getSelector(element);

    if (selector) {
      return document.querySelector(selector) ? selector : null;
    }

    return null;
  };

  var getElementFromSelector = function (element) {
    var selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };

  var isElement = function (obj) {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    if (typeof obj.jquery !== 'undefined') {
      obj = obj[0];
    }

    return typeof obj.nodeType !== 'undefined';
  };

  var getElement = function (obj) {
    if (isElement(obj)) {
      // it's a jQuery object or a node element
      return obj.jquery ? obj[0] : obj;
    }

    if (typeof obj === 'string' && obj.length > 0) {
      return document.querySelector(obj);
    }

    return null;
  };

  var typeCheckConfig = function (componentName, config, configTypes) {
    Object.keys(configTypes).forEach(function (property) {
      var expectedTypes = configTypes[property];
      var value = config[property];
      var valueType = value && isElement(value) ? 'element' : toType(value);

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(((componentName.toUpperCase()) + ": Option \"" + property + "\" provided type \"" + valueType + "\" but expected type \"" + expectedTypes + "\"."));
      }
    });
  };
  /**
   * Trick to restart an element's animation
   *
   * @param {HTMLElement} element
   * @return void
   *
   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
   */


  var reflow = function (element) {
    // eslint-disable-next-line no-unused-expressions
    element.offsetHeight;
  };

  var getjQuery = function () {
    var jQuery = __webpack_provided_window_dot_jQuery;

    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return jQuery;
    }

    return null;
  };

  var DOMContentLoadedCallbacks = [];

  var onDOMContentLoaded = function (callback) {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', function () {
          DOMContentLoadedCallbacks.forEach(function (callback) { return callback(); });
        });
      }

      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };

  var defineJQueryPlugin = function (plugin) {
    onDOMContentLoaded(function () {
      var $ = getjQuery();
      /* istanbul ignore if */

      if ($) {
        var name = plugin.NAME;
        var JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;

        $.fn[name].noConflict = function () {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var Default = {
    toggle: true,
    parent: null
  };
  var DefaultType = {
    toggle: 'boolean',
    parent: '(null|element)'
  };
  var EVENT_SHOW = "show" + EVENT_KEY;
  var EVENT_SHOWN = "shown" + EVENT_KEY;
  var EVENT_HIDE = "hide" + EVENT_KEY;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var CLASS_NAME_SHOW = 'show';
  var CLASS_NAME_COLLAPSE = 'collapse';
  var CLASS_NAME_COLLAPSING = 'collapsing';
  var CLASS_NAME_COLLAPSED = 'collapsed';
  var CLASS_NAME_DEEPER_CHILDREN = ":scope ." + CLASS_NAME_COLLAPSE + " ." + CLASS_NAME_COLLAPSE;
  var CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
  var WIDTH = 'width';
  var HEIGHT = 'height';
  var SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
  var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = (function (superclass) {
  function Collapse(element, config) {
      var this$1 = this;

      superclass.call(this, element);
      this._isTransitioning = false;
      this._config = this._getConfig(config);
      this._triggerArray = [];
      var toggleList = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE);

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = getSelectorFromElement(elem);
        var filterElement = SelectorEngine__default.default.find(selector).filter(function (foundElem) { return foundElem === this$1._element; });

        if (selector !== null && filterElement.length) {
          this$1._selector = selector;

          this$1._triggerArray.push(elem);
        }
      }

      this._initializeChildren();

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

  if ( superclass ) Collapse.__proto__ = superclass;
  Collapse.prototype = Object.create( superclass && superclass.prototype );
  Collapse.prototype.constructor = Collapse;

  var staticAccessors = { Default: {},NAME: {} }; // Getters


    staticAccessors.Default.get = function () {
      return Default;
    };

    staticAccessors.NAME.get = function () {
      return NAME;
    }; // Public


    Collapse.prototype.toggle = function toggle () {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    };

    Collapse.prototype.show = function show () {
      var this$1 = this;

      if (this._isTransitioning || this._isShown()) {
        return;
      }

      var actives = [];
      var activesData;

      if (this._config.parent) {
        var children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
        actives = SelectorEngine__default.default.find(SELECTOR_ACTIVES, this._config.parent).filter(function (elem) { return !children.includes(elem); }); // remove children if greater depth
      }

      var container = SelectorEngine__default.default.findOne(this._selector);

      if (actives.length) {
        var tempActiveData = actives.find(function (elem) { return container !== elem; });
        activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);

      if (startEvent.defaultPrevented) {
        return;
      }

      actives.forEach(function (elemActive) {
        if (container !== elemActive) {
          Collapse.getOrCreateInstance(elemActive, {
            toggle: false
          }).hide();
        }

        if (!activesData) {
          Data__default.default.set(elemActive, DATA_KEY, null);
        }
      });

      var dimension = this._getDimension();

      this._element.classList.remove(CLASS_NAME_COLLAPSE);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.style[dimension] = 0;

      this._addAriaAndCollapsedClass(this._triggerArray, true);

      this._isTransitioning = true;

      var complete = function () {
        this$1._isTransitioning = false;

        this$1._element.classList.remove(CLASS_NAME_COLLAPSING);

        this$1._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

        this$1._element.style[dimension] = '';
        EventHandler__default.default.trigger(this$1._element, EVENT_SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;

      this._queueCallback(complete, this._element, true);

      this._element.style[dimension] = (this._element[scrollSize]) + "px";
    };

    Collapse.prototype.hide = function hide () {
      var this$1 = this;

      if (this._isTransitioning || !this._isShown()) {
        return;
      }

      var startEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

      if (startEvent.defaultPrevented) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = (this._element.getBoundingClientRect()[dimension]) + "px";
      reflow(this._element);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

      var triggerArrayLength = this._triggerArray.length;

      for (var i = 0; i < triggerArrayLength; i++) {
        var trigger = this$1._triggerArray[i];
        var elem = getElementFromSelector(trigger);

        if (elem && !this$1._isShown(elem)) {
          this$1._addAriaAndCollapsedClass([trigger], false);
        }
      }

      this._isTransitioning = true;

      var complete = function () {
        this$1._isTransitioning = false;

        this$1._element.classList.remove(CLASS_NAME_COLLAPSING);

        this$1._element.classList.add(CLASS_NAME_COLLAPSE);

        EventHandler__default.default.trigger(this$1._element, EVENT_HIDDEN);
      };

      this._element.style[dimension] = '';

      this._queueCallback(complete, this._element, true);
    };

    Collapse.prototype._isShown = function _isShown (element) {
      if ( element === void 0 ) element = this._element;

      return element.classList.contains(CLASS_NAME_SHOW);
    }; // Private


    Collapse.prototype._getConfig = function _getConfig (config) {
      config = Object.assign({}, Default,
        Manipulator__default.default.getDataAttributes(this._element),
        config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      config.parent = getElement(config.parent);
      typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Collapse.prototype._getDimension = function _getDimension () {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    };

    Collapse.prototype._initializeChildren = function _initializeChildren () {
      var this$1 = this;

      if (!this._config.parent) {
        return;
      }

      var children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
      SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE, this._config.parent).filter(function (elem) { return !children.includes(elem); }).forEach(function (element) {
        var selected = getElementFromSelector(element);

        if (selected) {
          this$1._addAriaAndCollapsedClass([element], this$1._isShown(selected));
        }
      });
    };

    Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass (triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }

      triggerArray.forEach(function (elem) {
        if (isOpen) {
          elem.classList.remove(CLASS_NAME_COLLAPSED);
        } else {
          elem.classList.add(CLASS_NAME_COLLAPSED);
        }

        elem.setAttribute('aria-expanded', isOpen);
      });
    }; // Static


    Collapse.jQueryInterface = function jQueryInterface (config) {
      return this.each(function () {
        var _config = {};

        if (typeof config === 'string' && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        var data = Collapse.getOrCreateInstance(this, _config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(("No method named \"" + config + "\""));
          }

          data[config]();
        }
      });
    };

  Object.defineProperties( Collapse, staticAccessors );

  return Collapse;
}(BaseComponent__default.default));
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
      event.preventDefault();
    }

    var selector = getSelectorFromElement(this);
    var selectorElements = SelectorEngine__default.default.find(selector);
    selectorElements.forEach(function (element) {
      Collapse.getOrCreateInstance(element, {
        toggle: false
      }).toggle();
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Collapse to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Collapse);

  return Collapse;

}));
//# sourceMappingURL=collapse.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/*!
  * Bootstrap scrollspy.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(1), __webpack_require__(5), __webpack_require__(2), __webpack_require__(3)) :
  typeof define === 'function' && define.amd ? define(['./dom/event-handler', './dom/manipulator', './dom/selector-engine', './base-component'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScrollSpy = factory(global.EventHandler, global.Manipulator, global.SelectorEngine, global.Base));
})(this, (function (EventHandler, Manipulator, SelectorEngine, BaseComponent) { 'use strict';

  var _interopDefaultLegacy = function (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; };

  var EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
  var Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
  var SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
  var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var toType = function (obj) {
    if (obj === null || obj === undefined) {
      return ("" + obj);
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  };

  var getSelector = function (element) {
    var selector = element.getAttribute('data-bs-target');

    if (!selector || selector === '#') {
      var hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273

      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
        return null;
      } // Just in case some CMS puts out a full URL with the anchor appended


      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
        hrefAttr = "#" + (hrefAttr.split('#')[1]);
      }

      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
    }

    return selector;
  };

  var getSelectorFromElement = function (element) {
    var selector = getSelector(element);

    if (selector) {
      return document.querySelector(selector) ? selector : null;
    }

    return null;
  };

  var isElement = function (obj) {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    if (typeof obj.jquery !== 'undefined') {
      obj = obj[0];
    }

    return typeof obj.nodeType !== 'undefined';
  };

  var getElement = function (obj) {
    if (isElement(obj)) {
      // it's a jQuery object or a node element
      return obj.jquery ? obj[0] : obj;
    }

    if (typeof obj === 'string' && obj.length > 0) {
      return document.querySelector(obj);
    }

    return null;
  };

  var typeCheckConfig = function (componentName, config, configTypes) {
    Object.keys(configTypes).forEach(function (property) {
      var expectedTypes = configTypes[property];
      var value = config[property];
      var valueType = value && isElement(value) ? 'element' : toType(value);

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(((componentName.toUpperCase()) + ": Option \"" + property + "\" provided type \"" + valueType + "\" but expected type \"" + expectedTypes + "\"."));
      }
    });
  };

  var getjQuery = function () {
    var jQuery = __webpack_provided_window_dot_jQuery;

    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return jQuery;
    }

    return null;
  };

  var DOMContentLoadedCallbacks = [];

  var onDOMContentLoaded = function (callback) {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', function () {
          DOMContentLoadedCallbacks.forEach(function (callback) { return callback(); });
        });
      }

      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };

  var defineJQueryPlugin = function (plugin) {
    onDOMContentLoaded(function () {
      var $ = getjQuery();
      /* istanbul ignore if */

      if ($) {
        var name = plugin.NAME;
        var JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;

        $.fn[name].noConflict = function () {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'scrollspy';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var EVENT_ACTIVATE = "activate" + EVENT_KEY;
  var EVENT_SCROLL = "scroll" + EVENT_KEY;
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY + DATA_API_KEY;
  var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  var CLASS_NAME_ACTIVE = 'active';
  var SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_NAV_LINKS = '.nav-link';
  var SELECTOR_NAV_ITEMS = '.nav-item';
  var SELECTOR_LIST_ITEMS = '.list-group-item';
  var SELECTOR_LINK_ITEMS = SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS + ", ." + CLASS_NAME_DROPDOWN_ITEM;
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var METHOD_OFFSET = 'offset';
  var METHOD_POSITION = 'position';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = (function (superclass) {
  function ScrollSpy(element, config) {
      var this$1 = this;

      superclass.call(this, element);
      this._scrollElement = this._element.tagName === 'BODY' ? window : this._element;
      this._config = this._getConfig(config);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      EventHandler__default.default.on(this._scrollElement, EVENT_SCROLL, function () { return this$1._process(); });
      this.refresh();

      this._process();
    }

  if ( superclass ) ScrollSpy.__proto__ = superclass;
  ScrollSpy.prototype = Object.create( superclass && superclass.prototype );
  ScrollSpy.prototype.constructor = ScrollSpy;

  var staticAccessors = { Default: {},NAME: {} }; // Getters


    staticAccessors.Default.get = function () {
      return Default;
    };

    staticAccessors.NAME.get = function () {
      return NAME;
    }; // Public


    ScrollSpy.prototype.refresh = function refresh () {
      var this$1 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = SelectorEngine__default.default.find(SELECTOR_LINK_ITEMS, this._config.target);
      targets.map(function (element) {
        var targetSelector = getSelectorFromElement(element);
        var target = targetSelector ? SelectorEngine__default.default.findOne(targetSelector) : null;

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            return [Manipulator__default.default[offsetMethod](target).top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) { return item; }).sort(function (a, b) { return a[0] - b[0]; }).forEach(function (item) {
        this$1._offsets.push(item[0]);

        this$1._targets.push(item[1]);
      });
    };

    ScrollSpy.prototype.dispose = function dispose () {
      EventHandler__default.default.off(this._scrollElement, EVENT_KEY);
      superclass.prototype.dispose.call(this);
    }; // Private


    ScrollSpy.prototype._getConfig = function _getConfig (config) {
      config = Object.assign({}, Default,
        Manipulator__default.default.getDataAttributes(this._element),
        (typeof config === 'object' && config ? config : {}));
      config.target = getElement(config.target) || document.documentElement;
      typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    ScrollSpy.prototype._getScrollTop = function _getScrollTop () {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    ScrollSpy.prototype._getScrollHeight = function _getScrollHeight () {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    ScrollSpy.prototype._getOffsetHeight = function _getOffsetHeight () {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    ScrollSpy.prototype._process = function _process () {
      var this$1 = this;

      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this$1._activeTarget !== this$1._targets[i] && scrollTop >= this$1._offsets[i] && (typeof this$1._offsets[i + 1] === 'undefined' || scrollTop < this$1._offsets[i + 1]);

        if (isActiveTarget) {
          this$1._activate(this$1._targets[i]);
        }
      }
    };

    ScrollSpy.prototype._activate = function _activate (target) {
      this._activeTarget = target;

      this._clear();

      var queries = SELECTOR_LINK_ITEMS.split(',').map(function (selector) { return (selector + "[data-bs-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]"); });
      var link = SelectorEngine__default.default.findOne(queries.join(','), this._config.target);
      link.classList.add(CLASS_NAME_ACTIVE);

      if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine__default.default.findOne(SELECTOR_DROPDOWN_TOGGLE, link.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE);
      } else {
        SelectorEngine__default.default.parents(link, SELECTOR_NAV_LIST_GROUP).forEach(function (listGroup) {
          // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
          SelectorEngine__default.default.prev(listGroup, (SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS)).forEach(function (item) { return item.classList.add(CLASS_NAME_ACTIVE); }); // Handle special case when .nav-link is inside .nav-item

          SelectorEngine__default.default.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(function (navItem) {
            SelectorEngine__default.default.children(navItem, SELECTOR_NAV_LINKS).forEach(function (item) { return item.classList.add(CLASS_NAME_ACTIVE); });
          });
        });
      }

      EventHandler__default.default.trigger(this._scrollElement, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    };

    ScrollSpy.prototype._clear = function _clear () {
      SelectorEngine__default.default.find(SELECTOR_LINK_ITEMS, this._config.target).filter(function (node) { return node.classList.contains(CLASS_NAME_ACTIVE); }).forEach(function (node) { return node.classList.remove(CLASS_NAME_ACTIVE); });
    }; // Static


    ScrollSpy.jQueryInterface = function jQueryInterface (config) {
      return this.each(function () {
        var data = ScrollSpy.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(("No method named \"" + config + "\""));
        }

        data[config]();
      });
    };

  Object.defineProperties( ScrollSpy, staticAccessors );

  return ScrollSpy;
}(BaseComponent__default.default));
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, function () {
    SelectorEngine__default.default.find(SELECTOR_DATA_SPY).forEach(function (spy) { return new ScrollSpy(spy); });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .ScrollSpy to jQuery only if jQuery is present
   */

  defineJQueryPlugin(ScrollSpy);

  return ScrollSpy;

}));
//# sourceMappingURL=scrollspy.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/*!
  * Bootstrap tab.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(1), __webpack_require__(2), __webpack_require__(3)) :
  typeof define === 'function' && define.amd ? define(['./dom/event-handler', './dom/selector-engine', './base-component'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Tab = factory(global.EventHandler, global.SelectorEngine, global.Base));
})(this, (function (EventHandler, SelectorEngine, BaseComponent) { 'use strict';

  var _interopDefaultLegacy = function (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; };

  var EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
  var SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
  var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var getSelector = function (element) {
    var selector = element.getAttribute('data-bs-target');

    if (!selector || selector === '#') {
      var hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273

      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
        return null;
      } // Just in case some CMS puts out a full URL with the anchor appended


      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
        hrefAttr = "#" + (hrefAttr.split('#')[1]);
      }

      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
    }

    return selector;
  };

  var getElementFromSelector = function (element) {
    var selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };

  var isDisabled = function (element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }

    if (element.classList.contains('disabled')) {
      return true;
    }

    if (typeof element.disabled !== 'undefined') {
      return element.disabled;
    }

    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  };
  /**
   * Trick to restart an element's animation
   *
   * @param {HTMLElement} element
   * @return void
   *
   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
   */


  var reflow = function (element) {
    // eslint-disable-next-line no-unused-expressions
    element.offsetHeight;
  };

  var getjQuery = function () {
    var jQuery = __webpack_provided_window_dot_jQuery;

    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return jQuery;
    }

    return null;
  };

  var DOMContentLoadedCallbacks = [];

  var onDOMContentLoaded = function (callback) {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', function () {
          DOMContentLoadedCallbacks.forEach(function (callback) { return callback(); });
        });
      }

      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };

  var defineJQueryPlugin = function (plugin) {
    onDOMContentLoaded(function () {
      var $ = getjQuery();
      /* istanbul ignore if */

      if ($) {
        var name = plugin.NAME;
        var JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;

        $.fn[name].noConflict = function () {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var EVENT_HIDE = "hide" + EVENT_KEY;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY;
  var EVENT_SHOW = "show" + EVENT_KEY;
  var EVENT_SHOWN = "shown" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  var CLASS_NAME_ACTIVE = 'active';
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_SHOW = 'show';
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_ACTIVE_UL = ':scope > li > .active';
  var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = (function (superclass) {
  function Tab () {
    superclass.apply(this, arguments);
  }

  if ( superclass ) Tab.__proto__ = superclass;
  Tab.prototype = Object.create( superclass && superclass.prototype );
  Tab.prototype.constructor = Tab;

  var staticAccessors = { NAME: {} };

  staticAccessors.NAME.get = function () {
      return NAME;
    }; // Public


    Tab.prototype.show = function show () {
      var this$1 = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
        return;
      }

      var previous;
      var target = getElementFromSelector(this._element);

      var listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
        previous = SelectorEngine__default.default.find(itemSelector, listElement);
        previous = previous[previous.length - 1];
      }

      var hideEvent = previous ? EventHandler__default.default.trigger(previous, EVENT_HIDE, {
        relatedTarget: this._element
      }) : null;
      var showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
        relatedTarget: previous
      });

      if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
        return;
      }

      this._activate(this._element, listElement);

      var complete = function () {
        EventHandler__default.default.trigger(previous, EVENT_HIDDEN, {
          relatedTarget: this$1._element
        });
        EventHandler__default.default.trigger(this$1._element, EVENT_SHOWN, {
          relatedTarget: previous
        });
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    }; // Private


    Tab.prototype._activate = function _activate (element, container, callback) {
      var this$1 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine__default.default.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine__default.default.children(container, SELECTOR_ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE);

      var complete = function () { return this$1._transitionComplete(element, active, callback); };

      if (active && isTransitioning) {
        active.classList.remove(CLASS_NAME_SHOW);

        this._queueCallback(complete, element, true);
      } else {
        complete();
      }
    };

    Tab.prototype._transitionComplete = function _transitionComplete (element, active, callback) {
      if (active) {
        active.classList.remove(CLASS_NAME_ACTIVE);
        var dropdownChild = SelectorEngine__default.default.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

        if (dropdownChild) {
          dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      element.classList.add(CLASS_NAME_ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE)) {
        element.classList.add(CLASS_NAME_SHOW);
      }

      var parent = element.parentNode;

      if (parent && parent.nodeName === 'LI') {
        parent = parent.parentNode;
      }

      if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
        var dropdownElement = element.closest(SELECTOR_DROPDOWN);

        if (dropdownElement) {
          SelectorEngine__default.default.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach(function (dropdown) { return dropdown.classList.add(CLASS_NAME_ACTIVE); });
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    }; // Static


    Tab.jQueryInterface = function jQueryInterface (config) {
      return this.each(function () {
        var data = Tab.getOrCreateInstance(this);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(("No method named \"" + config + "\""));
          }

          data[config]();
        }
      });
    };

  Object.defineProperties( Tab, staticAccessors );

  return Tab;
}(BaseComponent__default.default));
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    var data = Tab.getOrCreateInstance(this);
    data.show();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Tab to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Tab);

  return Tab;

}));
//# sourceMappingURL=tab.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

/* eslint-disable */
/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-webp-addtest-domprefixes-mq-setclasses !*/
!function(e,n,t){function o(e,n){return typeof e===n}function a(){var e,n,t,a,A,i,s;for(var r in u){ if(u.hasOwnProperty(r)){if(e=[],n=u[r],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length)){ for(t=0;t<n.options.aliases.length;t++){ e.push(n.options.aliases[t].toLowerCase()); } }for(a=o(n.fn,"function")?n.fn():n.fn,A=0;A<e.length;A++){ i=e[A],s=i.split("."),1===s.length?Modernizr[s[0]]=a:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=a),f.push((a?"":"no-")+s.join("-")) }} }}function A(e){var n=c.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?c.className.baseVal=n:c.className=n)}function i(e,n){if("object"==typeof e){ for(var t in e){ g(e,t)&&i(t,e[t]); } }else{e=e.toLowerCase();var o=e.split("."),a=Modernizr[o[0]];if(2==o.length&&(a=a[o[1]]),"undefined"!=typeof a){ return Modernizr; }n="function"==typeof n?n():n,1==o.length?Modernizr[o[0]]=n:(!Modernizr[o[0]]||Modernizr[o[0]]instanceof Boolean||(Modernizr[o[0]]=new Boolean(Modernizr[o[0]])),Modernizr[o[0]][o[1]]=n),A([(n&&0!=n?"":"no-")+o.join("-")]),Modernizr._trigger(e,n)}return Modernizr}function s(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=s(p?"svg":"body"),e.fake=!0),e}function l(e,t,o,a){var A,i,l,f,u="modernizr",d=s("div"),p=r();if(parseInt(o,10)){ for(;o--;){ l=s("div"),l.id=a?a[o]:u+(o+1),d.appendChild(l); } }return A=s("style"),A.type="text/css",A.id="s"+u,(p.fake?p:d).appendChild(A),p.appendChild(d),A.styleSheet?A.styleSheet.cssText=e:A.appendChild(n.createTextNode(e)),d.id=u,p.fake&&(p.style.background="",p.style.overflow="hidden",f=c.style.overflow,c.style.overflow="hidden",c.appendChild(p)),i=t(d,e),p.fake?(p.parentNode.removeChild(p),c.style.overflow=f,c.offsetHeight):d.parentNode.removeChild(d),!!i}var f=[],u=[],d={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){u.push({name:e,fn:n,options:t})},addAsyncTest:function(e){u.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var c=n.documentElement,p="svg"===c.nodeName.toLowerCase(),h="Moz O ms Webkit",m=d._config.usePrefixes?h.toLowerCase().split(" "):[];d._domPrefixes=m;var g;!function(){var e={}.hasOwnProperty;g=o(e,"undefined")||o(e.call,"undefined")?function(e,n){return n in e&&o(e.constructor.prototype[n],"undefined")}:function(n,t){return e.call(n,t)}}(),d._l={},d.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},d._trigger=function(e,n){if(this._l[e]){var t=this._l[e];setTimeout(function(){var e,o;for(e=0;e<t.length;e++){ (o=t[e])(n) }},0),delete this._l[e]}},Modernizr._q.push(function(){d.addTest=i}),Modernizr.addAsyncTest(function(){function e(e,n,t){function o(n){var o=n&&"load"===n.type?1==a.width:!1,A="webp"===e;i(e,A&&o?new Boolean(o):o),t&&t(n)}var a=new Image;a.onerror=o,a.onload=o,a.src=n}var n=[{uri:"data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",name:"webp"},{uri:"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",name:"webp.alpha"},{uri:"data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",name:"webp.animation"},{uri:"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",name:"webp.lossless"}],t=n.shift();e(t.name,t.uri,function(t){if(t&&"load"===t.type){ for(var o=0;o<n.length;o++){ e(n[o].name,n[o].uri) } }})});var v=function(){var n=e.matchMedia||e.msMatchMedia;return n?function(e){var t=n(e);return t&&t.matches||!1}:function(n){var t=!1;return l("@media "+n+" { #modernizr { position: absolute; } }",function(n){t="absolute"==(e.getComputedStyle?e.getComputedStyle(n,null):n.currentStyle).position}),t}}();d.mq=v,a(),A(f),delete d.addTest,delete d.addAsyncTest;for(var w=0;w<Modernizr._q.length;w++){ Modernizr._q[w](); }e.Modernizr=Modernizr}(window,document);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__camelCase__ = __webpack_require__(14);


/**
 * DOM-based Routing
 *
 * Based on {@link http://goo.gl/EUTi53|Markup-based Unobtrusive Comprehensive DOM-ready Execution} by Paul Irish
 *
 * The routing fires all common scripts, followed by the page specific scripts.
 * Add additional events for more control over timing e.g. a finalize event
 */
var Router = function Router(routes) {
  this.routes = routes;
};

/**
 * Fire Router events
 * @param {string} route DOM-based route derived from body classes (`<body class="...">`)
 * @param {string} [event] Events on the route. By default, `init` and `finalize` events are called.
 * @param {string} [arg] Any custom argument to be passed to the event.
 */
Router.prototype.fire = function fire (route, event, arg) {
    if ( event === void 0 ) event = 'init';

  document.dispatchEvent(new CustomEvent('routed', {
    bubbles: true,
    detail: {
      route: route,
      fn: event,
    },
  }));
    
  var fire = route !== '' && this.routes[route] && typeof this.routes[route][event] === 'function';
  if (fire) {
    this.routes[route][event](arg);
  }
};

/**
 * Automatically load and fire Router events
 *
 * Events are fired in the following order:
 ** common init
 ** page-specific init
 ** page-specific finalize
 ** common finalize
 */
Router.prototype.loadEvents = function loadEvents () {
    var this$1 = this;

  // Fire common init JS
  this.fire('common');

  // Fire page-specific init JS, and then finalize JS
  document.body.className
    .toLowerCase()
    .replace(/-/g, '_')
    .split(/\s+/)
    .map(__WEBPACK_IMPORTED_MODULE_0__camelCase__["a" /* default */])
    .forEach(function (className) {
      this$1.fire(className);
      this$1.fire(className, 'finalize');
    });

  // Fire common finalize JS
  this.fire('common', 'finalize');
};

/* harmony default export */ __webpack_exports__["a"] = (Router);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * the most terrible camelizer on the internet, guaranteed!
 * @param {string} str String that isn't camel-case, e.g., CAMeL_CaSEiS-harD
 * @return {string} String converted to camel-case, e.g., camelCaseIsHard
 */
/* harmony default export */ __webpack_exports__["a"] = (function (str) { return ("" + (str.charAt(0).toLowerCase()) + (str.replace(/[\W_]/g, '|').split('|')
  .map(function (part) { return ("" + (part.charAt(0).toUpperCase()) + (part.slice(1))); })
  .join('')
  .slice(1))); });;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_faq__ = __webpack_require__(16);
/* eslint-disable */

// import {ScrollSpy, Collapse} from "bootstrap";

/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    // JavaScript to be fired on all pages
    /**
     * Modernizr custom tests
     */
    Modernizr.addTest('IE', function() {
      return window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
    });
    Modernizr.addTest('has-scroll', function() {
      return window.innerHeight < document.body.scrollHeight;
    });
  },
  finalize: function finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
    Object(__WEBPACK_IMPORTED_MODULE_0__components_faq__["a" /* init */])();
    
    // ScrollSpy Color Change
    var mainMenu  = document.getElementById( 'navPrimaryMenu' );
    var lightBG   = 'bg-light';
    var darkBG    = 'bg-dark';
    var linkClass = 'nav-link';
    var colorAssoc = {};
    colorAssoc[ lightBG ] = 'dark-color';
    colorAssoc[ darkBG ]  = 'light-color';
    
    window.addEventListener( 'activate.bs.scrollspy', function ( e ) {
      if ( window.innerWidth >= 992 ) {
        var targetBlock = mainMenu.querySelector( '.' + linkClass + '.active' ).getAttribute( 'href' );
        if ( targetBlock && ( targetBlock.indexOf( '#' ) > -1 ) && document.querySelector( targetBlock ) ) {
          mainMenu.querySelector( '.nav' ).classList.remove( colorAssoc[lightBG], colorAssoc[darkBG] );
          
          var targetBG = document.querySelector( targetBlock ).classList;
          for ( var i = 0; i < targetBG.length; i++ ) {
            if ( colorAssoc[ targetBG[ i ] ] ) {
              mainMenu.querySelector( '.nav' ).classList.add( colorAssoc[ targetBG[ i ] ] );
            }
          }
          
          var parentItem = mainMenu.querySelector( '.' + linkClass + '.active' ).closest( 'li' );
          if ( parentItem.classList.contains( 'd-none' ) ) {
            var sibling = parentItem.previousElementSibling;
            console.log(sibling);
            sibling.querySelector( 'a' ).classList.add( 'active' );
          }
        }
      }
    } )
  },
});


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return init; });
var faqItems = document.querySelectorAll( '.is-style-faq-item' );

var toggle = function ( $item ) {
  $item.classList.toggle( 'active' );
};

var actionListener = function () {
  faqItems.forEach( function ( item ) {
    item.querySelector( 'h5' ).addEventListener( 'click', function() {
      toggle( item );
    } )
  } )
};

var init = function () {
  actionListener();
};




/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    // JavaScript to be fired on the home page
  },
  finalize: function finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
});


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    // JavaScript to be fired on the about us page
  },
});


/***/ }),
/* 19 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map