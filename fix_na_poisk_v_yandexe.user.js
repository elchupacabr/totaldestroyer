// ==UserScript==
// @name         Фикс на поиск Яндекса (dark + light)
// @namespace    https://tampermonkey.net/
// @version      1.4.0
// @description  Фикс размеров и корректные цвета поля поиска Яндекса для тёмной и светлой neuro-тем
// @updateURL    https://github.com/elchupacabr/totaldestroyer/raw/main/fix_na_poisk_v_yandexe.user.js
// @downloadURL  https://github.com/elchupacabr/totaldestroyer/raw/main/fix_na_poisk_v_yandexe.user.js
// @match        *://ya.ru/*
// @match        ://yandex.ru/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const css = `
/* =========================================================
   ОБЩИЕ ФИКСЫ РАЗМЕРОВ (ДЛЯ ВСЕХ ТЕМ)
========================================================= */

.document_neuro-redesign_yes .search3__input-wrapper {
    overflow: visible !important;
}

.document_neuro-redesign_yes .search3__input-outer-container {
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding-left: 1.5rem !important;
    padding-right: .8rem !important;
    box-sizing: border-box !important;
    border-radius: 12px;
}

/* OPEN — фиксим «вылезание» */
.document_neuro-redesign_yes
form.old3mhrbaCPvRG9Nv_open
.search3__input-outer-container {
    padding-right: .6rem !important;
    max-width: calc(100% - 0.4rem) !important;
}

/* =========================================================
   ТЁМНАЯ ТЕМА
========================================================= */

.document_dark_yes .search3__input-outer-container {
    background-color: #383839 !important;
    border: none !important;
}

.document_dark_yes
form.old3mhrbaCPvRG9Nv_open
.search3__input-outer-container {
    background-color: #232325 !important;
}

/* текст в тёмной теме */
.document_dark_yes .search3__input,
.document_dark_yes .old3mhrbaCPvRG9Nv__input {
    background: transparent !important;
    color: #e8e6e3 !important;
    caret-color: #e8e6e3 !important;
}

/* =========================================================
   СВЕТЛАЯ NEURO-ТЕМА (ТОЛЬКО ФОН)
========================================================= */

.document_neuro-redesign_yes:not(.document_dark_yes)
.search3__input-outer-container {
    background-color: #f2f2f2 !important;
}

/* open — белый */
.document_neuro-redesign_yes:not(.document_dark_yes)
form.old3mhrbaCPvRG9Nv_open
.search3__input-outer-container {
    background-color: #ffffff !important;
}

/* =========================================================
   СТРАХОВКА
========================================================= */

.document_neuro-redesign_yes
form.old3mhrbaCPvRG9Nv_open
.search3__inner {
    overflow: hidden !important;
}
/* =========================================================
   ФИКС INLINE-STYLE У TEXTAREA
========================================================= */

/* тёмная тема */
.document_dark_yes
textarea.search3__input.old3mhrbaCPvRG9Nv__input {
    background-color: transparent !important;
    color: #e8e6e3 !important;
    caret-color: #e8e6e3 !important;
}

/* светлая neuro-тема */
.document_neuro-redesign_yes:not(.document_dark_yes)
textarea.search3__input.old3mhrbaCPvRG9Nv__input {
    background-color: transparent !important;
}
/* =========================================================
   HEADER SEARCH (mini-suggest) — ТЁМНАЯ ТЕМА
========================================================= */



.HeaderForm-Input.beauty-scroll.mini-suggest__control {


  background-color: #18181A !important;
  color: #ffffff !important;


}

.document_dark_yes
.HeaderForm-Input.mini-suggest__control {
    background-color: #18181A !important;
    color: #e8e6e3 !important;
}

.document_dark_yes
textarea.HeaderForm-Input.mini-suggest__input {
    background-color: transparent !important;
    color: #e8e6e3 !important;
    caret-color: #e8e6e3 !important;
}
/* ЖЁСТКО ПЕРЕБИВАЕМ INLINE ОТ ЯНДЕКСА */
.document_dark_yes
textarea.HeaderForm-Input.mini-suggest__input {
    background-color: transparent !important;
    color: #e8e6e3 !important;
    caret-color: #e8e6e3 !important;
}

/* даже если Яндекс пихает style="" */
.document_dark_yes
textarea.HeaderForm-Input.mini-suggest__input[style] {
    background-color: transparent !important;
}


`;

const style = document.createElement('style');
style.textContent = css;
document.documentElement.appendChild(style);

/* ====== ВОТ СЮДА ВСТАВЛЯЕМ ====== */
function applyHeaderFix() {
    const form = document.querySelector('.HeaderForm.mini-suggest');
    if (!form) return;

    const control = form.querySelector('.HeaderForm-Input.mini-suggest__control');
    const textarea = form.querySelector('textarea.HeaderForm-Input.mini-suggest__input');
    if (!control || !textarea) return;

    const isOpen = form.classList.contains('mini-suggest_search_yes');

    textarea.style.backgroundColor = 'transparent';
    textarea.style.color = '#e8e6e3';
    textarea.style.caretColor = '#e8e6e3';

    control.style.backgroundColor = isOpen ? '#222223' : '#18181A';
}

/* 🔥 СРАЗУ при загрузке */
new MutationObserver(() => applyHeaderFix())
    .observe(document.documentElement, { childList: true, subtree: true });

/* страховка */
setTimeout(applyHeaderFix, 0);
setTimeout(applyHeaderFix, 50);
setTimeout(applyHeaderFix, 150);


/* ====== КОНЕЦ ====== */

})();

   
