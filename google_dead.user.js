// ==UserScript==
// @name         google dead
// @namespace    http://tampermonkey.net/
// @version      1.0
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

document.querySelector("#SIvCob").lastElementChild.textContent = "орлеанский";
document.querySelector("#SIvCob a").style.textDecoration = 'underline'
document.querySelector('.lnXdpd').src = 'https://elchupacabr.github.io/zerotrust/back%20to%20undeground%20(1).png';
document.querySelector('.lnXdpd').srcset = 'https://elchupacabr.github.io/zerotrust/back%20to%20undeground%20(1).png';
document.querySelector('.lnXdpd').height = 142
document.querySelector('.lnXdpd').style.maxHeight = '300px'
document.querySelectorAll('.gNO89b')
  .forEach(elem => elem.remove());
document.querySelectorAll('.RNmpXc')
  .forEach(elem => elem.remove());
document.querySelector('.ktLKi').textContent = 'Наше третье десятилетие борьбы с запором';

