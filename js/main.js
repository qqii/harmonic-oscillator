"use strict";
var canvas;
var context;
var step  = 0;
var lwid  = 4;
var lsep  = 20;
var lines = 100;
var ymax  = 200;

var ratio = 0.9;
// x, y for leftmost centre
var xpos  = 0;
var ypos  = 200;
// niceity ratio
var nice  = Math.PI/4000;
var star  = Math.PI/30;

var Point = function(x, y) {
  this.x = x;
  this.y = y;
}

// a pair of points
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

var resize = function() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  lines = canvas.width / lsep;
  ymax = canvas.height;
  ypos = canvas.height / 2;
}

var clear = function() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

var getY = function(i, step, rat, diff) {
	return ypos + ymax / 2 * rat * (Math.sin((step + diff) * (i * nice + star)));
}

var drawLine = function(x1, y1, x2, y2, x3, y3, x4, y4) {
  var a = [y1, y2, y3, y4].sort(function (a, b) {  return a - b;  });
  // console.log(a);
  // console.log(a);
  
  context.beginPath();
  context.moveTo(x1, a[0]);
  context.lineTo(x1, a[1]);
	context.stroke();
  
  context.beginPath();
  context.moveTo(x1, a[2]);
  context.lineTo(x1, a[3]);
  context.stroke();

	// context.beginPath();
	// context.arc(x2, y2, 2, 0, 2*Math.PI);
	// context.stroke();
	// context.beginPath();
	// context.arc(x1, y1, 2, 0, 2*Math.PI);
	// context.stroke();
}

var redraw = function() {
  context.lineWidth = lwid.toString();
  context.strokeRect(0, 0, window.innerWidth, window.innerHeight);

  clear();
  for (var i = 0; i < lines; i++) {
    drawLine(xpos + lsep * i, getY(i, step/1, 1, 0), 
             xpos + lsep * i, getY(i, step/2, ratio, 10*Math.PI),
             xpos + lsep * i, getY(i, step/4, ratio / 1.5, 100*Math.PI),
             xpos + lsep * i, getY(i, step/8, ratio / 2, 1000*Math.PI)
            );
  }

  step++;
  requestAnimationFrame(redraw);
}

var init = function() {
  canvas = document.getElementById('c');
  context = canvas.getContext('2d');

  window.addEventListener('resize', resize, false);

  resize();
  redraw();
}
