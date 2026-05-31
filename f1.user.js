// ==UserScript==
// @name         F13
// @namespace    f13
// @version      6.3
// @updateURL    https://github.com/elchupacabr/totaldestroyer/raw/main/f1.user.js
// @downloadURL  https://github.com/elchupacabr/totaldestroyer/raw/main/f1.user.js
// @run-at       document-end
// @description  tryyy
// @author       el4upacabr
// @match        *://bing.com/search*
// @match        *://*.bing.com/search*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function cleanBing() {
        // Удаляем основной контент результатов (НО НЕ ХЕДЕР)
        const bContent = document.querySelector('#b_content');
        if (bContent) bContent.remove();

        // Удаляем только нижние футеры (НО НЕ ХЕДЕР)
        const footers = document.querySelectorAll('footer');
        footers.forEach(footer => {
            // Проверяем что это не хедер
            if (!footer.closest('#b_header') && !footer.closest('header')) {
                footer.remove();
            }
        });

        // Удаляем боковую панель
        const sidepanel = document.querySelector('#b_context, .b_sidepanel');
        if (sidepanel) sidepanel.remove();

        // НЕ ТРОГАЕМ #b_header (хедер остается)

        // Создаем элемент "Жопа"
        const div = document.createElement("div");
        div.style.cssText = `
            width: auto;
            min-width: 100px;
            padding: 20px;
            position: fixed;
            left: 50%;
            top: 40%;
            font-size: 55px;
            color: gray;
            transform: translate(-50%, -50%);
            z-index: 9999;
            background: none;

            text-align: center;
            font-weight: bold;

        `;
        div.innerHTML = "Жопа";
        document.body.appendChild(div);

        console.log('Bing cleaned, header preserved');
    }

    // Ждем загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', cleanBing);
    } else {
        cleanBing();
    }
})();
