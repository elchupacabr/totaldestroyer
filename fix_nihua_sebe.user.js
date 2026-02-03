// ==UserScript==
// @name         fix all sites (light mode)
// @namespace    https://tampermonkey.net/
// @version      1.1
// @description  Нихера се
// @match        *://*
// @match        *://*/*
// @exclude        *://mail.yandex.ru/*
// @exclude        *://yandex.ru/*
// @exclude        *://ya.ru/*
// @exclude        *://yandex.com/*
// @exclude        *://yandex.by/*
// @exclude        *://yandex.kz/*
// @exclude        *://yandex.uz/*
// @exclude        *://yandex.az/*
// @exclude        *://yandex.am/*
// @exclude        *://yandex.ge/*
// @exclude        *://yandex.md/*
// @exclude        *://yandex.ee/*
// @exclude        *://yandex.lv/*
// @exclude        *://yandex.lt/*
// @exclude        *://yandex.tj/*
// @exclude        *://yandex.tm/*
// @exclude        *://yandex.fr/*
// @exclude        *://yandex.co.il/*
// @exclude        *://yandex.com.tr/*
// @exclude        *://*.yandex.ru/*
// @exclude        *://*.ya.ru/*
// @exclude        *://*.yandex.com/*
// @exclude        *://*.yandex.by/*
// @exclude        *://*.yandex.kz/*
// @exclude        *://*.yandex.uz/*
// @exclude        *://*.yandex.az/*
// @exclude        *://*.yandex.am/*
// @exclude        *://*.yandex.ge/*
// @exclude        *://*.yandex.md/*
// @exclude        *://*.yandex.ee/*
// @exclude        *://*.yandex.lv/*
// @exclude        *://*.yandex.lt/*
// @exclude        *://*.yandex.tj/*
// @exclude        *://*.yandex.tm/*
// @exclude        *://*.yandex.fr/*
// @exclude        *://*.yandex.co.il/*
// @exclude        *://*.yandex.com.tr/*
// @exclude        *://*.youtube.com/*
// @exclude        *://vk.com/*
// @exclude        *://*.vk.com/*
// @exclude        *://suno.com/*
// @exclude      *://github.com/*
// @exclude      *://*.soundcloud.com/*
// @exclude      *://soundcloud.com/*
// @exclude      *://*.sssu.ru/*
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
