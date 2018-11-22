'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_BACKGROUND = 'rgba(0, 0, 0, 0.3)';

var GAP = 10;
var TEXT_SIZE = 16;
var TEXT_FAMILY = '"PT Mono"';
var TEXT_BASELINE = 'hanging';
var TEXT_SIZE_UNITS = 'px';
var BAR_SPACE = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

var COLOR_WHITE = '#000000';
var COLOR_PLAYER_BAR = '#FF0000';
var COLOR_BLACK = '#ffffff';
var COLOR_CLOUD_BORDER_LINE = 'transparent';

var currentPlayerName = 'Вы';

var WinText = ['Ура вы победили!', 'Список результатов:'];

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);

  var stepRender = 10;
  var hollowRender = TEXT_SIZE / 2;
  var renderWidth = CLOUD_WIDTH / (stepRender * 1.5);
  var renderHeight = CLOUD_HEIGHT / stepRender;

  for (var i = 0; i < (stepRender * 1.5); i++) {
    ctx.bezierCurveTo(x + renderWidth / 2 + renderWidth * i, y + hollowRender, x + renderWidth / 2 + renderWidth * i, y + hollowRender, x + renderWidth * (i + 1), y);
  }
  // ctx.lineTo(x + CLOUD_WIDTH, y);

  for (var j = 0; j < stepRender; j++) {
    ctx.bezierCurveTo(x + CLOUD_WIDTH - hollowRender, y + renderHeight / 2 + renderHeight * j, x + CLOUD_WIDTH - hollowRender, y + renderHeight / 2 + renderHeight * j, x + CLOUD_WIDTH, y + renderHeight * (j + 1));
  }
  // ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);

  for (var k = 0; k < (stepRender * 1.5); k++) {
    ctx.bezierCurveTo(x + CLOUD_WIDTH - renderWidth / 2 - renderWidth * k, y + CLOUD_HEIGHT - hollowRender, x + CLOUD_WIDTH - renderWidth / 2 - renderWidth * k, y + CLOUD_HEIGHT - hollowRender, x + CLOUD_WIDTH - renderWidth * (k + 1), y + CLOUD_HEIGHT);
  }
  // ctx.lineTo(x, y + CLOUD_HEIGHT);

  for (var l = 0; l < stepRender; l++) {
    ctx.bezierCurveTo(x + hollowRender, y + CLOUD_HEIGHT - renderHeight / 2 - renderHeight * l, x + hollowRender, y + CLOUD_HEIGHT - renderHeight / 2 - renderHeight * l, x, y + CLOUD_HEIGHT - renderHeight * (l + 1));
  }
  // ctx.lineTo(x, y);

  ctx.closePath();
  ctx.strokeStyle = COLOR_CLOUD_BORDER_LINE;
  ctx.stroke();
  ctx.fill();
};

var getMaxElement = function (arr) {
  if (arr.length === 0) {
    return 0;
  }

  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
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
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, CLOUD_BACKGROUND);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, COLOR_BLACK);

  var afterTextX = CLOUD_X + GAP * 4;
  var afterTextY = CLOUD_Y + (GAP + TEXT_SIZE) * (WinText.length + 1);
  var barRenderStep = BAR_SPACE + BAR_WIDTH;

  ctx.fillStyle = COLOR_WHITE;
  ctx.font = TEXT_SIZE + TEXT_SIZE_UNITS + ' ' + TEXT_FAMILY;
  ctx.textBaseline = TEXT_BASELINE;

  for (var i = 0; i < WinText.length; i++) {
    ctx.fillText(WinText[i], afterTextX, CLOUD_Y + TEXT_SIZE + (GAP + TEXT_SIZE) * i);
  }

  var maxTime = getMaxElement(times);

  for (var j = 0; j < names.length; j++) {
    ctx.fillStyle = COLOR_WHITE;
    ctx.fillText(Math.floor(times[j]), afterTextX + barRenderStep * j, afterTextY + BAR_HEIGHT - (BAR_HEIGHT * Math.floor(times[j])) / maxTime);

    ctx.fillStyle = (names[j] === currentPlayerName) ? COLOR_PLAYER_BAR : 'hsla(235, 100%, ' + getRandom(10, 100) + '% , 1)';
    ctx.fillRect(afterTextX + barRenderStep * j, afterTextY + TEXT_SIZE + GAP + BAR_HEIGHT - (BAR_HEIGHT * Math.floor(times[j])) / maxTime, BAR_WIDTH, (BAR_HEIGHT * Math.floor(times[j])) / maxTime - TEXT_SIZE - GAP);

    ctx.fillStyle = COLOR_WHITE;
    ctx.fillText(names[j], afterTextX + barRenderStep * j, afterTextY + BAR_HEIGHT + GAP);
  }
};
