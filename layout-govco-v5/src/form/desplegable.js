/**
 * Gov.co (https://www.gov.co) - Gobierno de Colombia
 *  - Componente: Desplegable
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
      var t = event.target;
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
    initDropDowns();
  });
})();

function initDropDowns() {
  addEventHandler(document.body, 'click keydown', '.desplegable-govco .btn-dropdown, .desplegable-govco .input-group', function(event) {
    initDropDownsList(event);
    initDropDownsCalendar(event);
  });

  initDropDownsList();
  initDropDownsCalendar();
}

// Lista - Filtro de búsqueda - Casillas de verificación
function initDropDownsList(event = null) {
  const containersDropDown = document.querySelectorAll('.desplegable-govco:not(.calendar-govco):not(.actived-events-govco)');
  for (const containerDropDown of containersDropDown) {
    containerDropDown.classList.add('actived-events-govco');    
    validateInputHidden(containerDropDown);
    if (!containerDropDown.classList.contains('check-govco')) {
      assignValueDropDown(containerDropDown);
    }
    const iconDown = containerDropDown.querySelectorAll('.icons-dropdown');
    methodAssign("click", clickIconDown, iconDown);
    if (!containerDropDown.classList.contains('check-govco')) {
      const items = containerDropDown.querySelectorAll(".dropdown-item");
      methodAssign("click", enterOptionDropDown, items);
      methodAssign("keydown", eventKeydownItem, items);
    }

    if (containerDropDown.classList.contains('filter-govco')) {
      initDropDownsFilter(containerDropDown);
    } else if (containerDropDown.classList.contains('check-govco')) {
      initDropDownsCheck(containerDropDown);
    }
  }
  if (event != null && containersDropDown.length > 0 && (event.target.classList.contains('icons-dropdown') || event.target.classList.contains('govco-icon'))) {
    event.target.click();
  }
}

function validateInputHidden(element) {
  const inputHidden = element.querySelector('input[type="hidden"]');
  if (!inputHidden) {
    createInputHidden(element);
  }
}

function createInputHidden(element) {
  let idAlert = "";
  const spanAlert = element.querySelector('.alert-desplegable-govco');
  if (spanAlert) {
    idAlert = spanAlert.getAttribute("id");
  }

  const btnDropdown = element.querySelector(".btn-dropdown");
  let inputHidden = document.createElement("input");
  inputHidden.setAttribute('type', 'hidden');
  inputHidden.setAttribute('aria-describedby', idAlert);
  inputHidden.setAttribute('aria-invalid', "false");
  element.insertBefore(inputHidden, btnDropdown);
}

function assignValueDropDown(element) {
  let valueDropDown = "";
  const inputHidden = element.querySelector('input[type="hidden"]');

  if (inputHidden.value) {
    valueDropDown = inputHidden.value;
    const assignedValue = assignValueDropDownLi(element, valueDropDown);
    if (!assignedValue) inputHidden.value = '';
  }
}

function assignValueDropDownLi(element, valueDropDown) {
  const opcionSelected = element.querySelector('.dropdown-item[data-value="' + valueDropDown + '"]');

  if (opcionSelected) {
    opcionSelected.classList.add('active');
    const textValueDropDown = opcionSelected.innerHTML;
    assignValueBtnDropDown(element, textValueDropDown);
  } else {
    return false;
  }
  return true;
}

function assignValueBtnDropDown(element, textValueDropDown) {
  const btnDropdown = element.querySelector('button.btn-dropdown');
  const inputDropdown = element.querySelector('input.btn-dropdown');

  if (btnDropdown) {
    btnDropdown.innerHTML = textValueDropDown;
  }
  if (inputDropdown) {
    inputDropdown.value = textValueDropDown;
    element.querySelector(".icon-close-govco").classList.remove('d-none');
  }
}

function eventKeydownItem(e) {
  if (e.which == 13) { // Enter
    this.click();
  }
}

function enterOptionDropDown() {
  const containersDropDown = this.closest(".desplegable-govco");
  const btnDropdown = containersDropDown.querySelector("button.btn-dropdown");
  const inputDropdown = containersDropDown.querySelector("input.btn-dropdown");
  const dropdownMenu = containersDropDown.querySelector(".dropdown-options-govco");
  const inputHidden = containersDropDown.querySelector('input[type="hidden"]');
  removeActiveOption(dropdownMenu);  
  this.classList.add('active');
  if (btnDropdown) btnDropdown.innerHTML = this.innerHTML;
  if (inputDropdown) {
    inputDropdown.value = this.innerHTML;
    containersDropDown.querySelector(".icon-close-govco").classList.remove('d-none');
  }
  inputHidden.value = getValueDropDown(dropdownMenu);
  if (inputHidden.value ) inputHidden.setAttribute('aria-invalid', 'false');
}

function getValueDropDown(element) {
  let valueDropDown = "";
  const elementActive = element.querySelector('.dropdown-item.active');
  if (elementActive) {
    const dataValue = elementActive.getAttribute('data-value');
    valueDropDown = dataValue ? dataValue : "";
  }
  return valueDropDown;
}

function removeActiveOption(dropdownMenu) {
  const itemActive = dropdownMenu.querySelector(".dropdown-item.active");
  if (itemActive) {
    itemActive.classList.remove('active');
  }
}

function clickIconDown() {
  const containerDropDown = this.closest(".desplegable-govco");
  const btnDropdown = containerDropDown.querySelector(".btn-dropdown");

  if (btnDropdown.getAttribute('aria-expanded') == 'false') {
    setTimeout(() => {
      btnDropdown.click();
    }, 10);
  }
}

// Filtro de búsqueda
function initDropDownsFilter(containerDropDown) {  
  const inputs = containerDropDown.querySelectorAll('input.btn-dropdown');
  methodAssign("keyup", filterList, inputs);
  methodAssign("keydown", eventKeydown, inputs);

  const buttons = containerDropDown.querySelectorAll('button.icon-close-govco');
  methodAssign("click", cleartext, buttons);
}

function filterList() {
  const containerDropDown = this.closest(".desplegable-govco");
  const items = containerDropDown.querySelectorAll(".dropdown-options-govco .dropdown-item");
  const text = this.value.toUpperCase();

  items.forEach(item => {
    const itemText = item.textContent || item.innerText;
    if (itemText.toUpperCase().indexOf(text) > -1) {
      item.classList.remove('d-none');
    } else {
      item.classList.add('d-none');
    }
  });

  const clearButton = containerDropDown.querySelector(".icon-close-govco");
  if (this.value != "" && this.value != undefined && this.value != null) {
    clearButton.classList.remove("d-none");
  } else {
    clearButton.classList.add("d-none");
  }
}

function eventKeydown(e) {
  if (e.which == 13) { // Enter
    this.click();
  }
}

function cleartext() {
  const containerDropDown = this.closest(".desplegable-govco");
  const input = containerDropDown.querySelector("input.btn-dropdown");

  if (!input.disabled) {
    const inputHidden = containerDropDown.querySelector('input[type="hidden"]');
    const att = input.getAttribute('aria-expanded') == 'true';

    input.value = "";
    this.classList.add('d-none');

    setTimeout(() => {
      if (att) input.click();
      else input.dblclick();
    }, 10);

    input.dispatchEvent(new Event("keyup"));
    inputHidden.value = "";
    removeActiveOption(containerDropDown);
  }
}

// Casillas de verificación
function initDropDownsCheck(containerDropDown) {
  assignValueDropDownCheck(containerDropDown);
  const items = containerDropDown.querySelectorAll(".dropdown-item");
  methodAssign("click", clickOptionDropDownCheck, items);
  methodAssign("keydown", eventKeydownItemCheck, items);

  const inputs = containerDropDown.querySelectorAll(".dropdown-item input");
  methodAssign("change", enterInputDropDownCheck, inputs);
}

function assignValueDropDownCheck(element) {
  let valueDropDown = "";
  const inputHidden = element.querySelector('input[type="hidden"]');

  if (inputHidden.value) {
    valueDropDown = inputHidden.value;
    const assignedValue = assignValueDropDownInputCheck(element, valueDropDown);
    if (!assignedValue) inputHidden.value = '';
  }
}

function assignValueDropDownInputCheck(element, valueDropDown) {
  const values = valueDropDown.split(',');
  let textValueDropDown = [];
  for (const value of values) {
    const opcionSelected = element.querySelector('.dropdown-item input[value="' + value + '"]');

    if (opcionSelected) {
      opcionSelected.setAttribute('checked', '');
      const idOptionSelected = opcionSelected.getAttribute('id');
      const labelOpcionSelected = element.querySelector('.dropdown-item label[for="' + idOptionSelected + '"]');
      textValueDropDown.push(labelOpcionSelected.innerHTML);
    }

    if (opcionSelected.type == 'radio') {
      break;
    }
  }

  if (textValueDropDown) {
    assignValueBtnDropDown(element, textValueDropDown.join(', '));
  } else {
    return false;
  }
  return true;
}

function eventKeydownItemCheck(e) {
  if (e.which == 13) { // Enter
    this.click();
  }
}

function clickOptionDropDownCheck(e) {
  e.stopPropagation();
  enterOptionDropDownCheck(e.target);
}

function enterOptionDropDownCheck(e) {
  let element = e;
  if (e.tagName == 'LABEL') {
    const li = e.closest('li');
    element = li.querySelector('input');
  }

  if (e.tagName == 'LABEL' && element.getAttribute('type') == 'radio'){
    return false;
  }

  const input = e.tagName == 'LI' ? e.querySelector('input') : e;
  changeOptionDropDownCheck(input);
}

function enterInputDropDownCheck(e) {
  changeOptionDropDownCheck(e.target);
}

function changeOptionDropDownCheck(e) {
  if (e.getAttribute('type') == 'radio') {
    e.checked = true;
  } else {
    e.checked = e.checked ? false : true;
  }

  const containerDropDown = e.closest('.desplegable-govco.check-govco');
  const button = containerDropDown.querySelector('.btn-dropdown');
  const inputHidden = containerDropDown.querySelector('input[type="hidden"]');
  const inputsChecked = containerDropDown.querySelectorAll('.dropdown-item input:checked');

  let value = [];
  let id = [];
  for (const element of inputsChecked) {
    const label = element.nextElementSibling;
    value.push(label.innerHTML);
    id.push(element.value);
  }
  button.setAttribute('title', value.join(', '));
  button.innerHTML = value.length > 0 ? value.join(', ') : inputHidden.placeholder;
  inputHidden.value = id.join(',');
  inputHidden.setAttribute('aria-invalid', 'false');

  const ul = document.querySelector('.dropdown-options-govco');
  setTimeout(() => {
    ul.scrollTo(0, ul.scrollTop - 1);
  ul.scrollTo(0, ul.scrollTop + 1);
  }, 100);
}

// Calendario
function initDropDownsCalendar (event) {
  let containersDropDown = document.querySelectorAll('.desplegable-govco.calendar-govco:not(.actived-events-govco)');

  for (const containerDropDown of containersDropDown) {
    containerDropDown.classList.add('actived-events-govco');
    const dropdownContainer = containerDropDown.querySelector('.container-dropdown');
    createElementsDesplegable(dropdownContainer);
    const iconContainer = dropdownContainer.querySelector('.input-group');
    const inputNode = dropdownContainer.querySelector('input.btn-dropdown');
    const dialogNode = dropdownContainer.querySelector('.dropdown-options-govco[role=dialog]');
    methodAssignSelectCalendar(inputNode, dialogNode, iconContainer);
  }
  if (event != null && containersDropDown.length > 0 && (event.target.classList.contains('icons-dropdown') || event.target.classList.contains('govco-icon'))) {
    event.target.closest('.desplegable-govco.calendar-govco')?.querySelector('input.btn-dropdown').click();
  }
}

function createElementsDesplegable (containerDesplegable) {
  const container = document.createElement("div");
  container.className = 'dropdown-options-govco';
  container.setAttribute('role', 'dialog');
  container.setAttribute('aria-modal', 'true');
  container.setAttribute('aria-labelledby', 'id-dialog-label');
  containerDesplegable.appendChild(container);

  const header = document.createElement("div");
  header.className = 'header';
  container.appendChild(header);

  const previousDecade = document.createElement("button");
  previousDecade.setAttribute('type', 'button');
  previousDecade.className = 'prev-decade govco-icon govco-angle-left d-none';
  previousDecade.setAttribute('aria-label', 'previous decade');
  header.appendChild(previousDecade);

  const previousYear = document.createElement("button");
  previousYear.setAttribute('type', 'button');
  previousYear.className = 'prev-year govco-icon govco-angle-left d-none';
  previousYear.setAttribute('aria-label', 'previous year');
  header.appendChild(previousYear);

  const previousMonth = document.createElement("button");
  previousMonth.setAttribute('type', 'button');
  previousMonth.className = 'prev-month govco-icon govco-angle-left';
  previousMonth.setAttribute('aria-label', 'previous month');
  header.appendChild(previousMonth);

  const monthsYear = document.createElement("button");
  monthsYear.setAttribute('type', 'button');
  monthsYear.className = 'show-months-year';
  monthsYear.setAttribute('aria-label', 'months year');
  header.appendChild(monthsYear);

  const hMonthsYear = document.createElement("span");
  hMonthsYear.className = 'month-year';
  hMonthsYear.setAttribute('id', 'id-dialog-label');
  hMonthsYear.setAttribute('aria-live', 'polite');
  hMonthsYear.textContent = "Month Year";
  monthsYear.appendChild(hMonthsYear);

  const nextMonth = document.createElement("button");
  nextMonth.setAttribute('type', 'button');
  nextMonth.className = 'next-month govco-icon govco-angle-right';
  nextMonth.setAttribute('aria-label', 'next month');
  header.appendChild(nextMonth);

  const nextYear = document.createElement("button");
  nextYear.setAttribute('type', 'button');
  nextYear.className = 'next-year govco-icon govco-angle-right d-none';
  nextYear.setAttribute('aria-label', 'next year');
  header.appendChild(nextYear);

  const nextDecade = document.createElement("button");
  nextDecade.setAttribute('type', 'button');
  nextDecade.className = 'next-decade govco-icon govco-angle-right d-none';
  nextDecade.setAttribute('aria-label', 'next decade');
  header.appendChild(nextDecade);

  const tableDay = document.createElement("table");
  tableDay.className = 'dates';
  tableDay.setAttribute('id', 'miCalendarioGrid');
  tableDay.setAttribute('role', 'grid');
  tableDay.setAttribute('aria-labelledby', 'id-dialog-label');
  container.appendChild(tableDay);

  const theadDay = document.createElement("thead");
  tableDay.appendChild(theadDay);

  const trDay = document.createElement("tr");
  theadDay.appendChild(trDay);

  let days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  let thDay = '';
  for (const day of days) {
    thDay = document.createElement("th");
    thDay.setAttribute('scope', 'col');
    thDay.setAttribute('abbr', day);
    thDay.textContent = day[0] + day[1];
    trDay.appendChild(thDay);        
  }

  const tbodyDay = document.createElement("tbody");
  tableDay.appendChild(tbodyDay);

  const tr2Day = document.createElement("tr");
  tbodyDay.appendChild(tr2Day);

  createDaysElementDesplegable(tr2Day, 26, 30, 'disabled');
  createDaysElementDesplegable(tr2Day, 1, 1, '');

  const tr3Day = document.createElement("tr");
  tbodyDay.appendChild(tr3Day);

  createDaysElementDesplegable(tr3Day, 2, 8, '');

  const tr4Day = document.createElement("tr");
  tbodyDay.appendChild(tr4Day);

  createDaysElementDesplegable(tr4Day, 9, 15, '');

  const tr5Day = document.createElement("tr");
  tbodyDay.appendChild(tr5Day);

  createDaysElementDesplegable(tr5Day, 16, 22, '');

  const tr6Day = document.createElement("tr");
  tbodyDay.appendChild(tr6Day);

  createDaysElementDesplegable(tr6Day, 23, 29, '');

  const tr7Day = document.createElement("tr");
  tbodyDay.appendChild(tr7Day);

  createDaysElementDesplegable(tr7Day, 30, 31, '');

  createDaysElementDesplegable(tr7Day, 1, 6, 'disabled');

  const tableMonth = document.createElement("table");
  tableMonth.className = 'months d-none';
  tableMonth.setAttribute('id', 'myMonthpickerGrid');
  tableMonth.setAttribute('role', 'grid presentation');
  tableMonth.setAttribute('aria-labelledby', 'id-dialog-label');
  tableMonth.setAttribute('aria-hidden', 'true');
  container.appendChild(tableMonth);

  const tbodyMonth = document.createElement("tbody");
  tableMonth.appendChild(tbodyMonth);

  const trMonth = document.createElement("tr");
  tbodyMonth.appendChild(trMonth);

  let months = ['Ene', 'Feb', 'Mar', 'Abr'];
  createMonthsElementDesplegable(months, trMonth, 1);

  const tr2Month = document.createElement("tr");
  tbodyMonth.appendChild(tr2Month);

  months = ['May', 'Jun', 'Jul', 'Ago'];
  createMonthsElementDesplegable(months, tr2Month, 5);

  const tr3Month = document.createElement("tr");
  tbodyMonth.appendChild(tr3Month);

  months = ['Sep', 'Oct', 'Nov', 'Dic'];
  createMonthsElementDesplegable(months, tr3Month, 9);

  const tableYear = document.createElement("table");
  tableYear.className = 'years d-none';
  tableYear.setAttribute('id', 'myYearpickerGrid');
  tableYear.setAttribute('role', 'grid presentation');
  tableYear.setAttribute('aria-labelledby', 'id-dialog-label');
  tableYear.setAttribute('aria-hidden', 'true');
  container.appendChild(tableYear);

  const tbodyYear = document.createElement("tbody");
  tableYear.appendChild(tbodyYear);

  let trYear = '';
  let tdYear = '';
  let buttontdYear = '';
  for (let index = 2020; index <= 2031; index++) {
    if (index % 4 == 0) {
      trYear = document.createElement("tr");
      tbodyYear.appendChild(trYear);
    }
    tdYear = document.createElement("td");
    tdYear.className = 'year-cell';
    trYear.appendChild(tdYear);

    buttontdYear = document.createElement("button");
    buttontdYear.setAttribute('type', 'button');
    buttontdYear.className = 'year-button';
    buttontdYear.setAttribute('tabindex', '-1');
    buttontdYear.setAttribute('data-date', index);
    buttontdYear.textContent = index;
    tdYear.appendChild(buttontdYear);
  }
}

function createMonthsElementDesplegable (months, trMonth, increment) {
  let tdMonth = '';
  let buttontdMonth = '';
  
  for (let index = 0; index < months.length; index++) {
    tdMonth = document.createElement("td");
    tdMonth.className = 'month-cell';
    trMonth.appendChild(tdMonth);

    buttontdMonth = document.createElement("button");
    buttontdMonth.setAttribute('type', 'button');
    buttontdMonth.className = 'month-button';
    buttontdMonth.setAttribute('tabindex', '-1');
    buttontdMonth.setAttribute('data-date', index + increment);
    buttontdMonth.textContent = months[index];
    tdMonth.appendChild(buttontdMonth);
  }
}

function createDaysElementDesplegable (trDay, ini, fin, disabled) {
  let tdDay = '';
  let buttontdDay = '';
  for (let index = ini; index <= fin; index++) {
      tdDay = document.createElement("td");
      tdDay.className = 'date-cell';
      trDay.appendChild(tdDay);

      buttontdDay = document.createElement("button");
      buttontdDay.setAttribute('type', 'button');
      buttontdDay.className = 'date-button';
      buttontdDay.setAttribute('tabindex', '-1');
      if (disabled) { buttontdDay.setAttribute('disabled', ''); }
      buttontdDay.textContent = index;
      tdDay.appendChild(buttontdDay);
  }
}

function methodAssignSelectCalendar(inputNode, dialogNode, iconContainer) {
  const datePicker = new DatePicker(inputNode, dialogNode, iconContainer);
  datePicker.init();
}

let DatePickerDay = function (domNode, datepicker, index, row, column) {

  this.index = index;
  this.row = row;
  this.column = column;
  this.day = new Date();
  this.domNode = domNode;
  this.datepicker = datepicker;

  this.keyCode = Object.freeze({
      'TAB': 9,
      'ENTER': 13,
      'ESC': 27,
      'SPACE': 32,
      'PAGEUP': 33,
      'PAGEDOWN': 34,
      'END': 35,
      'HOME': 36,
      'LEFT': 37,
      'UP': 38,
      'RIGHT': 39,
      'DOWN': 40
  });
};

DatePickerDay.prototype.init = function () {
  this.domNode.setAttribute('tabindex', '-1');
  this.domNode.addEventListener('mousedown', this.handleMouseDown.bind(this));
  this.domNode.addEventListener('keydown', this.handleKeyDown.bind(this));
  this.domNode.innerHTML = '-1';
};

DatePickerDay.prototype.isDisabled = function () {
  return this.domNode.classList.contains('disabled');
};

DatePickerDay.prototype.updateDay = function (disable, day) {
  this.activeDisabled(disable);

  this.day = new Date(day);
  this.domNode.innerHTML = this.day.getDate();
  this.domNode.setAttribute('tabindex', '-1');
  this.domNode.removeAttribute('aria-selected');
  let d = this.day.getDate().toString();
  if (this.day.getDate() < 9) {
    d = '0' + d;
  }

  let m = this.day.getMonth() + 1;
  if (this.day.getMonth() < 9) {
    m = '0' + m;
  }

  this.domNode.setAttribute('data-date', this.day.getFullYear() + '-' + m + '-' + d);
};

DatePickerDay.prototype.activeDisabled = function (disable) {
  if (disable) {
    this.domNode.classList.add('disabled');
  } else {
    this.domNode.classList.remove('disabled');
  }
};

DatePickerDay.prototype.handleKeyDown = function (event) {
  let flag = false;

  switch (event.keyCode) {

    case this.keyCode.ESC:
      this.datepicker.hide();
      break;

    case this.keyCode.TAB:            
      if (!event.shiftKey) {
        this.datepicker.hide();
      }
      break;

    case this.keyCode.ENTER:
    case this.keyCode.SPACE:
      this.datepicker.setTextboxDate();
      this.datepicker.hide();
      flag = true;
      break;

    case this.keyCode.RIGHT:
      this.datepicker.moveFocusToNextDay();
      flag = true;
      break;

    case this.keyCode.LEFT:
      this.datepicker.moveFocusToPreviousDay();
      flag = true;
      break;

    case this.keyCode.DOWN:
      this.datepicker.moveFocusToNextWeek();
      flag = true;
      break;

    case this.keyCode.UP:
      this.datepicker.moveFocusToPreviousWeek();
      flag = true;
      break;

    case this.keyCode.PAGEUP:
      if (event.shiftKey) {
        this.datepicker.moveToPreviousYear();
      }
      else {
        this.datepicker.moveToPreviousMonth();
      }
      flag = true;
      break;

    case this.keyCode.PAGEDOWN:
      if (event.shiftKey) {
        this.datepicker.moveToNextYear();
      }
      else {
        this.datepicker.moveToNextMonth();
      }
      flag = true;
      break;

    case this.keyCode.HOME:
      this.datepicker.moveFocusToFirstDayOfWeek();
      flag = true;
      break;

    case this.keyCode.END:
      this.datepicker.moveFocusToLastDayOfWeek();
      flag = true;
      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

DatePickerDay.prototype.handleMouseDown = function (event) {
  if (this.isDisabled()) {
    this.datepicker.moveFocusToDay(this.date);
  } else {
    this.datepicker.setTextboxDate(this.day);
    this.datepicker.hide();
  }

  event.stopPropagation();
  event.preventDefault();
};

let CalendarButtonInput = {};
let CalendarContainerButtonInput = {};

let DatePicker = function (inputNode, dialogNode, iconContainer) {
  this.dayLabels = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  this.monthLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  this.inputNode = inputNode;
  this.dialogNode = dialogNode;
  this.iconContainer = iconContainer;
  
  const calendarSelectionFormat =  this.inputNode.getAttribute('calendar-selection-format');
  this.viewDay = calendarSelectionFormat?.includes('dd');
  this.viewMonth = calendarSelectionFormat?.includes('mm');
  this.viewYear = calendarSelectionFormat?.includes('aaaa');

  this.viewDay = !this.viewMonth && !this.viewYear ? true : this.viewDay;
  this.viewMonth = this.viewDay ? true : this.viewMonth;
  this.viewYear = this.viewDay ? true : this.viewYear;

  const placeholder = [];

  if (this.viewDay) placeholder.push('dd');
  if (this.viewMonth) placeholder.push('mm');
  if (this.viewYear) placeholder.push('aaaa');
  this.inputNode.setAttribute('placeholder', placeholder.join('/'));

  this.initialDate = this.getFormatDate(this.inputNode.getAttribute('min-date'));
  this.finalDate = this.getFormatDate(this.inputNode.getAttribute('max-date'));

  this.dateInput = new CalendarButtonInput(this.inputNode, this);
  this.containerDateInput = new CalendarContainerButtonInput(this.iconContainer, this, this.inputNode);

  this.MonthYearNode = this.dialogNode.querySelector('.month-year');
  this.MonthsYearNode = this.dialogNode.querySelector('button.show-months-year');

  this.MonthsNodes = this.dialogNode.querySelectorAll('.month-button');
  this.YearNodes = this.dialogNode.querySelectorAll('.year-button');

  this.prevYearNode = this.dialogNode.querySelector('.prev-year');
  this.prevMonthNode = this.dialogNode.querySelector('.prev-month');
  this.prevDecadeNode = this.dialogNode.querySelector('.prev-decade');
  this.nextMonthNode = this.dialogNode.querySelector('.next-month');
  this.nextYearNode = this.dialogNode.querySelector('.next-year');
  this.nextDecadeNode = this.dialogNode.querySelector('.next-decade');

  this.okButtonNode = this.dialogNode.querySelector('button[value="ok"]');
  this.cancelButtonNode = this.dialogNode.querySelector('button[value="cancel"]');

  this.tbodyNode = this.dialogNode.querySelector('table.dates tbody');

  this.dateTableNode = this.dialogNode.querySelector('table.dates');

  this.monthsTableNode = this.dialogNode.querySelector('table.months');
  this.buttonsCellsMonths = this.monthsTableNode.querySelectorAll('button');

  this.yearsTableNode = this.dialogNode.querySelector('table.years');
  this.buttonsCellsYears = this.yearsTableNode.querySelectorAll('button');

  this.lastRowNode = null;

  this.days = [];

  this.focusDay = new Date();
  this.yearSelect = this.focusDay.getFullYear();
  this.monthSelected = this.focusDay.getMonth();
  this.selectedDay = new Date();

  this.isMouseDownOnBackground = false;

  this.keyCode = Object.freeze({
    'TAB': 9,
    'ENTER': 13,
    'ESC': 27,
    'SPACE': 32,
    'PAGEUP': 33,
    'PAGEDOWN': 34,
    'END': 35,
    'HOME': 36,
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40
  });
};

DatePicker.prototype.init = function () {
  let that = this;
  this.dateInput.init();
  this.containerDateInput.init();
  this.MonthsYearNode.addEventListener('click', this.handleMonthsYear.bind(this));

  for (const monthButton of this.MonthsNodes) {
    monthButton.addEventListener('keydown', this.handleKeyDownMonth.bind(this))
  }

  for (const yearButton of this.YearNodes) {
    yearButton.addEventListener('keydown', this.handleKeyDownYear.bind(this))
  }

  this.prevMonthNode.addEventListener('click', this.handlePreviousMonthButton.bind(this));
  this.nextMonthNode.addEventListener('click', this.handleNextMonthButton.bind(this));

  this.prevMonthNode.addEventListener('keydown', this.handlePreviousMonthButton.bind(this));
  this.nextMonthNode.addEventListener('keydown', this.handleNextMonthButton.bind(this));

  this.prevYearNode.addEventListener('click', this.handlePreviousYearButton.bind(this));
  this.nextYearNode.addEventListener('click', this.handleNextYearButton.bind(this));

  this.prevYearNode.addEventListener('keydown', this.handlePreviousYearButton.bind(this));
  this.nextYearNode.addEventListener('keydown', this.handleNextYearButton.bind(this));

  this.prevDecadeNode.addEventListener('click', this.handlePreviousDecadeButton.bind(this));
  this.nextDecadeNode.addEventListener('click', this.handleNextDecadeButton.bind(this));

  this.prevDecadeNode.addEventListener('keydown', this.handlePreviousDecadeButton.bind(this));
  this.nextDecadeNode.addEventListener('keydown', this.handleNextDecadeButton.bind(this));

  this.buttonsCellsMonths.forEach(function (button) {
    button.addEventListener('click', that.handleMonthButton.bind(that));
  });

  this.buttonsCellsYears.forEach(function (button) {
    button.addEventListener('click', that.handleYearButton.bind(that));
  })

  document.body.addEventListener('mousedown', this.handleBackgroundMouseDown.bind(this), true);
  document.body.addEventListener('mouseup', this.handleBackgroundMouseUp.bind(this), true);

  // Create Grid of Dates
  this.tbodyNode.innerHTML = '';
  let index = 0;
  for (let i = 0; i < 6; i++) {
    const row = this.tbodyNode.insertRow(i);
    this.lastRowNode = row;
    row.classList.add('dateRow');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      cell.classList.add('date-cell');
      const cellButton = document.createElement('button');
      cellButton.classList.add('date-button');
      cell.appendChild(cellButton);
      row.appendChild(cell);
      const dpDay = new DatePickerDay(cellButton, this, index, i, j);
      dpDay.init();
      this.days.push(dpDay);
      index++;
    }
  }

  this.monthsTableNode.classList.add('d-none');
  this.yearsTableNode.classList.add('d-none');

  this.updateGrid();
  this.setFocusDay(false);
};

DatePicker.prototype.updateGrid = function () {
  let i, flag;

  this.MonthYearNode.innerHTML = this.monthLabels[this.monthSelected] + ' ' + this.yearSelect;
  const firstDayOfMonth = new Date(this.yearSelect, this.monthSelected, 1);
  const daysInMonth = new Date(this.yearSelect, this.monthSelected + 1, 0).getDate();
  const dayOfWeek = firstDayOfMonth.getDay() == 0 ? 6 : firstDayOfMonth.getDay()-1;

  firstDayOfMonth.setDate(firstDayOfMonth.getDate() - dayOfWeek);

  const d = new Date(firstDayOfMonth);
  for (i = 0; i < this.days.length; i++) {

    flag = d.getMonth() != this.monthSelected;
    
    this.days[i].updateDay(flag, d);
    
    if ((this.initialDate && this.days[i].day < this.initialDate) || 
      (this.finalDate && this.days[i].day > this.finalDate)) {
        this.days[i].activeDisabled(true);
    }
    
    if ((d.getFullYear() == this.selectedDay.getFullYear()) &&
      (d.getMonth() == this.selectedDay.getMonth()) &&
      (d.getDate() == this.selectedDay.getDate()) &&
      (!this.days[i].isDisabled)) {
      this.days[i].domNode.setAttribute('aria-selected', 'true');
    }
    d.setDate(d.getDate() + 1);
  }

  if ((dayOfWeek + daysInMonth) < 36) {
    this.hideLastRow();
  } else {
    this.showLastRow();
  }

  this.markDateSelected();
};

DatePicker.prototype.markDateSelected = function () {
  this.uncheckDateSelected();
  const date = this.formatDate(this.selectedDay);
  document.querySelector('button[data-date="'+ date + '"]')?.classList.add('selected');
}

DatePicker.prototype.uncheckDateSelected = function () {
  document.querySelector('button.selected')?.classList.remove('selected');
}

DatePicker.prototype.padTo2Digits = function (num) {
  return num.toString().padStart(2, '0');
}

DatePicker.prototype.formatDate = function (date) {
  if (this.viewDay) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  } else if (this.viewMonth) {
    return (date.getMonth() + 1);
  } else {
    return date.getFullYear();
  }
}

DatePicker.prototype.updateYearGrid = function (newYear) {
  const year = newYear || this.yearSelect;
  let initialYearFocus = this.initialDate ? this.initialDate.getFullYear() : 0;
  let finalYearFocus = this.finalDate ? this.finalDate.getFullYear() : 0;
  const yearEndCero = year - (year % 10);
  const modEnd = (yearEndCero % 100) % 4;
  let yearStart = modEnd == 0 ? yearEndCero : yearEndCero - 2;

  this.buttonsCellsYears.forEach(function (element, index) {
      element.innerHTML = yearStart + index;
      element.setAttribute('tabindex', '-1');
      element.setAttribute('data-date', yearStart + index);
      
      if (yearStart + index < initialYearFocus || (yearStart + index > finalYearFocus && finalYearFocus != 0)) {
          element.classList.add('disabled');
      } else {
          element.classList.remove('disabled');
      }
  });
  this.validateFocusYear(year);
}; 

DatePicker.prototype.validateFocusYear = function (newYear) {
  newYear =  this.initialDate || this.finalDate ? this.getYearFocus(newYear) : newYear;
  if (newYear) {
      this.yearSelect = newYear;
      this.focusDay = new Date(newYear, this.focusDay.getMonth(), this.focusDay.getDate());
      const button = this.yearsTableNode.querySelector("button[data-date='" + newYear + "']");
      button.setAttribute('tabindex', '0');
  }
}

DatePicker.prototype.getYearFocus = function (yearSelect) {
  const fd = this.focusDay;
  const year = yearSelect || fd.getFullYear();
  const yearEndCero = year - (year % 10);
  const modEnd = (yearEndCero % 100) % 4;
  let yearStart = modEnd == 0 ? yearEndCero : yearEndCero - 2;
  let initialYearFocus = this.initialDate ? this.initialDate.getFullYear() : 0;
  let finalYearFocus = this.finalDate ? this.finalDate.getFullYear() : 0;

  if (year >= initialYearFocus && ((year <= finalYearFocus && finalYearFocus != 0) || finalYearFocus == 0)) {
      return year;
  } else if (yearStart + 11 >= finalYearFocus && finalYearFocus != 0 && yearStart <= initialYearFocus) {
      return finalYearFocus;
  } else if (yearStart <= initialYearFocus && yearStart + 11 >= initialYearFocus) {
      return initialYearFocus;
  } else if (year >= yearStart && year > finalYearFocus && finalYearFocus <= yearStart + 11 && year <= yearStart + 11 && yearStart < finalYearFocus) {
      return finalYearFocus;
  }
}

DatePicker.prototype.updateGridYear = function (yearSelect) {
  const fd = this.focusDay;
  const year = yearSelect || fd.getFullYear();
  const yearEndCero = year - (year % 10);
  const modEnd = (yearEndCero % 100) % 4;
  let yearStart = modEnd == 0 ? yearEndCero : yearEndCero - 2;
  let yearEnd = yearStart + 11;

  this.MonthYearNode.innerHTML = yearStart + " - " + yearEnd;
};

DatePicker.prototype.updateGridTextMonth = function () {
  const fd = this.focusDay;
  this.MonthYearNode.innerHTML = fd.getFullYear();
};

DatePicker.prototype.handleMonthsYear = function () {
  if (!this.dateTableNode.classList.contains('d-none')) {
      this.showMonthsYear();
      this.updateGridTextMonth();
  } else if (!this.monthsTableNode.classList.contains('d-none')) {
      this.showYearsDecade();
      this.updateGridYear();
  }
}

DatePicker.prototype.showMonthsYear = function () {
  this.dateTableNode.classList.add('d-none');
  this.prevMonthNode.classList.add('d-none');
  this.nextMonthNode.classList.add('d-none');
  this.yearsTableNode.classList.add('d-none');
  this.prevDecadeNode.classList.add('d-none');
  this.nextDecadeNode.classList.add('d-none');
  this.monthsTableNode.classList.remove('d-none');  
  
  if (this.viewMonth && !this.viewDay && !this.viewYear) {
    this.prevYearNode.classList.add('d-none');
    this.nextYearNode.classList.add('d-none');
    this.MonthsYearNode.classList.add('d-none');
  } else {
    this.prevYearNode.classList.remove('d-none');
    this.nextYearNode.classList.remove('d-none');
  }
  this.viewMonths();
}

DatePicker.prototype.showYearsDecade = function () {
  this.dateTableNode.classList.add('d-none');
  this.monthsTableNode.classList.add('d-none');
  this.prevMonthNode.classList.add('d-none');
  this.nextMonthNode.classList.add('d-none');
  this.prevYearNode.classList.add('d-none');
  this.nextYearNode.classList.add('d-none');
  this.yearsTableNode.classList.remove('d-none');
  this.prevDecadeNode.classList.remove('d-none');
  this.nextDecadeNode.classList.remove('d-none');
}

DatePicker.prototype.showDaysMonth = function () {
  this.monthsTableNode.classList.add('d-none');
  this.yearsTableNode.classList.add('d-none');
  this.prevDecadeNode.classList.add('d-none');
  this.nextDecadeNode.classList.add('d-none');
  this.prevYearNode.classList.add('d-none');
  this.nextYearNode.classList.add('d-none');
  this.dateTableNode.classList.remove('d-none');
  this.prevMonthNode.classList.remove('d-none');
  this.nextMonthNode.classList.remove('d-none');
}

DatePicker.prototype.hideLastRow = function () {
  this.lastRowNode.style.display = 'none';
};

DatePicker.prototype.showLastRow = function () {
  this.lastRowNode.style.display = 'table-row';
};

DatePicker.prototype.setFocusDay = function (flag) {
  if (typeof flag !== 'boolean') {
      flag = true;
  }

  const fd = new Date(this.focusDay);
  
  let exists = 0;
  let dateAux = '';
  let contAux = 0;
  function checkDay(d) {
      contAux++;
      d.domNode.setAttribute('tabindex', '-1');

      const dS = new Date(fd);
      dS.setHours(0, 0, 0, 0);
      const dInitial = this.initialDate ? this.initialDate : dS;
      const dFinal = this.finalDate ? this.finalDate : dS;
      
      dateAux = this.getDateAux(d, dateAux);
      if ((d.day.getDate() == fd.getDate()) &&
          (d.day.getMonth() == fd.getMonth() && d.day.getMonth() == this.monthSelected) &&
          (d.day.getFullYear() == fd.getFullYear()) &&
          (dS >= dInitial && dS <= dFinal)) {
          this.editFocusDay(d, flag);
          exists = 1;
      }
  }

  this.days.forEach(checkDay.bind(this));
  if (exists == 0 && dateAux != '') {
      dateAux.domNode.setAttribute('tabindex', '0');
  }
};

DatePicker.prototype.editFocusDay = function (d, flag) {
  d.domNode.setAttribute('tabindex', '0');
  //Control Meses
  const buttonMonth = this.monthsTableNode.querySelector("button[data-date='" + (d.day.getMonth() + 1) + "']");
  this.buttonsCellsMonths.forEach(function (e) {
      e.setAttribute('tabindex', '-1');
  }) 
  buttonMonth.setAttribute('tabindex', '0')
  //Control Años
  const buttonYear = this.yearsTableNode.querySelector("button[data-date='" + d.day.getFullYear() + "']");
  this.buttonsCellsYears.forEach(function (e) {
      e.setAttribute('tabindex', '-1');
  })
  
  if (buttonYear) {
      buttonYear.setAttribute('tabindex', '0');
  }

  if (flag) {
      d.domNode.focus();
  }
}

DatePicker.prototype.getDateAux = function (d, dateAux) {
  if (this.initialDate == '' && this.finalDate == '' && d.day.getDate() == 1 && d.day.getMonth() == this.monthSelected) {
      return d;
  } else if (d.day.getMonth() == this.monthSelected && dateAux == '') {
      if ((d.day >= this.initialDate && d.day <= this.finalDate)  ||
          (this.initialDate == '' && this.finalDate && d.day.getDate() == 1) ||
          (this.initialDate && this.finalDate == '' && d.day.getDate() == this.initialDate.getDate())) {
          return d;
      }
  }
  return dateAux;
}

DatePicker.prototype.setFocusMonth = function (flag) {
  if (typeof flag !== 'boolean') {
    flag = true;
  }
  const fd = this.focusDay;
  let buttonMonth = this.monthsTableNode.querySelector("button[data-date='" + (fd.getMonth() + 1) + "']");  
  if (flag) {
    buttonMonth.focus();
  }
}

DatePicker.prototype.setFocusYear = function (flag) {
  if (typeof flag !== 'boolean') {
    flag = true;
  }
  const fd = this.focusDay;
  let buttonYear = this.yearsTableNode.querySelector("button[data-date='" + fd.getFullYear() + "']");
  if (flag) {
    buttonYear.focus();
  }
}

DatePicker.prototype.updateDay = function (day) {
  const d = this.focusDay;
  this.focusDay = day;
  if ((d.getMonth() !== day.getMonth()) ||
      (d.getFullYear() !== day.getFullYear())) {
      this.updateGrid();
      this.setFocusDay();
  }
};

DatePicker.prototype.getDaysInLastMonth = function () {
  const fd = this.focusDay;
  const lastDayOfMonth = new Date(fd.getFullYear(), fd.getMonth(), 0);
  return lastDayOfMonth.getDate();
};

DatePicker.prototype.getDaysInMonth = function () {
  const fd = this.focusDay;
  const lastDayOfMonth = new Date(fd.getFullYear(), fd.getMonth() + 1, 0);
  return lastDayOfMonth.getDate();
};

DatePicker.prototype.show = function () {
  const desplegable = this.inputNode.closest('.container-dropdown');
  desplegable.classList.add('desplegable-arrow-active');
  this.dialogNode.classList.add('show');

  this.getDateInput();
  this.monthSelected = this.focusDay.getMonth();
  this.yearSelect = this.focusDay.getFullYear();
  this.showDaysMonth();
  this.updateYearGrid();
  this.updateGridYear()
  this.updateGrid();
  this.setFocusDay();
};

DatePicker.prototype.isOpen = function () {
  return window.getComputedStyle(this.dialogNode).display !== 'none';
};

DatePicker.prototype.hide = function () {
  const desplegable = this.inputNode.closest('.container-dropdown');
  desplegable.classList.remove('desplegable-arrow-active');
  this.dialogNode.classList.remove('show');

  this.hasFocusFlag = false;
  this.dateInput.setFocus();
};

DatePicker.prototype.handleBackgroundMouseDown = function (event) {
  if (!this.inputNode.contains(event.target) &&
    !this.dialogNode.contains(event.target) &&
    !this.iconContainer.contains(event.target) &&
    !this.inputNode.classList.contains('no-hide')) {

    this.isMouseDownOnBackground = true;

    if (this.isOpen()) {
      this.hide();
      event.stopPropagation();
      event.preventDefault();
    }
  }
};

DatePicker.prototype.handleBackgroundMouseUp = function () {
  this.isMouseDownOnBackground = false;
};

DatePicker.prototype.showMonthsYearNode = function (event) {
  let flag = false;

  switch (event.type) {
      case 'keydown':

          switch (event.keyCode) {
              case this.keyCode.ENTER:
              case this.keyCode.SPACE:
                  this.setTextboxDate();
                  this.hide();
                  flag = true;
                  break;

              case this.keyCode.TAB:
                  if (!event.shiftKey) {
                      this.prevYearNode.focus();
                      flag = true;
                  }
                  break;

              case this.keyCode.ESC:
                  this.hide();
                  flag = true;
                  break;

              default:
                  break;

          }
          break;

      case 'click':
          this.setTextboxDate();
          this.hide();
          flag = true;
          break;

      default:
          break;
  }

  if (flag) {
      event.stopPropagation();
      event.preventDefault();
  }
};

DatePicker.prototype.handleNextDecadeButton = function (event) {
  let flag = false;

  switch (event.type) {

      case 'keydown':

          switch (event.keyCode) {
              case this.keyCode.ESC:
                  this.hide();
                  flag = true;
                  break;

              case this.keyCode.ENTER:
              case this.keyCode.SPACE:
                  this.moveToNextDecade();
                  this.setFocusDay(false);
                  flag = true;
                  break;
          }

          break;

      case 'click':
          this.moveToNextDecade();
          this.setFocusDay(false);
          break;

      default:
          break;
  }

  if (flag) {
      event.stopPropagation();
      event.preventDefault();
  }
};

DatePicker.prototype.handlePreviousDecadeButton = function (event) {
  let flag = false;

  switch (event.type) {

      case 'keydown':

          switch (event.keyCode) {

              case this.keyCode.ENTER:
              case this.keyCode.SPACE:
                  this.moveToPreviousDecade();
                  this.setFocusDay(false);
                  flag = true;
                  break;

              case this.keyCode.ESC:
                  this.hide();
                  flag = true;
                  break;

              default:
                  break;
          }

          break;

      case 'click':
          this.moveToPreviousDecade();
          this.setFocusDay(false);
          break;

      default:
          break;
  }

  if (flag) {
      event.stopPropagation();
      event.preventDefault();
  }
};

DatePicker.prototype.handleNextYearButton = function (event) {
  let flag = false;

  switch (event.type) {

      case 'keydown':

          switch (event.keyCode) {
              case this.keyCode.ESC:
                  this.hide();
                  flag = true;
                  break;

              case this.keyCode.ENTER:
              case this.keyCode.SPACE:
                  this.moveToNextYear();
                  this.setFocusDay(false);
                  flag = true;
                  break;
          }

          break;

      case 'click':
          this.moveToNextYear();
          this.setFocusDay(false);
          break;

      default:
          break;
  }

  if (flag) {
      event.stopPropagation();
      event.preventDefault();
  }
};

DatePicker.prototype.handlePreviousYearButton = function (event) {
  let flag = false;

  switch (event.type) {

      case 'keydown':

          switch (event.keyCode) {

              case this.keyCode.ENTER:
              case this.keyCode.SPACE:
                  this.moveToPreviousYear();
                  this.setFocusDay(false);
                  flag = true;
                  break;

              case this.keyCode.ESC:
                  this.hide();
                  flag = true;
                  break;

              default:
                  break;
          }

          break;

      case 'click':
          this.moveToPreviousYear();
          this.setFocusDay(false);
          break;

      default:
          break;
  }

  if (flag) {
      event.stopPropagation();
      event.preventDefault();
  }
};

DatePicker.prototype.handleNextMonthButton = function (event) {
  let flag = false;

  switch (event.type) {

      case 'keydown':

          switch (event.keyCode) {
              case this.keyCode.ESC:
                  this.hide();
                  flag = true;
                  break;

              case this.keyCode.ENTER:
              case this.keyCode.SPACE:
                  this.moveToNextMonth();
                  this.setFocusDay(false);
                  flag = true;
                  break;
          }

          break;

      case 'click':
          this.moveToNextMonth();
          this.setFocusDay(false);
          break;

      default:
          break;
  }

  if (flag) {
      event.stopPropagation();
      event.preventDefault();
  }
};

DatePicker.prototype.handlePreviousMonthButton = function (event) {
  let flag = false;

  switch (event.type) {

      case 'keydown':

          switch (event.keyCode) {
              case this.keyCode.ESC:
                  this.hide();
                  flag = true;
                  break;

              case this.keyCode.ENTER:
              case this.keyCode.SPACE:
                  this.moveToPreviousMonth();
                  this.setFocusDay(false);
                  flag = true;
                  break;
          }

          break;

      case 'click':
          this.moveToPreviousMonth();
          this.setFocusDay(false);
          flag = true;
          break;

      default:
          break;
  }

  if (flag) {
      event.stopPropagation();
      event.preventDefault();
  }
};

DatePicker.prototype.handleMonthButton = function (event) {
  if (!this.isDisabled(event.target)) {
      const buttonMonth = event.target;
      const month = buttonMonth.getAttribute('data-date');
      this.showDaysMonth();
      this.focusDay.setMonth(month - 1);
      this.focusDay.setDate(1);
      this.monthSelected = month - 1;
      this.buttonsCellsMonths.forEach(function (e) {
          e.setAttribute('tabindex', '-1');
      })
      buttonMonth.setAttribute('tabindex', '0');
      if (this.viewDay) {
        this.updateGrid();
      } else {
        this.setTextboxDate();
        this.hide();
      }
      this.setFocusDay(false);
  }
};

DatePicker.prototype.handleYearButton = function (event) {
  let buttonYear = event.target;
  if (!this.isDisabled(buttonYear)) {
    const year = buttonYear.getAttribute('data-date');
    this.yearSelect = parseInt(year);
    this.focusDay.setFullYear(year);
    
    if (this.viewMonth) {
      this.showMonthsYear();
      this.MonthYearNode.innerHTML = year;
      this.updateYearGrid();
    } else {
      this.hide();
      this.setTextboxDate();
    }
  }
};

DatePicker.prototype.moveToNextDecade = function () {
  this.yearSelect = this.yearSelect + 10;
  this.updateYearGrid(this.yearSelect);
  this.updateGridYear(this.yearSelect)
};

DatePicker.prototype.moveToPreviousDecade = function () {
  this.yearSelect = this.yearSelect - 10;
  this.updateYearGrid(this.yearSelect);
  this.updateGridYear(this.yearSelect)
};

DatePicker.prototype.moveToNextYear = function () {
  const fd = this.focusDay;
  this.MonthYearNode.innerHTML = fd.getFullYear() + 1;
  this.yearSelect = fd.getFullYear() + 1;
  this.viewMonths();
};

DatePicker.prototype.moveToPreviousYear = function () {
  const fd = this.focusDay;
  this.MonthYearNode.innerHTML = fd.getFullYear() - 1;
  this.yearSelect = fd.getFullYear() - 1;
  this.viewMonths();
};

DatePicker.prototype.viewMonths = function () {
  let initialMonthFocus = this.initialDate ? this.initialDate.getMonth() + 1 : 0;
  let finalMonthFocus = this.finalDate ? this.finalDate.getMonth() + 1 : 12;
  let initialYearFocus = this.initialDate ? this.initialDate.getFullYear() : 0;
  let finalYearFocus = this.finalDate ? this.finalDate.getFullYear() : 0;
  this.focusDay.setFullYear(this.yearSelect);
  for (const monthButton of this.MonthsNodes) {
      const monthCell = monthButton.getAttribute('data-date');

      if ((this.yearSelect < initialYearFocus) || 
          (this.yearSelect > finalYearFocus && finalYearFocus != 0) ||
          (this.yearSelect == initialYearFocus && monthCell < initialMonthFocus) || 
          (this.yearSelect == finalYearFocus && monthCell > finalMonthFocus)) {        
          monthButton.classList.add('disabled');
          monthButton.setAttribute('tabindex', '-1');
      } else if(this.focusDay.getMonth() + 1 == monthCell) {
          monthButton.setAttribute('tabindex', '0');
          monthButton.classList.remove('disabled');
      } else {
          monthButton.classList.remove('disabled');
      }
  }
}

DatePicker.prototype.moveToNextMonth = function () {
  if (this.monthSelected + 1 > 11) {
    this.monthSelected = 0;
    this.yearSelect = this.yearSelect + 1;
  } else {
    this.monthSelected = this.monthSelected + 1;
  }
  this.updateGrid();
};

DatePicker.prototype.moveToPreviousMonth = function () {
  if (this.monthSelected - 1 < 0) {
    this.monthSelected = 11;
    this.yearSelect = this.yearSelect - 1;
  } else {
    this.monthSelected = this.monthSelected - 1;
  }
  this.updateGrid();
};

DatePicker.prototype.moveFocusToDay = function (day) {
  if (day) {
    const d = this.focusDay;
    this.focusDay = day;
    this.monthSelected = this.focusDay.getMonth();
    this.yearSelect = this.focusDay.getFullYear();

    if ((d.getMonth() != this.focusDay.getMonth()) ||
      (d.getYear() != this.focusDay.getYear())) {
      this.updateGrid();
    }
    this.setFocusDay(true);
  }
};

DatePicker.prototype.moveFocusToNextDay = function () {
  let d = new Date(this.focusDay);
  d.setDate(d.getDate() + 1);
  d = this.validateDay(this.focusDay, d);
  this.moveFocusToDay(d);
};

DatePicker.prototype.validateDay = function (date, dateNew) {
  const date1 = date;
  const date2 = dateNew;
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);

  if ((date2 > date1 && (this.finalDate && this.finalDate < date2)) ||
      (date2 < date1 && (this.initialDate && this.initialDate > date2))) {
      return date;
  } else {
      return dateNew;
  }
}

DatePicker.prototype.moveFocusToNextWeek = function () {
  let d = new Date(this.focusDay);
  d.setDate(d.getDate() + 7);
  d = this.validateDay(this.focusDay, d);
  this.moveFocusToDay(d);
};

DatePicker.prototype.moveFocusToPreviousDay = function () {
  let d = new Date(this.focusDay);
  d.setDate(d.getDate() - 1);
  d = this.validateDay(this.focusDay, d);
  this.moveFocusToDay(d);
};

DatePicker.prototype.moveFocusToPreviousWeek = function () {
  let d = new Date(this.focusDay);
  d.setDate(d.getDate() - 7);
  d = this.validateDay(this.focusDay, d);
  this.moveFocusToDay(d);
};

DatePicker.prototype.moveFocusToFirstDayOfWeek = function () {
  let d = new Date(this.focusDay);
  d.setDate(d.getDate() - d.getDay());
  d = this.validateDay(this.focusDay, d);
  this.moveFocusToDay(d);
};

DatePicker.prototype.moveFocusToLastDayOfWeek = function () {
  let d = new Date(this.focusDay);
  d.setDate(d.getDate() + (6 - d.getDay()));
  this.moveFocusToDay(d);
};

DatePicker.prototype.setTextboxDate = function (day) {
  if (day) {
    this.dateInput.setDate(day);
  } else {
    this.dateInput.setDate(this.focusDay);
  }
};

DatePicker.prototype.getDateInput = function () {
  let parts = this.dateInput.getDate().split('/');
  
  if (this.viewDay && (parts.length === 3) &&
    Number.isInteger(parseInt(parts[0])) &&
    Number.isInteger(parseInt(parts[1])) &&
    Number.isInteger(parseInt(parts[2]))) {
    this.focusDay = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    this.selectedDay = new Date(this.focusDay);
  } else if(this.viewDay == false && (parts.length === 2) &&
    Number.isInteger(parseInt(parts[0])) &&
    Number.isInteger(parseInt(parts[1]))) {
    this.focusDay = new Date(parseInt(parts[1]), parseInt(parts[0]) - 1, 1);
    this.selectedDay = new Date(this.focusDay);
  } else if (this.viewYear && Number.isInteger(parseInt(parts[0]))) {
    this.focusDay = new Date(parseInt(parts[0]), 0, 1);
    this.selectedDay = new Date(this.focusDay);
  } else if (this.viewMonth && Number.isInteger(parseInt(parts[0]))) {
    this.focusDay = new Date(1900, parseInt(parts[0]) - 1, 1);
    this.selectedDay = new Date(this.focusDay);
  } else {
    // If not a valid date (DD/MM/YY) initialize with todays date
    this.focusDay = new Date();
    this.selectedDay = new Date();
  }

  let date1 = new Date(this.focusDay);
  if ((date1 < this.initialDate && this.initialDate) || date1 > this.finalDate && this.finalDate) {
    this.focusDay = date1 > this.finalDate && this.finalDate ? this.finalDate : this.initialDate;
    this.selectedDay = new Date(this.focusDay);
    this.inputNode.value = '';
  } else if (this.dateInput.getDate()) {
    this.dateInput.setDate(date1);
  }

  const fd = this.focusDay;
  const year = fd.getFullYear();     
  this.yearSelect = year;
  this.monthSelected = fd.getMonth();
};

DatePicker.prototype.moveFocusToNextMonth = function (num) {
  const d = new Date(this.focusDay.getFullYear(), this.focusDay.getMonth()+num, this.focusDay.getDate());
  this.moveFocusToMonth(d);
};

DatePicker.prototype.moveFocusToPreviousMonth = function (num) {
  const d = new Date(this.focusDay.getFullYear(), this.focusDay.getMonth()-num, this.focusDay.getDate());
  this.moveFocusToMonth(d);
};

DatePicker.prototype.moveFocusToMonth = function (day) {
  const d = this.focusDay;

  if ((d.getMonth() != day.getMonth()) ||
      (d.getYear() != day.getYear())) {
      this.updateGridMonth(day);
  }
  this.setFocusDay(true);
};

DatePicker.prototype.updateGridMonth = function (day) {
  const fd = day;
  const monthSelected = fd.getMonth()+1;
  const yearSelected = fd.getFullYear();
  const buttonMonth = this.monthsTableNode.querySelector("button[data-date='" + monthSelected + "']");  
  const refreshMonths = this.focusDay.getFullYear() != yearSelected;
  let elementActive = false;
    
  if ((!this.isDisabled(buttonMonth)) || this.focusDay.getFullYear() != yearSelected) {
      this.yearSelect = yearSelected;
      this.focusDay = day;
      elementActive = true;
      if (refreshMonths) {
        this.viewMonths();

        if (this.viewYear && yearSelected == this.selectedDay.getFullYear()){
          this.markDateSelected();
        } else if (this.viewYear) {
          this.uncheckDateSelected();
        }
      }
  }

  this.buttonsCellsMonths.forEach(function (e) {
    const month = e.getAttribute('data-date');
    if (elementActive) {
      e.setAttribute('tabindex', monthSelected == month ? '0' : '-1');
      if (monthSelected == month) e.focus();
    }
  });
  this.updateGridTextMonth();
};

DatePicker.prototype.isDisabled = function (e) {
  return e.classList.contains('disabled');
};

DatePicker.prototype.selectedMonth = function () {
  for (const monthButton of this.MonthsNodes) {
      if (monthButton.getAttribute('tabindex') == '0') {
          const month = monthButton.getAttribute('data-date');
          this.monthSelected = month - 1;
          this.focusDay.setMonth(month - 1);
          this.focusDay.setDate(1);
      }
  }
}

DatePicker.prototype.handleKeyDownMonth = function(event) {
  let flag = false;
  let self = this;

  switch (event.keyCode) {
    case this.keyCode.ENTER:
    case this.keyCode.SPACE:            
      if (this.viewDay) {
          this.showDaysMonth();
          this.selectedMonth();
          this.updateGrid();
          this.setFocusDay(true);
      } else {
          this.setTextboxDate();
          this.hide();
      }
      flag = true;
      break;

    case this.keyCode.TAB:
      if (!event.shiftKey) {
          self.hide();
      }
      break;

    case this.keyCode.ESC:
      self.hide();
      flag = true;
      break;

    case this.keyCode.RIGHT:
      this.moveFocusToNextMonth(1);
      flag = true;
      break;

    case this.keyCode.LEFT:
      this.moveFocusToPreviousMonth(1);
      flag = true;
      break;

    case this.keyCode.DOWN:
      this.moveFocusToNextMonth(4);
      flag = true;
      break;

    case this.keyCode.UP:
      this.moveFocusToPreviousMonth(4);
      flag = true;
      break;

    default:
      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

DatePicker.prototype.moveFocusToNextYear = function (num) {
  const newYear = this.yearSelect + num;
  this.moveFocusToYear(newYear);
};

DatePicker.prototype.moveFocusToPreviousYear = function (num) {
  const newYear = this.yearSelect - num;
  this.moveFocusToYear(newYear);
};

DatePicker.prototype.moveFocusToYear = function (newYear) {
  if (this.yearSelect != newYear) {
      this.updateGridYearSelected(newYear);
  }
};

DatePicker.prototype.updateGridYearSelected = function (newYear) {
  let initialYearFocus = this.initialDate ? this.initialDate.getFullYear() : 0;
  let finalYearFocus = this.finalDate ? this.finalDate.getFullYear() : 0;

  if (initialYearFocus <= newYear && ((finalYearFocus >= newYear && finalYearFocus != 0) || finalYearFocus == 0)) {
    let yearStart = this.buttonsCellsYears[0].getAttribute('data-date');
    let yearEnd = this.buttonsCellsYears[this.buttonsCellsYears.length-1].getAttribute('data-date');
    this.yearSelect = newYear;

    if (parseInt(yearEnd) < parseInt(newYear) || parseInt(yearStart) > parseInt(newYear)) {
      this.updateYearGrid();
      this.updateGridYear();
      this.markDateSelected();
    }

    this.buttonsCellsYears.forEach(function (e) {
      const year = e.getAttribute('data-date');
      e.setAttribute('tabindex', parseInt(newYear) == parseInt(year) ? '0' : '-1');

      if (parseInt(newYear) == parseInt(year)) {
        e.focus();
      }
    });
  }
};

DatePicker.prototype.handleKeyDownYear = function(event) {
  let flag = false;

  switch (event.keyCode) {

      case this.keyCode.ENTER:
      case this.keyCode.SPACE:
        if (this.viewMonth) {
          this.showMonthsYear();
          this.updateGridTextMonth();
          this.setFocusMonth(true);
          this.uncheckDateSelected();
        } else {
          this.handleYearButton(event);
        }
        flag = true;
        break;

      case this.keyCode.TAB:
          if (!event.shiftKey) {
              this.hide();
          }
          break;

      case this.keyCode.ESC:
          this.hide();
          flag = true;
          break;

      case this.keyCode.RIGHT:
          this.moveFocusToNextYear(1);
          flag = true;
          break;

      case this.keyCode.LEFT:
          this.moveFocusToPreviousYear(1);
          flag = true;
          break;

      case this.keyCode.DOWN:
          this.moveFocusToNextYear(4);
          flag = true;
          break;

      case this.keyCode.UP:
          this.moveFocusToPreviousYear(4);
          flag = true;
          break;

      default:
          break;
  }

  if (flag) {
      event.stopPropagation();
      event.preventDefault();
  }
};

DatePicker.prototype.getFormatDate = function (date) {
  let dateNew = '';

  if (date) {
      let parts = date.split('-');

      if ((parts.length === 3) &&
          Number.isInteger(parseInt(parts[0])) &&
          Number.isInteger(parseInt(parts[1])) &&
          Number.isInteger(parseInt(parts[2]))) {
          dateNew = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      }
  }
  return dateNew;
};

DatePicker = DatePicker || {};

CalendarContainerButtonInput = function (iconContainer, datepicker, inputNode) {
  this.datepicker = datepicker;
  this.iconContainer = iconContainer;
  this.inputNode = inputNode;
}

CalendarContainerButtonInput.prototype.init = function () {
  this.iconContainer.addEventListener('click', this.handleClick.bind(this));
  this.inputNode.addEventListener('click', this.handleClick.bind(this));
};

CalendarContainerButtonInput.prototype.handleClick = function (event) {
  this.monthSelected = '';
  this.yearSelect = '';
  if (!this.datepicker.isOpen()) {
    this.datepicker.show();
    if (this.datepicker.viewDay) {
      this.datepicker.setFocusDay();
    } else if (this.datepicker.viewMonth) {
      this.datepicker.showMonthsYear();
      this.datepicker.updateGridTextMonth();
      this.datepicker.setFocusMonth(false);
    } else {
      this.datepicker.showYearsDecade();
      this.datepicker.updateGridYear();
      this.datepicker.setFocusYear(false);
    }
  } else {
    this.datepicker.hide();
  }

  this.datepicker.inputNode.focus();

  event.stopPropagation();
  event.preventDefault();
};

CalendarButtonInput = function (inputNode, datepicker) {
  this.inputNode = inputNode;
  this.imageNode = false;

  this.datepicker = datepicker;

  this.defaultLabel = 'Choose Date';

  this.keyCode = Object.freeze({
      'ENTER': 13,
      'SPACE': 32,
      'TAB': 9
  });
};

CalendarButtonInput.prototype.init = function () {
  this.inputNode.addEventListener('keydown', this.handleKeyDown.bind(this));
};

CalendarButtonInput.prototype.handleKeyDown = function (event) {
  let flag = false;

  switch (event.keyCode) {
      case this.keyCode.SPACE:
      case this.keyCode.ENTER:
          this.datepicker.show();
          if (this.datepicker.viewDay) {
            this.datepicker.setFocusDay();
          } else if (this.datepicker.viewMonth) {
            this.datepicker.showMonthsYear();
            this.datepicker.updateGridTextMonth();
            this.datepicker.setFocusMonth(true);
          } else {            
            this.datepicker.showYearsDecade();
            this.datepicker.updateGridYear();
            this.datepicker.setFocusYear(true);
          }
          flag = true;
          break;
      case this.keyCode.TAB:
          if (event.shiftKey) {
              this.datepicker.hide();
          }
          break;

      default:
          break;
  }

  if (flag) {
      event.stopPropagation();
      event.preventDefault();
  }
};

CalendarButtonInput.prototype.setFocus = function () {
  this.inputNode.focus();
};

CalendarButtonInput.prototype.setDate = function (day) {
  let value = '';
  if (this.datepicker.viewMonth && !this.datepicker.viewDay && !this.datepicker.viewYear) {
    value = this.datepicker.monthLabels[day.getMonth()];
  } else {
    if (this.datepicker.viewDay) {
      value = formatNumber(day.getDate()) + '/';
    }
    if (this.datepicker.viewMonth) {
      value += formatNumber((day.getMonth() + 1));
    }
    if (this.datepicker.viewYear) {
      value += (this.datepicker.viewMonth ? '/' : '') + day.getFullYear();
    }
  }

  this.inputNode.value = value;
};

function formatNumber(number) {
  return number <= 9 ? '0' + number : number;
}

function formatStringMonth(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

CalendarButtonInput.prototype.getDate = function () {
  let value = this.inputNode.value;

  if (Number.isInteger(parseInt(value))){
    return value;
  }

  if (value && this.datepicker.viewMonth && !this.datepicker.viewDay && !this.datepicker.viewYear) {
    const indexMonth = this.datepicker.monthLabels.indexOf(formatStringMonth(value));    

    if (indexMonth > -1) {
      value = formatNumber((indexMonth + 1).toString());
    } else {
      this.inputNode.value = '';
    }
  }
  return value;
};
