'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var URL_SEND = 'https://js.dump.academy/code-and-magick';

  var TIMEOUT_REQUEST = 10000;

  var ErrorElement = {
    BLOCK: 'div',
    STYLE: 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;',
    POSITION: 'absolute',
    LEFT: 0,
    RIGHT: 0,
    FONT_SIZE: '30px',
  };

  var ErrorMessage = {
    ANSWER_STATUS: 'Статус ответа: ',
    CONNECTION: 'Произошла ошибка соединения',
    TIMEOUT_BEGIN: 'Запрос не успел выполниться за ',
    TIMEOUT_END: 'мс'
  };

  var backendAction = function (onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(ErrorMessage.ANSWER_STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(ErrorMessage.CONNECTION);
    });
    xhr.addEventListener('timeout', function () {
      onError(ErrorMessage.TIMEOUT_BEGIN + xhr.timeout + ErrorMessage.TIMEOUT_END);
    });

    xhr.timeout = TIMEOUT_REQUEST;

    if (typeof data === 'object') {
      xhr.open('POST', URL_SEND);
    } else {
      xhr.open('GET', URL_LOAD);
    }

    xhr.send(data);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement(ErrorElement.BLOCK);
    node.style = ErrorElement.STYLE;
    node.style.position = ErrorElement.POSITION;
    node.style.left = ErrorElement.LEFT;
    node.style.right = ErrorElement.RIGHT;
    node.style.fontSize = ErrorElement.FONT_SIZE;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend = {
    action: backendAction,
    error: errorHandler
  };
})();
