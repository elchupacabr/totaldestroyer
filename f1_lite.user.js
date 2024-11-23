// ==UserScript==
// @name         F1 Lite
// @namespace    f1 lite
// @version      2.4
// @description  try to take over the world!
// @author       el4upackabr
// @match        https://www.bing.com/search?q=%d1%81%d0%bf%d1%80%d0%b0%d0%b2%d0%ba%d0%b0+%d0%be%d0%b1+%d0%b8%d1%81%d0%bf%d0%be%d0%bb%d1%8c%d0%b7%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d0%b8+%d0%bf%d1%80%d0%be%d0%b2%d0%be%d0%b4%d0%bd%d0%b8%d0%ba%d0%b0+%d0%b2+windows&filters=guid:%224026535-ru-dia%22%20lang:%22ru%22&form=S00028
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
