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
// @match        *://*.yandex.ua/*
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
// @match        *://vk.com/*
// @exclude        *://mail.yandex.ru/*
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
.vkuiUnstyledTextField__host.PostInput__input--krFir.PostInputWithEmoji__input--ksk6C.vkuiText__host.vkuiText__sizeYCompact.vkuiTypography__host.vkuiRootComponent__host{
background-color: #00000000 !important;
color: #fff !important;
}
.ComposerInput__input.ConvoComposer__input.ComposerInput__input--fixed{
background-color: #00000000 !important;
color: #fff !important;
}
`;

document.head.appendChild(style);



})();

   
