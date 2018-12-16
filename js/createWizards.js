'use strict';

(function () {
  /* constants */
  var COUNT_SETUP_SIMILAR_WIZARD = 4;
  var HIDDEN_CLASS = 'hidden';

  var Selector = {
    SETUP_SIMILAR_LABEL: '.setup-similar-label',
    SETUP_WIZARD_COAT: '.setup-wizard .wizard-coat',
    SETUP_WIZARD_EYES: '.setup-wizard .wizard-eyes',
    SETUP_SIMILAR_LIST: '.setup-similar-list',
    SETUP_SIMILAR_ITEM: '.setup-similar-item',
    SIMILAR_WIZARD_TEMPLATE: '#similar-wizard-template',
    SETUP_SIMILAR: '.setup-similar',

    WIZARD_COAT: '.wizard-coat',
    WIZARD_EYES: '.wizard-eyes',
  };

  /* settings */

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

  /* module */
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
    wizardElement.querySelector(Selector.SETUP_SIMILAR_LABEL).textContent = wizard.name;
    wizardElement.querySelector(Selector.WIZARD_COAT).style.fill = wizard.coatColor;
    wizardElement.querySelector(Selector.WIZARD_EYES).style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var wizard = fillWizardsCollection();

  var similarListElement = document.querySelector(Selector.SETUP_SIMILAR_LIST);
  var similarWizardTemplate = document.querySelector(Selector.SIMILAR_WIZARD_TEMPLATE)
      .content
      .querySelector(Selector.SETUP_SIMILAR_ITEM);

  var fragment = document.createDocumentFragment();
  for (var j = 0; j < wizard.length; j++) {
    fragment.appendChild(renderWizard(wizard[j]));
  }
  similarListElement.appendChild(fragment);

  var setupSimular = document.querySelector(Selector.SETUP_SIMILAR);
  setupSimular.classList.remove(HIDDEN_CLASS);
})();
