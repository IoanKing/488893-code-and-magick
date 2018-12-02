'use strict';

/* --------- CONSTANTS --------- */

var COUNT_SETUP_SIMILAR_WIZARD = 4;
var MIN_LENGTH = 2;

var Selectors = {
  SETUP_SELECTOR: '.setup',
  SETUP_OPEN_SELECTOR: '.setup-open',
  SETUP_CLOSE_SELECTOR: '.setup-close',
  SETUP_SIMILAR_SELECTOR: '.setup-similar',
  SETUP_SIMILAR_LIST_SELECTOR: '.setup-similar-list',
  SETUP_SIMILAR_ITEM_SELECTOR: '.setup-similar-item',
  SETUP_SIMILAR_LABEL_SELECTOR: '.setup-similar-label',
  SETUP_USER_NAME_SELECTOR: '.setup-user-name',
  SETUP_WIZARD_COAT_SELECTOR: '.setup-wizard .wizard-coat',
  SETUP_WIZARD_EYES_SELECTOR: '.setup-wizard .wizard-eyes',
  SETUP_FIREBALL_SELECTOR: '.setup-fireball-wrap',
  SETUP_WIZARD_COAT_SETTINGS: 'input[name="coat-color"]',
  SETUP_WIZARD_EYES_SETTINGS: 'input[name="eyes-color"]',
  SETUP_FIREBALL_SETTINGS: 'input[name="fireball-color"]',

  SIMILAR_WIZARD_TEMPLATE_SELECTOR: '#similar-wizard-template',

  WIZARD_COAT_SELECTOR: '.wizard-coat',
  WIZARD_EYES_SELECTOR: '.wizard-eyes',
};

var ValidationMessages = {
  VALIDATION_TOO_SHORT: 'Имя должно состоять минимум из 2-х символов',
  VALIDATION_TOO_LONG: 'Имя не должно превышать 25-ти символов',
  VALIDATION_REQUIRED: 'Обязательное поле',
};

var Shortcuts = {
  ESC_KEYCODE: 27,
  ENTER_KEYCODE: 13,
};

var HIDDEN_CLASS = 'hidden';

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
  wizardElement.querySelector(Selectors.SETUP_SIMILAR_LABEL_SELECTOR).textContent = wizard.name;
  wizardElement.querySelector(Selectors.WIZARD_COAT_SELECTOR).style.fill = wizard.coatColor;
  wizardElement.querySelector(Selectors.WIZARD_EYES_SELECTOR).style.fill = wizard.eyesColor;
  return wizardElement;
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === Shortcuts.ESC_KEYCODE) {
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

var similarListElement = document.querySelector(Selectors.SETUP_SIMILAR_LIST_SELECTOR);
var similarWizardTemplate = document.querySelector(Selectors.SIMILAR_WIZARD_TEMPLATE_SELECTOR)
    .content
    .querySelector(Selectors.SETUP_SIMILAR_ITEM_SELECTOR);

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizard.length; j++) {
  fragment.appendChild(renderWizard(wizard[j]));
}
similarListElement.appendChild(fragment);

/* --------- SETUP WIZARDS --------- */

var setupCoat = document.querySelector(Selectors.SETUP_WIZARD_COAT_SELECTOR);
var setupEyes = document.querySelector(Selectors.SETUP_WIZARD_EYES_SELECTOR);
var setupFireBall = document.querySelector(Selectors.SETUP_FIREBALL_SELECTOR);

setupCoat.addEventListener('click', function () {
  var randomCoatColor = getRandomElement(wizardCoatColors);
  setupCoat.style.fill = randomCoatColor;
  document.querySelector(Selectors.SETUP_WIZARD_COAT_SETTINGS).value = randomCoatColor;
});

setupEyes.addEventListener('click', function () {
  var randomEyesColor = getRandomElement(wizardEyesColors);
  setupEyes.style.fill = randomEyesColor;
  document.querySelector(Selectors.SETUP_WIZARD_EYES_SETTINGS).value = randomEyesColor;
});

setupFireBall.addEventListener('click', function () {
  var randomFireBallColor = getRandomElement(fireBallColors);
  setupFireBall.style.background = randomFireBallColor;
  document.querySelector(Selectors.SETUP_FIREBALL_SETTINGS).value = randomFireBallColor;
});

/* --------- ADD MINLENGTH TO USERNAME --------- */

var userName = document.querySelector(Selectors.SETUP_USER_NAME_SELECTOR);
userName.setAttribute('minlength', MIN_LENGTH);

/* --------- OPEN MODAL --------- */

var setup = document.querySelector(Selectors.SETUP_SELECTOR);
var setupOpen = document.querySelector(Selectors.SETUP_OPEN_SELECTOR);
var setupClose = document.querySelector(Selectors.SETUP_CLOSE_SELECTOR);


setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === Shortcuts.ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === Shortcuts.ENTER_KEYCODE) {
    closePopup();
  }
});

/* --------- VALIDATION --------- */

var userNameInput = setup.querySelector(Selectors.SETUP_USER_NAME_SELECTOR);

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity(ValidationMessages.VALIDATION_TOO_SHORT);
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity(ValidationMessages.VALIDATION_TOO_LONG);
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity(ValidationMessages.VALIDATION_REQUIRED);
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity(ValidationMessages.VALIDATION_TOO_SHORT);
  } else {
    target.setCustomValidity('');
  }
});

