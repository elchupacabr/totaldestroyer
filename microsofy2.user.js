// ==UserScript==
// @name         Microsofy2
// @namespace    microsofy2
// @version      2.3
// @description  try to take over the world!
// @author       el4upacabr
// @match        https://www.microsoft.com/ru-ru/
// @match        https://www.microsoft.com/ru-ru
// @match        *://www.microsoft.com/*
// @match        https://www.microsoft.com/ru-ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=microsoft.com
// @grant        none
// ==/UserScript==
document.querySelectorAll('.aem-Grid')
  .forEach(elem => elem.remove());
document.querySelectorAll('footer')
  .forEach(elem => elem.remove());
document.querySelectorAll('iframe')
  .forEach(elem => elem.remove());
var img = document.createElement("img");
img.src = "https://avatars.mds.yandex.net/i?id=fc78ba6a2e0a8525f853279529d26989_l-8981167-images-thumbs&n=13";
img.style.width = "100%";

document.body.append(img);
