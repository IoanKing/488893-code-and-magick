'use strict';

/* --------- CONSTANTS --------- */

var COUNT_SETUP_SIMILAR_WIZARD = 4;
var MIN_TEXT_LENGTH = 2;
var MAX_TEXT_LENGTH = 25;

var Selectors = {
  SETUP: '.setup',
  SETUP_OPEN: '.setup-open',
  SETUP_CLOSE: '.setup-close',
  SETUP_SIMILAR: '.setup-similar',
  SETUP_SIMILAR_LIST: '.setup-similar-list',
  SETUP_SIMILAR_ITEM: '.setup-similar-item',
  SETUP_SIMILAR_LABEL: '.setup-similar-label',
  SETUP_USER_NAME: '.setup-user-name',
  SETUP_WIZARD_COAT: '.setup-wizard .wizard-coat',
  SETUP_WIZARD_EYES: '.setup-wizard .wizard-eyes',
  SETUP_FIREBALL: '.setup-fireball-wrap',
  SETUP_WIZARD_COAT_SETTINGS: 'input[name="coat-color"]',
  SETUP_WIZARD_EYES_SETTINGS: 'input[name="eyes-color"]',
  SETUP_FIREBALL_SETTINGS: 'input[name="fireball-color"]',
  SETUP_NAME_FOCUS: 'input[name="username"]:focus',

  SIMILAR_WIZARD_TEMPLATE: '#similar-wizard-template',

  WIZARD_COAT: '.wizard-coat',
  WIZARD_EYES: '.wizard-eyes',
};

var ValidationMessages = {
  TOO_SHORT: 'Имя должно состоять минимум из ' + MIN_TEXT_LENGTH + ' символов',
  TOO_LONG: 'Имя не должно превышать ' + MAX_TEXT_LENGTH + ' символов',
  REQUIRED: 'Обязательное поле',
};

var Shortcuts = {
  ESC_KEYCODE: 27,
  ENTER_KEYCODE: 13,
};

var HIDDEN_CLASS = 'hidden';

var playerSetting = {
  playerCoatColor: 0,
  playerEyesColor: 0,
  playerFireballColor: 0,
};

/* --------- ARRAYS --------- */

var wizardNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var wizardSurnames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var wizardCoatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var wizardEyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
];

var fireBallColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848',
];

/* --------- FUNCTIONS --------- */

var getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
};

var getRandomElement = function (collection) {
  return collection[getRandomInt(collection.length)];
};

var createWizard = function () {
  return {
    name: getRandomElement(wizardNames) + ' ' + getRandomElement(wizardSurnames),
    coatColor: getRandomElement(wizardCoatColors),
    eyesColor: getRandomElement(wizardEyesColors),
  };
};

var fillWizardsCollection = function () {
  var wizardsCollections = [];
  for (var i = 0; i < COUNT_SETUP_SIMILAR_WIZARD; i++) {
    wizardsCollections.push(createWizard());
  }
  return wizardsCollections;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(Selectors.SETUP_SIMILAR_LABEL).textContent = wizard.name;
  wizardElement.querySelector(Selectors.WIZARD_COAT).style.fill = wizard.coatColor;
  wizardElement.querySelector(Selectors.WIZARD_EYES).style.fill = wizard.eyesColor;
  return wizardElement;
};

var onFocusInput = function () {
  return document.querySelector(Selectors.SETUP_NAME_FOCUS);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === Shortcuts.ESC_KEYCODE && !onFocusInput()) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove(HIDDEN_CLASS);
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add(HIDDEN_CLASS);
  document.removeEventListener('keydown', onPopupEscPress);
};

/* --------- CREATE WIZARDS --------- */

var wizard = fillWizardsCollection();

var similarListElement = document.querySelector(Selectors.SETUP_SIMILAR_LIST);
var similarWizardTemplate = document.querySelector(Selectors.SIMILAR_WIZARD_TEMPLATE)
    .content
    .querySelector(Selectors.SETUP_SIMILAR_ITEM);

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizard.length; j++) {
  fragment.appendChild(renderWizard(wizard[j]));
}
similarListElement.appendChild(fragment);

/* --------- SETUP WIZARDS --------- */

var setupCoat = document.querySelector(Selectors.SETUP_WIZARD_COAT);
var setupEyes = document.querySelector(Selectors.SETUP_WIZARD_EYES);
var fireballElement = document.querySelector(Selectors.SETUP_FIREBALL);

setupCoat.style.fill = wizardCoatColors[playerSetting.playerCoatColor];
setupEyes.style.fill = wizardEyesColors[playerSetting.playerEyesColor];
fireballElement.style.background = fireBallColors[playerSetting.playerFireballColor];

setupCoat.addEventListener('click', function () {
  playerSetting.playerCoatColor = (playerSetting.playerCoatColor + 1) % wizardCoatColors.length;
  var coatColor = wizardCoatColors[playerSetting.playerCoatColor];
  setupCoat.style.fill = coatColor;
  document.querySelector(Selectors.SETUP_WIZARD_COAT_SETTINGS).value = coatColor;
});

setupEyes.addEventListener('click', function () {
  playerSetting.playerEyesColor = (playerSetting.playerEyesColor + 1) % wizardEyesColors.length;
  var eyesColor = wizardEyesColors[playerSetting.playerEyesColor];
  setupEyes.style.fill = eyesColor;
  document.querySelector(Selectors.SETUP_WIZARD_EYES_SETTINGS).value = eyesColor;
});

fireballElement.addEventListener('click', function () {
  playerSetting.playerFireballColor = (playerSetting.playerFireballColor + 1) % fireBallColors.length;
  var fireballColor = fireBallColors[playerSetting.playerFireballColor];
  fireballElement.style.background = fireballColor;
  document.querySelector(Selectors.SETUP_FIREBALL_SETTINGS).value = fireballColor;
});

/* --------- ADD MINLENGTH TO USERNAME --------- */

var userName = document.querySelector(Selectors.SETUP_USER_NAME);
userName.setAttribute('minlength', MIN_TEXT_LENGTH);
userName.setAttribute('maxlength', MAX_TEXT_LENGTH);

/* --------- OPEN MODAL --------- */

var setup = document.querySelector(Selectors.SETUP);
var setupOpen = document.querySelector(Selectors.SETUP_OPEN);
var setupClose = document.querySelector(Selectors.SETUP_CLOSE);

setupOpen.addEventListener('click', openPopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === Shortcuts.ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === Shortcuts.ENTER_KEYCODE) {
    closePopup();
  }
});

/* --------- VALIDATION --------- */

var userNameInput = setup.querySelector(Selectors.SETUP_USER_NAME);

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    return userNameInput.setCustomValidity(ValidationMessages.TOO_SHORT);
  }
  if (userNameInput.validity.tooLong) {
    return userNameInput.setCustomValidity(ValidationMessages.TOO_LONG);
  }
  if (userNameInput.validity.valueMissing) {
    return userNameInput.setCustomValidity(ValidationMessages.REQUIRED);
  }
  return userNameInput.setCustomValidity('');
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_TEXT_LENGTH) {
    target.setCustomValidity(ValidationMessages.TOO_SHORT);
  } else {
    target.setCustomValidity('');
  }
});

