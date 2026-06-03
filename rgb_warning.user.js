// ==UserScript==
// @name         RGB Notification Bell Animation
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Плавная смена цвета иконки уведомления в стиле RGB
// @author       el4upackabr
// @match        *://*/*
// @grant        none
// ==/UserScript==


(function() {
    let hue = 0;

    function getDynamicSVG() {
        // Создаём свежий SVG с градиентом от HSL
        const color1 = `hsl(${hue}, 100%, 55%)`;
        const color2 = `hsl(${(hue + 30) % 360}, 100%, 65%)`;

        return `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
            <defs>
                <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${color1}"/>
                    <stop offset="100%" stop-color="${color2}"/>
                </linearGradient>
            </defs>
            <path d="m2.317 1045.143 19.727-35.411c1-1.793 2.896-1.86 3.946 0l19.727 34.951c.755 1.338-.032 3.68-1.973 3.68H4.29c-1.735 0-2.876-1.598-1.973-3.22z" fill="url(#g)" transform="translate(0 -1004.362)"/>
            <g transform="matrix(1.02127 0 0 1 -0.51 -1004.322)">
                <path d="M23.994 1018.264h.012c1.082 0 1.952.87 1.952 1.952v13.72c0 1.083-.87 1.953-1.952 1.953h-.012a1.948 1.948 0 0 1-1.952-1.952v-13.72c0-1.082.87-1.953 1.952-1.953z" fill="#fff"/>
                <rect width="3.917" height="3.917" x="22.042" y="1039.806" rx="17.233" ry="15.907" fill="#fff"/>
            </g>
        </svg>`;
    }

    setInterval(() => {
        const img = document.querySelector('img.sf-notification-btn');
        if (img && img.src.includes('svg')) {
            const newSvg = getDynamicSVG();
            img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(newSvg)));
            hue = (hue + 3) % 360;
        }
    }, 80);
})();
