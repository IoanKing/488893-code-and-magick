'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;

var GAP = 10;
var FONT_SIZE = 16;
var FONT_FAMILY = '"PT Mono"';
var BAR_SPACE = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);

  var stepRender = 10;
  var hollowRender = FONT_SIZE / 2;
  var renderWIDTH = CLOUD_WIDTH / (stepRender * 1.5);
  var renderHEIGHT = CLOUD_HEIGHT / stepRender;

  for (var i = 0; i < (stepRender * 1.5); i++) {
    ctx.bezierCurveTo(x + renderWIDTH / 2 + renderWIDTH * i, y + hollowRender, x + renderWIDTH / 2 + renderWIDTH * i, y + hollowRender, x + renderWIDTH * (i + 1), y);
  }
  //ctx.lineTo(x + CLOUD_WIDTH, y);

  for (var i = 0; i < stepRender; i++) {
    ctx.bezierCurveTo(x + CLOUD_WIDTH - hollowRender, y + renderHEIGHT / 2 + renderHEIGHT * i, x + CLOUD_WIDTH - hollowRender, y + renderHEIGHT / 2 + renderHEIGHT * i, x + CLOUD_WIDTH, y + renderHEIGHT * (i + 1));
  }
  //ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);

  for (var i = 0; i < (stepRender * 1.5); i++) {
    ctx.bezierCurveTo( x + CLOUD_WIDTH - renderWIDTH / 2 - renderWIDTH * i, y + CLOUD_HEIGHT - hollowRender, x + CLOUD_WIDTH - renderWIDTH / 2 - renderWIDTH * i, y + CLOUD_HEIGHT - hollowRender, x + CLOUD_WIDTH - renderWIDTH * (i + 1), y + CLOUD_HEIGHT);
  }
  //ctx.lineTo(x, y + CLOUD_HEIGHT);

  for (var i = 0; i < stepRender; i++) {
    ctx.bezierCurveTo(x + hollowRender, y + CLOUD_HEIGHT - renderHEIGHT / 2 - renderHEIGHT * i, x + hollowRender, y + CLOUD_HEIGHT - renderHEIGHT / 2 - renderHEIGHT * i, x, y + CLOUD_HEIGHT - renderHEIGHT * (i + 1));
  }
  //ctx.lineTo(x, y);

  ctx.closePath();
  ctx.strokeStyle = 'transparent';
  ctx.stroke();
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  if ( arr.length == 0)
    return 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  var renderText = ['Ура вы победили!', 'Список результатов:'];

  var afterTextX = CLOUD_X + GAP*4;
  var afterTextY = CLOUD_Y + (GAP + FONT_SIZE) * (renderText.length + 1);
  var barRenderStep = BAR_SPACE + BAR_WIDTH;

  ctx.fillStyle = '#000000';
  ctx.font = FONT_SIZE + 'px ' + FONT_FAMILY;
  ctx.textBaseline = 'hanging';

  for (var i = 0; i < renderText.length; i++) {
    ctx.fillText(renderText[i], afterTextX, CLOUD_Y + FONT_SIZE + (GAP + FONT_SIZE) * i);
  }

  var maxTime = getMaxElement(times);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  // ctx.fillRect(afterTextX, afterTextY, barRenderStep * names.length, BAR_HEIGHT);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(Math.floor(times[i]), afterTextX + barRenderStep * i, afterTextY + BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime);

    ctx.fillStyle = ( names[i] === "Вы") ? 'rgba(255, 0, 0, 1)' : 'hsla(235, 100%, ' + getRandom(10, 100) + '% , 1)';
    ctx.fillRect(afterTextX + barRenderStep * i, afterTextY + FONT_SIZE + GAP + BAR_HEIGHT - (BAR_HEIGHT * Math.floor(times[i])) / maxTime, BAR_WIDTH, (BAR_HEIGHT * Math.floor(times[i])) / maxTime - FONT_SIZE - GAP);

    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], afterTextX + barRenderStep * i, afterTextY + BAR_HEIGHT + GAP);
  }
};
