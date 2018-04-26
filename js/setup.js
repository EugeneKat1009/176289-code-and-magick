'use strict';

(function () {
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

  var WIZARDS_COUNT = 4;

  document.querySelector('.setup-similar').classList.remove('hidden');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var onLoad = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(renderWizard(window.util.getRandom(wizards)));
    }
    similarListElement.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.classList.add('error');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoad, onError);

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
    window.util.isEnterEvent(evt, popupOpen);
  });

  setupClose.addEventListener('click', function () {
    popupClose();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, popupClose);
  });

  var setupWizard = document.querySelector('.setup-wizard');
  var setupFireball = document.querySelector('.setup-fireball-wrap');
  var inputFireball = setupFireball.querySelector('input');

  var onWizardClick = function () {
    var wizardEyes = setupWizard.querySelector('.wizard-eyes');
    var eyesColor = window.util.getRandom(WIZARD_EYES_COLOR);
    wizardEyes.style.fill = eyesColor;
    var onInputEyesColor = document.getElementsByName('eyes-color');
    onInputEyesColor[0].value = eyesColor;
  };

  var onFireballClick = function () {
    var newFireballColor = window.util.getRandom(WIZARD_FIREBALL_COLOR);
    setupFireball.style.backgroundColor = newFireballColor;
    inputFireball.value = newFireballColor;
  };

  setupWizard.addEventListener('click', onWizardClick);
  setupWizard.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_BTN) {
      onWizardClick();
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

  var form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    });
    evt.preventDefault();
  });
})();
