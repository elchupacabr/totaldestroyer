// ==UserScript==
// @name         VK Видео → Поиск видео (SPA)
// @namespace    http://tampermonkey.net/
// @version      4.0
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

    // Определяем текущий домен
    const currentDomain = window.location.origin;

    // Новый URL для видео (сохраняем текущий домен)
    const NEW_VIDEO_URL = currentDomain + '/search/video';

    console.log('VK Script: Текущий домен', currentDomain);
    console.log('VK Script: Новый URL видео', NEW_VIDEO_URL);

    // Функция для имитации клика по ссылке VK (SPA навигация)
    function navigateTo(url) {
        // Создаём событие, которое VK перехватывает для SPA навигации
        const event = new PopStateEvent('popstate');
        history.pushState({}, '', url);
        window.dispatchEvent(event);

        // Также пробуем вызвать их внутренний роутер
        const customEvent = new CustomEvent('vk-navigation', { detail: { url: url } });
        window.dispatchEvent(customEvent);

        // Дополнительно эмулируем клик для VK React роутера
        const fakeEvent = new Event('click', { bubbles: true });
        document.body.dispatchEvent(fakeEvent);
    }

    // Функция для поиска пункта "Видео"
    function findVideoLink() {
        // Прямой поиск ссылки с учётом разных доменов
        const selectors = [
            'a[href*="vkvideo.ru"]',
            'a[href*="video.vk.com"]',
            'a[href*="/video"]',
            'a[href*="video"]',
            '[data-testid="leftmenuitem-text"]',
            '.left_menu_item a',
            '.MenuItem a',
            '.left_menu__item a'
        ];

        for (let selector of selectors) {
            const elements = document.querySelectorAll(selector);
            for (let el of elements) {
                let text = el.textContent || el.innerText;
                let parent = el.closest('a') || el;
                if (text && (text.trim() === 'Видео' || text.includes('Видео'))) {
                    const link = parent.tagName === 'A' ? parent : parent.closest('a');
                    if (link) return link;
                }
            }
        }

        // Поиск по всем ссылкам с текстом "Видео"
        const allLinks = document.querySelectorAll('a');
        for (let link of allLinks) {
            const text = link.textContent.trim();
            if (text === 'Видео') {
                // Проверяем, что это ссылка в левом меню
                const isLeftMenu = link.closest('[data-testid="left-menu"], .left_menu, [role="navigation"]');
                if (isLeftMenu) return link;
                return link;
            }
        }

        return null;
    }

    // Проверяем, ведёт ли ссылка на видео
    function isVideoLink(href) {
        if (!href) return false;
        return href.includes('vkvideo.ru') ||
               href.includes('video.vk.com') ||
               href.includes('/video') ||
               href.includes('video') && !href.includes('search');
    }

    // Основная функция замены
    function replaceVideoLink() {
        const videoLink = findVideoLink();
        if (!videoLink) return false;

        // Проверяем, не изменяли ли мы уже эту ссылку
        if (videoLink.getAttribute('data-modified') === 'true') return true;

        // Проверяем, что это действительно ссылка на видео
        if (!isVideoLink(videoLink.href) && videoLink.href !== NEW_VIDEO_URL) {
            console.log('VK Script: Найдена ссылка, но это не видео', videoLink.href);
            // Всё равно пробуем заменить, если текст "Видео"
            if (videoLink.textContent.trim() !== 'Видео') return false;
        }

        console.log('VK Script: Найден пункт "Видео"', videoLink.href);

        // Сохраняем оригинальный href
        const originalHref = videoLink.href;

        // Меняем href на новый
        videoLink.href = NEW_VIDEO_URL;
        videoLink.setAttribute('data-original-href', originalHref);
        videoLink.setAttribute('data-modified', 'true');

        // Добавляем новый обработчик
        const newLink = videoLink.cloneNode(true);
        videoLink.parentNode?.replaceChild(newLink, videoLink);

        newLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            console.log('VK Script: Навигация на поиск видео ->', NEW_VIDEO_URL);

            // Используем SPA навигацию VK
            navigateTo(NEW_VIDEO_URL);

            // Если через 200ms URL не изменился, используем прямой переход
            setTimeout(() => {
                if (window.location.href !== NEW_VIDEO_URL && window.location.pathname !== '/search/video') {
                    console.log('VK Script: SPA не сработал, делаем прямой переход');
                    window.location.href = NEW_VIDEO_URL;
                }
            }, 200);
        });

        return true;
    }

    // Функция для обновления всех обработчиков
    function setupVideoLink() {
        if (replaceVideoLink()) {
            console.log('VK Script: Ссылка "Видео" успешно заменена');
        } else {
            // Пробуем ещё раз через таймаут
            setTimeout(() => {
                if (replaceVideoLink()) {
                    console.log('VK Script: Ссылка "Видео" успешно заменена (отложенно)');
                }
            }, 1000);
        }
    }

    // Следим за изменениями в DOM
    function observeDOM() {
        setupVideoLink();

        const observer = new MutationObserver((mutations) => {
            let shouldCheck = false;

            for (let mutation of mutations) {
                if (mutation.addedNodes.length > 0) {
                    for (let node of mutation.addedNodes) {
                        if (node.nodeType === 1) { // Element node
                            if (node.matches && (node.matches('a') || node.querySelector && node.querySelector('a'))) {
                                shouldCheck = true;
                                break;
                            }
                        }
                    }
                }
                if (mutation.type === 'attributes' && mutation.attributeName === 'href') {
                    shouldCheck = true;
                    break;
                }
                if (shouldCheck) break;
            }

            if (shouldCheck) {
                setTimeout(setupVideoLink, 150);
            }
        });

        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['href']
            });
        }

        return observer;
    }

    // Следим за изменением URL (переходы по SPA)
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

        // Перехватываем pushState
        const originalPushState = history.pushState;
        history.pushState = function() {
            originalPushState.apply(this, arguments);
            setTimeout(setupVideoLink, 300);
        };

        const originalReplaceState = history.replaceState;
        history.replaceState = function() {
            originalReplaceState.apply(this, arguments);
            setTimeout(setupVideoLink, 300);
        };
    }

    // Запуск скрипта с задержкой для полной загрузки
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

    // Дополнительная защита: перехватываем клики на странице
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.getAttribute('data-modified') === 'true') {
            return;
        }

        if (link && link.textContent.trim() === 'Видео') {
            const href = link.href;
            if (href && isVideoLink(href)) {
                e.preventDefault();
                e.stopPropagation();
                console.log('VK Script: Перехвачен клик по видео на', currentDomain);
                navigateTo(NEW_VIDEO_URL);
            }
        }
    }, true);

    console.log('VK Script: Скрипт активирован для', currentDomain);
})();
