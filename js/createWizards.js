'use strict';

(function () {
  /* constants */
  var HIDDEN_CLASS = 'hidden';
  var COUNT_SIMULAR_WIZARDS = 4;

  var Selector = {
    SETUP: '.setup',
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

  var Rank = {
    COAT_RANK: 2,
    EYES_RANK: 1
  };

  var coatColor = window.playerSetting.coatColor;
  var eyesColor = window.playerSetting.eyesColor;
  window.wizards = [];

  var userDialog = document.querySelector(Selector.SETUP);

  var similarListElement = userDialog.querySelector(Selector.SETUP_SIMILAR_LIST);
  var similarWizardTemplate = document.querySelector(Selector.SIMILAR_WIZARD_TEMPLATE).content;

  var renderWizard = function (data) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(Selector.SETUP_SIMILAR_LABEL).textContent = data.name;
    wizardElement.querySelector(Selector.WIZARD_COAT).style.fill = data.colorCoat;
    wizardElement.querySelector(Selector.WIZARD_EYES).style.fill = data.colorEyes;
    return wizardElement;
  };

  var render = function (data) {
    similarListElement.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < COUNT_SIMULAR_WIZARDS; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var getRank = function (data) {
    var rank = 0;

    if (data.colorCoat === coatColor) {
      rank += Rank.COAT_RANK;
    }
    if (data.colorEyes === eyesColor) {
      rank += Rank.EYES_RANK;
    }

    return rank;
  };

  var sortByRank = function (collection) {
    return collection.slice().
    sort(function (left, right) {
      return (getRank(right) - getRank(left)) ? getRank(right) - getRank(left) : window.wizards.indexOf(left) - window.wizards.indexOf(right);
    });
  };

  var updateWizards = function () {
    render(sortByRank(window.wizards));
  };

  var onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  var onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var successHandler = function (data) {
    window.wizards = data;

    updateWizards();

    var setupSimular = userDialog.querySelector(Selector.SETUP_SIMILAR);
    setupSimular.classList.remove(HIDDEN_CLASS);
  };

  window.backend.action(successHandler, window.backend.error);

  window.createWizards = {
    update: updateWizards,
    onEyesChange: onEyesChange,
    onCoatChange: onCoatChange,
  };
})();
