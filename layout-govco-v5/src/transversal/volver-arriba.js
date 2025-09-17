/**
 * Gov.co (https://www.gov.co) - Gobierno de Colombia
 *  - Componente: volver arriba
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
    initBackGoToUp();
  });
})();

function initBackGoToUp() {
  addEventsBackGoToUp();

  addEventHandler(
    document.body, 
    'click keydown', 
    '.volver-arriba-govco', 
    function(event) {
      addEventsBackGoToUp(event);
    }
  );
}

function addEventsBackGoToUp(event = null) {  
  const backGoToUpElements = document.querySelectorAll(".volver-arriba-govco:not(.actived-events-govco)");

  if (backGoToUpElements.length > 0) {
    backGoToUpElements.forEach((element) => element.classList.add('actived-events-govco'));
    methodAssign("click", backGoToUp, backGoToUpElements);
  }

	if (event == null || backGoToUpElements.length == 0) {
		return false;
	}

	let element = '';
	if (event.target.classList.contains('button.volver-arriba-govco')) {
		element = event.target;
	} else if (event.target.closest('button.volver-arriba-govco')) {
		element = event.target.closest('button');
	}

	if (element) {
		element.click();
  }
}

function backGoToUp() {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}
