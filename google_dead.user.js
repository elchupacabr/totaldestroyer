// ==UserScript==
// @name         google dead
// @namespace    http://tampermonkey.net/
// @version      3.0
// @updateURL    https://github.com/elchupacabr/totaldestroyer/raw/refs/heads/main/google_dead.user.js
// @downloadURL  https://github.com/elchupacabr/totaldestroyer/raw/refs/heads/main/google_dead.user.js
// @description  try to take over the world!
// @author       el4upackabr
// @match        https://www.google.com/*
// @match        *://www.google.com/*
// @match        *://*.google.com/*
// @match        *://google.com/*
// @match        https://www.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

//not worked хз почему
document.querySelector("#SIvCob").lastElementChild.textContent = "орлеанский";
document.querySelector("#SIvCob a").style.textDecoration = 'underline'
//
//==bonus
document.querySelector('.pHiOh').textContent = 'яяяяяяяязь'
document.querySelector('.lnXdpd').src = 'https://elchupacabr.github.io/zerotrust/back%20to%20undeground%20(1).png';
document.querySelector('.lnXdpd').srcset = 'https://elchupacabr.github.io/zerotrust/back%20to%20undeground%20(1).png';
document.querySelector('.lnXdpd').height = 142
document.querySelector('.lnXdpd').style.maxHeight = '300px'
document.querySelectorAll('.gNO89b')
  .forEach(elem => elem.remove());
document.querySelectorAll('.RNmpXc')
  .forEach(elem => elem.remove());
document.querySelectorAll('.FPdoLc.lJ9FBc')
  .forEach(elem => elem.remove());
// for USA and another countries except UA
document.querySelector('.ktLKi').textContent = 'Наше третье десятилетие борьбы с запором';

