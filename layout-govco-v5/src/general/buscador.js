function addEventHandler(el, evt, sel, handler) {
  for (const currEvt of evt.split(" ")) {
    el.addEventListener(currEvt, function (event) {
      let t = event.target;
      while (t && t !== this) {
        for (const currSel of sel.split(",")) {
          if (t.matches(currSel)) {
            handler.call(t, event);
          }
        }
        t = t.parentNode;
      }
    });
  }
}

function methodAssign(event, method, elements) {
  for (let i of elements) {
    i.addEventListener(event, method, false);
  }
}

window.addEventListener("load", () => {
  inicializarBuscador();
});

function inicializarBuscador() {
  addEventHandler(
    document.body,
    "click keydown",
    ".govco-search-predictive .govco-search-basic",
    function (event) {
      InitSearchDefault(event);
    }
  );
  InitSearchDefault();
  initSearchPredictive();
}

// ============================= BUSCADOR BASICO =======================================

function InitSearchDefault(event = null) {
  // focus 
  document.querySelector(".input-search-basic-govco").addEventListener("keyup", (event) => {
    document.querySelector(".govco-search-basic .line-basic-govco").style.display = "block";
    document.querySelector(".btn-search-basic-govco").style.display = "block";
    document.querySelector(".btn-clean-basic-govco").style.display = "block";

    let inputText = document.querySelector(".input-search-basic-govco").value;
    
    if(inputText === ""){
      console.log("inputText", inputText);
      document.querySelector(".govco-search-basic .line-basic-govco").style.display = "none";
      document.querySelector(".govco-search-basic .btn-clean-basic-govco").style.display = "none";
      document.querySelector(".govco-search-basic .input-search-basic-govco").value = "";
      document.querySelector(".govco-search-basic .input-search-basic-govco").focus();
      document.querySelector(".govco-search-basic .container-govco").classList.add("active");
    }

    if(event.keyCode === 9){
      console.log("focus tab", event);
      document.querySelector(".govco-search-basic .input-search-basic-govco").focus();
      document.querySelector(".govco-search-basic .container-govco").classList.add("active")
    }
  });

  document.querySelector(".btn-clean-basic-govco").addEventListener("keyup", (event) => {
    if(event.keyCode === 9){
      document.querySelector(".govco-search-basic .container-govco").focus();
      document.querySelector(".govco-search-basic .container-govco").classList.add("active");
    }
  })

  document.querySelector(".btn-search-basic-govco").addEventListener("keyup", (event) => {
    if(event.keyCode === 9){
      document.querySelector(".govco-search-basic .container-govco").focus();
      document.querySelector(".govco-search-basic .container-govco").classList.add("active");
    }
  })

  document.querySelector(".input-search-basic-govco").addEventListener("click", () => {
    document.querySelector(".govco-search-basic .container-govco").focus();
    document.querySelector(".govco-search-basic .container-govco").classList.add("active");
  });

  // click para quitar el focus
  document.querySelector(".input-search-basic-govco").addEventListener("blur", () => {
    document.querySelector(".govco-search-basic .container-govco").classList.remove("active");
  });

  document.querySelector(".btn-clean-basic-govco").addEventListener("click", () => {
    document.querySelector(".govco-search-basic .line-basic-govco").style.display = "none";
    document.querySelector(".govco-search-basic .btn-clean-basic-govco").style.display = "none";
    document.querySelector(".govco-search-basic .input-search-basic-govco").value = "";
    document.querySelector(".govco-search-basic .input-search-basic-govco").focus();
    document.querySelector(".govco-search-basic .container-govco").classList.add("active");
  });


}

//=================================================================================

// ============================BUSCADOR PREDICTIVO===================================
// PREDICTIVO ACTIVE

