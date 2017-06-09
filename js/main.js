"use strict";
var canvas;
var context;
var step  = 0;
var lines = 100;
var ymax  = 200;
var rad   = 5;
var ratio = 0.25;
var xpos  = 20;
var ypos  = 200;
var nice  = 1/200;

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

var resize = function() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

var clear = function() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

var drawLine = function(x1, y1, x2, y2, x3, y3) {
  var a = [y1, y2, y3].sort(function (a, b) {  return a - b;  });
  // console.log(a);
  // console.log(a);
  
  context.beginPath();
  context.moveTo(x1, a[0]);
  context.lineTo(x1, a[1]);
	context.stroke();
  context.beginPath();
  // context.moveTo(x1, a[2]);
  // context.lineTo(x1, 1000);
  context.stroke();
	// context.beginPath();
	// context.moveTo(x1, y1);
	// context.lineTo(x2, y2);
	// context.stroke();
	context.beginPath();
	context.arc(x2, y2, 2, 0, 2*Math.PI);
	context.stroke();
	context.beginPath();
	context.arc(x1, y1, 2, 0, 2*Math.PI);
	context.stroke();
  context.beginPath();
	context.arc(x3, y3, 2, 0, 2*Math.PI);
	context.stroke();
}

var getY = function(i, step) {
	return ypos + ymax / 2 * (Math.sin(step * (i * nice + 0.08)));
}
var getY2 = function(i, step) {
	return ypos + ratio * ymax / 2 * (Math.sin((step + 100) * (i * nice + 0.08)));
}
var getY3 = function(i, step) {
	return ypos + (1.5) *ymax / 2 * (Math.sin((step + 200) * (i * nice + 0.08)));
}

var redraw = function() {
  context.lineWidth = '1';
  context.strokeRect(0, 0, window.innerWidth, window.innerHeight);

  clear();
  var ls = 20
  for (var i = 0; i < lines; i++) {
    drawLine(xpos + ls * i, getY(i, step), xpos + ls * i, getY2(i, step), xpos + ls * i, getY3(i, step));
  }

  step++
  requestAnimationFrame(redraw);
}

var init = function() {
  canvas = document.getElementById('c');
  context = canvas.getContext('2d');

  window.addEventListener('resize', resize, false);

  resize();
  redraw();
}
