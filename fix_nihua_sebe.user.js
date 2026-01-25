// ==UserScript==
// @name         lol
// @namespace    https://tampermonkey.net/
// @version      1.1
// @description  Нихера се
// @match        *://*/*
// @match        *://*
// @updateURL    https://github.com/elchupacabr/totaldestroyer/raw/main/fix_nihua_sebe.user.js
// @downloadURL  https://github.com/elchupacabr/totaldestroyer/raw/main/fix_nihua_sebe.user.js
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
    color: #fff !important;
    background-color: #00000000 !important;
  }
  .cm-content.cm-lineWrapping {
  color: #fff !important;
  background-color: #00000000 !important;
  }
`;

document.head.appendChild(style);



})();

   