function initSearchPredictive() {
  var container = document.querySelector(".govco-search-predictive");
  if (container !== null) {

  document.querySelector(".btn-search-predictive-govco").addEventListener("keyup", (event) => {
    if(event.keyCode === 9){
      document.querySelector(".govco-search-predictive .container-govco").focus();
      document.querySelector(".govco-search-predictive .container-govco").classList.add("active");
    }
  })

  document.querySelector(".btn-clean-predictive-govco").addEventListener("keyup", (event) => {
    if(event.keyCode === 9){
      document.querySelector(".govco-search-predictive .container-govco").focus();
      document.querySelector(".govco-search-predictive .container-govco").classList.add("active");
    }
  })

  autocomplete(document.querySelector(".input-search-predictive-govco"));
    // initDropDownsList();
    // agregar focus
    document
      .querySelector(".govco-search-predictive .input-search-predictive-govco")
      .addEventListener("click", () => {
        document
          .querySelector(".govco-search-predictive .input-search-predictive-govco")
          .focus();
        document
          .querySelector(".govco-search-predictive .container-govco")
          .classList.add("active");
      });

    // click para quitar el focus
    document
      .querySelector(".input-search-predictive-govco")
      .addEventListener("blur", () => {
        document.querySelector(".govco-search-predictive .container-govco")
          .classList.remove("active");
      });
    // limpiar el campo
    document
      .querySelector(".btn-clean-predictive-govco")
      .addEventListener("click", () => {
        document.querySelector(".line-predictive-govco").style.display = "none";
        document.querySelector(".btn-clean-predictive-govco").style.display = "none";
        document.querySelector(".input-search-predictive-govco").value = "";
        document.querySelector(".container-options-search-govco").style.display = "none";
        document.querySelector(".govco-search-predictive .input-search-predictive-govco").focus();
        document.querySelector(".govco-search-predictive .container-govco").classList.add("active");
      });

    document.querySelector(".input-search-predictive-govco").addEventListener("keyup", (event) => {
        document.querySelector(".line-predictive-govco").style.display = "block";
        document.querySelector(".btn-clean-predictive-govco").style.display ="block";
        document.querySelector( ".govco-search-predictive .container-options-search-govco").style.display = "block";

        if(event.keyCode === 9){
          console.log("focus tab predictive", event);
          document.querySelector(".govco-search-predictive .input-search-predictive-govco").focus();
          document.querySelector(".govco-search-predictive .container-govco").classList.add("active")
        }

        let cont = 0;
        //reconocimiento del texto al escribir
        const items = document.querySelectorAll(".options-search-govco .items");
        const text = document.querySelector(".input-search-predictive-govco").value.toUpperCase();
        // filtrar por items
        items.forEach(item => {
          const itemText = item.textContent || item.innerText;
          if (itemText.trim().toUpperCase().indexOf(text) > -1) {
            item.classList.remove('d-none');
            cont = cont - 1;
          } else {
            item.classList.add('d-none');
            cont = cont + 1;
          }
        });
        
        if(cont === items.length || text.length === 0){
          document.querySelector(".line-predictive-govco").style.display = "none";
          document.querySelector(".btn-clean-predictive-govco").style.display = "none";
          document.querySelector( ".govco-search-predictive .container-options-search-govco").style.display = "none";
        }

        if(text.length > 0){
          document.querySelector(".line-predictive-govco").style.display = "block";
          document.querySelector(".btn-clean-predictive-govco").style.display = "block";
        }
      });

    function autocomplete(inp) {
      var currentFocus = -1;
      inp.addEventListener("keydown", function (e) {
        var x = document.querySelector(".list-items");
        if (x) x = x.getElementsByTagName("li");
        if (e.keyCode == 40) {
          //down
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) {
          //up
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) {
              x[currentFocus].click();
              document.querySelector(".container-options-search-govco").style.display= "none";
              methodAssign("keydown", obtenerDatoLi, x);
            } 
          }
        }
      });
      
      // obtener el evento al dar click
      let list_items = document.querySelectorAll(".list-items");
      methodAssign("click", obtenerDatoLi, list_items);

      function obtenerDatoLi(event){
        let value = event.target.innerText;
        document.querySelector(".input-search-predictive-govco").value= value;
        document.querySelector(".container-options-search-govco").style.display= "none";
      }

      function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        x[currentFocus].children[0].blur();
        x[currentFocus].children[0].classList.add("active");
      }

      function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
          x[i].children[0].classList.remove("active");
          document.querySelector(".input-search-predictive-govco").click();
        }
      }
    }
  }
}
