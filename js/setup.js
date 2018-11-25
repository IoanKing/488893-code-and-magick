'use strict';

var COUNT_SETUP_SIMILAR_WIZARD = 4;

var SETUP_SELECTOR = '.setup';

var SETUP_SIMILAR_SELECTOR = '.setup-similar';
var SETUP_SIMILAR_LIST_SELECTOR = '.setup-similar-list';
var SETUP_SIMILAR_ITEM_SELECTOR = '.setup-similar-item';
var SETUP_SIMILAR_LABEL_SELECTOR = '.setup-similar-label';

var SIMILAR_WIZARD_TEMPLATE_SELECTOR = '#similar-wizard-template';

var WIZARD_COAT_SELECTOR = '.wizard-coat';
var WIZARD_EYES_SELECTOR = '.wizard-eyes';

var HIDDEN_CLASS = 'hidden';

var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var surNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
];

var randomInt = function (count) {
  return Math.floor(Math.random() * count);
};

var randomElementOfArr = function (arr) {
  return randomInt(arr.length);
};

var createWizard = function (nameArr, surnameArr, coatColorArr, eyesColorArr) {
  return {
    name: nameArr[randomElementOfArr(nameArr)] + ' ' + surnameArr[randomElementOfArr(surnameArr)],
    coatColor: coatColorArr[randomElementOfArr(coatColorArr)],
    eyesColor: eyesColorArr[randomElementOfArr(eyesColorArr)],
  };
};

var fillWizardsCollection = function (nameArr, surnameArr, coatColorArr, eyesColorArr, count) {
  var arr = [];
  for (var i = 0; i < count; i++) {
    arr.push(createWizard(nameArr, surnameArr, coatColorArr, eyesColorArr));
  }
  return arr;
};

var wizards = fillWizardsCollection(names, surNames, coatColors, eyesColors, COUNT_SETUP_SIMILAR_WIZARD);

var setupBlock = document.querySelector(SETUP_SELECTOR);
setupBlock.classList.remove(HIDDEN_CLASS);

var similarListElement = document.querySelector(SETUP_SIMILAR_LIST_SELECTOR);
var similarWizardTemplate = document.querySelector(SIMILAR_WIZARD_TEMPLATE_SELECTOR)
    .content
    .querySelector(SETUP_SIMILAR_ITEM_SELECTOR);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(SETUP_SIMILAR_LABEL_SELECTOR).textContent = wizard.name;
  wizardElement.querySelector(WIZARD_COAT_SELECTOR).style.fill = wizard.coatColor;
  wizardElement.querySelector(WIZARD_EYES_SELECTOR).style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}
similarListElement.appendChild(fragment);

setupBlock.querySelector(SETUP_SIMILAR_SELECTOR).classList.remove(HIDDEN_CLASS);

