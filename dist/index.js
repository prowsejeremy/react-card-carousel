'use strict';

var require$$0 = require('react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;
	"production" !== process.env.NODE_ENV &&
	  (function () {
	    function getComponentNameFromType(type) {
	      if (null == type) return null;
	      if ("function" === typeof type)
	        return type.$$typeof === REACT_CLIENT_REFERENCE$2
	          ? null
	          : type.displayName || type.name || null;
	      if ("string" === typeof type) return type;
	      switch (type) {
	        case REACT_FRAGMENT_TYPE:
	          return "Fragment";
	        case REACT_PORTAL_TYPE:
	          return "Portal";
	        case REACT_PROFILER_TYPE:
	          return "Profiler";
	        case REACT_STRICT_MODE_TYPE:
	          return "StrictMode";
	        case REACT_SUSPENSE_TYPE:
	          return "Suspense";
	        case REACT_SUSPENSE_LIST_TYPE:
	          return "SuspenseList";
	      }
	      if ("object" === typeof type)
	        switch (
	          ("number" === typeof type.tag &&
	            console.error(
	              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
	            ),
	          type.$$typeof)
	        ) {
	          case REACT_CONTEXT_TYPE:
	            return (type.displayName || "Context") + ".Provider";
	          case REACT_CONSUMER_TYPE:
	            return (type._context.displayName || "Context") + ".Consumer";
	          case REACT_FORWARD_REF_TYPE:
	            var innerType = type.render;
	            type = type.displayName;
	            type ||
	              ((type = innerType.displayName || innerType.name || ""),
	              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
	            return type;
	          case REACT_MEMO_TYPE:
	            return (
	              (innerType = type.displayName || null),
	              null !== innerType
	                ? innerType
	                : getComponentNameFromType(type.type) || "Memo"
	            );
	          case REACT_LAZY_TYPE:
	            innerType = type._payload;
	            type = type._init;
	            try {
	              return getComponentNameFromType(type(innerType));
	            } catch (x) {}
	        }
	      return null;
	    }
	    function testStringCoercion(value) {
	      return "" + value;
	    }
	    function checkKeyStringCoercion(value) {
	      try {
	        testStringCoercion(value);
	        var JSCompiler_inline_result = !1;
	      } catch (e) {
	        JSCompiler_inline_result = true;
	      }
	      if (JSCompiler_inline_result) {
	        JSCompiler_inline_result = console;
	        var JSCompiler_temp_const = JSCompiler_inline_result.error;
	        var JSCompiler_inline_result$jscomp$0 =
	          ("function" === typeof Symbol &&
	            Symbol.toStringTag &&
	            value[Symbol.toStringTag]) ||
	          value.constructor.name ||
	          "Object";
	        JSCompiler_temp_const.call(
	          JSCompiler_inline_result,
	          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
	          JSCompiler_inline_result$jscomp$0
	        );
	        return testStringCoercion(value);
	      }
	    }
	    function disabledLog() {}
	    function disableLogs() {
	      if (0 === disabledDepth) {
	        prevLog = console.log;
	        prevInfo = console.info;
	        prevWarn = console.warn;
	        prevError = console.error;
	        prevGroup = console.group;
	        prevGroupCollapsed = console.groupCollapsed;
	        prevGroupEnd = console.groupEnd;
	        var props = {
	          configurable: true,
	          enumerable: true,
	          value: disabledLog,
	          writable: true
	        };
	        Object.defineProperties(console, {
	          info: props,
	          log: props,
	          warn: props,
	          error: props,
	          group: props,
	          groupCollapsed: props,
	          groupEnd: props
	        });
	      }
	      disabledDepth++;
	    }
	    function reenableLogs() {
	      disabledDepth--;
	      if (0 === disabledDepth) {
	        var props = { configurable: true, enumerable: true, writable: true };
	        Object.defineProperties(console, {
	          log: assign({}, props, { value: prevLog }),
	          info: assign({}, props, { value: prevInfo }),
	          warn: assign({}, props, { value: prevWarn }),
	          error: assign({}, props, { value: prevError }),
	          group: assign({}, props, { value: prevGroup }),
	          groupCollapsed: assign({}, props, { value: prevGroupCollapsed }),
	          groupEnd: assign({}, props, { value: prevGroupEnd })
	        });
	      }
	      0 > disabledDepth &&
	        console.error(
	          "disabledDepth fell below zero. This is a bug in React. Please file an issue."
	        );
	    }
	    function describeBuiltInComponentFrame(name) {
	      if (void 0 === prefix)
	        try {
	          throw Error();
	        } catch (x) {
	          var match = x.stack.trim().match(/\n( *(at )?)/);
	          prefix = (match && match[1]) || "";
	          suffix =
	            -1 < x.stack.indexOf("\n    at")
	              ? " (<anonymous>)"
	              : -1 < x.stack.indexOf("@")
	                ? "@unknown:0:0"
	                : "";
	        }
	      return "\n" + prefix + name + suffix;
	    }
	    function describeNativeComponentFrame(fn, construct) {
	      if (!fn || reentry) return "";
	      var frame = componentFrameCache.get(fn);
	      if (void 0 !== frame) return frame;
	      reentry = true;
	      frame = Error.prepareStackTrace;
	      Error.prepareStackTrace = void 0;
	      var previousDispatcher = null;
	      previousDispatcher = ReactSharedInternals.H;
	      ReactSharedInternals.H = null;
	      disableLogs();
	      try {
	        var RunInRootFrame = {
	          DetermineComponentFrameRoot: function () {
	            try {
	              if (construct) {
	                var Fake = function () {
	                  throw Error();
	                };
	                Object.defineProperty(Fake.prototype, "props", {
	                  set: function () {
	                    throw Error();
	                  }
	                });
	                if ("object" === typeof Reflect && Reflect.construct) {
	                  try {
	                    Reflect.construct(Fake, []);
	                  } catch (x) {
	                    var control = x;
	                  }
	                  Reflect.construct(fn, [], Fake);
	                } else {
	                  try {
	                    Fake.call();
	                  } catch (x$0) {
	                    control = x$0;
	                  }
	                  fn.call(Fake.prototype);
	                }
	              } else {
	                try {
	                  throw Error();
	                } catch (x$1) {
	                  control = x$1;
	                }
	                (Fake = fn()) &&
	                  "function" === typeof Fake.catch &&
	                  Fake.catch(function () {});
	              }
	            } catch (sample) {
	              if (sample && control && "string" === typeof sample.stack)
	                return [sample.stack, control.stack];
	            }
	            return [null, null];
	          }
	        };
	        RunInRootFrame.DetermineComponentFrameRoot.displayName =
	          "DetermineComponentFrameRoot";
	        var namePropDescriptor = Object.getOwnPropertyDescriptor(
	          RunInRootFrame.DetermineComponentFrameRoot,
	          "name"
	        );
	        namePropDescriptor &&
	          namePropDescriptor.configurable &&
	          Object.defineProperty(
	            RunInRootFrame.DetermineComponentFrameRoot,
	            "name",
	            { value: "DetermineComponentFrameRoot" }
	          );
	        var _RunInRootFrame$Deter =
	            RunInRootFrame.DetermineComponentFrameRoot(),
	          sampleStack = _RunInRootFrame$Deter[0],
	          controlStack = _RunInRootFrame$Deter[1];
	        if (sampleStack && controlStack) {
	          var sampleLines = sampleStack.split("\n"),
	            controlLines = controlStack.split("\n");
	          for (
	            _RunInRootFrame$Deter = namePropDescriptor = 0;
	            namePropDescriptor < sampleLines.length &&
	            !sampleLines[namePropDescriptor].includes(
	              "DetermineComponentFrameRoot"
	            );

	          )
	            namePropDescriptor++;
	          for (
	            ;
	            _RunInRootFrame$Deter < controlLines.length &&
	            !controlLines[_RunInRootFrame$Deter].includes(
	              "DetermineComponentFrameRoot"
	            );

	          )
	            _RunInRootFrame$Deter++;
	          if (
	            namePropDescriptor === sampleLines.length ||
	            _RunInRootFrame$Deter === controlLines.length
	          )
	            for (
	              namePropDescriptor = sampleLines.length - 1,
	                _RunInRootFrame$Deter = controlLines.length - 1;
	              1 <= namePropDescriptor &&
	              0 <= _RunInRootFrame$Deter &&
	              sampleLines[namePropDescriptor] !==
	                controlLines[_RunInRootFrame$Deter];

	            )
	              _RunInRootFrame$Deter--;
	          for (
	            ;
	            1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter;
	            namePropDescriptor--, _RunInRootFrame$Deter--
	          )
	            if (
	              sampleLines[namePropDescriptor] !==
	              controlLines[_RunInRootFrame$Deter]
	            ) {
	              if (1 !== namePropDescriptor || 1 !== _RunInRootFrame$Deter) {
	                do
	                  if (
	                    (namePropDescriptor--,
	                    _RunInRootFrame$Deter--,
	                    0 > _RunInRootFrame$Deter ||
	                      sampleLines[namePropDescriptor] !==
	                        controlLines[_RunInRootFrame$Deter])
	                  ) {
	                    var _frame =
	                      "\n" +
	                      sampleLines[namePropDescriptor].replace(
	                        " at new ",
	                        " at "
	                      );
	                    fn.displayName &&
	                      _frame.includes("<anonymous>") &&
	                      (_frame = _frame.replace("<anonymous>", fn.displayName));
	                    "function" === typeof fn &&
	                      componentFrameCache.set(fn, _frame);
	                    return _frame;
	                  }
	                while (1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter);
	              }
	              break;
	            }
	        }
	      } finally {
	        (reentry = false),
	          (ReactSharedInternals.H = previousDispatcher),
	          reenableLogs(),
	          (Error.prepareStackTrace = frame);
	      }
	      sampleLines = (sampleLines = fn ? fn.displayName || fn.name : "")
	        ? describeBuiltInComponentFrame(sampleLines)
	        : "";
	      "function" === typeof fn && componentFrameCache.set(fn, sampleLines);
	      return sampleLines;
	    }
	    function describeUnknownElementTypeFrameInDEV(type) {
	      if (null == type) return "";
	      if ("function" === typeof type) {
	        var prototype = type.prototype;
	        return describeNativeComponentFrame(
	          type,
	          !(!prototype || !prototype.isReactComponent)
	        );
	      }
	      if ("string" === typeof type) return describeBuiltInComponentFrame(type);
	      switch (type) {
	        case REACT_SUSPENSE_TYPE:
	          return describeBuiltInComponentFrame("Suspense");
	        case REACT_SUSPENSE_LIST_TYPE:
	          return describeBuiltInComponentFrame("SuspenseList");
	      }
	      if ("object" === typeof type)
	        switch (type.$$typeof) {
	          case REACT_FORWARD_REF_TYPE:
	            return (type = describeNativeComponentFrame(type.render, false)), type;
	          case REACT_MEMO_TYPE:
	            return describeUnknownElementTypeFrameInDEV(type.type);
	          case REACT_LAZY_TYPE:
	            prototype = type._payload;
	            type = type._init;
	            try {
	              return describeUnknownElementTypeFrameInDEV(type(prototype));
	            } catch (x) {}
	        }
	      return "";
	    }
	    function getOwner() {
	      var dispatcher = ReactSharedInternals.A;
	      return null === dispatcher ? null : dispatcher.getOwner();
	    }
	    function hasValidKey(config) {
	      if (hasOwnProperty.call(config, "key")) {
	        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
	        if (getter && getter.isReactWarning) return false;
	      }
	      return void 0 !== config.key;
	    }
	    function defineKeyPropWarningGetter(props, displayName) {
	      function warnAboutAccessingKey() {
	        specialPropKeyWarningShown ||
	          ((specialPropKeyWarningShown = true),
	          console.error(
	            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
	            displayName
	          ));
	      }
	      warnAboutAccessingKey.isReactWarning = true;
	      Object.defineProperty(props, "key", {
	        get: warnAboutAccessingKey,
	        configurable: true
	      });
	    }
	    function elementRefGetterWithDeprecationWarning() {
	      var componentName = getComponentNameFromType(this.type);
	      didWarnAboutElementRef[componentName] ||
	        ((didWarnAboutElementRef[componentName] = true),
	        console.error(
	          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
	        ));
	      componentName = this.props.ref;
	      return void 0 !== componentName ? componentName : null;
	    }
	    function ReactElement(type, key, self, source, owner, props) {
	      self = props.ref;
	      type = {
	        $$typeof: REACT_ELEMENT_TYPE,
	        type: type,
	        key: key,
	        props: props,
	        _owner: owner
	      };
	      null !== (void 0 !== self ? self : null)
	        ? Object.defineProperty(type, "ref", {
	            enumerable: false,
	            get: elementRefGetterWithDeprecationWarning
	          })
	        : Object.defineProperty(type, "ref", { enumerable: false, value: null });
	      type._store = {};
	      Object.defineProperty(type._store, "validated", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: 0
	      });
	      Object.defineProperty(type, "_debugInfo", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: null
	      });
	      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
	      return type;
	    }
	    function jsxDEVImpl(
	      type,
	      config,
	      maybeKey,
	      isStaticChildren,
	      source,
	      self
	    ) {
	      if (
	        "string" === typeof type ||
	        "function" === typeof type ||
	        type === REACT_FRAGMENT_TYPE ||
	        type === REACT_PROFILER_TYPE ||
	        type === REACT_STRICT_MODE_TYPE ||
	        type === REACT_SUSPENSE_TYPE ||
	        type === REACT_SUSPENSE_LIST_TYPE ||
	        type === REACT_OFFSCREEN_TYPE ||
	        ("object" === typeof type &&
	          null !== type &&
	          (type.$$typeof === REACT_LAZY_TYPE ||
	            type.$$typeof === REACT_MEMO_TYPE ||
	            type.$$typeof === REACT_CONTEXT_TYPE ||
	            type.$$typeof === REACT_CONSUMER_TYPE ||
	            type.$$typeof === REACT_FORWARD_REF_TYPE ||
	            type.$$typeof === REACT_CLIENT_REFERENCE$1 ||
	            void 0 !== type.getModuleId))
	      ) {
	        var children = config.children;
	        if (void 0 !== children)
	          if (isStaticChildren)
	            if (isArrayImpl(children)) {
	              for (
	                isStaticChildren = 0;
	                isStaticChildren < children.length;
	                isStaticChildren++
	              )
	                validateChildKeys(children[isStaticChildren], type);
	              Object.freeze && Object.freeze(children);
	            } else
	              console.error(
	                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
	              );
	          else validateChildKeys(children, type);
	      } else {
	        children = "";
	        if (
	          void 0 === type ||
	          ("object" === typeof type &&
	            null !== type &&
	            0 === Object.keys(type).length)
	        )
	          children +=
	            " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
	        null === type
	          ? (isStaticChildren = "null")
	          : isArrayImpl(type)
	            ? (isStaticChildren = "array")
	            : void 0 !== type && type.$$typeof === REACT_ELEMENT_TYPE
	              ? ((isStaticChildren =
	                  "<" +
	                  (getComponentNameFromType(type.type) || "Unknown") +
	                  " />"),
	                (children =
	                  " Did you accidentally export a JSX literal instead of a component?"))
	              : (isStaticChildren = typeof type);
	        console.error(
	          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
	          isStaticChildren,
	          children
	        );
	      }
	      if (hasOwnProperty.call(config, "key")) {
	        children = getComponentNameFromType(type);
	        var keys = Object.keys(config).filter(function (k) {
	          return "key" !== k;
	        });
	        isStaticChildren =
	          0 < keys.length
	            ? "{key: someKey, " + keys.join(": ..., ") + ": ...}"
	            : "{key: someKey}";
	        didWarnAboutKeySpread[children + isStaticChildren] ||
	          ((keys =
	            0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}"),
	          console.error(
	            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
	            isStaticChildren,
	            children,
	            keys,
	            children
	          ),
	          (didWarnAboutKeySpread[children + isStaticChildren] = true));
	      }
	      children = null;
	      void 0 !== maybeKey &&
	        (checkKeyStringCoercion(maybeKey), (children = "" + maybeKey));
	      hasValidKey(config) &&
	        (checkKeyStringCoercion(config.key), (children = "" + config.key));
	      if ("key" in config) {
	        maybeKey = {};
	        for (var propName in config)
	          "key" !== propName && (maybeKey[propName] = config[propName]);
	      } else maybeKey = config;
	      children &&
	        defineKeyPropWarningGetter(
	          maybeKey,
	          "function" === typeof type
	            ? type.displayName || type.name || "Unknown"
	            : type
	        );
	      return ReactElement(type, children, self, source, getOwner(), maybeKey);
	    }
	    function validateChildKeys(node, parentType) {
	      if (
	        "object" === typeof node &&
	        node &&
	        node.$$typeof !== REACT_CLIENT_REFERENCE
	      )
	        if (isArrayImpl(node))
	          for (var i = 0; i < node.length; i++) {
	            var child = node[i];
	            isValidElement(child) && validateExplicitKey(child, parentType);
	          }
	        else if (isValidElement(node))
	          node._store && (node._store.validated = 1);
	        else if (
	          (null === node || "object" !== typeof node
	            ? (i = null)
	            : ((i =
	                (MAYBE_ITERATOR_SYMBOL && node[MAYBE_ITERATOR_SYMBOL]) ||
	                node["@@iterator"]),
	              (i = "function" === typeof i ? i : null)),
	          "function" === typeof i &&
	            i !== node.entries &&
	            ((i = i.call(node)), i !== node))
	        )
	          for (; !(node = i.next()).done; )
	            isValidElement(node.value) &&
	              validateExplicitKey(node.value, parentType);
	    }
	    function isValidElement(object) {
	      return (
	        "object" === typeof object &&
	        null !== object &&
	        object.$$typeof === REACT_ELEMENT_TYPE
	      );
	    }
	    function validateExplicitKey(element, parentType) {
	      if (
	        element._store &&
	        !element._store.validated &&
	        null == element.key &&
	        ((element._store.validated = 1),
	        (parentType = getCurrentComponentErrorInfo(parentType)),
	        !ownerHasKeyUseWarning[parentType])
	      ) {
	        ownerHasKeyUseWarning[parentType] = true;
	        var childOwner = "";
	        element &&
	          null != element._owner &&
	          element._owner !== getOwner() &&
	          ((childOwner = null),
	          "number" === typeof element._owner.tag
	            ? (childOwner = getComponentNameFromType(element._owner.type))
	            : "string" === typeof element._owner.name &&
	              (childOwner = element._owner.name),
	          (childOwner = " It was passed a child from " + childOwner + "."));
	        var prevGetCurrentStack = ReactSharedInternals.getCurrentStack;
	        ReactSharedInternals.getCurrentStack = function () {
	          var stack = describeUnknownElementTypeFrameInDEV(element.type);
	          prevGetCurrentStack && (stack += prevGetCurrentStack() || "");
	          return stack;
	        };
	        console.error(
	          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
	          parentType,
	          childOwner
	        );
	        ReactSharedInternals.getCurrentStack = prevGetCurrentStack;
	      }
	    }
	    function getCurrentComponentErrorInfo(parentType) {
	      var info = "",
	        owner = getOwner();
	      owner &&
	        (owner = getComponentNameFromType(owner.type)) &&
	        (info = "\n\nCheck the render method of `" + owner + "`.");
	      info ||
	        ((parentType = getComponentNameFromType(parentType)) &&
	          (info =
	            "\n\nCheck the top-level render call using <" + parentType + ">."));
	      return info;
	    }
	    var React = require$$0,
	      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
	      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
	      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
	      REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
	      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
	      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
	      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
	      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
	      REACT_MEMO_TYPE = Symbol.for("react.memo"),
	      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
	      REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"),
	      MAYBE_ITERATOR_SYMBOL = Symbol.iterator,
	      REACT_CLIENT_REFERENCE$2 = Symbol.for("react.client.reference"),
	      ReactSharedInternals =
	        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
	      hasOwnProperty = Object.prototype.hasOwnProperty,
	      assign = Object.assign,
	      REACT_CLIENT_REFERENCE$1 = Symbol.for("react.client.reference"),
	      isArrayImpl = Array.isArray,
	      disabledDepth = 0,
	      prevLog,
	      prevInfo,
	      prevWarn,
	      prevError,
	      prevGroup,
	      prevGroupCollapsed,
	      prevGroupEnd;
	    disabledLog.__reactDisabledLog = true;
	    var prefix,
	      suffix,
	      reentry = false;
	    var componentFrameCache = new (
	      "function" === typeof WeakMap ? WeakMap : Map
	    )();
	    var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
	      specialPropKeyWarningShown;
	    var didWarnAboutElementRef = {};
	    var didWarnAboutKeySpread = {},
	      ownerHasKeyUseWarning = {};
	    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	    reactJsxRuntime_development.jsx = function (type, config, maybeKey, source, self) {
	      return jsxDEVImpl(type, config, maybeKey, false, source, self);
	    };
	    reactJsxRuntime_development.jsxs = function (type, config, maybeKey, source, self) {
	      return jsxDEVImpl(type, config, maybeKey, true, source, self);
	    };
	  })();
	return reactJsxRuntime_development;
}

