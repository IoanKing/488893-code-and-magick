'use strict';

(function () {
  /* constants */
  var Selector = {
    SETUP: '.setup',
    UPLOAD: '.upload',
  };

  var UNIT_OF_MEASURE = 'px';
  var DRAGGED_STEP = 2;

  /* module */
  var setupDialogElement = document.querySelector(Selector.SETUP);
  var dialogHandler = setupDialogElement.querySelector(Selector.UPLOAD);

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    /* компенсация transparentX(50%) */
    var draggedMinWidth = setupDialogElement.offsetWidth / 2;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      dragged = dragged || (Math.abs(shift.x) >= DRAGGED_STEP || Math.abs(shift.y) >= DRAGGED_STEP);

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = Math.max((setupDialogElement.offsetTop - shift.y), 0) + UNIT_OF_MEASURE;
      setupDialogElement.style.left = Math.max((setupDialogElement.offsetLeft - shift.x), draggedMinWidth) + UNIT_OF_MEASURE;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evtDragged) {
          evtDragged.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
