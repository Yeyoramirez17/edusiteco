/**
 * Gov.co (https://www.gov.co) - Gobierno de Colombia
 *  - Componente: Tablas
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

function eventKeydownItem(e) {
	if (e.which == 13) {
		// Enter
		this.click();
	}
}

(function() {
  window.addEventListener("load", function () {
    initTables();
  });
  
  window.addEventListener("resize", function () {
    responsiveTables();
  });
})();

function initTables() {
  responsiveTables();
  addEventsTables();

  addEventHandler(
    document.body, 
    'click keydown', 
    '.tabla-govco .sort, .tabla-govco th input[type="checkbox"], .tabla-govco td input[type="checkbox"]', 
    function(event) {
      addEventsTables(event);
    }
  );
}

function addEventsTables(event = null) {
  const containersTable = document.querySelectorAll('.tabla-govco:not(.actived-events-govco)');
  for (const containerTable of containersTable) {
    containerTable.classList.add('actived-events-govco');

    const sortTH = containerTable.querySelectorAll('.sort');    
    methodAssign("click", activeSortTable, sortTH);

    const checkTH = containerTable.querySelectorAll('th input[type="checkbox"]');
    methodAssign("click", activateAllRows, checkTH);
    methodAssign("keydown", eventKeydownItem, checkTH);

    const checkTD = containerTable.querySelectorAll('td input[type="checkbox"]');
    methodAssign("click", activateRows, checkTD);
    methodAssign("keydown", eventKeydownItem, checkTD);
  }
  if (event != null && containersTable.length > 0) {
    event.target.click();
  }
}

function activeSortTable(event) {
  this.setAttribute('aria-sort', this.getAttribute('aria-sort') == 'asc' ? 'desc' : 'asc');
}

function activateAllRows() {
  const table = this.closest('table');
  const trs = table.querySelectorAll('tbody tr');
  for (let tr of trs) {
    const check = tr.querySelector('td input[type="checkbox"]');
    if (check) {
      if (this.checked) {
        tr.classList.add('active');
        check.checked = true;
      } else {
        tr.classList.remove('active');
        check.checked = false;
      }
    }
  }
}

function activateRows() {
  const tr = this.closest('tr');
  const responsiveTable = this.closest('.responsive-tabla-govco');
  
  if (responsiveTable) {
    const trs = tr.closest('table').querySelectorAll('tr');
    for (const tr of trs) {
      activateRow(this, tr);
    }
  } else {
    activateRow(this, tr);
  }
}

function activateRow(e, tr) {
  if (e.checked) {
    tr.classList.add('active');    
  } else {
    tr.classList.remove('active');
  }
}

function responsiveTables() {
  const containersTable = document.querySelectorAll('.tabla-govco');
  for (let containerTable of containersTable) {
    if (containerTable.offsetWidth <= 360 && containerTable.offsetWidth > 0) {
      if (!containerTable.classList.contains('responsive-tabla-govco') && !containerTable.classList.contains('d-none')) {
        createResponsiveTable(containerTable);
      }
    } else if(containerTable.offsetWidth > 0) {
      const parent = containerTable.parentNode;
      const containerTableDesktop = parent.querySelector('.tabla-govco.d-none');
      containerTableDesktop?.classList.remove('d-none');
      containerTableDesktop?.removeAttribute('aria-hidden');

      if (containerTable.classList.contains('responsive-tabla-govco')) {
        containerTable.parentNode.removeChild(containerTable);
      }
    }
  }
}

function createResponsiveTable(containerTableDesktop) {
  const tableDesktop = containerTableDesktop.querySelector('table');
  const trsDesktop = tableDesktop.querySelectorAll('tbody tr');

  const containerTableResponsive = document.createElement('div');
  createAtributesResponsiveTable(containerTableResponsive, containerTableDesktop);
  containerTableResponsive.classList.add('responsive-tabla-govco');
  containerTableDesktop.parentNode.insertBefore(containerTableResponsive, containerTableDesktop);

  containerTableDesktop.classList.add('d-none');
  containerTableDesktop.setAttribute('aria-hidden', 'true');

  for (const trDesktop of trsDesktop) {
    if (trDesktop.classList.contains('internal-table-container')) {
      getContentResponsiveInternalTable(trDesktop, containerTableResponsive);
    } else if (!trDesktop.closest('table.internal-table')) {
      const table = document.createElement('table');
      createAtributesResponsiveTable(table, tableDesktop);
      containerTableResponsive.appendChild(table);

      if (trDesktop.classList.contains('d-none')) {
        table.classList.add('d-none');
      } else {
        createBodyResponsiveTable(tableDesktop, table, trDesktop);
      }
    }
  }

  createFooterResponsiveTable(containerTableDesktop, containerTableResponsive);
}

function createAtributesResponsiveTable(element, desktopElement) {
  const attrs = desktopElement.attributes;
  if (attrs) {
    for (const attr of attrs) {
      if (attr.name != 'aria-hidden') {
        element.setAttribute(attr.name, attr.value);
      }
    }
  }
}

function createBodyResponsiveTable(tableDesktop, table, trDesktop) {
  const bodyDesktop = tableDesktop.querySelectorAll('tbody');

  const tbody = document.createElement('tbody');
  createAtributesResponsiveTable(tbody, bodyDesktop);
  table.appendChild(tbody);
  
  getBodyContentResponsiveTable(tableDesktop, trDesktop, tbody);
}

function getBodyContentResponsiveTable(tableDesktop, trDesktop, tbody) {
  const thsDesktop = tableDesktop.querySelectorAll('thead tr th');
  const tdsDesktop = trDesktop.querySelectorAll('td');

  for (let j = 0; j < thsDesktop.length; j++) {
    const thDesktop = thsDesktop[j];
    const tdDesktop = tdsDesktop[j];
    if (!thDesktop.closest('table.internal-table') && !thDesktop.classList.contains('no-responsive')) {
      let btnCollapse = getItemButtonCollapse(tdsDesktop, trDesktop, j);

      if (!thDesktop.querySelector('.checkbox-seleccion-govco') && !tdDesktop.querySelector('.checkbox-seleccion-govco')) {
        let checkbox = getItemCheckbox(tdsDesktop, j);        
        createTRBodyResponsiveTable(trDesktop, thDesktop, tdDesktop, tbody, checkbox, btnCollapse);
      }
    }
  }
}

function getItemButtonCollapse(tdsDesktop, trDesktop, index) {
  let btnCollapse = "";
  if (trDesktop.querySelector('.btn-collapse') && index == 1) {
    btnCollapse = tdsDesktop[tdsDesktop.length-1].querySelector('.btn-collapse').cloneNode(true);
  }
  return btnCollapse;
}

function getItemCheckbox(tdsDesktop, index) {
  let checkbox = "";
  if (index == 1 && tdsDesktop[0].querySelector('.checkbox-seleccion-govco')) {
    checkbox = tdsDesktop[0].querySelector('.checkbox-seleccion-govco').cloneNode(true);
  }
  return checkbox;
}

function createTRBodyResponsiveTable(trDesktop, thDesktop, tdDesktop, tbody, checkbox, btnCollapse) {
  const tr = document.createElement('tr');
  createAtributesResponsiveTable(tr, trDesktop);
  tbody.appendChild(tr);

  createTHBodyResponsiveTable(thDesktop, tdDesktop, tr, checkbox, btnCollapse)
}

function createTHBodyResponsiveTable(thDesktop, tdDesktop, tr, checkbox, btnCollapse) {
  const th = document.createElement('th');
  createAtributesResponsiveTable(th, thDesktop);
  th.textContent = thDesktop.textContent;
  th.classList.remove('text-center');
  tr.appendChild(th);

  createTDBodyResponsiveTable(tdDesktop, tr, checkbox, btnCollapse)
}

function createTDBodyResponsiveTable(tdDesktop, tr, checkbox, btnCollapse) {
  const td = document.createElement('td');
  createAtributesResponsiveTable(td, tdDesktop);

  const div = document.createElement('div');
  div.innerHTML =  tdDesktop.innerHTML;
  td.appendChild(div);

  if (checkbox && !tdDesktop.closest('.internal-table')) {
    div.appendChild(checkbox.cloneNode(true));
    const inputCheck = td.querySelector('input[type="checkbox"]');
    inputCheck.addEventListener('click', activateRows, true);
    inputCheck.addEventListener('keydown', eventKeydownItem, true);
  }

  if (btnCollapse) {
    btnCollapse.classList.add('btn-collapse-responsive');
    td.appendChild(btnCollapse.cloneNode(true));
  }

  tr.appendChild(td);
}

function createFooterResponsiveTable(containerTable, containerTableResponsive) {
  const tableDesktop = containerTable.querySelector('table');
  const tfootDesktop = tableDesktop.querySelector('tfoot');
  if (!tfootDesktop) {
    return;
  }
  const trDesktop = tfootDesktop.querySelector('tr');
  const table = document.createElement('table');
  containerTableResponsive.appendChild(table);

  const tfoot = document.createElement('tfoot');
  createAtributesResponsiveTable(tfoot, tfootDesktop);
  table.appendChild(tfoot);

  getBodyContentResponsiveTable(tableDesktop, trDesktop, tfoot);
}

function getContentResponsiveInternalTable(trDesktop, containerTableResponsive) {
  const divDesktop = trDesktop.querySelector('div.internal-table-second-container');
  const containerInternalTable = document.createElement('div');
  createAtributesResponsiveTable(containerInternalTable, divDesktop);
  containerTableResponsive.appendChild(containerInternalTable);

  createResponsiveCaptionInternalTable(containerInternalTable, divDesktop);
  createResponsiveInternalTable(containerInternalTable, divDesktop);
}

function createResponsiveCaptionInternalTable(containerInternalTable, containerTable) {
  const caption = containerTable.querySelector('caption');

  const div = document.createElement('div');
  createAtributesResponsiveTable(div, caption);
  div.innerHTML = caption.innerHTML;
  containerInternalTable.appendChild(div);
}

function createResponsiveInternalTable(containerInternalTable, containerTable) {
  const tableDesktop = containerTable.querySelector('table');
  const tbody = tableDesktop.querySelector('tbody');
  const trsDesktop = tbody.querySelectorAll('tr');

  for (let i = 0; i < trsDesktop.length; i++) {
    const trDesktop = trsDesktop[i];
    const table = document.createElement('table');
    createAtributesResponsiveTable(table, tableDesktop);
    containerInternalTable.appendChild(table);
      
    if (i < (trsDesktop.length-1)) {
      const hr = document.createElement('hr');
      containerInternalTable.appendChild(hr);
    }

    createBodyResponsiveInternalTable(tableDesktop, table, trDesktop);
  }
}

function createBodyResponsiveInternalTable(tableDesktop, table, trDesktop) {
  const bodyDesktop = tableDesktop.querySelectorAll('tbody');

  const tbody = document.createElement('tbody');
  createAtributesResponsiveTable(tbody, bodyDesktop);
  table.appendChild(tbody);
  
  getBodyContentResponsiveInternalTable(tableDesktop, trDesktop, tbody);
}

function getBodyContentResponsiveInternalTable(tableDesktop, trDesktop, tbody) {
  const thsDesktop = tableDesktop.querySelectorAll('thead tr th');
  const tdsDesktop = trDesktop.querySelectorAll('td');

  for (let j = 0; j < thsDesktop.length; j++) {
    const thDesktop = thsDesktop[j];
    const tdDesktop = tdsDesktop[j];
    if (!thDesktop.classList.contains('no-responsive')){

      let btnCollapse = "";
      if (trDesktop.querySelector('.btn-collapse') && j == 1) {
        btnCollapse = tdsDesktop[tdsDesktop.length-1].querySelector('.btn-collapse').cloneNode(true);
      }

      let checkbox = "";
      if (tdDesktop.querySelector('.checkbox-seleccion-govco')) {
        checkbox = tdDesktop.querySelector('.checkbox-seleccion-govco').cloneNode(true);

        const tr = document.createElement('tr');
        tbody.appendChild(tr);

        const th = document.createElement('th');
        tr.appendChild(th);

        th.appendChild(checkbox);

        const checkTH = th.querySelector('input[type="checkbox"]');
        checkTH.addEventListener("click", activateRows, true);
        checkTH.removeEventListener("click", activateAllRows);
        checkTH.addEventListener('keydown', eventKeydownItem);

        const td = document.createElement('td');
        tr.appendChild(td);
      } else {
        createTRBodyResponsiveTable(trDesktop, thDesktop, tdDesktop, tbody, checkbox, btnCollapse);
      }
    }
  }
}
