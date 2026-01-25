// ==UserScript==
// @name         infinity
// @namespace    https://tampermonkey.net/
// @version      1.2
// @description  Нихера се
// @match        *://id.vk.com/*
// @match        *://id.vk.ru/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

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

    // ===== ИЗОБРАЖЕНИЯ =====
    const SOURCES = [
        'https://randart.ru/art/JD99/wallpapers/?v=1',
        'https://unsplash.it/1920/1920/?random',
        'https://unsplash.it/1920/1920/?gravity=center',
        'https://unsplash.it/1920/1080/?random',

        'https://unsplash.it/1920/1200/?random',
        'https://unsplash.it/2048/1152/?random',
        'https://unsplash.it/2560/2048/?random',
        'https://unsplash.it/2880/1800/?random',
        'https://unsplash.it/3000/2000/?random',
        'https://unsplash.it/3728/2481/?random',
        'https://unsplash.it/3840/2400/?random',
        'https://unsplash.it/4096/2560/?random',
        'https://unsplash.it/4579/3057/?random',
        'https://unsplash.it/1920/1080/?gravity=center',

        'https://unsplash.it/1920/1200/?random',
        'https://unsplash.it/2048/1152/?random',
        'https://unsplash.it/2560/2048/?random',
        'https://unsplash.it/2880/1800/?random',
        'https://unsplash.it/3000/2000/?random',
        'https://unsplash.it/3728/2481/?random',
        'https://unsplash.it/4096/2560/?random',
        'https://unsplash.it/4096/2560/?random',

        'https://unsplash.it/1920/1200/?gravity=center',
        'https://unsplash.it/2048/1152?gravity=center',
        'https://unsplash.it/2560/2048?gravity=center',
        'https://unsplash.it/2880/1800/?gravity=center',
        'https://unsplash.it/3000/2000/?gravity=center',
        'https://unsplash.it/3728/2481/?random',
        'https://loremflickr.com/1920/1080/nature',
        'https://randart.ru/art/JD99/wallpapers/?v=1'
         'https://randart.ru/art/JD99/wallpapers/?v=1',
        'https://loremflickr.com/1920/1080/landscape',
        'https://randart.ru/art/JD99/wallpapers/',
        'https://loremflickr.com/1920/1080/nature',
        'https://randart.ru/art/JD99/wallpapers/?v=1',
        'https://loremflickr.com/1920/1080/city'
    ];

    let images = [];

    BUTTON.addEventListener('click', changeTheme);

    // начальный фон
    waitForContainer(changeTheme);

    function changeTheme() {
        const container = getContainer();
        if (!container) return;

        if (!images.length) prepareImages();

        const [image] = images.splice(0, 1);

        container.style.backgroundImage = `url(${image})`;
        container.style.backgroundSize = 'cover';
        container.style.backgroundPosition = 'center';
        container.style.backgroundRepeat = 'no-repeat';
    }

    function prepareImages() {
        images = [...new Set(SOURCES)];
        images.sort(() => Math.random() - 0.5);
    }

    // Ждём, пока VK дорисует DOM
    function waitForContainer(cb) {
        const timer = setInterval(() => {
            if (getContainer()) {
                clearInterval(timer);
                cb();
            }
        }, 200);
    }
})();
