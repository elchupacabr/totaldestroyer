// ==UserScript==
// @name         Ebaniy_vk_video
// @namespace    ebaniy_vk_video
// @version      3.3
// @author       el4upacabr
// @description  Скрывает ненужные пункты меню, оставляет только выбранные вкладки и удаляет спортивные/шортс блоки
// @updateURL    https://github.com/elchupacabr/totaldestroyer/raw/main/ebanniy_vk_video.user.js
// @downloadURL  https://github.com/elchupacabr/totaldestroyer/raw/main/ebanniy_vk_video.user.js
// @match        *://vkvideo.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vkvideo.ru
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';


    // Функция для скрытия ненужных пунктов меню
    function hideMenuItems() {
        // Скрываем элементы бокового меню
        const menuItemsToHide = [0, 2, 3];
        const menuItems = document.querySelectorAll('.MenuList__item');

        menuItemsToHide.forEach(index => {
            if (menuItems[index]) {
                menuItems[index].style.display = 'none';

            }
        });

        // Скрываем дополнительные блоки
        const blocksToHide = ['sport_videos', 'vk_video_short_videos_top', 'tvshow_playlists', 'recommended_live_videos', 'serials', 'movies', 'subscribes_main'];
        blocksToHide.forEach(id => {
            const block = document.getElementById(id);
            if (block) {
                //block.style.display = 'none';
                block.remove();
                //для полного удаления
            }
        });
    }

    // Функция для фильтрации вкладок
    function filterTabs() {
        const tabsContainer = document.querySelector('.vkuiTabs__in');
        if (!tabsContainer) return;

        const allowedTabs = ['/', '/interview', '/music', '/tourisme', '/automotive', '/technology', '/movies', '/movies/comedy', '/movies/adventure', '/movies/fantastic', '/movies/action', '/movies/family', '/movies/melodrama', '/movies/drama', '/movies/biography', '/movies/detective', '/movies/thriller', '/movies/hororr', '/movies/soviet', '/movies/short', '/tvchannels', '/tvchannels/federal', '/tvchannels/entertaining', '/tvchannels/movie_series', '/tvchannels/music'];
        const tabs = tabsContainer.querySelectorAll('.vkuiTabsItem__host');

        tabs.forEach(tab => {
            const tabId = tab.getAttribute('id');
            if (!allowedTabs.includes(tabId)) {
                tab.remove();
            }
        });
    }
    /*
    function makeReturn() {
        const vkLink = document.querySelector('a[data-title="ВКонтакте"]');
        const vkLinked = document.querySelector('a[data-title="ВКонтакте"]').children[2];
        vkLink.id = "myLink";
        vkLinked.id = "myLinked";
        if (vkLink) {
            vkLink.setAttribute('href', 'https://vk.com/');
            vkLink.setAttribute('target', '_blank');
        }
    }
*/
    function makeReturn() {
    const vkLink = document.querySelector('a[data-testid="main_menu_trends"]');

    // Если элемент не найден — выходим из функции
    if (!vkLink) return;

    try {
        const vkLinked = vkLink.children[2]; // Может быть undefined, если нет третьего child

        // Если vkLinked существует, задаём ему id
        if (vkLinked) {
            vkLinked.id = "myLinked";
        }

        vkLink.id = "myLink";
        vkLink.setAttribute('href', 'https://vk.com/');
        vkLink.setAttribute('target', '_blank');
    } catch (error) {
        console.error("Ошибка в makeReturn():", error);
        // Можно просто игнорировать ошибку или обработать её
    }
}
    function applyKeyframeAnimation(element) {
        // Создаём стиль с keyframes
        const style = document.createElement("style");
        style.id = "dynamic-keyframes";
        document.head.appendChild(style);

        // Добавляем keyframes
        const keyframes = `
    @keyframes dynamicSlideIn {
      0% {
        background-color: red;
        color: white;
      }
      25%{
      background-color: yellow;
      color: black;
      }
       50% {
        background-color: green;
        color: black

      }
      75%{
      background-color: #71aaeb;
      color: white;
      }
       100% {
        background-color: #8000ff;
        color: white;
      }
    }
  `;

  // Добавляем стиль для элемента
  const animationRule = `
    #${element.id} {
      animation: dynamicSlideIn 8s linear forwards infinite;
    }
  `;

  style.textContent = keyframes + animationRule;
}
function aplyStyler() {
    const element = document.getElementById("myLinked");
    const eleme = document.getElementById("myLink");

    // Если элементы существуют и функция доступна — применяем анимацию
    if (element && typeof applyKeyframeAnimation === 'function') {
        applyKeyframeAnimation(element);
    }
    if (eleme && typeof applyKeyframeAnimation === 'function') {
        applyKeyframeAnimation(eleme);
    }
}

