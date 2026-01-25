// ==UserScript==
// @name         personalize vk id
// @namespace    https://tampermonkey.net/
// @version      1.3
// @description  Нихера се
// @match        *://id.vk.com/*
// @match        *://id.vk.ru/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const STORAGE_KEY = 'vk_auth_bg';

    // ===== СТИЛИ КНОПКИ =====
    const style = document.createElement('style');
    style.textContent = `
        .block {
            border: none;
            float: left;
            width: 67px;
            height: 67px;
            margin-right: 5px;
            transition: all 0.8s linear;
            background-color: transparent;
            background-size: 90%;
            background-repeat: no-repeat;
            background-image: url(https://elchupacabr.github.io/zerotrust//img/transparent.png);
            background-position: center;
            position: fixed;
            top: 15px;
            left: 10px;
            z-index: 9999;
            cursor: pointer;
        }

        .block:active {
            transform: rotate(9720deg);
        }
    `;
    document.head.appendChild(style);

    // ===== КНОПКА =====
    let BUTTON = document.querySelector('button[name="theme"]');
    if (!BUTTON) {
        BUTTON = document.createElement('button');
        BUTTON.className = 'block';
        BUTTON.name = 'theme';
        document.body.appendChild(BUTTON);
    }

    // ===== КОНТЕЙНЕР VK =====
    function getContainer() {
        return document.querySelector('.vkc__AuthRoot__rootContainer');
    }

    // ===== ИСТОЧНИКИ =====
    const SOURCES = [
        'https://randart.ru/art/JD99/wallpapers/?v=1',
        'https://randart.ru/art/JD99/wallpapers',
        'https://loremflickr.com/1920/1080/nature'
    ];

    // ===== Функции =====
    function getRandomImage() {
        const src = SOURCES[Math.floor(Math.random() * SOURCES.length)];
        return `${src}&r=${Date.now()}`; // добавляем уникальный параметр, чтобы картинка точно была новой
    }

    function applyImage(url) {
        const container = getContainer();
        if (!container) return;
        container.style.backgroundImage = `url(${url})`;
        container.style.backgroundSize = 'cover';
        container.style.backgroundPosition = 'center';
        container.style.backgroundRepeat = 'no-repeat';
    }

    function changeTheme() {
        const newImage = getRandomImage();
        localStorage.setItem(STORAGE_KEY, newImage);
        applyImage(newImage);
    }

    // ===== Ждём контейнер VK и ставим фон =====
    function waitForContainer(cb) {
        const timer = setInterval(() => {
            if (getContainer()) {
                clearInterval(timer);
                cb();
            }
        }, 200);
    }

    // ===== При загрузке страницы ставим сохранённый фон =====
    waitForContainer(() => {
        const savedImage = localStorage.getItem(STORAGE_KEY);
        if (savedImage) {
            applyImage(savedImage);
        } else {
            changeTheme(); // первый фон, если нет сохранённого
        }
    });

    // ===== Клик по кнопке =====
    BUTTON.addEventListener('click', changeTheme);

})();
