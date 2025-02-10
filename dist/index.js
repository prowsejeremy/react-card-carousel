"use strict";var e=require("react");function n(e,n,t,r){return new(t||(t=Promise))((function(o,a){function i(e){try{s(r.next(e))}catch(e){a(e)}}function l(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(i,l)}s((r=r.apply(e,n||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;var t,r={exports:{}},o={};var a,i={};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */"production"===process.env.NODE_ENV?r.exports=function(){if(t)return o;t=1;var e=Symbol.for("react.transitional.element"),n=Symbol.for("react.fragment");function r(n,t,r){var o=null;if(void 0!==r&&(o=""+r),void 0!==t.key&&(o=""+t.key),"key"in t)for(var a in r={},t)"key"!==a&&(r[a]=t[a]);else r=t;return t=r.ref,{$$typeof:e,type:n,key:o,ref:void 0!==t?t:null,props:r}}return o.Fragment=n,o.jsx=r,o.jsxs=r,o}():r.exports=(a||(a=1,"production"!==process.env.NODE_ENV&&function(){function n(e){if(null==e)return null;if("function"==typeof e)return e.$$typeof===D?null:e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case j:return"Fragment";case k:return"Portal";case T:return"Profiler";case E:return"StrictMode";case O:return"Suspense";case N:return"SuspenseList"}if("object"==typeof e)switch("number"==typeof e.tag&&console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),e.$$typeof){case $:return(e.displayName||"Context")+".Provider";case R:return(e._context.displayName||"Context")+".Consumer";case _:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case P:return null!==(t=e.displayName||null)?t:n(e.type)||"Memo";case A:t=e._payload,e=e._init;try{return n(e(t))}catch(e){}}return null}function t(e){return""+e}function r(e){try{t(e);var n=!1}catch(e){n=!0}if(n){var r=(n=console).error,o="function"==typeof Symbol&&Symbol.toStringTag&&e[Symbol.toStringTag]||e.constructor.name||"Object";return r.call(n,"The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",o),t(e)}}function o(){}function a(e){if(void 0===H)try{throw Error()}catch(e){var n=e.stack.trim().match(/\n( *(at )?)/);H=n&&n[1]||"",X=-1<e.stack.indexOf("\n    at")?" (<anonymous>)":-1<e.stack.indexOf("@")?"@unknown:0:0":""}return"\n"+H+e+X}function l(e,n){if(!e||Y)return"";var t,r=J.get(e);if(void 0!==r)return r;Y=!0,r=Error.prepareStackTrace,Error.prepareStackTrace=void 0,t=F.H,F.H=null,function(){if(0===V){y=console.log,h=console.info,v=console.warn,g=console.error,b=console.group,w=console.groupCollapsed,x=console.groupEnd;var e={configurable:!0,enumerable:!0,value:o,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}V++}();try{var i={DetermineComponentFrameRoot:function(){try{if(n){var t=function(){throw Error()};if(Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(e){var r=e}Reflect.construct(e,[],t)}else{try{t.call()}catch(e){r=e}e.call(t.prototype)}}else{try{throw Error()}catch(e){r=e}(t=e())&&"function"==typeof t.catch&&t.catch((function(){}))}}catch(e){if(e&&r&&"string"==typeof e.stack)return[e.stack,r.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=i.DetermineComponentFrameRoot(),c=s[0],u=s[1];if(c&&u){var d=c.split("\n"),f=u.split("\n");for(s=l=0;l<d.length&&!d[l].includes("DetermineComponentFrameRoot");)l++;for(;s<f.length&&!f[s].includes("DetermineComponentFrameRoot");)s++;if(l===d.length||s===f.length)for(l=d.length-1,s=f.length-1;1<=l&&0<=s&&d[l]!==f[s];)s--;for(;1<=l&&0<=s;l--,s--)if(d[l]!==f[s]){if(1!==l||1!==s)do{if(l--,0>--s||d[l]!==f[s]){var p="\n"+d[l].replace(" at new "," at ");return e.displayName&&p.includes("<anonymous>")&&(p=p.replace("<anonymous>",e.displayName)),"function"==typeof e&&J.set(e,p),p}}while(1<=l&&0<=s);break}}}finally{Y=!1,F.H=t,function(){if(0==--V){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:z({},e,{value:y}),info:z({},e,{value:h}),warn:z({},e,{value:v}),error:z({},e,{value:g}),group:z({},e,{value:b}),groupCollapsed:z({},e,{value:w}),groupEnd:z({},e,{value:x})})}0>V&&console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}(),Error.prepareStackTrace=r}return d=(d=e?e.displayName||e.name:"")?a(d):"","function"==typeof e&&J.set(e,d),d}function s(e){if(null==e)return"";if("function"==typeof e){var n=e.prototype;return l(e,!(!n||!n.isReactComponent))}if("string"==typeof e)return a(e);switch(e){case O:return a("Suspense");case N:return a("SuspenseList")}if("object"==typeof e)switch(e.$$typeof){case _:return l(e.render,!1);case P:return s(e.type);case A:n=e._payload,e=e._init;try{return s(e(n))}catch(e){}}return""}function c(){var e=F.A;return null===e?null:e.getOwner()}function u(){var e=n(this.type);return K[e]||(K[e]=!0,console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")),void 0!==(e=this.props.ref)?e:null}function d(e,t,o,a,i,l){if("string"==typeof e||"function"==typeof e||e===j||e===T||e===E||e===O||e===N||e===L||"object"==typeof e&&null!==e&&(e.$$typeof===A||e.$$typeof===P||e.$$typeof===$||e.$$typeof===R||e.$$typeof===_||e.$$typeof===W||void 0!==e.getModuleId)){var s=t.children;if(void 0!==s)if(a)if(B(s)){for(a=0;a<s.length;a++)f(s[a],e);Object.freeze&&Object.freeze(s)}else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else f(s,e)}else s="",(void 0===e||"object"==typeof e&&null!==e&&0===Object.keys(e).length)&&(s+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."),null===e?a="null":B(e)?a="array":void 0!==e&&e.$$typeof===S?(a="<"+(n(e.type)||"Unknown")+" />",s=" Did you accidentally export a JSX literal instead of a component?"):a=typeof e,console.error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",a,s);if(I.call(t,"key")){s=n(e);var d=Object.keys(t).filter((function(e){return"key"!==e}));a=0<d.length?"{key: someKey, "+d.join(": ..., ")+": ...}":"{key: someKey}",G[s+a]||(d=0<d.length?"{"+d.join(": ..., ")+": ...}":"{}",console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',a,s,d,s),G[s+a]=!0)}if(s=null,void 0!==o&&(r(o),s=""+o),function(e){if(I.call(e,"key")){var n=Object.getOwnPropertyDescriptor(e,"key").get;if(n&&n.isReactWarning)return!1}return void 0!==e.key}(t)&&(r(t.key),s=""+t.key),"key"in t)for(var p in o={},t)"key"!==p&&(o[p]=t[p]);else o=t;return s&&function(e,n){function t(){U||(U=!0,console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",n))}t.isReactWarning=!0,Object.defineProperty(e,"key",{get:t,configurable:!0})}(o,"function"==typeof e?e.displayName||e.name||"Unknown":e),function(e,n,t,r,o,a){return t=a.ref,e={$$typeof:S,type:e,key:n,props:a,_owner:o},null!==(void 0!==t?t:null)?Object.defineProperty(e,"ref",{enumerable:!1,get:u}):Object.defineProperty(e,"ref",{enumerable:!1,value:null}),e._store={},Object.defineProperty(e._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:0}),Object.defineProperty(e,"_debugInfo",{configurable:!1,enumerable:!1,writable:!0,value:null}),Object.freeze&&(Object.freeze(e.props),Object.freeze(e)),e}(e,s,l,0,c(),o)}function f(e,n){if("object"==typeof e&&e&&e.$$typeof!==q)if(B(e))for(var t=0;t<e.length;t++){var r=e[t];p(r)&&m(r,n)}else if(p(e))e._store&&(e._store.validated=1);else if("function"==typeof(t=null===e||"object"!=typeof e?null:"function"==typeof(t=M&&e[M]||e["@@iterator"])?t:null)&&t!==e.entries&&(t=t.call(e))!==e)for(;!(e=t.next()).done;)p(e.value)&&m(e.value,n)}function p(e){return"object"==typeof e&&null!==e&&e.$$typeof===S}function m(e,t){if(e._store&&!e._store.validated&&null==e.key&&(e._store.validated=1,t=function(e){var t="",r=c();return r&&(r=n(r.type))&&(t="\n\nCheck the render method of `"+r+"`."),t||(e=n(e))&&(t="\n\nCheck the top-level render call using <"+e+">."),t}(t),!Q[t])){Q[t]=!0;var r="";e&&null!=e._owner&&e._owner!==c()&&(r=null,"number"==typeof e._owner.tag?r=n(e._owner.type):"string"==typeof e._owner.name&&(r=e._owner.name),r=" It was passed a child from "+r+".");var o=F.getCurrentStack;F.getCurrentStack=function(){var n=s(e.type);return o&&(n+=o()||""),n},console.error('Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',t,r),F.getCurrentStack=o}}var y,h,v,g,b,w,x,C=e,S=Symbol.for("react.transitional.element"),k=Symbol.for("react.portal"),j=Symbol.for("react.fragment"),E=Symbol.for("react.strict_mode"),T=Symbol.for("react.profiler"),R=Symbol.for("react.consumer"),$=Symbol.for("react.context"),_=Symbol.for("react.forward_ref"),O=Symbol.for("react.suspense"),N=Symbol.for("react.suspense_list"),P=Symbol.for("react.memo"),A=Symbol.for("react.lazy"),L=Symbol.for("react.offscreen"),M=Symbol.iterator,D=Symbol.for("react.client.reference"),F=C.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,I=Object.prototype.hasOwnProperty,z=Object.assign,W=Symbol.for("react.client.reference"),B=Array.isArray,V=0;o.__reactDisabledLog=!0;var H,X,U,Y=!1,J=new("function"==typeof WeakMap?WeakMap:Map),q=Symbol.for("react.client.reference"),K={},G={},Q={};i.Fragment=j,i.jsx=function(e,n,t,r,o){return d(e,n,t,!1,0,o)},i.jsxs=function(e,n,t,r,o){return d(e,n,t,!0,0,o)}}()),i);var l=r.exports;const s=e=>{const{nextArrow:n,prevArrow:t,currentIndex:r,itemCount:o,prevCard:a,nextCard:i}=e;return l.jsxs(l.Fragment,{children:[l.jsx("button",{className:"cardCarousel-arrow prev-button "+(0===r?"disabled":"active"),onClick:a,children:l.jsx(l.Fragment,{children:t||l.jsx("span",{className:"cardCarousel-arrow-inner"})})}),l.jsx("button",{className:"cardCarousel-arrow next-button "+(r===o?"disabled":"active"),onClick:i,children:l.jsx(l.Fragment,{children:n||l.jsx("span",{className:"cardCarousel-arrow-inner"})})})]})},c=e=>{const{itemCount:n,currentIndex:t,goToCard:r}=e,o=[];for(let e=0;e<=n;e++)o.push(l.jsx("button",{onClick:()=>r(e),className:"cardCarousel-pagination-button "+(t===e?"active":"")},e));return l.jsx("div",{className:"cardCarousel-pagination",children:o})};!function(e,n){void 0===n&&(n={});var t=n.insertAt;if("undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===t&&r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}('.cardCarousel {\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  overflow: hidden;\n}\n.cardCarousel.resizing * {\n  transition: none !important;\n  animation: none !important;\n}\n.cardCarousel .cardCarousel-arrow,\n.cardCarousel .cardCarousel-pagination-button {\n  cursor: pointer;\n  padding: 0;\n  border: none;\n  outline: none;\n  background: none;\n}\n\n.cardCarousel-inner {\n  position: relative;\n}\n\n.cardCarousel-items {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.cardCarousel-items.itemsContained {\n  margin: 0 auto;\n}\n\n.cardCarousel-item-content {\n  width: auto;\n  display: inline-block;\n  overflow: hidden;\n  max-width: 100vw;\n}\n\n.cardCarousel-arrow {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: 10;\n  opacity: 1;\n  visibility: visible;\n  transition: all 400ms ease-out;\n}\n.cardCarousel-arrow.disabled {\n  opacity: 0;\n  visibility: hidden;\n}\n.cardCarousel-arrow:hover .cardCarousel-arrow-inner {\n  background-color: black;\n}\n.cardCarousel-arrow:hover .cardCarousel-arrow-inner:before {\n  border-color: white;\n}\n\n.cardCarousel-arrow-inner {\n  display: flex;\n  width: 60px;\n  height: 60px;\n  border-radius: 30px;\n  background-color: white;\n  position: relative;\n  transition: all 300ms ease-out;\n}\n.cardCarousel-arrow-inner:before {\n  content: "";\n  display: block;\n  margin: auto auto auto 20px;\n  width: 12px;\n  height: 12px;\n  border-top: 2px solid black;\n  border-right: 2px solid black;\n  transform: rotate(45deg);\n  transition: all 300ms ease-out;\n}\n\n.prev-button {\n  left: 20px;\n}\n.prev-button .cardCarousel-arrow-inner {\n  transform: rotate(180deg);\n}\n@media screen and (min-width: 768px) {\n  .prev-button {\n    left: 50px;\n  }\n}\n\n.next-button {\n  right: 20px;\n}\n@media screen and (min-width: 768px) {\n  .next-button {\n    right: 50px;\n  }\n}\n\n.cardCarousel-pagination {\n  width: auto;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 10px;\n  position: relative;\n  margin: 40px auto 0;\n}\n.cardCarousel-pagination .cardCarousel-pagination-button {\n  display: block;\n  width: 10px;\n  height: 10px;\n  border-radius: 5px;\n  border: 1px solid black;\n  background-color: transparent;\n  transition: all 300ms ease-out;\n}\n.cardCarousel-pagination .cardCarousel-pagination-button.active, .cardCarousel-pagination .cardCarousel-pagination-button:hover {\n  background-color: black;\n}');const u=e.forwardRef(((t,r)=>{const{children:o,settings:a}=t,i={gap:20,padding:50,cardsToShow:0,transitionSpeed:300,centerMode:!1,yieldToImages:!1,pagination:!1,touchControls:!0,arrows:!0,nextArrow:null,prevArrow:null,beforeChange:null,afterChange:null,onTouchStart:null,onTouchMove:null,onTouchEnd:null},[u,d]=e.useState(Object.assign(Object.assign({},i),a)),[f,p]=e.useState(0),[m,y]=e.useState(!0),[h,v]=e.useState(0),[g,b]=e.useState(!1),[w,x]=e.useState(0),[C,S]=e.useState(0),[k,j]=e.useState(0),[E,T]=e.useState(!1),[R,$]=e.useState(!1),[_,O]=e.useState(!1),[N,P]=e.useState(!1),A=e.useRef(null),L=e.useRef(0),M=e.useRef(null),D=e.useRef(null),F=e.useRef(0);e.useMemo((()=>{d(Object.assign(Object.assign({},i),a))}),[a]),e.useEffect((()=>{(null==o?void 0:o.length)&&k!==o.length-1&&j(o.length-1)}),[o]),e.useEffect((()=>{R&&(J(`${F.current}px`),setTimeout((()=>{$(!1)}),u.transitionSpeed))}),[R,u.transitionSpeed]),e.useEffect((()=>{0!==k&&0===w&&B()}),[M.current,k]),e.useEffect((()=>{!g&&0!==w&&z()}),[g,w]),e.useEffect((()=>{B(),z()}),[k,u.gap,u.padding,u.cardsToShow,u.centerMode,u.yieldToImages]),e.useEffect((()=>{0!==u.cardsToShow&&0===h&&W()}),[D.current]),e.useEffect((()=>(window.addEventListener("resize",I),L.current=window.innerWidth,()=>{window.removeEventListener("resize",I)})),[void 0!==typeof window,E,k]);const I=()=>{if(clearTimeout(A.current),window.innerWidth!==L.current){const e=D.current.getBoundingClientRect();D.current.style.width=`${e.width}px`,D.current.style.height=`${e.height}px`,M.current.style.position="absolute",x(99999),b(!0),L.current=window.innerWidth,A.current=setTimeout((()=>{M.current.style.removeProperty("position"),D.current.style.removeProperty("width"),D.current.style.removeProperty("height"),b(!1),W(),B(),A.current=null}),500)}},z=()=>{var e,n;const t=null===(e=M.current)||void 0===e?void 0:e.getBoundingClientRect(),r=null===(n=D.current)||void 0===n?void 0:n.getBoundingClientRect();y((null==t?void 0:t.width)<=(null==r?void 0:r.width)),V(0)};e.useEffect((()=>{m&&J(0)}),[m]);const W=()=>{var e;const n=null===(e=D.current)||void 0===e?void 0:e.getBoundingClientRect();0!==u.cardsToShow&&D.current&&v(n.width/u.cardsToShow)},B=()=>{if(!M.current)return;const e=M.current.children,n=u.gap*k;if(e){let t=0;const r=e=>{const n=e.children[0],r=null==n?void 0:n.offsetWidth;t+=u.cardsToShow>0?h:r};u.yieldToImages&&!E?Promise.all(Array.from(e).map((e=>(e=>{const n=e.querySelectorAll("img");return n&&"object"==typeof n?Promise.all(Array.from(n).map((e=>new Promise((n=>{e.complete&&n(1),e.onload=e.onerror=n}))))):Promise.resolve(!0)})(e).then((()=>{r(e)}))))).then((()=>{T(!0),x(t+n)})):(Array.from(e).map((e=>{r(e)})),x(t+n))}},V=e=>n(void 0,void 0,void 0,(function*(){var n;let t=0;if(C===e&&0===C&&!u.centerMode)return F.current=t,void $(!0);const r=e>=C?"next":"prev",o=M.current.children.item(e);if(!o)return;const a=null===(n=D.current)||void 0===n?void 0:n.getBoundingClientRect();if(u.beforeChange&&C!==e&&u.beforeChange(C,e),u.centerMode)t=yield((e,n)=>{if(!(e&&e instanceof HTMLElement&&n))return;return.5*n.width-(e.offsetLeft+.5*e.offsetWidth)})(o,a);else{const{moveVal:n,atStart:i,atEnd:l}=yield((e,n,t,r="next")=>{if(!(e&&e instanceof HTMLElement&&n instanceof HTMLElement&&t))return;const o=n.getBoundingClientRect(),a=-1*(o.width-t.width),i={moveVal:0,atStart:!1,atEnd:!1};return"next"===r&&(i.moveVal=-1*e.offsetLeft,o.width-e.offsetLeft<=t.width&&(i.moveVal=a,i.atEnd=!0)),"prev"===r&&(i.moveVal=-1*(e.offsetLeft-t.width+e.offsetWidth),-1*(e.offsetLeft-t.width+e.offsetWidth)>=0&&(i.moveVal=0,i.atStart=!0)),i})(o,M.current,a,r);t=n,i?e=0:l&&(e=k)}F.current=t,$(!0),S(e),u.afterChange&&C!==e&&u.afterChange(e)}));let H=0;const X=e=>{var n;H=null===(n=null==e?void 0:e.changedTouches[0])||void 0===n?void 0:n.clientY},U=e=>{var n;if(N)return e.preventDefault(),!1;const t=null===(n=null==e?void 0:e.changedTouches[0])||void 0===n?void 0:n.clientY;Math.abs(H-t)>5&&O(!0)},Y=e=>{O(!1),P(!1)};e.useEffect((()=>(window.addEventListener("touchstart",X),window.addEventListener("touchmove",U,{passive:!1}),window.addEventListener("touchend",Y),()=>{window.removeEventListener("touchstart",X),window.removeEventListener("touchmove",U),window.removeEventListener("touchend",Y)})),[N]);const J=e=>{(m||null!==A.current)&&(e=0),M.current.style.transform=`translateX(${e})`},q=e=>{var n;const t=null===(n=D.current)||void 0===n?void 0:n.getBoundingClientRect(),r=M.current.children,o=t.width/2,a=u.gap/2;Array.from(r).map(((e,n)=>{const r=e.getBoundingClientRect();(r.left-t.left-a<=o&&r.right-t.left+a>=o||r.left>o&&0===n||r.right<o&&k===n)&&V(n)}))},K=e=>{let n=0;return n="next"===e?C+1<k?C+1:k:C-1>0?C-1:0,V(n)},G=()=>K("next"),Q=()=>K("prev"),Z=e=>{M.current&&D.current&&V(e)};return e.useImperativeHandle(r,(()=>({nextCard:G,prevCard:Q,goToCard:e=>Z(e),getCurrentIndex:()=>C}))),!(null==o?void 0:o.length)||(null==o?void 0:o.length)<1?null:l.jsxs("div",{className:`cardCarousel ${g?"resizing":""} ${0!==w?"show":""}`,style:{padding:`0 ${u.padding}px`},children:[l.jsx("div",{className:"cardCarousel-inner",ref:D,onTouchStart:e=>{var n,t;if(!u.touchControls||_)return;const r=null!==(n=e.x)&&void 0!==n?n:null===(t=null==e?void 0:e.changedTouches[0])||void 0===t?void 0:t.clientX;p(r),u.onTouchStart&&u.onTouchStart(r)},onTouchMove:e=>{var n,t;if(!u.touchControls||_)return;const r=(null!==(n=e.x)&&void 0!==n?n:null===(t=null==e?void 0:e.changedTouches[0])||void 0===t?void 0:t.clientX)-f;u.onTouchMove&&u.onTouchMove(r),Math.abs(r)>5&&P(!0),J(`${F.current+1.25*r}px`)},onTouchEnd:()=>{O(!1),P(!1),u.touchControls&&(u.onTouchEnd&&u.onTouchEnd(),q())},children:l.jsx("div",{ref:M,className:"cardCarousel-items "+(u.centerMode?"itemsContained":""),style:{display:"flex",alignItems:"center",width:0!==w?`${w}px`:"99999px",gap:`${u.gap}px`,transition:R?`transform ease-in-out ${u.transitionSpeed}ms`:""},children:null==o?void 0:o.map(((e,n)=>l.jsx("div",{className:"cardCarousel-item-content","data-active":n===C,style:h?{width:`${h}px`}:{},children:e},n)))})}),!m&&l.jsxs(l.Fragment,{children:[u.pagination&&l.jsx(c,{currentIndex:C,itemCount:k,goToCard:Z}),u.arrows&&l.jsx(s,{nextArrow:u.nextArrow,prevArrow:u.prevArrow,currentIndex:C,prevCard:Q,itemCount:k,nextCard:G})]})]})}));module.exports=u;