function handleLogoClick() {
const logo = document.querySelector('.VKVideoLogo.VKVideoLogoSpecial');
if (logo) {
  logo.addEventListener('click', function(e) {
    if (window.location.pathname === '/') {
      e.preventDefault();

      // Создаем индикатор загрузки
      const loader = document.createElement('div');
      Object.assign(loader.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '0%',
        height: '5px',
        backgroundColor: '#71aaeb',
        zIndex: '9999',
        transition: 'width 0.1s ease-out'
      });
      document.body.appendChild(loader);

      // Запускаем анимацию
      requestAnimationFrame(() => {
        loader.style.width = '100%';
      });

      // Перезагружаем страницу через 300 мс
      setTimeout(() => {
        window.location.reload();
      }, 30);
    }
  });
}
  }

    function handleHomeClick() {
const home = document.querySelector('[aria-label="На главную VK Видео"]');
if (home) {
  home.addEventListener('click', function(e) {
    if (window.location.pathname === '/') {
      e.preventDefault();

      // Создаем индикатор загрузки
      const loader = document.createElement('div');
      Object.assign(loader.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '0%',
        height: '3px',
        backgroundColor: '#434343',
        zIndex: '9999',
        transition: 'width 0.1s ease-out'
      });
      document.body.appendChild(loader);

      // Запускаем анимацию
      requestAnimationFrame(() => {
        loader.style.width = '100%';
      });

      // Перезагружаем страницу через 300 мс
      setTimeout(() => {
        window.location.reload();
      }, 30);
    }
  });
}
    }


function cleanCatalog() {
  // 1. Находим все элементы
  const headers = Array.from(document.querySelectorAll('[data-testid="catalog_header"]'));
  const contentBlocks = Array.from(document.querySelectorAll('.vkitGroup__horizontalContentExpanded--TKRW0'));
  const spacers = Array.from(document.querySelectorAll('.vkitSpacing__root--0aTQA'));
  const separators = Array.from(document.querySelectorAll('.vkuiSeparator__padded.vkuiSeparator__appearancePrimary.vkuiSeparator__directionHorizontal.vkuiRootComponent__host'));
  const categories = document.querySelectorAll('[data-testid="catalog_slider_video_showcase_vklive_categories_items"]');

  // 2. Определяем индекс элемента, который нужно оставить (последний)
  const keepIndex = headers.length - 1;

  // 3. Удаляем лишние элементы
  if (headers.length > 0) {
    // Заголовки
    headers.forEach((h, i) => i !== keepIndex && h.remove());

    // Контент-блоки
    contentBlocks.forEach((b, i) => i !== keepIndex && b.remove());

    // Разделители - удаляем все, кроме следующего за сохранённым блоком
    spacers.forEach((spacer, i) => {
      const shouldKeep = (spacer.previousElementSibling === headers[keepIndex]) ||
                        (spacer.previousElementSibling === contentBlocks[keepIndex]);
      if (!shouldKeep) spacer.remove();
    });
    separators.forEach(separator => separator.remove());

  }

  // 4. Категории (оставляем последнюю)
  if (categories.length > 1) {
    categories.forEach((cat, i) => i !== categories.length - 1 && cat.remove());
  }
}

function hideAnother() {
    const items = {
        "main_menu_vk_live": "none",
        "main_menu_popular_trends": "none",
        "main_menu_clips": "none",
        "main_menu_for_kids": "none",
        "main_menu_tvshow": "none",
        "main_menu_serial": "flex",
        "main_menu_politics": "none",
        "main_menu_sport": "none",
        "main_menu_interactives": "none",
        "main_menu_cybersport": "none",
        "main_menu_section_toggle": "flex"
    };

    for (const id in items) {
        const el = document.querySelector(`[data-testid="${id}"]`);
        if (el) {
            el.style.display = items[id];
        }
    }
}








    // Основная функция инициализации
    function init() {
        //hideMenuItems();
        filterTabs();
        makeReturn();
        //addVkReturnButton()
        aplyStyler();
        //handleLogoClick();
        handleHomeClick();
        //cleanCatalog();
        hideAnother();
        //ExitisVK();


    }

    // Вызываем сразу при загрузке
    init();

    // Отслеживаем динамические изменения
    const observer = new MutationObserver(function(mutations) {
        let needsUpdate = false;
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length > 0) {
                needsUpdate = true;
            }
        });
        if (needsUpdate) {
            init();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });

    // Для SPA-переходов
    window.addEventListener('popstate', init);
    window.addEventListener('pushstate', init);
    window.addEventListener('replacestate', init);

    // Периодическая проверка на случай, если MutationObserver не сработал
    setInterval(init, 50);
    console.clear();
})();
