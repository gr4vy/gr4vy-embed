!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.gr4vy=n():e.gr4vy=n()}(self,(function(){return(()=>{var e={884:function(e,n,t){var r,a,o,i;function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e=t.nmd(e),i=function(){return function(){"use strict";var e={208:function(e,n,t){t.r(n),t.d(n,{optionKeys:function(){return z},setup:function(){return D}});var r=function(e){var n=new URL("https://".concat(e));return["localhost","127.0.0.1"].includes(n.hostname)&&(n.protocol="http"),n.toString().replace(/\/$/,"")},a=["gr4vyId"];function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var u,s,d,p=function(e){var n,t,o,c,l,u=e.gr4vyId,s=function(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}(e,a),d=(window.crypto||window.msCrypto).getRandomValues(new Uint32Array(4)).join("").slice(0,32),p=u?"embed.".concat(u,".gr4vy.app"):e.iframeHost,m=u?"api.".concat(u,".gr4vy.app"):e.apiHost,v=r(p),f=e.form instanceof Element?e.form:document.querySelector(e.form),g=e.element instanceof Element?e.element:document.querySelector(e.element);return i(i({store:"ask",display:"all",apiHost:m,apiUrl:r(m),iframeHost:p,iframeUrl:v,iframeSrc:(o=v,c={parentUrl:"".concat(document.location.protocol,"//").concat(document.location.host),font:null!==(n=e.theme)&&void 0!==n&&null!==(t=n.fonts)&&void 0!==t&&t.body?encodeURIComponent(e.theme.fonts.body):void 0,channel:d},l=new URL(o),Object.keys(c).forEach((function(e){void 0!==c[e]&&l.searchParams.set(e,c[e])})),l.toString()),channel:d},s),{},{element:g,form:f})},m=t(88),v=t.n(m),f=new Map,g=0,b=function(e){if(e.hasChildNodes())for(;e.firstChild;)e.removeChild(e.lastChild)},y=!0,h=String.raw,_=function(e,n){y&&(t(496),y=!1),e.className="gr4vy__overlay gr4vy__overlay--hidden";var r=document.createElement("div"),a=document.createElement("div"),o=document.createElement("div");o.className="gr4vy__overlay__notice ",o.appendChild(r),o.appendChild(a);var i=document.createElement("div");i.className="gr4vy__overlay__link",i.addEventListener("click",(function(){return n.approvalLost$.next()}));var c=document.createElement("div");c.className="gr4vy__overlay__link",c.addEventListener("click",(function(){return n.approvalCancelled$.next()}));var l=document.createElement("div");l.className="gr4vy__overlay__container",e.appendChild(l);var s=function(){e.className="gr4vy__overlay gr4vy__overlay--hidden",b(l)},d=function(){e.className="gr4vy__overlay gr4vy__overlay--visible"};n.approvalStarted$.subscribe((function(){var e,t,u,s,p;t=(e=n.mode$.value().overlay).title,u=e.link,s=e.message,p=e.cancel,r.textContent=t,i.textContent=u,a.textContent=s,c.textContent=p,l.appendChild(o),l.appendChild(i),l.appendChild(c),d()})),n.approvalCompleted$.subscribe(s),n.approvalCancelled$.subscribe(s),n.transactionFailed$.subscribe(s),n.approvalUrl$.subscribe((function(e){var t,r,a,o;null!==(t=n.mode$.value())&&void 0!==t&&t.overlay||(r=e,l.innerHTML=h(u||(a=['\n      <iframe\n        src="','"\n        frameborder="0"\n        class="gr4vy__frame"\n        allowtransparency="true"\n      ></iframe>\n    '],o||(o=a.slice(0)),u=Object.freeze(Object.defineProperties(a,{raw:{value:Object.freeze(o)}}))),r),d())})),n.transactionCreated$.subscribe(s)},w=function(e){return{current:e}},x=String.raw,k=function(e){var n,t,r=e.title,a=e.message;return x(s||(n=["\n  <html>\n    <head>\n      <title>","</title>\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n      <style>\n        html,\n        body {\n          margin: 0;\n          padding: 0;\n          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,\n            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',\n            'Segoe UI Symbol';\n          text-align: center;\n        }\n        .gr4vy__status {\n          position: absolute;\n          top: 0;\n          bottom: 0;\n          left: 0;\n          right: 0;\n          display: flex;\n          justify-content: center;\n          align-items: center;\n        }\n        @keyframes gr4vy-sweep {\n          0% {\n            background-position: 0 0;\n          }\n          100% {\n            background-position: 600px 0;\n          }\n        }\n\n        .gr4vy__loading {\n          height: 8px;\n          background-image: linear-gradient(\n            90deg,\n            #009cde 25%,\n            #bee7fa 25%,\n            #bee7fa 75%,\n            #009cde 75%\n          );\n          background-size: 600px 8px;\n          -webkit-animation: gr4vy-sweep 2s infinite\n            cubic-bezier(0.2, 0.75, 0.77, 0.25);\n          animation: gr4vy-sweep 2s infinite cubic-bezier(0.2, 0.75, 0.77, 0.25);\n        }\n      </style>\n    </head>\n    <div class=\"gr4vy__loading\"></div>\n    <div class=\"gr4vy__status\">\n      <p>","</p>\n    </div>\n  </html>\n"],t||(t=n.slice(0)),s=Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(t)}}))),r,a)},E=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window,r=t.innerWidth/2-e/2+t.screenLeft,a=t.innerHeight/2-n/2+t.screenTop;return"width=".concat(e,",height=").concat(n,",top=").concat(a,",left=").concat(r)},j=function(e,n,t){var r=open("","loading",e);r.document.write(n);var a,o,i,c=(a=function(){return r.closed},o=t,i=setInterval((function(){!0===a()&&(clearInterval(i),o())}),10),function(){return clearInterval(i)});return{popup:r,stopCallback:c}},S=function(e,n){e.location.href=n},O=String.raw,$=!0,C=function(e){var n=e,t=[];return{subscribe:function(e){var n=t.push(e);return{unsubscribe:function(){t.splice(n-1)}}},next:function(e){n=e,t.forEach((function(e){return e(n)}))},value:function(){return n}}};function I(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function H(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var q=function(e,n,t){t&&console.log("Gr4vy - ".concat(e),n)},L=function(e,n,t){return function(r){e===r.origin&&r.data.channel===n&&t(r.data)}};function P(e){return(P="function"==typeof Symbol&&"symbol"==c(Symbol.iterator)?function(e){return c(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":c(e)})(e)}var U=function(e){var n=e.required,t=e.value;return!n&&[void 0,null].includes(t)},M=function(e){var n=e.argument,t=e.value,r=e.message,a=e.required,o=void 0===a||a,i=e.callback;if(t instanceof Element)return!0;var c=document.querySelector(t);return!(!U({required:o,value:t})&&!c&&(N({argument:n,message:"".concat(t," ").concat(r),callback:i}),1))},F=function(e){var n=e.argument,t=e.value,r=e.message,a=e.required,o=void 0===a||a,i=e.callback;if(U({required:o,value:t}))return!0;var c=!1;try{c=t===new URL("http://".concat(t)).host}catch(e){}return c||N({argument:n,message:"".concat(t," ").concat(r),callback:i}),c},T=function(e){var n=e.argument,t=e.value,r=e.message,a=e.type,o=e.required,i=void 0===o||o,c=e.callback,l=P(t)===a;return!(!U({required:i,value:t})&&!l&&(N({argument:n,message:"".concat(t," ").concat(r),callback:c}),1))},N=function(e){var n=e.argument,t=e.message,r=e.callback,a={code:"argumentError",argument:n,message:t};console.error("Gr4vy - Error",a),null==r||r("argumentError",a)},z=["amount","currency","intent","apiHost","token","debug","externalIdentifier","preferResponse","buyerId","buyerExternalIdentifier","environment","store","country","theme","locale","display","apiUrl"],R=new Map,A=0;function D(e){if(function(e){return M({argument:"element",value:e.element,message:"must be a valid HTML element",callback:e.onEvent})&&M({argument:"form",value:e.form,required:!1,message:"must be a valid HTML form element",callback:e.onEvent})&&T({argument:"gr4vyId",value:e.gr4vyId,required:!e.iframeHost&&!e.apiHost,type:"string",message:"must be a valid gr4vyId or iframeHost/apiHost",callback:e.onEvent})&&F({argument:"iframeHost",value:e.iframeHost,required:!e.gr4vyId,message:"must be a valid hostname with an optional :port",callback:e.onEvent})&&F({argument:"apiHost",value:e.apiHost,message:"must be a valid hostname with an optional :port",required:!e.gr4vyId,callback:e.onEvent})&&(t=(n={argument:"intent",value:e.intent,message:"must be a valid intent",required:!1,callback:e.onEvent}).argument,a=n.message,i=void 0===(o=n.required)||o,c=n.callback,l="string"==typeof(r=n.value)&&["authorize","capture","approve"].includes(r),!(!U({required:i,value:r})&&!l&&(N({argument:t,message:"".concat(r," ").concat(a),callback:c}),1)))&&T({argument:"onEvent",value:e.onEvent,type:"function",message:"must be a function",required:!1,callback:e.onEvent})&&T({argument:"token",value:e.token,type:"string",message:"must be a string",callback:e.onEvent})&&T({argument:"preferResponse",value:e.preferResponse,type:"string",message:"must be a string",required:!1,callback:e.onEvent})&&T({argument:"externalIdentifier",value:e.externalIdentifier,type:"string",message:"must be a string",required:!1,callback:e.onEvent})&&function(e){var n=e.argument,t=e.value,r=e.message,a=e.required,o=void 0===a||a,i=e.callback,c="string"==typeof t&&3===t.length;return!(!U({required:o,value:t})&&!c&&(N({argument:n,message:"".concat(t," ").concat(r),callback:i}),1))}({argument:"currency",value:e.currency,message:"must be a valid currency format",callback:e.onEvent})&&function(e){var n=e.argument,t=e.value,r=e.message,a=e.required,o=void 0===a||a,i=e.callback,c=Number(t),l=c>=0&&c<=999999;return!(!U({required:o,value:t})&&!l&&(N({argument:n,message:"".concat(t," ").concat(r),callback:i}),1))}({argument:"amount",value:e.amount,message:"must be valid non-negative number",callback:e.onEvent})&&T({argument:"debug",value:e.debug,type:"boolean",message:"must be a boolean",required:!1,callback:e.onEvent})&&T({argument:"buyerExternalIdentifier",value:e.buyerExternalIdentifier,type:"string",message:"must be a string",required:!1,callback:e.onEvent})&&T({argument:"buyerId",value:e.buyerId,type:"string",message:"must be a string",required:!1,callback:e.onEvent})&&T({argument:"environment",value:e.environment,type:"string",message:'must be "development", "staging" or "production"',required:!1,callback:e.onEvent})&&function(e){var n=e.argument,t=e.value,r=e.message,a=e.required,o=void 0===a||a,i=e.callback,c=[!0,!1,"ask"].includes(t);return!(!U({required:o,value:t})&&!c&&(N({argument:n,message:"".concat(t," ").concat(r),callback:i}),1))}({argument:"store",value:e.store,message:'must be true, false or "ask"',required:!1})&&T({argument:"country",value:e.country,type:"string",message:"must be a string ISO country code",required:!0,callback:e.onEvent})&&T({argument:"display",value:e.display,type:"string",message:'must be "storedOnly", "addOnly", "supportsTokenization" or "all"',required:!1});var n,t,r,a,o,i,c,l}(e)){var n,r=p(e),a=((n={mode$:C(),approvalUrl$:C(),approvalStarted$:C(),approvalCancelled$:C(),approvalLost$:C(),approvalCompleted$:C(),frameHeight$:C(0),optionsLoaded$:C(!1),formSubmit$:C(),transactionCreated$:C(),transactionFailed$:C()}).formSubmit$.subscribe((function(){var e;null!==(e=n.mode$.value())&&void 0!==e&&e.popup&&n.approvalStarted$.next()})),n.transactionCreated$.subscribe((function(){var e;null!==(e=n.mode$.value())&&void 0!==e&&e.popup&&n.approvalCompleted$.next()})),n),o=r.element.dataset.embedId;b(r.element),R.has(o)&&R.get(o)(),A+=1,r.element.dataset.embedId=A.toString();var i=document.createElement("div");D=i,B=a,$&&(t(796),$=!1),D.innerHTML=O(d||(Z=['<div class="gr4vy__container">\n    <div class="gr4vy__loading"></div>\n    <div class="gr4vy__skeleton">\n      <div class="gr4vy__skeleton__radio"></div>\n      <div class="gr4vy__skeleton__block"></div>\n    </div>\n    <div class="gr4vy__skeleton">\n      <div class="gr4vy__skeleton__radio"></div>\n      <div class="gr4vy__skeleton__block"></div>\n    </div>\n  </div>'],W||(W=Z.slice(0)),d=Object.freeze(Object.defineProperties(Z,{raw:{value:Object.freeze(W)}})))),B.optionsLoaded$.subscribe((function(){return D.remove()}));var c=document.createElement("div");_(c,a),function(e,n,t){parseInt(e.dataset.formNapperId)>0&&(f.get(e.dataset.formNapperId).detach(),f.delete(e.dataset.formNapperId)),g+=1,e.dataset.formNapperId=String(g);var r=new(v())(e);f.set(g.toString(),r),r.hijack((function(){t.formSubmit$.next()})),t.transactionCreated$.subscribe((function(e){var t;return r.inject("gr4vy_transaction_id",e.id),r.inject("gr4vy_transaction_status",e.status),null!=e&&null!==(t=e.paymentMethod)&&void 0!==t&&t.id&&r.inject("gr4vy_transaction_payment_method_id",e.paymentMethod.id),"function"==typeof n?n(e):r.submit()}))}(r.form,r.onComplete,a),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w(),n=arguments.length>1?arguments[1]:void 0;n.approvalStarted$.subscribe((function(){e.current=j(E(500,589),k(n.mode$.value().popup),(function(){return n.approvalCancelled$.next()}))})),n.approvalUrl$.subscribe((function(n){e.current&&S(e.current.popup,n)})),n.approvalLost$.subscribe((function(){e.current.stopCallback(),e.current.popup.close(),n.approvalStarted$.next();var t=n.approvalUrl$.value();t&&n.approvalUrl$.next(t)})),n.approvalCancelled$.subscribe((function(){var n;null===(n=e.current)||void 0===n||n.popup.close()})),n.approvalCompleted$.subscribe((function(){var n;null===(n=e.current)||void 0===n||n.popup.close()})),n.transactionFailed$.subscribe((function(){var n,t;null===(n=e.current)||void 0===n||n.stopCallback(),null===(t=e.current)||void 0===t||t.popup.close()}))}(w(),a);var l=document.createElement("iframe");!function(e,n,t){e.src=n,e.title="Secure payment frame - Gr4vy",e.style.visibility="hidden",e.style.display="none",e.style.width="100%",e.style.height="0px",e.style.border="0",e.style.overflow="hidden",e.setAttribute("frameBorder","0"),e.setAttribute("scrolling","no"),t.frameHeight$.subscribe((function(n){"unset"===e.style.visibility&&(e.style.height="".concat(n,"px"))})),t.optionsLoaded$.subscribe((function(){e.style.visibility="unset",e.style.display="unset"}))}(l,r.iframeSrc,a),r.element.append(c,i,l);var u,s,m={modeUpdated:a.mode$.next,approvalUrl:a.approvalUrl$.next,resize:function(e){var n;return a.frameHeight$.next(null==e||null===(n=e.frame)||void 0===n?void 0:n.height)},optionsLoaded:a.optionsLoaded$.next,transactionCreated:a.transactionCreated$.next,transactionFailed:a.transactionFailed$.next,frameReady:function(){return y({type:"updateOptions",data:(e=r,n=z,n.reduce((function(n,t){return n[t]=e[t],n}),{}))});var e,n}},y=function(e,n,t,r){return function(a){t.postMessage(function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?I(Object(t),!0).forEach((function(n){H(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):I(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}({channel:n},a),e),r&&r(a)}}(r.iframeUrl,r.channel,l.contentWindow,(function(e){return q("Page emits",e,r.debug)})),h=L(r.iframeUrl,r.channel,(function(e){var n;q("Page received",e,r.debug),["formUpdate","transactionCreated","apiError","paymentMethodSelected"].includes(e.type)&&(null===(n=r.onEvent)||void 0===n||n.call(r,e.type,e.data)),m[e.type]&&m[e.type](e.data)})),x=L(r.apiUrl,r.channel,(function(e){l.contentWindow.postMessage(e,r.iframeUrl)})),P=L(r.iframeUrl,r.channel,(u=["approvalErrored","transactionUpdated"],s=function(e){return l.contentWindow.postMessage(e,r.iframeUrl)},function(e){u.includes(e.type)&&s(e)}));a.formSubmit$.subscribe((function(){return y({type:"submitForm"})})),a.approvalCancelled$.subscribe((function(){return y({type:"approvalCancelled"})})),window.addEventListener("message",h),window.addEventListener("message",x),window.addEventListener("message",P),R.set(A.toString(),(function(){window.removeEventListener("message",h),window.removeEventListener("message",x),window.removeEventListener("message",P)}))}var D,B,Z,W}},381:function(e,n,t){t.d(n,{Z:function(){return o}});var r=t(609),a=t.n(r)()((function(e){return e[1]}));a.push([e.id,".gr4vy__overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  max-height: 100vh;\n  z-index: 100;\n  transition: background-color 0.2s linear, max-height 0s linear;\n  background: rgba(0, 0, 0, 0.8);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.gr4vy__overlay--visible {\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n}\n\n.gr4vy__overlay__container {\n  color: white;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,\n    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';\n  font-size: 1rem;\n  text-align: center;\n  font-weight: bold;\n}\n\n.gr4vy__overlay__container > * + * {\n  margin-top: 32px;\n}\n\n.gr4vy__overlay__notice > * + * {\n  margin-top: 8px;\n}\n\n.gr4vy__overlay--hidden {\n  max-height: 0;\n  backdrop-filter: unset;\n  background-color: rgba(0, 0, 0, 0);\n  transition: background-color 0.2s linear, max-height 0s linear;\n  transition-delay: 0s, 0.2s;\n  overflow: hidden;\n}\n\n.gr4vy__overlay__link {\n  font-weight: normal;\n  text-decoration: underline;\n  font-weight: normal;\n  color: white;\n  display: block;\n  cursor: pointer;\n}\n\n.gr4vy__frame {\n  height: 100vh;\n  width: 100vw;\n}\n\n@media screen and (min-width: 500px) and (min-height: 350px) {\n  .gr4vy__frame {\n    height: 250px;\n    width: 400px;\n  }\n}\n\n@media screen and (min-width: 500px) and (min-height: 490px) {\n  .gr4vy__frame {\n    height: 390px;\n    width: 400px;\n  }\n}\n\n@media screen and (min-width: 700px) and (min-height: 500px) {\n  .gr4vy__frame {\n    height: 400px;\n    width: 600px;\n  }\n}\n\n@media screen and (min-width: 700px) and (min-height: 600px) {\n  .gr4vy__frame {\n    height: 500px;\n    width: 600px;\n  }\n}\n",""]);var o=a},514:function(e,n,t){t.d(n,{Z:function(){return o}});var r=t(609),a=t.n(r)()((function(e){return e[1]}));a.push([e.id,"@keyframes gr4vy-sweep {\n  0% {\n    background-position: 0 0;\n  }\n  100% {\n    background-position: 600px 0;\n  }\n}\n\n.gr4vy__loading {\n  height: 8px;\n  background-image: linear-gradient(\n    90deg,\n    #009cde 25%,\n    #bee7fa 25%,\n    #bee7fa 75%,\n    #009cde 75%\n  );\n  background-size: 600px 8px;\n  -webkit-animation: gr4vy-sweep 2s infinite cubic-bezier(0.2, 0.75, 0.77, 0.25);\n  animation: gr4vy-sweep 2s infinite cubic-bezier(0.2, 0.75, 0.77, 0.25);\n}\n\n.gr4vy__skeleton {\n  display: flex;\n  border-bottom: 1px solid #bdc6d9;\n  padding: 16px;\n}\n.gr4vy__skeleton:last-child {\n  border-bottom: none;\n}\n.gr4vy__skeleton__radio {\n  border-radius: 50%;\n  height: 16px;\n  width: 16px;\n  margin-bottom: 4px;\n  margin-top: 4px;\n  background-color: #dadbdc;\n}\n.gr4vy__skeleton__block {\n  width: 50%;\n  height: 16px;\n  background-color: #dadbdc;\n  margin-bottom: 4px;\n  margin-top: 4px;\n  margin-left: 16px;\n  border-radius: 2px;\n}\n.gr4vy__container {\n  border: 1px solid #bdc6d9;\n  max-width: 480px;\n}\n",""]);var o=a},609:function(e){e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t=e(n);return n[2]?"@media ".concat(n[2]," {").concat(t,"}"):t})).join("")},n.i=function(e,t,r){"string"==typeof e&&(e=[[null,e,""]]);var a={};if(r)for(var o=0;o<this.length;o++){var i=this[o][0];null!=i&&(a[i]=!0)}for(var c=0;c<e.length;c++){var l=[].concat(e[c]);r&&a[l[0]]||(t&&(l[2]?l[2]="".concat(t," and ").concat(l[2]):l[2]=t),n.push(l))}},n}},88:function(e,n,t){function r(e){if(("string"==typeof e||e instanceof String)&&(e=document.getElementById(e)),!(e instanceof HTMLFormElement))throw new TypeError("FormNapper requires an HTMLFormElement element or the id string of one.");this.htmlForm=e}r.prototype.hijack=function(e){this.submitHandler||(this.submitHandler=function(n){n.preventDefault?n.preventDefault():n.returnValue=!1,e(n)},null!=t.g.addEventListener?this.htmlForm.addEventListener("submit",this.submitHandler,!1):null!=t.g.attachEvent?this.htmlForm.attachEvent("onsubmit",this.submitHandler):this.htmlForm.onsubmit=this.submitHandler)},r.prototype.inject=function(e,n){var t=this.htmlForm.querySelector('input[name="'+e+'"]');return null==t&&((t=document.createElement("input")).type="hidden",t.name=e,this.htmlForm.appendChild(t)),t.value=n,t},r.prototype.submit=function(){HTMLFormElement.prototype.submit.call(this.htmlForm)},r.prototype.detach=function(){this.submitHandler&&(null!=t.g.removeEventListener?this.htmlForm.removeEventListener("submit",this.submitHandler,!1):null!=t.g.detachEvent?this.htmlForm.detachEvent("onsubmit",this.submitHandler):this.htmlForm.onsubmit=null,delete this.submitHandler)},e.exports=r},496:function(e,n,t){t.r(n),t.d(n,{default:function(){return i}});var r=t(62),a=t.n(r),o=t(381);a()(o.Z,{insert:"head",singleton:!1});var i=o.Z.locals||{}},796:function(e,n,t){t.r(n),t.d(n,{default:function(){return i}});var r=t(62),a=t.n(r),o=t(514);a()(o.Z,{insert:"head",singleton:!1});var i=o.Z.locals||{}},62:function(e,n,t){var r,a=function(){var e={};return function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}e[n]=t}return e[n]}}(),o=[];function i(e){for(var n=-1,t=0;t<o.length;t++)if(o[t].identifier===e){n=t;break}return n}function c(e,n){for(var t={},r=[],a=0;a<e.length;a++){var c=e[a],l=n.base?c[0]+n.base:c[0],u=t[l]||0,s="".concat(l," ").concat(u);t[l]=u+1;var d=i(s),p={css:c[1],media:c[2],sourceMap:c[3]};-1!==d?(o[d].references++,o[d].updater(p)):o.push({identifier:s,updater:f(p,n),references:1}),r.push(s)}return r}function l(e){var n=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var o=t.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(e){n.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(n);else{var i=a(e.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}return n}var u,s=(u=[],function(e,n){return u[e]=n,u.filter(Boolean).join("\n")});function d(e,n,t,r){var a=t?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=s(n,a);else{var o=document.createTextNode(a),i=e.childNodes;i[n]&&e.removeChild(i[n]),i.length?e.insertBefore(o,i[n]):e.appendChild(o)}}function p(e,n,t){var r=t.css,a=t.media,o=t.sourceMap;if(a?e.setAttribute("media",a):e.removeAttribute("media"),o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var m=null,v=0;function f(e,n){var t,r,a;if(n.singleton){var o=v++;t=m||(m=l(n)),r=d.bind(null,t,o,!1),a=d.bind(null,t,o,!0)}else t=l(n),r=p.bind(null,t,n),a=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)};return r(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;r(e=n)}else a()}}e.exports=function(e,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=(void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r));var t=c(e=e||[],n);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<t.length;r++){var a=i(t[r]);o[a].references--}for(var l=c(e,n),u=0;u<t.length;u++){var s=i(t[u]);0===o[s].references&&(o[s].updater(),o.splice(s,1))}t=l}}}}},n={};function t(r){if(n[r])return n[r].exports;var a=n[r]={id:r,exports:{}};return e[r](a,a.exports,t),a.exports}return t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,{a:n}),n},t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.g=function(){if("object"==("undefined"==typeof globalThis?"undefined":c(globalThis)))return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==("undefined"==typeof window?"undefined":c(window)))return window}}(),t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t(208)}()},"object"==c(n)&&"object"==c(e)?e.exports=i():(a=[],void 0===(o="function"==typeof(r=i)?r.apply(n,a):r)||(e.exports=o))},723:(e,n,t)=>{"use strict";t.r(n),t.d(n,{setup:()=>r});var r=t(884).setup}},n={};function t(r){if(n[r])return n[r].exports;var a=n[r]={id:r,loaded:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}return t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),t(723)})()}));