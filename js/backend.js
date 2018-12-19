'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var URL_SEND = 'https://js.dump.academy/code-and-magick';

  var ErrorElement = {
    BLOCK: 'div',
    STYLE: 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;',
    POSITION: 'absolute',
    LEFT: 0,
    RIGHT: 0,
    FONT_SIZE: '30px',
  };

  var backendLoad = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var backendSave = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('POST', URL_SEND);
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
    load: backendLoad,
    save: backendSave,
    error: errorHandler
  };
})();
