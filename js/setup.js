'use strict';

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

var wizards = [];
var countObject = 4;

var randomCount = function (count) {
  return Math.floor(Math.random() * count);
};

var generateData = function (arr, nameArr, surnameArr, coatColorArr, eyesColorArr) {
  arr.push({
    name: nameArr[randomCount(nameArr.length)] + ' ' + surnameArr[randomCount(surnameArr.length)],
    coatColor: coatColorArr[randomCount(coatColorArr.length)],
    eyesColor: eyesColorArr[randomCount(eyesColorArr.length)],
  });
};

for (var i = 0; i < countObject; i++) {
  generateData(wizards, names, surNames, coatColors, eyesColors);
}

var setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}
similarListElement.appendChild(fragment);

setupBlock.querySelector('.setup-similar').classList.remove('hidden');

