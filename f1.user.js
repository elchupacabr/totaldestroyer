// ==UserScript==
// @name         F13
// @namespace    f13
// @version      3.2
// @updateURL    https://github.com/elchupacabr/totaldestroyer/raw/main/f1.user.js
// @downloadURL  https://github.com/elchupacabr/totaldestroyer/raw/main/f1.user.js
// @description  tryyy
// @author       el4upacabr
// @match        https://www.bing.com/search?q=%d1%81%d0%bf%d1%80%d0%b0%d0%b2%d0%ba%d0%b0+%d0%be%d0%b1+%d0%b8%d1%81%d0%bf%d0%be%d0%bb%d1%8c%d0%b7%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d0%b8+%d0%bf%d1%80%d0%be%d0%b2%d0%be%d0%b4%d0%bd%d0%b8%d0%ba%d0%b0+%d0%b2+windows&filters=guid:%224026535-ru-dia%22%20lang:%22ru%22&form=S00028
// @match        https://bing.com/search
// @match        https://www.bing.com/images/search?q=%d1%81%d0%bf%d1%80%d0%b0%d0%b2%d0%ba%d0%b0+%d0%be%d0%b1+%d0%b8%d1%81%d0%bf%d0%be%d0%bb%d1%8c%d0%b7%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d0%b8+%d0%bf%d1%80%d0%be%d0%b2%d0%be%d0%b4%d0%bd%d0%b8%d0%ba%d0%b0+%d0%b2+windows&form=HDRSC2&first=1
// @match        https://www.bing.com/search?q=%d1%81%d0%bf%d1%80%d0%b0%d0%b2%d0%ba%d0%b0+%d0%be%d0%b1+%d0%b8%d1%81%d0%bf%d0%be%d0%bb%d1%8c%d0%b7%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d0%b8+%d0%bf%d1%80%d0%be%d0%b2%d0%be%d0%b4%d0%bd%d0%b8%d0%ba%d0%b0+%d0%b2+windows&FORM=HDRSC1
// @icon         https://www.google.com/s2/favicons?sz=64&domain=microsoft.com
// @grant        none
// ==/UserScript==
document.querySelectorAll('#b_content')
  .forEach(elem => elem.remove());
document.querySelectorAll('footer')
  .forEach(elem => elem.remove());


var img = document.createElement("img");
img.src = "https://avatars.mds.yandex.net/i?id=fc78ba6a2e0a8525f853279529d26989_l-8981167-images-thumbs&n=13";
img.style.width = "100%";
img.style.overflow = "hidden";
document.body.append(img);
