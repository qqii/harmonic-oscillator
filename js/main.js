"use strict";
var canvas;
var context;
var step  = 0;
var lsep  = 10;
var lines = 100;
var ymax  = 200;

var ratio = 0.8;
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
  xpos = canvas.width / 20;
  lsep = canvas.width / 30;
  context.lineWidth = (lsep / 4).toString();
  lines = ((canvas.width - (xpos - lsep) * 2) / lsep) - 1;
  ymax = canvas.height * (1 - 1/10);
  ypos = canvas.height / 2;
}

var clear = function(context) {
  context.fillRect(0, 0, canvas.width, canvas.height);
}

var getY = function(i, step, rat, diff) {
	return ypos + ymax / 2 * rat * (Math.sin((step + diff) * (i * nice + star)));
}

var drawLine = function(context, x1, y1, x2, y2, x3, y3, x4, y4) {
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
  console.log(context.strokeStyle + " " + context.fillStyle);
  // context.strokeStyle = "#002D33";
  // context.fillStyle   = "#00BCD4";

  clear(context);
  
  for (var i = 0; i < lines; i++) {
    drawLine(context,
             xpos + lsep * i, getY(i, step/1, 1, 0), 
             xpos + lsep * i, getY(i, step/2, 0.8, 10*Math.PI),
             xpos + lsep * i, getY(i, step/4, 0.6, 100*Math.PI),
             xpos + lsep * i, getY(i, step/6, 0.4, 1000*Math.PI)
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
  
  context.strokeStyle = "#002D33";
  context.fillStyle   = "#00BCD4";
  
  redraw();
}
