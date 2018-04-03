
'use strict'

var CLOUD_WIDTH = 420; // ширина облака
var CLOUD_HEIGHT = 270; // высота облака
var CLOUD_X = 100; // начало по Х
var CLOUD_Y = 10; // начало по Y
var GAP = 10; // смещение
var BAR_HEIGHT = 150; // высота гистограммы
var BAR_WIDTH = 40; // ширина столбца
var BAR_GAP = 50; // расстояние между столбцами
var FONT_HEIGHT = 20; // высота строки
var TITLE_HEIGHT = CLOUD_Y + GAP + FONT_HEIGHT + FONT_HEIGHT + GAP; // высота заголовка

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getColorElement = function (name) {
  return name === 'Вы' ? 'red' : 'rgba(0, 0, 255, ' + Math.random() + ')';
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP + FONT_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP + FONT_HEIGHT * 2);

  var maxTime = getMaxElement(times);

  var players = ['Вы', 'Стас', 'Витя', 'Виталя'];

  for (var i = 0; i < players.length; i++) {
    var barHeight = (BAR_HEIGHT * times[i]) / maxTime;

    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP);

    ctx.fillStyle = getColorElement(players[i]);
    ctx.fillRect(CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, TITLE_HEIGHT + (BAR_HEIGHT - barHeight) + GAP, BAR_WIDTH, barHeight);
  }
};
