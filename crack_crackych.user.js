// ==UserScript==
// @name         RhzrRhzrsx
// @namespace    rhzrrhzrsx
// @version      2.1
// @description  Скрывает ненужные пункты меню, оставляет только выбранные вкладки и удаляет спортивные/шортс блоки
// @match        *://vkvideo.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vkvideo.ru
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Конфигурация
    const CONFIG = {
        HIDDEN_MENU_ITEMS: [0, 2, 3, 14, 17, 18, 19, 22, 23, 26, 27],
        HIDDEN_BLOCKS: [
            'sport_videos', 'vk_video_short_videos_top', 'tvshow_playlists',
            'recommended_live_videos', 'serials', 'movies', 'subscribes_main'
        ],
        ALLOWED_TABS: [
            '/', '/interview', '/music', '/tourisme', '/automotive', '/technology',
            '/movies', '/movies/comedy', '/movies/adventure', '/movies/fantastic',
            '/movies/action', '/movies/family', '/movies/melodrama', '/movies/drama',
            '/movies/biography', '/movies/detective', '/movies/thriller',
            '/movies/hororr', '/movies/soviet', '/movies/short', '/tvchannels',
            '/tvchannels/federal', '/tvchannels/entertaining', '/tvchannels/movie_series',
            '/tvchannels/music'
        ]
    };

    // Кэш для часто используемых элементов
    const cache = {
        menuItems: null,
        tabsContainer: null,
        vkLink: null
    };

    // Функция для скрытия ненужных пунктов меню
    function hideMenuItems() {
        if (!cache.menuItems) {
            cache.menuItems = document.querySelectorAll('.MenuList__item');
        }

        CONFIG.HIDDEN_MENU_ITEMS.forEach(index => {
            if (cache.menuItems[index]) {
                cache.menuItems[index].remove(); // Полное удаление вместо скрытия
            }
        });

        CONFIG.HIDDEN_BLOCKS.forEach(id => {
            const block = document.getElementById(id);
            if (block) block.remove();
        });
    }

    // Функция для фильтрации вкладок
    function filterTabs() {
        if (!cache.tabsContainer) {
            cache.tabsContainer = document.querySelector('.vkuiTabs__in');
            if (!cache.tabsContainer) return;
        }

        const tabs = cache.tabsContainer.querySelectorAll('.vkuiTabsItem__host');
        tabs.forEach(tab => {
            const tabId = tab.getAttribute('id');
            if (!CONFIG.ALLOWED_TABS.includes(tabId)) {
                tab.remove();
            }
        });
    }

    // Настройка ссылки "ВКонтакте"
    function setupVkLink() {
        if (!cache.vkLink) {
            cache.vkLink = document.querySelector('a[data-title="ВКонтакте"]');
            if (!cache.vkLink) return;
            
            const vkLinked = cache.vkLink.children[2];
            cache.vkLink.id = "myLink";
            vkLinked.id = "myLinked";
            cache.vkLink.setAttribute('href', 'https://vk.com/');
            cache.vkLink.setAttribute('target', '_blank');
        }
    }

    // Анимация для элементов
    function applyKeyframeAnimation() {
        const styleId = "dynamic-keyframes";
        if (!document.getElementById(styleId)) {
            const style = document.createElement("style");
            style.id = styleId;
            style.textContent = `
                @keyframes dynamicSlideIn {
                    0% { background-color: red; }
                    25% { background-color: yellow; }
                    50% { background-color: green; }
                    75% { background-color: #71aaeb; }
                    100% { background-color: #8000ff; }
                }
                #myLink, #myLinked {
                    animation: dynamicSlideIn 8s linear forwards infinite;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Обработчики кликов
    function setupClickHandlers() {
        // Логотип
        const logo = document.querySelector('.VKVideoLogo.VKVideoLogoSpecial');
        if (logo) {
            logo.addEventListener('click', function(e) {
                if (window.location.pathname === '/') {
                    e.preventDefault();
                    showLoader('#363738');
                    setTimeout(() => window.location.reload(), 30);
                }
            });
        }

        // Домашняя страница
        const home = document.querySelector('.MenuList__item.MenuList__item--active');
        if (home) {
            home.addEventListener('click', function(e) {
                if (window.location.pathname === '/') {
                    e.preventDefault();
                    showLoader('#434343');
                    setTimeout(() => window.location.reload(), 30);
                }
            });
        }
    }

    // Показать индикатор загрузки
    function showLoader(color) {
        const loader = document.createElement('div');
        Object.assign(loader.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '0%',
            height: '3px',
            backgroundColor: color,
            zIndex: '9999',
            transition: 'width 0.1s ease-out'
        });
        document.body.appendChild(loader);
        requestAnimationFrame(() => loader.style.width = '100%');
    }

    // Очистка каталога
    function cleanCatalog() {
        const headers = Array.from(document.querySelectorAll('[data-testid="catalog_header"]'));
        if (headers.length === 0) return;

        const keepIndex = headers.length - 1;
        
        // Удаляем лишние заголовки
        headers.forEach((h, i) => i !== keepIndex && h.remove());

        // Удаляем связанные контент-блоки
        const contentBlocks = Array.from(document.querySelectorAll('.vkitGroup__horizontalContentExpanded--TKRW0'));
        contentBlocks.forEach((b, i) => i !== keepIndex && b.remove());

        // Удаляем разделители
        document.querySelectorAll('.vkitSpacing__root--0aTQA, .vkuiSeparator__padded').forEach(el => el.remove());

        // Категории (оставляем последнюю)
        const categories = document.querySelectorAll('[data-testid="catalog_slider_video_showcase_vklive_categories_items"]');
        if (categories.length > 1) {
            categories.forEach((cat, i) => i !== categories.length - 1 && cat.remove());
        }
    }

    // Дебаунс для уменьшения количества вызовов
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    // Основная функция инициализации
    const init = debounce(function() {
        hideMenuItems();
        filterTabs();
        setupVkLink();
        applyKeyframeAnimation();
        setupClickHandlers();
        cleanCatalog();
    }, 100);

    // MutationObserver для динамического контента
    const observer = new MutationObserver(function(mutations) {
        if (mutations.some(m => m.addedNodes.length > 0)) {
            init();
        }
    });

    // Инициализация
    document.addEventListener('DOMContentLoaded', init);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('popstate', init);

    // Периодическая проверка (реже, чем в оригинале)
    setInterval(init, 1000);
    console.clear();
})();
