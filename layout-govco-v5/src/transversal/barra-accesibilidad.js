/**
 * Gov.co (https://www.gov.co) - Gobierno de Colombia
 *  - Componente: Barra de accesibilidad
 *  - Version: 5.0.0
 */

function methodAssign(event, method, elements) {
  for (let i of elements) {
    i.addEventListener(event, method, false);
  }
}

function addEventHandler(el, evt, sel, handler) {
  for (const currEvt of evt.split(' ')) {
    el.addEventListener(currEvt, function (event) {
      let t = event.target;
      while (t && t !== this) {
        for (const currSel of sel.split(',') ) {
          if (t.matches(currSel)) {
            handler.call(t, event);
          }
        }
        t = t.parentNode;
      }
    });
  }
}

(function() {
  window.addEventListener("load", function () {
    initAccessibilityBar();
  });
})();

function initAccessibilityBar() {
  addEventsAccessibilityBar();

  addEventHandler(
    document.body, 
    'click keydown', 
    '.barra-accesibilidad-govco', 
    function(event) {
      addEventsAccessibilityBar(event);
    }
  );
}

function addEventsAccessibilityBar(event = null) {
	const bars = document.querySelectorAll('.barra-accesibilidad-govco:not(.actived-events-govco)');
	for (const bar of bars) {
	  bar.classList.add('actived-events-govco');
  
	  const constrast = bar.querySelectorAll('button.contrast');
	  methodAssign("click", activeContrast, constrast);
  
	  const decrease = bar.querySelectorAll('button.decrease-font-size');
	  methodAssign("click", activeFontSize, decrease);
  
	  const increase = bar.querySelectorAll('button.increase-font-size');
	  methodAssign("click", activeFontSize, increase);
	}

	if (event == null || bars.length == 0) {
		return false;
	}

	let element = '';
	if (event.target.classList.contains('button.contrast', 'button.decrease-font-size', 'button.increase-font-size')) {
		element = event.target;
	} else if (event.target.closest('.barra-accesibilidad-govco')) {
		element = event.target.closest('button');
	}

	if (element) {
		element.click();
	}
}

function activeContrast() {
  const element = document.querySelector('body');
  if (element.classList.contains('contrast-govco')) {
    element.classList.remove('contrast-govco');
  } else {
    element.classList.add('contrast-govco');
  }
  activeButtonAccessibility(this);
}

let accesibilityBarCounterFontSize = 0;

function activeFontSize() {
  let addition = this.classList.contains('decrease-font-size') ? -1 : 1;
  const decreaseLimit = parseInt(this.getAttribute('data-decrease-limit')) || -5;
  const increaseLimit = parseInt(this.getAttribute('data-increase-limit')) || 5;

  accesibilityBarCounterFontSize += addition;

  if (accesibilityBarCounterFontSize >= decreaseLimit && accesibilityBarCounterFontSize <= increaseLimit) { 
    const elements = document.querySelectorAll('body *');
    for (const element of elements) {
      changeFontSize(element, addition);
    }
  } else {
    accesibilityBarCounterFontSize = addition > 0 ? increaseLimit : decreaseLimit;
  }
  
  activeButtonAccessibility(this);
}

function changeFontSize(element, increse) {
  let fontSize = getFontSize(element);
  fontSize = (fontSize + increse) + 'px';
  element.style.fontSize = fontSize;
}

function getFontSize(element) {
  const fontSize = window.getComputedStyle(element, null).getPropertyValue('font-size');
  return parseFloat(fontSize);
}

function activeButtonAccessibility(element) {
  element.parentNode.querySelector('.active')?.classList.remove('active');
  element.classList.add('active');
}
