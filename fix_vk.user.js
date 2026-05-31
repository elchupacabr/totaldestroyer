// ==UserScript==
// @name         VK Видео → Поиск видео
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Перенаправляет клик по пункту "Видео" на vk.ru/search/video
// @author       You
// @match        https://vk.com/*
// @match        https://vk.ru/*
// @match        https://vkvideo.ru/*
// @updateURL    https://github.com/elchupacabr/totaldestroyer/raw/main/fix_vk.user.js
// @downloadURL  https://github.com/elchupacabr/totaldestroyer/raw/main/fix_vk.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Функция для поиска пункта "Видео" разными способами
    function findVideoMenuItem() {
        // Способ 1: По data-testid
        let element = document.querySelector('[data-testid="leftmenuitem-text"]');
        if (element && element.textContent.trim() === 'Видео') return element;

        // Способ 2: По тексту в левом меню
        const allElements = document.querySelectorAll('[role="link"], a, .left_menu_item, .MenuItem');
        for (let el of allElements) {
            if (el.textContent.trim() === 'Видео' || el.textContent.includes('Видео')) {
                return el;
            }
        }

        // Способ 3: По классам VK
        const videoLinks = document.querySelectorAll('a[href*="vkvideo"], a[href*="/video"]');
        for (let link of videoLinks) {
            if (link.textContent.trim() === 'Видео' || link.querySelector('[data-testid="leftmenuitem-text"]')) {
                return link;
            }
        }

        return null;
    }

    // Основная функция
    function replaceVideoLink() {
        const videoElement = findVideoMenuItem();
        if (!videoElement) return false;

        // Находим ссылку (если это не сама ссылка)
        let link = videoElement.tagName === 'A' ? videoElement : videoElement.closest('a');

        if (link) {
            // Сохраняем оригинальный href для отладки
            console.log('VK Script: Найдена ссылка видео', link.href);

            // Меняем href
            link.href = 'https://vk.ru/search/video';

            // Удаляем все старые обработчики и добавляем свой
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            link = newLink;

            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('VK Script: Перенаправление на поиск видео');
                window.location.href = 'https://vk.ru/search/video';
            });

            return true;
        }

        return false;
    }

    // Ждём полной загрузки DOM
    function waitForElement() {
        if (replaceVideoLink()) return;

        // Периодически проверяем
        const interval = setInterval(() => {
            if (replaceVideoLink()) {
                clearInterval(interval);
            }
        }, 1000);

        // Останавливаем проверку через 30 секунд
        setTimeout(() => clearInterval(interval), 30000);
    }

    // Запускаем после загрузки страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForElement);
    } else {
        waitForElement();
    }

    // Наблюдаем за изменениями (для SPA навигации)
    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            setTimeout(waitForElement, 500);
        }
    }).observe(document, { subtree: true, childList: true });

    // Перехватываем все клики на странице (самый надёжный способ)
    document.addEventListener('click', (e) => {
        const target = e.target.closest('a');
        if (target && target.href && target.href.includes('vkvideo.ru')) {
            // Проверяем, что это пункт меню "Видео"
            const parent = target.closest('[role="link"], .MenuItem, .left_menu_item');
            if (parent && parent.textContent.includes('Видео')) {
                e.preventDefault();
                e.stopPropagation();
                console.log('VK Script: Перехвачен клик по видео');
                window.location.href = 'https://vk.ru/search/video';
            }
        }
    }, true);
})();
