/**
 * Gov.co (https://www.gov.co) - Gobierno de Colombia
 *  - Componente: Barra de accesibilidad
 *  - Version: 5.0.0
 */

let itemsDropdownCandy = document.querySelectorAll('.dropdown-item-govco');
itemsDropdownCandy.forEach((element) => {
  if (element.classList.contains('disabled')) {
    element.setAttribute('tabIndex', -1);
  } else {
    element.removeAttribute('tabIndex');
  }
});

function activeItemCandy(itemSelected) {
  const itemsCollection = document.querySelectorAll('.dropdown-item-govco');
  itemsCollection.forEach((element) => {
    element.classList.remove('active-select');
  });
  document.getElementById(itemSelected).classList.add('active-select');
}