!function(e){var r={};function t(o){if(r[o])return r[o].exports;var n=r[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,t),n.l=!0,n.exports}t.m=e,t.c=r,t.d=function(e,r,o){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)t.d(o,n,function(r){return e[r]}.bind(null,n));return o},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=1)}([function(e,r,t){},function(e,r,t){"use strict";t.r(r);t(0);var o=document.querySelector(".slicer__form"),n=document.querySelector(".author__phone_button"),u=document.querySelector(".slicer__data_input"),c=document.querySelector(".slicer__data_output"),i=function(e){e.preventDefault();var r=function(e){const r={source:"TextProcessor error. Invalid input data format",processed:["TextProcessor error. Invalid input data format"]};return"string"!=typeof e?(console.log("TextProcessor error. Invalid input data format"),r):(r.source=e.replace(/[^A-Za-zА-Яа-яЁё,\d]/g,""),r.source=r.source.toLocaleLowerCase(),r.processed=r.source.split(","),r.processed=r.processed.map(e=>{let r="";for(;0!=e.length;)r+=e[0],e=e.split(e[0]).join("");return r}),r)}(u.value);u.value=r.source,c.value=r.processed};o.addEventListener("submit",(function(e){return i(e)})),n.addEventListener("click",(function(e){return function e(r){r.target.classList.add("author__phone_hidden"),r.target.removeEventListener("click",e)}(e)}),{once:!0})}]);