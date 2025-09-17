window.addEventListener("load", function () {
  initTopBar();
});


function initTopBar() {
  const translateElement = document.querySelector(".idioma-btn-barra-superior-govco");
  translateElement.addEventListener("click", translate, false);

  function translate() {
    console.log("Implementar traducción")
    // Implementar traducción
  }
}
