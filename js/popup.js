'use strict';

(function () {
  /* constants */
  var Selector = {
    SETUP: '.setup',
    SETUP_OPEN: '.setup-open',
    SETUP_CLOSE: '.setup-close',
  };

  var HIDDEN_CLASS = 'hidden';

  var Shortcuts = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
  };

  /* module */
  var onFocusInput = function () {
    return document.querySelector(Selector.SETUP_NAME_FOCUS);
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

  var setup = document.querySelector(Selector.SETUP);
  var setupOpen = document.querySelector(Selector.SETUP_OPEN);
  var setupClose = document.querySelector(Selector.SETUP_CLOSE);

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

  window.popup = {
    close: closePopup,
  };

})();
