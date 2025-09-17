/**
 * Gov.co (https://www.gov.co) - Gobierno de Colombia
 *  - Componente: Menú de navegación
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
    initMenu();    
    inicializarBuscador();
  });
  
  window.addEventListener("resize", function () {
    resizeMenu();
  });
})();

function initMenu() {
  resizeMenu();
  addEventsMenu();

  addEventHandler(
    document.body, 
    'click keydown', 
    '.menu-govco', 
    function(event) {
      addEventsMenu(event);
    }
  );
}

function addEventsMenu(event = null) {
  const menus = document.querySelectorAll('.menu-govco:not(.actived-events-govco)');
  for (const menu of menus) {
    menu.classList.add('actived-events-govco');

    /////// Prevent closing from click inside dropdown
    const buttons = menu.querySelectorAll('.ext-menu-govco .dropdown-menu button.nav-link');
    methodAssign("click", stopEventItemMenu, buttons);
    methodAssign("click", closeItemsMenu, buttons);

    const items = menu.querySelectorAll('.nav-item a');
    methodAssign("click", eventClickItemMenu, items);
  }
}

function stopEventItemMenu(e) {
  e.stopPropagation();
}

function eventClickItemMenu() {
  const parentNavbar = this.closest('.menu-govco');
  parentNavbar.querySelectorAll('.active').forEach(function(element) {
    element.classList.remove('active');
  });
}

function resizeMenu() {
  const menus = document.querySelectorAll('.menu-govco');
  for (const menu of menus) {
    if (window.innerWidth <= 992) {
      const items = menu.querySelectorAll('li.nav-item:not(.ext-menu-govco)');
      const extMenu = menu.querySelector('li.ext-menu-govco');
      removeItemsMenuDesktop(items, extMenu);
    } else {
      const desktopItems = menu.querySelectorAll('li.item-desktop-govco');
      const desktopMenu = menu.querySelector('.navbar-nav');
      removeItemsMenuResponsive(desktopItems, desktopMenu);
      
    }
  }
}

function removeItemsMenuDesktop(items, extMenu) {
  if (!extMenu) {
    console.log('Debe agregar un nuevo item al menú con la clase "ext-menu-govco"');
    return false;
  }

  const container = extMenu.querySelector('.dropdown-menu');
  for (let index = items.length-1; index > 3; index--) {
    const item = items[index];
    
    if (item.closest('.ext-menu-govco') == null) {
      item.classList.add('item-desktop-govco');
      container.insertBefore(item, container.firstChild);

      const button = item.querySelector('button.nav-link');
      button?.addEventListener("click", stopEventItemMenu, false);
      button?.addEventListener("click", closeItemsMenu, false);
    }
  }
}

function closeItemsMenu() {
  const th = this;
  this.closest('.ext-menu-govco')?.querySelectorAll('button[aria-expanded="true"]:not(.btn-menu-govco)')
  .forEach(function(element) {
    if (th != element) {
      element.classList.remove('show');
      element.setAttribute('aria-expanded', false);
      element.nextElementSibling.classList.remove('show');
    }
  });
}

function removeItemsMenuResponsive(desktopItems, desktopMenu) {
  for (const item of desktopItems) {
    item.classList.remove('item-desktop-govco');
    item.querySelector('button.nav-link')?.removeEventListener("click", stopEventItemMenu);
    desktopMenu.insertBefore(item, desktopMenu.lastChild.previousSibling);
  }
}

// Buscador
function inicializarBuscador() {
  addEventHandler(
    document.body,
    "click keydown",
    ".govco-search-basic",
    function (event) {
      InitSearchDefault(event);
    }
  );
  InitSearchDefault();
}

// ============================= BUSCADOR BASICO =======================================

function InitSearchDefault22(event = null) {
  const elements = document.querySelectorAll(".input-search-basic-govco");
  for (const element of elements) {
    element.addEventListener("keydown", (event) => {
      event.target.focus();
      event.target.parentNode.classList.add("active");
      
      event.target.parentNode.querySelector(".line-basic-govco").style.display = "block";
      event.target.parentNode.querySelector(".btn-search-basic-govco").style.display = "block";
      event.target.parentNode.querySelector(".btn-clean-basic-govco").style.display = "block";
    });

     element.addEventListener("click", (event) => {
      event.target.focus();
      event.target.parentNode.classList.add("active");
    });

    element.addEventListener("blur", (event) => {
      event.target.parentNode.classList.remove("active");
    });

    element.parentNode.querySelector(".btn-clean-basic-govco").addEventListener("click", (event) => {
      event.target.closest(".container-govco").querySelector(".line-basic-govco").style.display = "none";
      event.target.closest(".container-govco").querySelector(".btn-clean-basic-govco").style.display = "none";
      event.target.closest(".container-govco").querySelector(".input-search-basic-govco").value = "";
      event.target.closest(".container-govco").querySelector(".input-search-basic-govco").focus();
      event.target.closest(".container-govco").classList.add("active");
    });
  }
}

// ============================= BUSCADOR BASICO =======================================

function InitSearchDefault(event = null) {
  const elements = document.querySelectorAll(".govco-search-basic");
  
  for (const element of elements) {
    element.addEventListener("keyup", (event) => {
      element.querySelector(".line-basic-govco").style.display = "block";
      element.querySelector(".btn-search-basic-govco").style.display = "block";
      element.querySelector(".btn-clean-basic-govco").style.display = "block";

      let inputText = element.querySelector(".input-search-basic-govco").value;
      if (inputText === "") {
        element.querySelector(".line-basic-govco").style.display = "none";
        element.querySelector(".btn-clean-basic-govco").style.display = "none";
        element.querySelector(".input-search-basic-govco").value = "";
        element.querySelector(".input-search-basic-govco").focus();
        element.querySelector(".container-govco").classList.add("active");
      }

      if (event.keyCode === 9) {
        element.querySelector(".input-search-basic-govco").focus();
        element.querySelector(".container-govco").classList.add("active");
      }
    });

    element.querySelector(".btn-clean-basic-govco").addEventListener("keyup", (event) => {
      if (event.keyCode === 9) {
        element.querySelector(".container-govco").focus();
        element.querySelector(".container-govco").classList.add("active");
      }
    })

    element.querySelector(".btn-search-basic-govco").addEventListener("keyup", (event) => {
      if(event.keyCode === 9){
        element.querySelector(".container-govco").focus();
        element.querySelector(".container-govco").classList.add("active");
      }
    })
  
    element.querySelector(".input-search-basic-govco").addEventListener("click", () => {
      element.querySelector(".container-govco").focus();
      element.querySelector(".container-govco").classList.add("active");
    });

    // click para quitar el focus
    element.querySelector(".input-search-basic-govco").addEventListener("blur", () => {
      element.querySelector(".container-govco").classList.remove("active");
    });
  
    element.querySelector(".btn-clean-basic-govco").addEventListener("click", () => {
      element.querySelector(".line-basic-govco").style.display = "none";
      element.querySelector(".btn-clean-basic-govco").style.display = "none";
      element.querySelector(".input-search-basic-govco").value = "";
      element.querySelector(".input-search-basic-govco").focus();
      element.querySelector(".container-govco").classList.add("active");
    });
  }
}

//=================================================================================
