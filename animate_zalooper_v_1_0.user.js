// ==UserScript==
// @name         Animate Zalooper
// @namespace    animate zalooper
// @version      1.0
// @description  try
// @author       el4upacabr
// @match        *://google.com/*
// @match        *://www.google.com/*
// @match        *://google.com
// @match        *://www.google.com
// @match        https://www.google.com
// @match        https://www.google.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

document.querySelectorAll('div')
  .forEach(elem => elem.remove());

var div = document.createElement("div");
div.style.width = "200px";
div.style.height = "100px";
div.style.position = "fixed";
div.style.left = "50vh";
div.style.top = "50vh";
div.style.fontSize = "25pt";
div.style.color = "red";
div.style.padding = "5px 25px";
div.style.border = "solid 2px #0d00ff";
div.innerHTML = "Вам пизда";
document.body.append(div);

function draw(progress) {
  div.style.left = progress + 'px';
}
function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}
function linear(timeFraction) {
  return timeFraction;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
animate({
  duration: 80000,
  timing(timeFraction) {
    return timeFraction;
  },
  draw(progress) {
    div.style.left = progress * getRandomInt(250) + '%';
    div.style.top = progress * getRandomInt(250) + '%';

  }
});
//alert("ёпта");
