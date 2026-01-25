// ==UserScript==
// @name         fix all sites (light mode)
// @namespace    https://tampermonkey.net/
// @version      1.0
// @description  Нихера се
// @match        *://*
// @match        *://*/*
// @updateURL    https://github.com/elchupacabr/totaldestroyer/raw/main/fix_all_sites-l.user.js
// @downloadURL  https://github.com/elchupacabr/totaldestroyer/raw/main/fix_all_sites-l.user.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

const style = document.createElement('style');
style.textContent = `
  input,
  textarea,
  input:focus,
  textarea:focus,
  input:active,
  textarea:active {
    color: #000 !important;
    background-color: #00000000 !important;
  }
  
`;

document.head.appendChild(style);



})();

   
