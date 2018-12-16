'use strict';

/* --------- CONSTANTS --------- */

var Selector = {
  SETUP: '.setup',
  UPLOAD: '.upload',
  ARTIFACTS_SHOP: '.setup-artifacts-shop .setup-artifacts-cell'
};

var Classes = {
  INVENTORY_CELL: 'setup-artifacts-cell',
  INVENTORY: 'setup-artifacts',
  FULL: 'full'
};

var UNIT_OF_MEASURE = 'px';

var ArtifactUnit = {
  MOVEOVER_BACKGROUND: 'rgba(0, 255 , 0, 0.2)',
};

var DraggedElement = {
  SELECTOR: 'draggable',
  CHECKED_VALUE: 'true',
  ELEMENT: 'img',
  CLASS: 'copyed',
  POINTER_DRAGGED: 'none',
  POINTER_STAY: 'auto',
  POSITION_DRAGGED: 'absolute',
  POSITION_STAY: 'relative',
  Z_INDEX: '100',
  OPACITY: 0.5,
};

var DRAGGED_STEP = 2;

/* --------- DRAGGED DIALOG --------- */

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

    dragged = (!dragged) ? (Math.abs(shift.x) >= DRAGGED_STEP || Math.abs(shift.x) <= DRAGGED_STEP * -1 || Math.abs(shift.y) >= DRAGGED_STEP || Math.abs(shift.y) <= DRAGGED_STEP * -1) : dragged;

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

/* --------- DRAGGED ATRIFACT --------- */

var setupArtifactElement = document.querySelectorAll(Selector.ARTIFACTS_SHOP);

setupArtifactElement.forEach(function (element) {
  element.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var artifact = element.querySelector(DraggedElement.ELEMENT);

    if (artifact.getAttribute(DraggedElement.SELECTOR) === DraggedElement.CHECKED_VALUE) {
      var copyElement = artifact.cloneNode();

      copyElement.classList.add(DraggedElement.CLASS);
      copyElement.style.position = DraggedElement.POSITION_DRAGGED;
      copyElement.style.zIndex = DraggedElement.Z_INDEX;
      copyElement.style.opacity = DraggedElement.OPACITY;
      copyElement.style.pointerEvents = DraggedElement.POINTER_DRAGGED;
      copyElement.style.top = (element.offsetTop) + UNIT_OF_MEASURE;
      copyElement.style.left = (element.offsetLeft) + UNIT_OF_MEASURE;

      element.appendChild(copyElement);

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY,
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY,
        };

        copyElement.style.top = (copyElement.offsetTop - shift.y) + UNIT_OF_MEASURE;
        copyElement.style.left = (copyElement.offsetLeft - shift.x) + UNIT_OF_MEASURE;
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        element.removeChild(copyElement);

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mouseover', onMouseOver);
      };

      var onMouseOver = function (overEvt) {
        var hoverElement = overEvt.target;
        var oldBackground = hoverElement.style.backgroundColor;

        var isInventoryHover = hoverElement.classList.contains(Classes.INVENTORY_CELL) && hoverElement.parentElement.classList.contains(Classes.INVENTORY);
        var isInventoryFull = hoverElement.classList.contains(Classes.FULL);

        if (isInventoryHover && !isInventoryFull) {
          hoverElement.style.backgroundColor = ArtifactUnit.MOVEOVER_BACKGROUND;
        }

        var onMouseOut = function (outEvt) {
          outEvt.preventDefault();
          hoverElement.style.backgroundColor = oldBackground;
          document.removeEventListener('mouseout', onMouseOut);
          document.removeEventListener('mouseup', onMouseUpArtefact);
        };

        var onMouseUpArtefact = function (upEvt) {
          upEvt.preventDefault();
          if (isInventoryHover && !isInventoryFull) {
            hoverElement.style.backgroundColor = oldBackground;
            copyElement.style.position = DraggedElement.POSITION_STAY;
            copyElement.style.zIndex = null;
            copyElement.style.opacity = null;
            copyElement.style.top = 0;
            copyElement.style.left = 0;
            copyElement.classList.remove(DraggedElement.CLASS);
            hoverElement.classList.add(Classes.FULL);

            element.removeChild(artifact);
            hoverElement.appendChild(copyElement);
            hoverElement.style.backgroundColor = oldBackground;
          }

          document.removeEventListener('mouseout', onMouseOut);
          document.removeEventListener('mouseup', onMouseUpArtefact);
        };

        document.addEventListener('mouseout', onMouseOut);
        document.addEventListener('mouseup', onMouseUpArtefact);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mouseover', onMouseOver);
    }
  });
});
