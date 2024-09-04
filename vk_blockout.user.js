_use// ==UserScript==
// @name         VK Blockout
// @namespace    vk_blockout
// @version      0.1
// @description  zalooper
// @author       elchupacabr
// @match        https://vk.com/feed
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vk.com
// @grant        none
// ==/UserScript==

document.querySelectorAll('div')
  .forEach(elem => elem.remove());

var div = document.createElement("div");
div.style.width = "100px";
div.style.height = "100px";
div.style.position = "fixed";
div.style.left = "50%";
div.style.top = "40%";
div.style.fontSize = "25pt";

div.style.color = "white";
div.innerHTML = "Вам пизда";
document.body.append(div);

