'use strict';

(function () {
  /* constants */
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

  var userDialog = document.querySelector('.setup');
  // userDialog.classList.remove('hidden');

  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  var getRandomInt = function (max) {
    return Math.floor(Math.random() * max);
  };

  var getRandomElement = function (collection) {
    return collection[getRandomInt(collection.length)];
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(Selector.SETUP_SIMILAR_LABEL).textContent = wizard.name;
    wizardElement.querySelector(Selector.WIZARD_COAT).style.fill = wizard.colorCoat;
    wizardElement.querySelector(Selector.WIZARD_EYES).style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(getRandomElement(wizards)));
    }
    similarListElement.appendChild(fragment);

    var setupSimular = userDialog.querySelector(Selector.SETUP_SIMILAR);
    setupSimular.classList.remove(HIDDEN_CLASS);
  };

  window.backend.action(successHandler, window.backend.error);
})();
