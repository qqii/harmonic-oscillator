"use strict";
var canvas;
var context;

var resize = function() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

var redraw = function() {
  context.lineWidth = '10';
  context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
  requestAnimationFrame(redraw);
}

var init = function() {
  canvas = document.getElementById('c');
  context = canvas.getContext('2d');

  window.addEventListener('resize', resize, false);

  resize();
  redraw();
}
