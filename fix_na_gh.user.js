// ==UserScript==
// @name         fix_na_gh
// @namespace    https://tampermonkey.net/
// @version      1.0
// @description  Нихера се
// @match        *://github.com/*
// @updateURL    https://github.com/elchupacabr/totaldestroyer/raw/main/fix_na_gh.user.js
// @downloadURL  https://github.com/elchupacabr/totaldestroyer/raw/main/fix_na_gh.user.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

const style = document.createElement('style');
style.textContent = `
 
  .cm-content{
background-color: #00000000 !important;
}
`;

document.head.appendChild(style);



})();

   
