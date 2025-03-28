// ==UserScript==
// @name         Microsofy
// @namespace    microsofy
// @version      1.6
// @updateURL    https://github.com/elchupacabr/totaldestroyer/raw/main/microsofy.user.js
// @downloadURL  https://github.com/elchupacabr/totaldestroyer/raw/main/microsofy.user.js
// @description  skibidi hehehe
// @author       el4upacabr
// @match        https://www.microsoft.com/ru-ru/
// @match        https://www.microsoft.com/ru-ru
// @match        *://www.microsoft.com/*
// @match        *://*.microsoft.com/*
// @match        https://www.microsoft.com/ru-ru/*
// @match        https://www.microsoft.com/uk-ua/*
// @match        https://www.microsoft.com/en-us/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=microsoft.com
// @grant        none
// ==/UserScript==

document.querySelectorAll('.aem-Grid')
  .forEach(elem => elem.remove());
document.querySelectorAll('footer')
  .forEach(elem => elem.remove());

var div = document.createElement("div");
div.style.width = "100px";
div.style.height = "100px";
div.style.position = "fixed";
div.style.left = "50%";
div.style.top = "40%";
div.style.fontSize = "55px";

div.style.color = "color";
div.innerHTML = "Жопа";
document.body.append(div);
