'use strict';

/* --------- CONSTANTS --------- */

(function () {
  var MIN_TEXT_LENGTH = 2;
  var MAX_TEXT_LENGTH = 25;

  var Selectors = {
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
    playerCoatColor: 0,
    playerEyesColor: 0,
    playerFireballColor: 0,
  };

  /* --------- SETUP WIZARD --------- */

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
})();
