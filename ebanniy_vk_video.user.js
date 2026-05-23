// ==UserScript==
// @name         VK Video Cleaner
// @namespace    vk_video_cleaner
// @version      1.0
// @author       el4upacabr
// @description  Упрощённая версия: кнопка выхода с анимацией и перезагрузка по клику на логотип
// @match        *://vkvideo.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vkvideo.ru
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Применяем анимацию к элементу
    function applyAnimation(element) {
        const style = document.createElement("style");
        style.id = "dynamic-keyframes";
        document.head.appendChild(style);

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

    // Кнопка возврата на VK с анимацией
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
            vkLink.setAttribute('href', 'https://vk.com/');
            vkLink.setAttribute('target', '_blank');
            applyAnimation(vkLink);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    }

    // Progress bar при клике на логотип (фоновая перезагрузка)
    function setupLogoReload() {
        const logo = document.querySelector('.VKVideoLogo.VKVideoLogoSpecial');
        if (!logo) return;

        logo.addEventListener('click', function(e) {
            if (window.location.pathname === '/') {
                e.preventDefault();

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
                    transition: 'width 0.2s ease-out'
                });
                document.body.appendChild(loader);

                // Анимация progress bar
                requestAnimationFrame(() => {
                    loader.style.width = '100%';
                });

                // Фоновая перезагрузка
                setTimeout(() => {
                    window.location.reload();
                }, 200);
            }
        });
    }

    // Инициализация
    function init() {
        setupReturnButton();
        setupLogoReload();
    }

    // Запуск при загрузке
    init();

    // Отслеживание динамических изменений (для SPA)
    const observer = new MutationObserver(() => init());
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Для переходов внутри SPA
    window.addEventListener('popstate', init);

    console.clear();
})();
