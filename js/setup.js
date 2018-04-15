'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SECOND_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZARD_COAT_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARD_EYES_COLOR = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var WIZARD_FIREBALL_COLOR = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var ESC_BTN = 27;
var ENTER_BTN = 13;

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

var getRandom = function (maxNumber) {
  var rand = Math.floor(Math.random() * maxNumber);
  return rand;
};

var Wizard = function () {
  this.name = WIZARD_NAMES[getRandom(WIZARD_NAMES.length)] + ' ' + WIZARD_SECOND_NAMES[getRandom(WIZARD_SECOND_NAMES.length)];
  this.coatColor = WIZARD_COAT_COLOR[getRandom(WIZARD_COAT_COLOR.length)];
  this.eyesColor = WIZARD_EYES_COLOR[getRandom(WIZARD_EYES_COLOR.length)];
};

var WIZARDS_COUNT = 4;
var similarWizards = [];

for (var j = 0; j < WIZARDS_COUNT; j++) {
  similarWizards.push(new Wizard());
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < WIZARDS_COUNT; i++) {
  fragment.appendChild(renderWizard(similarWizards[i]));
}
similarListElement.appendChild(fragment);

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_BTN) {
    popupClose();
  }
};

var popupOpen = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var popupClose = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  popupOpen();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_BTN) {
    popupOpen();
  }
});

setupClose.addEventListener('click', function () {
  popupClose();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_BTN) {
    popupClose();
  }
});

var setupWizard = document.querySelector('.setup-wizard');
var setupFireball = document.querySelector('.setup-fireball-wrap');
var inputFireball = setupFireball.querySelector('input');

var onWizzardClick = function () {
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  wizardEyes.style.fill = WIZARD_EYES_COLOR[getRandom(WIZARD_EYES_COLOR.length)];
  var onInputEyesColor = document.getElementsByName('eyes-color');
  onInputEyesColor[0].value = wizardEyes.style.fill;
};

var onFireballClick = function () {
  var newFireballColor = WIZARD_FIREBALL_COLOR[getRandom(WIZARD_FIREBALL_COLOR.length)];
  setupFireball.style.backgroundColor = newFireballColor;
  inputFireball.value = newFireballColor;
};

setupWizard.addEventListener('click', onWizzardClick);
setupWizard.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_BTN) {
    onWizzardClick();
  }
});

setupFireball.addEventListener('click', onFireballClick);
setupFireball.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_BTN) {
    onFireballClick();
  }
});

var shopElement = document.querySelector('.setup-artifacts-shop');
var draggedItem = null;
var artifatsCells = document.querySelectorAll('.setup-artifacts .setup-artifacts-cell');

var showEmptyCells = function () {
  Array.prototype.forEach.call(artifatsCells, function (cell) {
    if (!cell.hasChildNodes()) {
      cell.style.outline = '2px dashed red';
    }
  });
};

var hideEmptyCells = function () {
  Array.prototype.forEach.call(artifatsCells, function (cell) {
    cell.style.outline = '';
  });
};

shopElement.addEventListener('dragstart', function (evt) {
  if (evt.target.tagName.toLowerCase() === 'img') {
    draggedItem = evt.target;
    evt.dataTransfer.setData('text/plain', evt.target.alt);
    showEmptyCells();
  }
});

var artifactsElement = document.querySelector('.setup-artifacts');

artifactsElement.addEventListener('dragover', function (evt) {
  evt.preventDefault();
  return false;
});

artifactsElement.addEventListener('drop', function (evt) {
  evt.target.style.backgroundColor = '';
  evt.target.appendChild(draggedItem);
  hideEmptyCells();
  evt.preventDefault();
});


artifactsElement.addEventListener('dragenter', function (evt) {
  evt.target.style.backgroundColor = 'yellow';
  evt.preventDefault();
});

artifactsElement.addEventListener('dragleave', function (evt) {
  evt.target.style.backgroundColor = '';
  evt.preventDefault();
});
