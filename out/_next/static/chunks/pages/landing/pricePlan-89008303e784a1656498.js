_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[41],{"1Yj4":function(e,n,t){"use strict";var r=t("ELrk"),i=t("sDqW"),c=t("q1tI"),s=t.n(c),a=t("17x9"),o=t.n(a),l=t("TSYQ"),d=t.n(l),u=t("33Jr"),f={tag:u.o,fluid:o.a.oneOfType([o.a.bool,o.a.string]),className:o.a.string,cssModule:o.a.object},j=function(e){var n=e.className,t=e.cssModule,c=e.fluid,a=e.tag,o=Object(i.a)(e,["className","cssModule","fluid","tag"]),l="container";!0===c?l="container-fluid":c&&(l="container-"+c);var f=Object(u.k)(d()(n,l),t);return s.a.createElement(a,Object(r.a)({},o,{className:f}))};j.propTypes=f,j.defaultProps={tag:"div"},n.a=j},"33Jr":function(e,n,t){"use strict";t.d(n,"n",(function(){return s})),t.d(n,"g",(function(){return a})),t.d(n,"e",(function(){return o})),t.d(n,"k",(function(){return l})),t.d(n,"l",(function(){return d})),t.d(n,"m",(function(){return u})),t.d(n,"p",(function(){return j})),t.d(n,"o",(function(){return b})),t.d(n,"c",(function(){return p})),t.d(n,"a",(function(){return h})),t.d(n,"b",(function(){return O})),t.d(n,"j",(function(){return m})),t.d(n,"d",(function(){return g})),t.d(n,"i",(function(){return v})),t.d(n,"h",(function(){return w})),t.d(n,"f",(function(){return E}));var r,i=t("17x9"),c=t.n(i);function s(e){document.body.style.paddingRight=e>0?e+"px":null}function a(){var e=window.getComputedStyle(document.body,null);return parseInt(e&&e.getPropertyValue("padding-right")||0,10)}function o(){var e=function(){var e=document.createElement("div");e.style.position="absolute",e.style.top="-9999px",e.style.width="50px",e.style.height="50px",e.style.overflow="scroll",document.body.appendChild(e);var n=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),n}(),n=document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")[0],t=n?parseInt(n.style.paddingRight||0,10):0;document.body.clientWidth<window.innerWidth&&s(t+e)}function l(e,n){return void 0===e&&(e=""),void 0===n&&(n=r),n?e.split(" ").map((function(e){return n[e]||e})).join(" "):e}function d(e,n){var t={};return Object.keys(e).forEach((function(r){-1===n.indexOf(r)&&(t[r]=e[r])})),t}function u(e,n){for(var t,r=Array.isArray(n)?n:[n],i=r.length,c={};i>0;)c[t=r[i-=1]]=e[t];return c}var f="object"===typeof window&&window.Element||function(){};var j=c.a.oneOfType([c.a.string,c.a.func,function(e,n,t){if(!(e[n]instanceof f))return new Error("Invalid prop `"+n+"` supplied to `"+t+"`. Expected prop to be an instance of Element. Validation failed.")},c.a.shape({current:c.a.any})]),b=c.a.oneOfType([c.a.func,c.a.string,c.a.shape({$$typeof:c.a.symbol,render:c.a.func}),c.a.arrayOf(c.a.oneOfType([c.a.func,c.a.string,c.a.shape({$$typeof:c.a.symbol,render:c.a.func})]))]),p={Fade:150,Collapse:350,Modal:300,Carousel:600},h=["in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],O={ENTERING:"entering",ENTERED:"entered",EXITING:"exiting",EXITED:"exited"},m={esc:27,space:32,enter:13,tab:9,up:38,down:40,home:36,end:35,n:78,p:80},g=!("undefined"===typeof window||!window.document||!window.document.createElement);function x(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}function v(e){var n=typeof e;return null!=e&&("object"===n||"function"===n)}function y(e){if(function(e){return!(!e||"object"!==typeof e)&&"current"in e}(e))return e.current;if(function(e){if(!v(e))return!1;var n=x(e);return"[object Function]"===n||"[object AsyncFunction]"===n||"[object GeneratorFunction]"===n||"[object Proxy]"===n}(e))return e();if("string"===typeof e&&g){var n=document.querySelectorAll(e);if(n.length||(n=document.querySelectorAll("#"+e)),!n.length)throw new Error("The target '"+e+"' could not be identified in the dom, tip: check spelling");return n}return e}function N(e){return null!==e&&(Array.isArray(e)||g&&"number"===typeof e.length)}function w(e,n){var t=y(e);return n?N(t)?t:null===t?[]:[t]:N(t)?t[0]:t}var E=["a[href]","area[href]","input:not([disabled]):not([type=hidden])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","object","embed","[tabindex]:not(.modal)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])']},"8EVO":function(e,n,t){"use strict";t.r(n);var r=t("rePB"),i=(t("q1tI"),t("OS56")),c=t.n(i),s=t("1Yj4"),a=t("ok1R"),o=t("rhny"),l=t("nKUr");function d(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function u(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?d(Object(t),!0).forEach((function(n){Object(r.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):d(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}n.default=function(){return Object(l.jsx)("div",{children:Object(l.jsxs)("section",{className:"section-py-space",id:"price",children:[Object(l.jsx)(s.a,{fluid:!0,children:Object(l.jsx)(a.a,{children:Object(l.jsx)(o.a,{sm:"12",children:Object(l.jsxs)("div",{className:"landing-title",children:[Object(l.jsx)("div",{children:Object(l.jsx)("h1",{children:"pricing plan"})}),Object(l.jsx)("div",{className:"sub-title",children:Object(l.jsxs)("div",{children:[Object(l.jsx)("h4",{children:"Choose Your Pricing Plan"}),Object(l.jsx)("h2",{children:"Affordable for everyone!"})]})})]})})})}),Object(l.jsx)(s.a,{className:"custom-container",children:Object(l.jsx)(a.a,{children:Object(l.jsx)(o.a,{sm:"12",children:Object(l.jsxs)(c.a,u(u({},{infinite:!0,arrows:!1,speed:500,slidesToShow:3,slidesToScroll:1,autoplay:!0,autoplaySpeed:2200,responsive:[{breakpoint:575,settings:{slidesToShow:1,slidesToScroll:1}},{breakpoint:991,settings:{slidesToShow:2,slidesToScroll:2,infinite:!0}}]}),{},{children:[Object(l.jsx)("div",{className:"item",children:Object(l.jsx)("div",{className:"pricing-box",children:Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{className:"pricing-icon",children:Object(l.jsx)("img",{className:"img-fluid",src:"/assets/images/landing/pricing-plan/1.png",alt:"pricing-plan"})}),Object(l.jsxs)("div",{className:"pricing-content",children:[Object(l.jsx)("h2",{children:"Free Plan"}),Object(l.jsx)("h4",{children:"$0 | Totally Free Plan"}),Object(l.jsx)("a",{className:"btn pricing-btn",href:"/bonus/price",children:"get started"})]}),Object(l.jsxs)("ul",{className:"avb-price",children:[Object(l.jsxs)("li",{children:[Object(l.jsx)("i",{className:"fa fa-check"}),"Common Feature is Avalible"]}),Object(l.jsxs)("li",{children:[Object(l.jsx)("i",{className:"fa fa-check"}),"High Definition Full-screen"]}),Object(l.jsxs)("li",{children:[Object(l.jsx)("i",{className:"fa fa-check"}),"Try for free, Forever!"]})]})]})})}),Object(l.jsx)("div",{className:"item",children:Object(l.jsx)("div",{className:"pricing-box",children:Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{className:"pricing-icon",children:Object(l.jsx)("img",{className:"img-fluid",src:"/assets/images/landing/pricing-plan/2.png",alt:"pricing-plan"})}),Object(l.jsxs)("div",{className:"pricing-content",children:[Object(l.jsx)("h2",{children:"Professional"}),Object(l.jsx)("h4",{children:"$59 | Professional Plan"}),Object(l.jsxs)("a",{className:"btn pricing-btn",href:"/bonus/price",children:[" ","get started"]})]}),Object(l.jsxs)("ul",{className:"avb-price",children:[Object(l.jsxs)("li",{children:[Object(l.jsx)("i",{className:"fa fa-check"}),"All Features is Avalible"]}),Object(l.jsxs)("li",{children:[Object(l.jsx)("i",{className:"fa fa-check"}),"High Definition Full-screen"]}),Object(l.jsxs)("li",{children:[Object(l.jsx)("i",{className:"fa fa-check"}),"24/7 phone and email support"]})]})]})})}),Object(l.jsx)("div",{className:"item",children:Object(l.jsx)("div",{className:"pricing-box",children:Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{className:"pricing-icon",children:Object(l.jsx)("img",{className:"img-fluid",src:"/assets/images/landing/pricing-plan/3.png",alt:"pricing-plan"})}),Object(l.jsxs)("div",{className:"pricing-content",children:[Object(l.jsx)("h2",{children:"Advanced"}),Object(l.jsx)("h4",{children:"$99 | Advance Plan"}),Object(l.jsx)("a",{className:"btn pricing-btn",href:"/bonus/price",children:"get started"})]}),Object(l.jsxs)("ul",{className:"avb-price",children:[Object(l.jsxs)("li",{children:[Object(l.jsx)("i",{className:"fa fa-check"}),"All Features is Avalible"]}),Object(l.jsxs)("li",{children:[Object(l.jsx)("i",{className:"fa fa-check"}),"High Definition Full-screen"]}),Object(l.jsxs)("li",{children:[Object(l.jsx)("i",{className:"fa fa-check"}),"24/7 phone and email support"]})]})]})})}),Object(l.jsx)("div",{className:"item",children:Object(l.jsx)("div",{className:"pricing-box",children:Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{className:"pricing-icon",children:Object(l.jsx)("img",{className:"img-fluid",src:"/assets/images/landing/pricing-plan/2.png",alt:"pricing-plan"})}),Object(l.jsxs)("div",{className:"pricing-content",children:[Object(l.jsx)("h2",{children:"Professional"}),Object(l.jsx)("h4",{children:"$59 | Professional Plan"}),Object(l.jsx)("a",{className:"btn pricing-btn",href:"/bonus/price",children:"get started"})]}),Object(l.jsxs)("ul",{className:"avb-price",children:[Object(l.jsxs)("li",{children:[Object(l.jsx)("i",{className:"fa fa-check"}),"All Features is Avalible"]}),Object(l.jsxs)("li",{children:[Object(l.jsx)("i",{className:"fa fa-check"}),"High Definition Full-screen"]}),Object(l.jsxs)("li",{children:[Object(l.jsx)("i",{className:"fa fa-check"}),"24/7 phone and email support"]})]})]})})})]}))})})})]})})}},ELrk:function(e,n,t){"use strict";function r(){return(r=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}t.d(n,"a",(function(){return r}))},Qetd:function(e,n,t){"use strict";var r=Object.assign.bind(Object);e.exports=r,e.exports.default=e.exports},TSYQ:function(e,n,t){var r;!function(){"use strict";var t={}.hasOwnProperty;function i(){for(var e=[],n=0;n<arguments.length;n++){var r=arguments[n];if(r){var c=typeof r;if("string"===c||"number"===c)e.push(r);else if(Array.isArray(r)&&r.length){var s=i.apply(null,r);s&&e.push(s)}else if("object"===c)for(var a in r)t.call(r,a)&&r[a]&&e.push(a)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):void 0===(r=function(){return i}.apply(n,[]))||(e.exports=r)}()},ok1R:function(e,n,t){"use strict";var r=t("ELrk"),i=t("sDqW"),c=t("q1tI"),s=t.n(c),a=t("17x9"),o=t.n(a),l=t("TSYQ"),d=t.n(l),u=t("33Jr"),f=o.a.oneOfType([o.a.number,o.a.string]),j={tag:u.o,noGutters:o.a.bool,className:o.a.string,cssModule:o.a.object,form:o.a.bool,xs:f,sm:f,md:f,lg:f,xl:f},b={tag:"div",widths:["xs","sm","md","lg","xl"]},p=function(e){var n=e.className,t=e.cssModule,c=e.noGutters,a=e.tag,o=e.form,l=e.widths,f=Object(i.a)(e,["className","cssModule","noGutters","tag","form","widths"]),j=[];l.forEach((function(n,t){var r=e[n];if(delete f[n],r){var i=!t;j.push(i?"row-cols-"+r:"row-cols-"+n+"-"+r)}}));var b=Object(u.k)(d()(n,c?"no-gutters":null,o?"form-row":"row",j),t);return s.a.createElement(a,Object(r.a)({},f,{className:b}))};p.propTypes=j,p.defaultProps=b,n.a=p},rhny:function(e,n,t){"use strict";var r=t("ELrk"),i=t("sDqW"),c=t("q1tI"),s=t.n(c),a=t("17x9"),o=t.n(a),l=t("TSYQ"),d=t.n(l),u=t("33Jr"),f=o.a.oneOfType([o.a.number,o.a.string]),j=o.a.oneOfType([o.a.bool,o.a.number,o.a.string,o.a.shape({size:o.a.oneOfType([o.a.bool,o.a.number,o.a.string]),order:f,offset:f})]),b={tag:u.o,xs:j,sm:j,md:j,lg:j,xl:j,className:o.a.string,cssModule:o.a.object,widths:o.a.array},p={tag:"div",widths:["xs","sm","md","lg","xl"]},h=function(e,n,t){return!0===t||""===t?e?"col":"col-"+n:"auto"===t?e?"col-auto":"col-"+n+"-auto":e?"col-"+t:"col-"+n+"-"+t},O=function(e){var n=e.className,t=e.cssModule,c=e.widths,a=e.tag,o=Object(i.a)(e,["className","cssModule","widths","tag"]),l=[];c.forEach((function(n,r){var i=e[n];if(delete o[n],i||""===i){var c=!r;if(Object(u.i)(i)){var s,a=c?"-":"-"+n+"-",f=h(c,n,i.size);l.push(Object(u.k)(d()(((s={})[f]=i.size||""===i.size,s["order"+a+i.order]=i.order||0===i.order,s["offset"+a+i.offset]=i.offset||0===i.offset,s)),t))}else{var j=h(c,n,i);l.push(j)}}})),l.length||l.push("col");var f=Object(u.k)(d()(n,l),t);return s.a.createElement(a,Object(r.a)({},o,{className:f}))};O.propTypes=b,O.defaultProps=p,n.a=O},sDqW:function(e,n,t){"use strict";function r(e,n){if(null==e)return{};var t,r,i={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}t.d(n,"a",(function(){return r}))},uU9V:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/landing/pricePlan",function(){return t("8EVO")}])},yLpj:function(e,n){var t;t=function(){return this}();try{t=t||new Function("return this")()}catch(r){"object"===typeof window&&(t=window)}e.exports=t}},[["uU9V",0,1,6]]]);