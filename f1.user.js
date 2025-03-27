// ==UserScript==
// @name         F13
// @namespace    f13
// @version      5.0
// @updateURL    https://github.com/elchupacabr/totaldestroyer/raw/main/f1.user.js
// @downloadURL  https://github.com/elchupacabr/totaldestroyer/raw/main/f1.user.js
// @run-at       document-idle
// @description  tryyy
// @author       el4upacabr
// @match          *://bing.com/search*
// @match          *://bing.com/search?q=*
// @match          *://*.bing.com/search*
// @match          *://*.bing.com/search?q=*
// @match          *://www.bing.com/search*
// @match          *://www.bing.com/search?q=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @grant        none
// ==/UserScript==


document.querySelectorAll('#b_content')
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