if (process.env.NODE_ENV === 'production') {
  jsxRuntime.exports = requireReactJsxRuntime_production();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}

var jsxRuntimeExports = jsxRuntime.exports;

const ArrowButtons = (props) => {
    const { nextArrow, prevArrow, currentIndex, itemCount, prevCard, nextCard } = props;
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("button", { className: `cardCarousel-arrow prev-button ${currentIndex === 0 ? 'disabled' : 'active'}`, onClick: prevCard, children: jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: prevArrow || jsxRuntimeExports.jsx("span", { className: "cardCarousel-arrow-inner" }) }) }), jsxRuntimeExports.jsx("button", { className: `cardCarousel-arrow next-button ${currentIndex === itemCount ? 'disabled' : 'active'}`, onClick: nextCard, children: jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: nextArrow || jsxRuntimeExports.jsx("span", { className: "cardCarousel-arrow-inner" }) }) })] }));
};

const Pagination = (props) => {
    const { itemCount, currentIndex, goToCard } = props;
    const paginationItems = [];
    for (let index = 0; index <= itemCount; index++) {
        paginationItems.push(jsxRuntimeExports.jsx("button", { onClick: () => goToCard(index), className: `cardCarousel-pagination-button ${currentIndex === index ? 'active' : ''}` }, index));
    }
    return (jsxRuntimeExports.jsx("div", { className: "cardCarousel-pagination", children: paginationItems }));
};

