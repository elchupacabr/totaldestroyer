// ==UserScript==
// @name         VK Видео → Поиск видео (SPA)
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Перенаправляет пункт "Видео" на поиск видео с сохранением SPA навигации
// @author       el4upackabr
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

    // Новый URL для видео
    const NEW_VIDEO_URL = 'https://vk.ru/search/video';
    
    // Функция для имитации клика по ссылке VK (SPA навигация)
    function navigateTo(url) {
        // Создаём событие, которое VK перехватывает для SPA навигации
        const event = new PopStateEvent('popstate');
        history.pushState({}, '', url);
        window.dispatchEvent(event);
        
        // Также пробуем вызвать их внутренний роутер
        const customEvent = new CustomEvent('vk-navigation', { detail: { url: url } });
        window.dispatchEvent(customEvent);
    }
    
    // Функция для поиска пункта "Видео"
    function findVideoLink() {
        // Прямой поиск ссылки
        const selectors = [
            'a[href*="vkvideo.ru"]',
            'a[href*="/video"]',
            '[data-testid="leftmenuitem-text"]',
            '.left_menu_item a',
            '.MenuItem a'
        ];
        
        for (let selector of selectors) {
            const elements = document.querySelectorAll(selector);
            for (let el of elements) {
                let text = el.textContent || el.innerText;
                let parent = el.closest('a') || el;
                if (text && text.trim() === 'Видео') {
                    return parent.tagName === 'A' ? parent : parent.closest('a');
                }
            }
        }
        
        // Поиск по всем ссылкам с текстом "Видео"
        const allLinks = document.querySelectorAll('a');
        for (let link of allLinks) {
            if (link.textContent.trim() === 'Видео') {
                return link;
            }
        }
        
        return null;
    }
    
    // Основная функция замены
    function replaceVideoLink() {
        const videoLink = findVideoLink();
        if (!videoLink) return false;
        
        // Проверяем, не изменяли ли мы уже эту ссылку
        if (videoLink.getAttribute('data-modified') === 'true') return true;
        
        console.log('VK Script: Найден пункт "Видео"', videoLink.href);
        
        // Сохраняем оригинальный href
        const originalHref = videoLink.href;
        
        // Меняем href на новый
        videoLink.href = NEW_VIDEO_URL;
        videoLink.setAttribute('data-original-href', originalHref);
        videoLink.setAttribute('data-modified', 'true');
        
        // Перехватываем клик
        videoLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('VK Script: Навигация на поиск видео');
            
            // Используем SPA навигацию VK
            navigateTo(NEW_VIDEO_URL);
            
            // Если SPA не сработал, делаем обычный переход
            setTimeout(() => {
                if (window.location.href !== NEW_VIDEO_URL) {
                    window.location.href = NEW_VIDEO_URL;
                }
            }, 100);
        });
        
        return true;
    }
    
    // Функция для обновления всех обработчиков
    function setupVideoLink() {
        if (replaceVideoLink()) {
            console.log('VK Script: Ссылка "Видео" успешно заменена');
        }
    }
    
    // Следим за изменениями в DOM
    function observeDOM() {
        setupVideoLink();
        
        const observer = new MutationObserver((mutations) => {
            let shouldCheck = false;
            
            for (let mutation of mutations) {
                if (mutation.addedNodes.length > 0) {
                    shouldCheck = true;
                    break;
                }
                if (mutation.type === 'attributes' && mutation.attributeName === 'href') {
                    shouldCheck = true;
                    break;
                }
            }
            
            if (shouldCheck) {
                setTimeout(setupVideoLink, 100);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['href']
        });
        
        return observer;
    }
    
    // Следим за изменением URL (переходы по SPA)
    function watchForSPANavigation() {
        let lastUrl = location.href;
        
        const observer = new MutationObserver(() => {
            const currentUrl = location.href;
            if (currentUrl !== lastUrl) {
                lastUrl = currentUrl;
                console.log('VK Script: URL изменился на', currentUrl);
                // Даём время на рендер нового меню
                setTimeout(setupVideoLink, 500);
            }
        });
        
        observer.observe(document, { subtree: true, childList: true });
        
        // Также перехватываем pushState
        const originalPushState = history.pushState;
        history.pushState = function() {
            originalPushState.apply(this, arguments);
            setTimeout(setupVideoLink, 500);
        };
        
        const originalReplaceState = history.replaceState;
        history.replaceState = function() {
            originalReplaceState.apply(this, arguments);
            setTimeout(setupVideoLink, 500);
        };
    }
    
    // Запуск скрипта
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            observeDOM();
            watchForSPANavigation();
        });
    } else {
        observeDOM();
        watchForSPANavigation();
    }
    
    // Дополнительная защита: перехватываем клики на странице
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.getAttribute('data-modified') === 'true') {
            // Это наша изменённая ссылка, ничего не делаем, обработчик выше сработает
            return;
        }
        
        if (link && link.textContent.trim() === 'Видео') {
            const href = link.href;
            if (href && (href.includes('vkvideo.ru') || href.includes('/video'))) {
                e.preventDefault();
                e.stopPropagation();
                console.log('VK Script: Перехвачен неподготовленный клик');
                navigateTo(NEW_VIDEO_URL);
            }
        }
    }, true);
    
    console.log('VK Script: Скрипт активирован');
})();
