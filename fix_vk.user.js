// ==UserScript==
// @name         VK Видео → Поиск видео (SPA)
// @namespace    http://tampermonkey.net/
// @version      5.0
// @description  Перенаправляет пункт "Видео" на поиск видео с сохранением SPA навигации
// @author       elchupacabr
// @match        https://vk.com/*
// @match        https://vk.ru/*
// @match        https://vkvideo.ru/*
// @grant        none
// @updateURL    https://github.com/elchupacabr/totaldestroyer/raw/refs/heads/main/fix_vk.user.js
// @downloadURL  https://github.com/elchupacabr/totaldestroyer/raw/refs/heads/main/fix_vk.user.js
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Проверяем, находимся ли мы на vkvideo.ru
    const isVkVideo = window.location.hostname === 'vkvideo.ru';

    // Определяем текущий домен для поиска
    const currentDomain = window.location.origin;
    const NEW_VIDEO_URL = currentDomain + '/search/video';

    console.log('VK Script: Текущий домен', currentDomain);
    console.log('VK Script: Режим vkvideo.ru', isVkVideo);
    console.log('VK Script: Новый URL видео', NEW_VIDEO_URL);

    // Функция для имитации клика по ссылке VK (SPA навигация)
    function navigateTo(url) {
        const event = new PopStateEvent('popstate');
        history.pushState({}, '', url);
        window.dispatchEvent(event);

        const customEvent = new CustomEvent('vk-navigation', { detail: { url: url } });
        window.dispatchEvent(customEvent);

        const fakeEvent = new Event('click', { bubbles: true });
        document.body.dispatchEvent(fakeEvent);
    }

    // Функция для поиска пункта "Видео" ТОЛЬКО в главном левом меню
    function findVideoLink() {
        // Ищем контейнер левого меню
        const leftMenuSelectors = [
            '[data-testid="left-menu"]',
            '.left_menu',
            '[role="navigation"]',
            '.LeftMenu',
            '.vkuiPanelHeader__in'
        ];

        let leftMenu = null;
        for (let selector of leftMenuSelectors) {
            leftMenu = document.querySelector(selector);
            if (leftMenu) break;
        }

        // Если нашли левое меню, ищем ссылку "Видео" только в нём
        if (leftMenu) {
            const videoLinks = leftMenu.querySelectorAll('a');
            for (let link of videoLinks) {
                const text = link.textContent.trim();
                if (text === 'Видео') {
                    console.log('VK Script: Найден пункт "Видео" в левом меню');
                    return link;
                }
            }
        }

        // Fallback: ищем ссылку, но проверяем, что она НЕ внутри канала/профиля
        const allLinks = document.querySelectorAll('a');
        for (let link of allLinks) {
            const text = link.textContent.trim();
            if (text === 'Видео') {
                // Проверяем, что ссылка не находится внутри вкладок канала/профиля
                const isInChannelTabs = link.closest('[role="tablist"], .Tabs, .ProfileTabs, .GroupTabs, [data-testid="tabs"]');
                const isInLeftMenu = link.closest('[data-testid="left-menu"], .left_menu, [role="navigation"]');

                // Если это вкладка канала - пропускаем
                if (isInChannelTabs && !isInLeftMenu) {
                    console.log('VK Script: Пропускаем вкладку "Видео" в канале');
                    continue;
                }

                // Если это левое меню или не определено - используем
                if (isInLeftMenu || !isInChannelTabs) {
                    console.log('VK Script: Найден пункт "Видео" (не вкладка канала)');
                    return link;
                }
            }
        }

        return null;
    }

    // Проверяем, ведёт ли ссылка на видео (для левого меню)
    function isVideoLink(href) {
        if (!href) return false;
        // Проверяем, что это ссылка на раздел видео, а не на поиск
        return (href.includes('vkvideo.ru') || href.includes('/video')) && !href.includes('/search/video');
    }

    // Проверяем, является ли текущий URL страницей канала/профиля
    function isChannelOrProfilePage() {
        const url = window.location.pathname;
        // Проверяем, что это страница канала (@username или /clubXXX)
        return url.match(/^\/@[\w\._-]+/) || url.match(/^\/club\d+/) || url.match(/^\/id\d+/);
    }

    // Основная функция замены (только для левого меню)
    function replaceVideoLink() {
        // На vkvideo.ru заменяем только если это НЕ страница канала
        if (isVkVideo && isChannelOrProfilePage()) {
            console.log('VK Script: На странице канала на vkvideo.ru, пропускаем замену');
            return false;
        }

        const videoLink = findVideoLink();
        if (!videoLink) return false;

        // Проверяем, не изменяли ли мы уже эту ссылку
        if (videoLink.getAttribute('data-modified') === 'true') return true;

        // Дополнительная проверка: не заменяем вкладки каналов
        const isTab = videoLink.closest('[role="tab"], .Tab, [data-testid="tab"]');
        if (isTab) {
            console.log('VK Script: Это вкладка, а не пункт меню, пропускаем');
            return false;
        }

        console.log('VK Script: Заменяем пункт "Видео"', videoLink.href, '->', NEW_VIDEO_URL);

        // Меняем href на новый
        videoLink.href = NEW_VIDEO_URL;
        videoLink.setAttribute('data-modified', 'true');

        // Удаляем старый обработчик и добавляем новый
        const newLink = videoLink.cloneNode(true);
        videoLink.parentNode?.replaceChild(newLink, videoLink);

        newLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            console.log('VK Script: Навигация на поиск видео');

            navigateTo(NEW_VIDEO_URL);

            setTimeout(() => {
                if (window.location.pathname !== '/search/video') {
                    console.log('VK Script: SPA не сработал, делаем прямой переход');
                    window.location.href = NEW_VIDEO_URL;
                }
            }, 200);
        });

        return true;
    }

    function setupVideoLink() {
        if (replaceVideoLink()) {
            console.log('VK Script: Ссылка "Видео" успешно заменена');
        }
    }

    // Следим за изменениями в DOM
    function observeDOM() {
        setupVideoLink();

        const observer = new MutationObserver(() => {
            setTimeout(setupVideoLink, 150);
        });

        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        return observer;
    }

    // Следим за изменением URL
    function watchForSPANavigation() {
        let lastUrl = location.href;

        setInterval(() => {
            const currentUrl = location.href;
            if (currentUrl !== lastUrl) {
                lastUrl = currentUrl;
                console.log('VK Script: URL изменился на', currentUrl);
                setTimeout(setupVideoLink, 500);
            }
        }, 1000);

        const originalPushState = history.pushState;
        history.pushState = function() {
            originalPushState.apply(this, arguments);
            setTimeout(setupVideoLink, 300);
        };
    }

    function init() {
        console.log('VK Script: Инициализация для', currentDomain);
        observeDOM();
        watchForSPANavigation();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    console.log('VK Script: Скрипт активирован для', currentDomain);
})();
