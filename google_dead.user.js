// ==UserScript==
// @name         google dead
// @namespace    http://tampermonkey.net/
// @version      5.2
// @updateURL    https://github.com/elchupacabr/totaldestroyer/raw/refs/heads/main/google_dead.user.js
// @downloadURL  https://github.com/elchupacabr/totaldestroyer/raw/refs/heads/main/google_dead.user.js
// @description  try to take over the world!
// @author       el4upackabr
// @match        https://www.google.com/*
// @match        *://www.google.com/*
// @match        *://*.google.com/*
// @match        *://google.com/*
// @updateURL    https://github.com/elchupacabr/totaldestroyer/raw/refs/heads/main/google_dead.user.js
// @downloadURL  https://github.com/elchupacabr/totaldestroyer/raw/refs/heads/main/google_dead.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function modifyGoogle() {
        // 1. ЛОГОТИП
        const logo = document.querySelector('[alt="Google"]');
        if (logo) {
            logo.src = 'https://elchupacabr.github.io/zerotrust/back%20to%20undeground%20(1).png';
            logo.srcset = 'https://elchupacabr.github.io/zerotrust/back%20to%20undeground%20(1).png';
            logo.style.maxHeight = '160px';
            logo.style.width = 'auto';
        }

        // 2. ТЕКСТ ktLKi (ВАШ ОСНОВНОЙ ЭЛЕМЕНТ)
        const climateText = document.querySelector('.ktLKi');
        if (climateText) {
            climateText.textContent = 'Наше третье десятилетие борьбы с запором';
            console.log('✓ ktLKi text changed');
        }

        // 3. ПОДВАЛ pHiOh
        const phiOh = document.querySelector('.pHiOh');
        if (phiOh && phiOh.textContent) {
            phiOh.textContent = 'яяяяяяяязь';
        }

        // 4. ССЫЛКИ В ПОДВАЛЕ
        const footerLinks = document.querySelectorAll('.KxwPGc a, [role="contentinfo"] a');
        footerLinks.forEach(link => {
            link.style.textDecoration = 'underline';
        });

        // 5. УДАЛЕНИЕ КНОПОК
        const searchBtn = document.querySelector('input[value="Поиск в Google"], input[value="Google Search"]');
        const luckyBtn = document.querySelector('input[value="Мне повезет"], input[value="I\'m Feeling Lucky"]');

        if (searchBtn) searchBtn.remove();
        if (luckyBtn) luckyBtn.remove();
    }

    // Ждем загрузки
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(modifyGoogle, 300));
    } else {
        setTimeout(modifyGoogle, 300);
    }
})();
