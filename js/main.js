"use strict";
var canvas;
var context;

var Point = function(x, y) {
  this.x = x;
  this.y = y;
}

var Line = function(p1, p2) {
  this[0] = p1;
  this[1] = p2;
}

Line.prototype.draw = function(context) {
  context.beginPath();
  context.moveTo(this[0].x, this[0].y);
  context.lineTo(this[1].x, this[1].y);
  context.stroke();
}

var Slice = function(x, ys) {
  this.x  = x;
  this.ys = ys;
}

Slice.prototype.lines = function() {
  var x = this.x;
  var ys = this.ys;
  var ret;
  var temp;

  this.ys = ys.sort();
  temp = ys.slice();
  temp.unshift(temp.pop());

  ret = ys.map(function (e, i) {
    return new Line(new Point(x, temp[i]),
                    new Point(x, ys[i]));
  });

  // replace every other
  for (var i = 0; i <= ret.length; i += 2) {
    ret.splice(i, 1);
  }

  return ret;
}

var step  = 0;
var lines = 100;
var ymax  = 200;
var rad   = 5;
var ratio = 0.25;
var xpos  = 20;
var ypos  = 200;
var nice  = 1/200;

var resize = function() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

var clear = function() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

var redraw = function() {
  context.lineWidth = '1';
  context.strokeRect(0, 0, window.innerWidth, window.innerHeight);

  var l1 = new Line(new Point(0, 0), new Point(canvas.width, canvas.height));
  var l2 = new Line(new Point(canvas.width, 0), new Point(0, canvas.height));
  l1.draw(context);
  l2.draw(context);
  // requestAnimationFrame(redraw);
}

var init = function() {
  canvas = document.getElementById('c');
  context = canvas.getContext('2d');

  window.addEventListener('resize', resize, false);

  resize();
  redraw();
}
