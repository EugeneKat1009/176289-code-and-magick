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

var popup = document.querySelector('.setup');
popup.classList.remove('hidden');
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
