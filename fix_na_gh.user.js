// ==UserScript==
// @name         fix github
// @namespace    https://tampermonkey.net/
// @version      1.0
// @description  Нихера се
// @match        *://github.com/*
// @match        *://www.bing.com/*
// @updateURL    https://github.com/elchupacabr/totaldestroyer/raw/main/fix_na_gh.user.js
// @downloadURL  https://github.com/elchupacabr/totaldestroyer/raw/main/fix_na_gh.user.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

const style = document.createElement('style');
style.textContent = `

  .cm-content {
  color: #fff !important;
  background-color: #00000000 !important;
  }
.prc-components-Input-IwWrt{
  color: #fff !important;
  background-color: #00000000 !important;
}
.sb_form_q{
 background-color: #00000000 !important;
 color: #000 !important;
}
`;

document.head.appendChild(style);



})();


