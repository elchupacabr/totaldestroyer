// ==UserScript==
// @name         VK Video Cleaner
// @namespace    vk_video_cleaner
// @version      7.0
// @author       el4upacabr
// @description  Расширенная версия: умный возврат на исходный сайт + анимация
// @match        *://vkvideo.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vkvideo.ru
// @updateURL    https://github.com/elchupacabr/totaldestroyer/raw/main/ebanniy_vk_video.user.js
// @downloadURL  https://github.com/elchupacabr/totaldestroyer/raw/main/ebanniy_vk_video.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Определяем, откуда пришли на vkvideo.ru
    let sourceSite = 'vk.com'; // по умолчанию

    // Проверяем referrer
    const referrer = document.referrer;
    console.log('VK Video Cleaner: Referrer =', referrer);

    if (referrer.includes('vk.ru')) {
        sourceSite = 'vk.ru';
    } else if (referrer.includes('vk.com')) {
        sourceSite = 'vk.com';
    } else {
        // Если referrer пустой или не содержит VK, пробуем другие методы
        // Проверяем localStorage (если сохраняли ранее)
        const savedSource = localStorage.getItem('vk_video_source');
        if (savedSource && (savedSource === 'vk.com' || savedSource === 'vk.ru')) {
            sourceSite = savedSource;
        }
        // Проверяем sessionStorage
        const sessionSource = sessionStorage.getItem('vk_video_source');
        if (sessionSource && (sessionSource === 'vk.com' || sessionSource === 'vk.ru')) {
            sourceSite = sessionSource;
        }
    }

    // Сохраняем источник для будущих переходов
    localStorage.setItem('vk_video_source', sourceSite);
    sessionStorage.setItem('vk_video_source', sourceSite);

    const RETURN_URL = `https://${sourceSite}/`;
    console.log('VK Video Cleaner: Возврат будет на', RETURN_URL);

    // Создаём контейнер для уведомлений
    function createNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 20px',
            backgroundColor: type === 'success' ? '#4CAF50' : '#71aaeb',
            color: 'white',
            borderRadius: '8px',
            zIndex: '10000',
            fontSize: '14px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            opacity: '0',
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none'
        });
        document.body.appendChild(notification);

        // Анимация появления
        setTimeout(() => { notification.style.opacity = '1'; }, 10);

        // Автоматическое исчезновение
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 2000);

        return notification;
    }

    // Применяем анимацию к элементу
    function applyAnimation(element) {
        let style = document.getElementById("dynamic-keyframes");
        if (!style) {
            style = document.createElement("style");
            style.id = "dynamic-keyframes";
            document.head.appendChild(style);
        }

        const keyframes = `
            @keyframes dynamicColorChange {
                0% { background-color: red; color: white; }
                25% { background-color: yellow; color: black; }
                50% { background-color: green; color: black; }
                75% { background-color: #71aaeb; color: white; }
                100% { background-color: #8000ff; color: white; }
            }
        `;

        const animationRule = `
            #${element.id} {
                animation: dynamicColorChange 8s linear forwards infinite;
            }
        `;

        style.textContent = keyframes + animationRule;
    }

    // Кнопка возврата на исходный VK с анимацией
    function setupReturnButton() {
        const vkLink = document.querySelector('a[data-testid="main_menu_trends"]');
        if (!vkLink) return;

        try {
            const vkLinked = vkLink.children[2];
            if (vkLinked) {
                vkLinked.id = "returnButtonText";
                applyAnimation(vkLinked);
            }

            vkLink.id = "returnButton";
            vkLink.setAttribute('href', RETURN_URL);
            vkLink.setAttribute('target', '_blank');
            applyAnimation(vkLink);

            // Добавляем подсказку при наведении
            vkLink.title = `Вернуться на ${sourceSite}`;

        } catch (error) {
            console.error("Ошибка:", error);
        }
    }

    // Функция для умного возврата на главную
    function smartGoHome() {
        // Проверяем, есть ли в истории предыдущая страница (пришёл с vk.com или vk.ru)
        if (document.referrer && (document.referrer.includes('vk.com') || document.referrer.includes('vk.ru'))) {
            // Возвращаемся на предыдущую страницу
            console.log('VK Video Cleaner: Возврат на предыдущую страницу', document.referrer);
            window.location.href = document.referrer;
        } else {
            // Иначе идём на главную исходного сайта
            console.log('VK Video Cleaner: Возврат на главную', RETURN_URL);
            window.location.href = RETURN_URL;
        }
    }

    // Progress bar при клике на логотип с умным возвратом
    function setupLogoReload() {
        const logoSelectors = ['.VKVideoLogo.VKVideoLogoSpecial', '.VKVideoLogo', '[aria-label="VK Видео"]', '.logo'];
        let logo = null;

        for (let selector of logoSelectors) {
            logo = document.querySelector(selector);
            if (logo) break;
        }

        if (!logo) return;

        logo.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Создаём progress bar
            const loader = document.createElement('div');
            Object.assign(loader.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '0%',
                height: '3px',
                backgroundColor: '#71aaeb',
                zIndex: '9999',
                transition: 'width 0.3s ease-out'
            });
            document.body.appendChild(loader);

            // Анимация progress bar
            requestAnimationFrame(() => {
                loader.style.width = '100%';
            });

            // Умный возврат
            setTimeout(() => {
                smartGoHome();
            }, 200);
        });
    }

    // Добавляем дополнительную кнопку с информацией об источнике
    function addSourceInfo() {
        // Ждём, пока загрузится интерфейс
        setTimeout(() => {
            const targetContainer = document.querySelector('.VKVideoLeftMenu');
            if (!targetContainer) return;

            const infoBlock = document.createElement('div');
            infoBlock.innerHTML = `
                <div style="
                    padding: 12px 16px;
                    margin: 10px;
                    background: rgba(113, 170, 235, 0.1);
                    border-radius: 12px;
                    font-size: 12px;
                    color: #71aaeb;
                    text-align: center;
                    cursor: default;
                ">
                    🔄 Возврат на ${sourceSite}<br>
                    <span style="font-size: 10px; opacity: 0.7;">Клик по логотипу ↑</span>
                </div>
            `;

            // Вставляем в начало меню
            targetContainer.insertBefore(infoBlock, targetContainer.firstChild);
        }, 1000);
    }

    // Обработка перехода на главную через меню
    function handleMenuItemClicks() {
        const menuItems = document.querySelectorAll('.VKVideoLeftMenu a, [role="menuitem"]');
        menuItems.forEach(item => {
            if (item.textContent.includes('Главная') && !item.hasAttribute('data-handled')) {
                item.setAttribute('data-handled', 'true');
                item.addEventListener('click', (e) => {
                    // Если мы уже на главной, делаем умный возврат
                    if (window.location.pathname === '/' || window.location.pathname === '') {
                        e.preventDefault();
                        e.stopPropagation();
                        smartGoHome();
                    }
                });
            }
        });
    }

    // Инициализация
    function init() {
        setupReturnButton();
        setupLogoReload();
        handleMenuItemClicks();
        addSourceInfo();

        // Показываем уведомление о том, куда будет возврат
        setTimeout(() => {
            createNotification(`✨ При клике на логотип вернёт на ${sourceSite}`, 'success');
        }, 2000);
    }

    // Ждём полной загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Отслеживание динамических изменений (для SPA)
    const observer = new MutationObserver(() => {
        setupReturnButton();
        handleMenuItemClicks();
        addSourceInfo();
    });

    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Для переходов внутри SPA
    window.addEventListener('popstate', () => {
        setTimeout(() => {
            setupReturnButton();
            handleMenuItemClicks();
        }, 500);
    });

    console.log('VK Video Cleaner: Скрипт запущен. Источник:', sourceSite, 'Возврат на:', RETURN_URL);
})();
