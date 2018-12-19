'use strict';

/* --------- CONSTANTS --------- */

(function () {
  var MIN_TEXT_LENGTH = 2;
  var MAX_TEXT_LENGTH = 25;

  var Selectors = {
    SETUP_WIZARD: '.setup-wizard-form',
    SETUP_USER_NAME: '.setup-user-name',
    SETUP_FIREBALL: '.setup-fireball-wrap',
    SETUP_WIZARD_COAT: '.setup-wizard .wizard-coat',
    SETUP_WIZARD_EYES: '.setup-wizard .wizard-eyes',
    SETUP_WIZARD_COAT_SETTINGS: 'input[name="coat-color"]',
    SETUP_WIZARD_EYES_SETTINGS: 'input[name="eyes-color"]',
    SETUP_FIREBALL_SETTINGS: 'input[name="fireball-color"]',
    SETUP_NAME_FOCUS: 'input[name="username"]:focus',
  };

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

  var playerSetting = {
    coatColor: 0,
    eyesColor: 0,
    fireballColor: 0,
  };

  /* --------- SETUP WIZARD --------- */

  var setupCoat = document.querySelector(Selectors.SETUP_WIZARD_COAT);
  var setupEyes = document.querySelector(Selectors.SETUP_WIZARD_EYES);
  var fireballElement = document.querySelector(Selectors.SETUP_FIREBALL);

  setupCoat.style.fill = wizardCoatColors[playerSetting.coatColor];
  setupEyes.style.fill = wizardEyesColors[playerSetting.eyesColor];
  fireballElement.style.background = fireBallColors[playerSetting.fireballColor];

  setupCoat.addEventListener('click', function () {
    playerSetting.coatColor = (playerSetting.coatColor + 1) % wizardCoatColors.length;
    var coatColor = wizardCoatColors[playerSetting.coatColor];
    setupCoat.style.fill = coatColor;
    document.querySelector(Selectors.SETUP_WIZARD_COAT_SETTINGS).value = coatColor;
  });

  setupEyes.addEventListener('click', function () {
    playerSetting.eyesColor = (playerSetting.eyesColor + 1) % wizardEyesColors.length;
    var eyesColor = wizardEyesColors[playerSetting.eyesColor];
    setupEyes.style.fill = eyesColor;
    document.querySelector(Selectors.SETUP_WIZARD_EYES_SETTINGS).value = eyesColor;
  });

  fireballElement.addEventListener('click', function () {
    playerSetting.fireballColor = (playerSetting.fireballColor + 1) % fireBallColors.length;
    var fireballColor = fireBallColors[playerSetting.fireballColor];
    fireballElement.style.background = fireballColor;
    document.querySelector(Selectors.SETUP_FIREBALL_SETTINGS).value = fireballColor;
  });

  /* --------- ADD MINLENGTH TO USERNAME --------- */

  var userName = document.querySelector(Selectors.SETUP_USER_NAME);
  userName.setAttribute('minlength', MIN_TEXT_LENGTH);
  userName.setAttribute('maxlength', MAX_TEXT_LENGTH);

  /* --------- SEND WIZARD SETTINGS To SERVER --------- */

  var setupWizard = document.querySelector(Selectors.SETUP_WIZARD);

  setupWizard.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(setupWizard), window.popup.close, window.backend.error);
  });

})();