// ////////////////////////////////////////////////////////////////////////
// Legacy, however keeping in case it is resurrected in a future build
// ////////////////////////////////////////////////////////////////////////
// // Is the current item in view, checking the left and right borders of an item relative to the viewbox
// export const itemInView = (currentItemBox:DOMRect, viewBox:DOMRect, buffer:number=0): boolean => {
//   if (!currentItemBox || !viewBox) return
//   return (currentItemBox.left > (viewBox.left - buffer)) && (currentItemBox.right < (viewBox.right + buffer))
// }
// ////////////////////////////////////////////////////////////////////////
// Get value of how far to move, and if the start/end have been reached
// ////////////////////////////////////////////////////////////////////////
const getMoveVal = (item, itemsWrapper, viewBox, dir = 'next') => {
    if (!item || !(item instanceof HTMLElement) || !(itemsWrapper instanceof HTMLElement) || !viewBox)
        return;
    const itemsBox = itemsWrapper.getBoundingClientRect();
    const maxLeft = 0;
    const maxRight = (itemsBox.width - viewBox.width) * -1;
    const returnObj = {
        moveVal: 0,
        atStart: false,
        atEnd: false
    };
    if (dir === 'next') {
        returnObj.moveVal = item.offsetLeft * -1;
        if (itemsBox.width - item.offsetLeft <= viewBox.width) {
            returnObj.moveVal = maxRight;
            returnObj.atEnd = true;
        }
    }
    if (dir === 'prev') {
        returnObj.moveVal = (item.offsetLeft - viewBox.width + item.offsetWidth) * -1;
        if ((item.offsetLeft - viewBox.width + item.offsetWidth) * -1 >= 0) {
            returnObj.moveVal = maxLeft;
            returnObj.atStart = true;
        }
    }
    return returnObj;
};
// ////////////////////////////////////////////////////////////////////////
// Get distance to move when items are set to centerMode
// ////////////////////////////////////////////////////////////////////////
const getCenterMoveVal = (item, viewBox) => {
    if (!item || !(item instanceof HTMLElement) || !viewBox)
        return;
    const centerPoint = viewBox.width * 0.5;
    const itemCenterPoint = item.offsetLeft + (item.offsetWidth * 0.5);
    return centerPoint - itemCenterPoint;
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".cardCarousel {\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  overflow: hidden;\n}\n.cardCarousel.resizing * {\n  transition: none !important;\n  animation: none !important;\n}\n.cardCarousel .cardCarousel-arrow,\n.cardCarousel .cardCarousel-pagination-button {\n  cursor: pointer;\n  padding: 0;\n  border: none;\n  outline: none;\n  background: none;\n}\n\n.cardCarousel-inner {\n  position: relative;\n}\n\n.cardCarousel-items {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.cardCarousel-items.itemsContained {\n  margin: 0 auto;\n}\n\n.cardCarousel-item-content {\n  width: auto;\n  display: inline-block;\n  overflow: hidden;\n  max-width: 100vw;\n}\n\n.cardCarousel-arrow {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: 10;\n  opacity: 1;\n  visibility: visible;\n  transition: all 400ms ease-out;\n}\n.cardCarousel-arrow.disabled {\n  opacity: 0;\n  visibility: hidden;\n}\n.cardCarousel-arrow:hover .cardCarousel-arrow-inner {\n  background-color: black;\n}\n.cardCarousel-arrow:hover .cardCarousel-arrow-inner:before {\n  border-color: white;\n}\n\n.cardCarousel-arrow-inner {\n  display: flex;\n  width: 60px;\n  height: 60px;\n  border-radius: 30px;\n  background-color: white;\n  position: relative;\n  transition: all 300ms ease-out;\n}\n.cardCarousel-arrow-inner:before {\n  content: \"\";\n  display: block;\n  margin: auto auto auto 20px;\n  width: 12px;\n  height: 12px;\n  border-top: 2px solid black;\n  border-right: 2px solid black;\n  transform: rotate(45deg);\n  transition: all 300ms ease-out;\n}\n\n.prev-button {\n  left: 20px;\n}\n.prev-button .cardCarousel-arrow-inner {\n  transform: rotate(180deg);\n}\n@media screen and (min-width: 768px) {\n  .prev-button {\n    left: 50px;\n  }\n}\n\n.next-button {\n  right: 20px;\n}\n@media screen and (min-width: 768px) {\n  .next-button {\n    right: 50px;\n  }\n}\n\n.cardCarousel-pagination {\n  width: auto;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 10px;\n  position: relative;\n  margin: 40px auto 0;\n}\n.cardCarousel-pagination .cardCarousel-pagination-button {\n  display: block;\n  width: 10px;\n  height: 10px;\n  border-radius: 5px;\n  border: 1px solid black;\n  background-color: transparent;\n  transition: all 300ms ease-out;\n}\n.cardCarousel-pagination .cardCarousel-pagination-button.active, .cardCarousel-pagination .cardCarousel-pagination-button:hover {\n  background-color: black;\n}";
styleInject(css_248z);

const CardCarousel = require$$0.forwardRef((props, carouselRef) => {
    const { children, settings } = props;
    const defaultSettings = {
        // Presentation settings
        gap: 20, // gap size between each card/silde (px)
        padding: 50, // padding either side of the viewbox.
        cardsToShow: 0, // Defines the width of each card, if set to 0 the width will be inherited from the each cards children
        transitionSpeed: 300, // speed for transitions (ms)
        // Control settings
        centerMode: false,
        yieldToImages: false,
        pagination: false,
        touchControls: true,
        arrows: true, // enable or disable arrows
        nextArrow: null, // provide custom markup for the next button
        prevArrow: null, // provide custom markup for the prev button
        // Events
        beforeChange: null, // fires just before change
        afterChange: null, // fires just after change
        onTouchStart: null, // fires just after touch start
        onTouchMove: null, // fires just after touch move
        onTouchEnd: null, // fires just after touch end
    };
    const [config, setConfig] = require$$0.useState(Object.assign(Object.assign({}, defaultSettings), settings));
    // State
    const [touchX, setTouchX] = require$$0.useState(0);
    const [itemsContained, setItemsContained] = require$$0.useState(true); // Are the items contained within the items wrapper?
    const [itemWidth, setItemWidth] = require$$0.useState(0);
    const [isResizing, setIsResizing] = require$$0.useState(false);
    const [itemsWrapperWidth, setItemsWrapperWidth] = require$$0.useState(0);
    const [currentIndex, setCurrentIndex] = require$$0.useState(0);
    const [itemCount, setItemCount] = require$$0.useState(0);
    const [imagesLoaded, setImagesLoaded] = require$$0.useState(false);
    const [animateTransition, setAnimateTransition] = require$$0.useState(false);
    const [scrolling, setScrolling] = require$$0.useState(false);
    const [swiping, setSwiping] = require$$0.useState(false);
    // Refs
    const resizeTimer = require$$0.useRef(null);
    const previousWindowWidth = require$$0.useRef(0);
    const carouselItemsRef = require$$0.useRef(null);
    const carouselWrapperRef = require$$0.useRef(null);
    const offsetRef = require$$0.useRef(0);
    require$$0.useMemo(() => {
        setConfig(Object.assign(Object.assign({}, defaultSettings), settings));
    }, [settings]);
    require$$0.useEffect(() => {
        if (!(children === null || children === void 0 ? void 0 : children.length))
            return;
        if (itemCount !== children.length - 1) {
            setItemCount(children.length - 1);
        }
    }, [children]);
    // Animate to item
    require$$0.useEffect(() => {
        if (animateTransition) {
            scrub(`${offsetRef.current}px`);
            setTimeout(() => { setAnimateTransition(false); }, config.transitionSpeed);
        }
    }, [animateTransition, config.transitionSpeed]);
    // Set inital width for the carousel items
    require$$0.useEffect(() => {
        if (itemCount !== 0 && itemsWrapperWidth === 0) {
            getItemsWrapperWidth();
        }
    }, [carouselItemsRef.current, itemCount]);
    // Run checks to reposition the carousel items on width change
    require$$0.useEffect(() => {
        !isResizing && itemsWrapperWidth !== 0 && updateCarouselPosition();
    }, [
        isResizing,
        itemsWrapperWidth
    ]);
    // Run checks to resize and reposition the carousel on config changes
    require$$0.useEffect(() => {
        getItemsWrapperWidth();
        updateCarouselPosition();
    }, [
        itemCount,
        config.gap,
        config.padding,
        config.cardsToShow,
        config.centerMode,
        config.yieldToImages
    ]);
    // Set inital width for each card, if applicable
    require$$0.useEffect(() => {
        if (config.cardsToShow !== 0 && itemWidth === 0) {
            getItemWidth();
        }
    }, [carouselWrapperRef.current]);
    // Add window resize listener
    require$$0.useEffect(() => {
        window.addEventListener('resize', handleResize);
        previousWindowWidth.current = window.innerWidth;
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [typeof window !== undefined, imagesLoaded, itemCount]);
    // Handle resize of browser window
    const handleResize = () => {
        clearTimeout(resizeTimer.current);
        // Only handle resize if the width has changed, we don't care about the height.
        // Mainly a fix for iOS Safari and mobile browsers which change browser height on scroll.
        // Lock the width, height and position of certain elements to ensure resizing doesn't
        // mess with the page layout.
        if (window.innerWidth !== previousWindowWidth.current) {
            const currentCarouselWrapper = carouselWrapperRef.current.getBoundingClientRect();
            carouselWrapperRef.current.style.width = `${currentCarouselWrapper.width}px`;
            carouselWrapperRef.current.style.height = `${currentCarouselWrapper.height}px`;
            carouselItemsRef.current.style.position = 'absolute';
            setItemsWrapperWidth(99999);
            setIsResizing(true);
            previousWindowWidth.current = window.innerWidth;
            // Reset everything once resizing has finished.
            resizeTimer.current = setTimeout(() => {
                carouselItemsRef.current.style.removeProperty('position');
                carouselWrapperRef.current.style.removeProperty('width');
                carouselWrapperRef.current.style.removeProperty('height');
                setIsResizing(false);
                getItemWidth();
                getItemsWrapperWidth();
                resizeTimer.current = null;
            }, 500);
        }
    };
    // /////////////////////////////////
    // WIP - Tidy up reset on resize
    // /////////////////////////////////
    const updateCarouselPosition = () => {
        var _a, _b;
        const itemsBox = (_a = carouselItemsRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        const wrapperBox = (_b = carouselWrapperRef.current) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
        // Only enable controls if the items container is larger than the wrapper.
        setItemsContained((itemsBox === null || itemsBox === void 0 ? void 0 : itemsBox.width) <= (wrapperBox === null || wrapperBox === void 0 ? void 0 : wrapperBox.width));
        snapToItem(0);
    };
    require$$0.useEffect(() => {
        itemsContained && scrub(0);
    }, [itemsContained]);
    // If cardsToShow has been set, calculate the width of each item based on the viewBox size.
    const getItemWidth = () => {
        var _a;
        const wrapperBox = (_a = carouselWrapperRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        if (config.cardsToShow !== 0 && carouselWrapperRef.current) {
            setItemWidth(wrapperBox.width / config.cardsToShow);
        }
    };
    // Check for the presense of images in the card content,
    // wait for them to load before calculating width of cards.
    const checkIfCardImagesLoaded = (element) => {
        const hasImages = element.querySelectorAll('img');
        if (!hasImages || typeof hasImages !== 'object')
            return Promise.resolve(true);
        return Promise.all(Array.from(hasImages).map((img) => {
            return new Promise(resolve => {
                if (img.complete)
                    resolve(1);
                img.onload = img.onerror = resolve;
            });
        }));
    };
    // Get the inital wrapper width based on the width of all children with their associated padding values
    const getItemsWrapperWidth = () => {
        if (!carouselItemsRef.current)
            return;
        const carouselChildren = carouselItemsRef.current.children;
        const paddingWidth = config.gap * itemCount;
        if (carouselChildren) {
            let carouselWidth = 0;
            const processWidth = (child) => {
                const firstChild = child.children[0];
                const childWidth = firstChild === null || firstChild === void 0 ? void 0 : firstChild.offsetWidth;
                carouselWidth += config.cardsToShow > 0 ? itemWidth : childWidth;
            };
            if (config.yieldToImages && !imagesLoaded) {
                Promise.all(Array.from(carouselChildren).map((child) => checkIfCardImagesLoaded(child).then(() => {
                    processWidth(child);
                }))).then(() => {
                    setImagesLoaded(true);
                    setItemsWrapperWidth(carouselWidth + paddingWidth);
                });
            }
            else {
                Array.from(carouselChildren).map((child) => {
                    processWidth(child);
                });
                setItemsWrapperWidth(carouselWidth + paddingWidth);
            }
        }
    };
    const snapToItem = (index) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let newOffset = 0;
        // Check if we are at the start of the list and haven't changed index,
        // if so just center to 0 and return.
        if (currentIndex === index && currentIndex === 0 && !config.centerMode) {
            offsetRef.current = newOffset;
            setAnimateTransition(true);
            return;
        }
        const dir = index >= currentIndex ? 'next' : 'prev';
        const targetItem = carouselItemsRef.current.children.item(index);
        if (!targetItem)
            return;
        const wrapperBox = (_a = carouselWrapperRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        // trigger beforeChange listener
        config.beforeChange && currentIndex !== index && config.beforeChange(currentIndex, index);
        if (config.centerMode) {
            // Get move calculation for centerMode
            newOffset = yield getCenterMoveVal(targetItem, wrapperBox);
        }
        else {
            // Get move calculation where not centerMode
            const { moveVal, atStart, atEnd } = yield getMoveVal(targetItem, carouselItemsRef.current, wrapperBox, dir);
            newOffset = moveVal;
            // Update offset.
            if (atStart) {
                index = 0;
            }
            else if (atEnd) {
                index = itemCount;
            }
        }
        offsetRef.current = newOffset;
        setAnimateTransition(true);
        setCurrentIndex(index);
        config.afterChange && currentIndex !== index && config.afterChange(index);
    });
    // //////////////////////////////////////////////////////¿
    // Touch Controls
    // //////////////////////////////////////////////////////¿
    const handleTouchStart = (e) => {
        var _a, _b;
        if (!config.touchControls || scrolling)
            return;
        const _touchX = (_a = e.x) !== null && _a !== void 0 ? _a : (_b = e === null || e === void 0 ? void 0 : e.changedTouches[0]) === null || _b === void 0 ? void 0 : _b.clientX; // desktop event props ?? mobile (touch) event props
        setTouchX(_touchX);
        config.onTouchStart && config.onTouchStart(_touchX);
    };
    const handleTouchMove = (e) => {
        var _a, _b;
        if (!config.touchControls || scrolling)
            return;
        const _eX = (_a = e.x) !== null && _a !== void 0 ? _a : (_b = e === null || e === void 0 ? void 0 : e.changedTouches[0]) === null || _b === void 0 ? void 0 : _b.clientX; // desktop event props ?? mobile (touch) event props
        const _touchDelta = _eX - touchX;
        config.onTouchMove && config.onTouchMove(_touchDelta);
        // If the user has interacted with the carousel, set swiping to true
        if (Math.abs(_touchDelta) > 5) {
            setSwiping(true);
        }
        scrub(`${offsetRef.current + (_touchDelta * 1.25)}px`);
    };
    const handleTouchEnd = () => {
        // Release the scroll back to the body and remove swiping state
        setScrolling(false);
        setSwiping(false);
        if (!config.touchControls)
            return;
        config.onTouchEnd && config.onTouchEnd();
        checkActiveItem();
    };
    // Window touch listeners to disable scroll if user
    // interacts with the carousel
    let winTSY = 0;
    const winTSListener = (e) => { var _a; winTSY = (_a = e === null || e === void 0 ? void 0 : e.changedTouches[0]) === null || _a === void 0 ? void 0 : _a.clientY; };
    const winTMListener = (e) => {
        var _a;
        if (swiping) {
            e.preventDefault();
            return false;
        }
        const winTMY = (_a = e === null || e === void 0 ? void 0 : e.changedTouches[0]) === null || _a === void 0 ? void 0 : _a.clientY;
        if (Math.abs(winTSY - winTMY) > 5) {
            setScrolling(true);
        }
    };
    const winTEListener = (e) => {
        setScrolling(false);
        setSwiping(false);
    };
    // Bind/unBind touch events to window
    require$$0.useEffect(() => {
        window.addEventListener('touchstart', winTSListener);
        window.addEventListener('touchmove', winTMListener, { passive: false });
        window.addEventListener('touchend', winTEListener);
        return () => {
            window.removeEventListener('touchstart', winTSListener);
            window.removeEventListener('touchmove', winTMListener);
            window.removeEventListener('touchend', winTEListener);
        };
    }, [swiping]);
    // Handle move transform
    const scrub = (val) => {
        if (itemsContained || resizeTimer.current !== null)
            val = 0;
        carouselItemsRef.current.style.transform = `translateX(${val})`;
    };
    // Check which item is currently front and center
    const checkActiveItem = (callback) => {
        var _a;
        const wrapperBox = (_a = carouselWrapperRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        const scrollItems = carouselItemsRef.current.children;
        const centerPoint = wrapperBox.width / 2;
        const centerPointBuffer = config.gap / 2;
        // Itterate over each child and check it's position
        Array.from(scrollItems).map((child, index) => {
            const childRect = child.getBoundingClientRect();
            // If the childs left bounds are less than the center point and right bounds are greater than
            // the center point, we've found our star!
            if ((childRect.left - wrapperBox.left - centerPointBuffer <= centerPoint &&
                childRect.right - wrapperBox.left + centerPointBuffer >= centerPoint)
                ||
                    (childRect.left > centerPoint && 0 === index) // check for first item
                ||
                    (childRect.right < centerPoint && itemCount === index) // check for last item
            ) {
                snapToItem(index);
            }
        });
    };
    // Generic movement function called by next / prev movement interactions.
    const handleMoveInteract = (dir) => {
        let changedIndex = 0;
        if (dir === 'next') {
            changedIndex = currentIndex + 1 < itemCount ? currentIndex + 1 : itemCount;
        }
        else {
            changedIndex = currentIndex - 1 > 0 ? currentIndex - 1 : 0;
        }
        return snapToItem(changedIndex);
    };
    // //////////////////////////////////////////////////////¿
    // Interaction functions
    // //////////////////////////////////////////////////////¿
    const nextCard = () => handleMoveInteract('next');
    const prevCard = () => handleMoveInteract('prev');
    const goToCard = (index) => {
        if (!carouselItemsRef.current ||
            !carouselWrapperRef.current)
            return;
        snapToItem(index);
    };
    // Pass functions to external
    require$$0.useImperativeHandle(carouselRef, () => ({
        nextCard,
        prevCard,
        goToCard: (index) => goToCard(index),
        getCurrentIndex: () => { return currentIndex; }
    }));
    if (!(children === null || children === void 0 ? void 0 : children.length) || (children === null || children === void 0 ? void 0 : children.length) < 1)
        return null;
    // //////////////////////////////////////////////////////¿
    // Main Carousel markup
    // //////////////////////////////////////////////////////¿
    return (jsxRuntimeExports.jsxs("div", { className: `cardCarousel ${isResizing ? 'resizing' : ''} ${itemsWrapperWidth !== 0 ? 'show' : ''}`, style: { "padding": `0 ${config.padding}px` }, children: [jsxRuntimeExports.jsx("div", { className: "cardCarousel-inner", ref: carouselWrapperRef, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, children: jsxRuntimeExports.jsx("div", { ref: carouselItemsRef, className: `cardCarousel-items ${config.centerMode ? 'itemsContained' : ''}`, style: {
                        "display": "flex", // Here as a placeholder value so that rendering is correct if a delay in loading styles occurs
                        "alignItems": "center", // Here as a placeholder value so that rendering is correct if a delay in loading styles occurs
                        "width": itemsWrapperWidth !== 0 ? `${itemsWrapperWidth}px` : '99999px',
                        "gap": `${config.gap}px`,
                        "transition": animateTransition ? `transform ease-in-out ${config.transitionSpeed}ms` : ''
                    }, children: children === null || children === void 0 ? void 0 : children.map((child, key) => {
                        return (jsxRuntimeExports.jsx("div", { className: "cardCarousel-item-content", "data-active": key === currentIndex, style: itemWidth ? { "width": `${itemWidth}px` } : {}, children: child }, key));
                    }) }) }), !itemsContained &&
                jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [config.pagination &&
                            jsxRuntimeExports.jsx(Pagination, { currentIndex: currentIndex, itemCount: itemCount, goToCard: goToCard }), config.arrows &&
                            jsxRuntimeExports.jsx(ArrowButtons, { nextArrow: config.nextArrow, prevArrow: config.prevArrow, currentIndex: currentIndex, prevCard: prevCard, itemCount: itemCount, nextCard: nextCard })] })] }));
});

module.exports = CardCarousel;
