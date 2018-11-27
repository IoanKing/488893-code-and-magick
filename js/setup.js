'use strict';

/* --------- CONSTANTS --------- */

var COUNT_SETUP_SIMILAR_WIZARD = 4;

var Selectors = {
  SETUP_SELECTOR: '.setup',
  SETUP_SIMILAR_SELECTOR: '.setup-similar',
  SETUP_SIMILAR_LIST_SELECTOR: '.setup-similar-list',
  SETUP_SIMILAR_ITEM_SELECTOR: '.setup-similar-item',
  SETUP_SIMILAR_LABEL_SELECTOR: '.setup-similar-label',

  SIMILAR_WIZARD_TEMPLATE_SELECTOR: '#similar-wizard-template',

  WIZARD_COAT_SELECTOR: '.wizard-coat',
  WIZARD_EYES_SELECTOR: '.wizard-eyes',
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

/* --------- CREATE WIZARDS --------- */

var wizard = fillWizardsCollection();

var setupBlock = document.querySelector(Selectors.SETUP_SELECTOR);
setupBlock.classList.remove(HIDDEN_CLASS);

var similarListElement = document.querySelector(Selectors.SETUP_SIMILAR_LIST_SELECTOR);
var similarWizardTemplate = document.querySelector(Selectors.SIMILAR_WIZARD_TEMPLATE_SELECTOR)
    .content
    .querySelector(Selectors.SETUP_SIMILAR_ITEM_SELECTOR);

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizard.length; j++) {
  fragment.appendChild(renderWizard(wizard[j]));
}
similarListElement.appendChild(fragment);

setupBlock.querySelector(Selectors.SETUP_SIMILAR_SELECTOR).classList.remove(HIDDEN_CLASS);

