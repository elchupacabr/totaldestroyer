// ==UserScript==
// @name         lol
// @namespace    https://tampermonkey.net/
// @version      1.4
// @description  Нихера се
// @match        *://*.yandex.ru/*
// @match        *://*.ya.ru/*
// @match        *://*.yandex.com/*
// @match        *://*.yandex.by/*
// @match        *://*.yandex.kz/*
// @match        *://*.yandex.uz/*
// @match        *://*.yandex.az/*
// @match        *://*.yandex.am/*
// @match        *://*.yandex.ge/*
// @match        *://*.yandex.md/*
// @match        *://*.yandex.ee/*
// @match        *://*.yandex.lv/*
// @match        *://*.yandex.lt/*
// @match        *://*.yandex.tj/*
// @match        *://*.yandex.tm/*
// @match        *://*.yandex.fr/*
// @match        *://*.yandex.co.il/*
// @match        *://*.yandex.com.tr/*
// @match        *://*.youtube.com/*
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
  
`;

document.head.appendChild(style);



})();

   
