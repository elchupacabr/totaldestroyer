// ==UserScript==
// @name         Microsofy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://www.microsoft.com/*
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
