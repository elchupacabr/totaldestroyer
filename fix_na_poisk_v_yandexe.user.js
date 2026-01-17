// ==UserScript==
// @name         Фикс на поиск Яндекса
// @namespace    https://tampermonkey.net/
// @version      1.2.0
// @description  Фикс вылезания и принудительный тёмный цвет поля поиска Яндекса
// @updateURL    https://github.com/elchupacabr/totaldestroyer/raw/main/fix_na_poisk_v_yandexe.user.js
// @downloadURL  https://github.com/elchupacabr/totaldestroyer/raw/main/fix_na_poisk_v_yandexe.user.js
// @match        https://ya.ru/*
// @match        https://yandex.ru/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const BG = '#383839';
    const FG = '#e8e6e3';

  const css = `
/* =================================
   ОБЩЕЕ (ОБЫЧНОЕ СОСТОЯНИЕ)
================================= */

.search3__input-wrapper {
    overflow: visible !important;
}

/* обычное состояние */
.search3__input-outer-container {
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding-left: 1.5rem !important;
    padding-right: .8rem !important;
    box-sizing: border-box !important;
    background-color: #383839 !important;
    border-radius: 12px;
    border: none !important;
}

/* внутренности */
.search3__input-inner-container {
    background: transparent !important;
}

/* textarea + input */
.search3__input,
.old3mhrbaCPvRG9Nv__input {
    background: transparent !important;
    color: #e8e6e3 !important;
    caret-color: #e8e6e3 !important;
}

/* =================================
   СОСТОЯНИЕ OPEN
================================= */

form.old3mhrbaCPvRG9Nv_open .search3__logo {
    display: none !important;
}

/* цвет + обводка при open */
form.old3mhrbaCPvRG9Nv_open .search3__input-outer-container {
    background-color: #232325 !important;

    padding-right: .6rem !important;
    max-width: calc(100% - 0.4rem) !important;
}

/* страховка от визуального вылета */
form.old3mhrbaCPvRG9Nv_open .search3__inner {
    overflow: hidden !important;
}
`;



    const style = document.createElement('style');
    style.textContent = css;
    document.documentElement.appendChild(style);
})();
