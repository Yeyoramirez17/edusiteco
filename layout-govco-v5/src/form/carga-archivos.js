/**
 * Gov.co (https://www.gov.co) - Gobierno de Colombia
 *  - Componente: Carga de archivo
 *  - Version: 5.0.0
 */

/**
 * Metodo establecido por el usuario en el atributo data-action del input file
   function uploadFile(files) {
    // files es un arreglo con el o los archivos seleccionados por el usuario
    return new Promise(function(resolve, reject) {
      // Aquí agregar la lógica para procesar los archivos

      if(true) {
        // filesLoadedSuccesfully es un arreglo con o los archivos que se procesaron correctamente
        const filesLoadedSuccesfully = files;
        resolve(filesLoadedSuccesfully);
      } else {
        reject('Ocurrió un error al cargar los archivos.');
      }
    });
  }
*/

/**
 * Metodo establecido por el usuario en el atributo data-action-delete del input file
   function deleteFile(file) {
    // file contiene el archivo seleccionado por el usuario para eliminar
    return new Promise(function(resolve, reject) {
      // Aquí agregar la lógica para procesar el archivo

      if(true) {
        resolve(true);
      } else {
        reject('Ocurrió un error al procesar el archivo.');
      }
    });
  }
*/

/**
 * Método que el usuario debe llamar para la configuracion inicial, enviando los parametros correspondientes
 * setValidationParameters(inputId, allowedExtensions, sizeInBytes, maxQuantityOfFiles)
 * setValidationParameters('inputFile', ['jpg', 'pdf', 'png'], 500000, 4);
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
    initFileUpload();
  });
})();

var attachmentList = {};
var selectedFiles = {};
var configFileInputs = {};
var fileUploadMessageTypes = {
  extensionNotAllowed: 'Formato de archivo no permitido.',
  sizeNotAllowed: 'El archivo excede el tamaño máximo permitido.',
  extensionsNotAllowed: 'Uno de los archivos tiene un formato no admitido.',
  sizesNotAllowed: 'Uno de los archivos excede el tamaño máximo permitido.',
  noFile: 'Seleccione un documento para adjuntar.',
  maximumQuantityExceeded: 'Supera la cantidad de archivos permitida.'
};

function initFileUpload() {
  addEventHandler(document.body, 'click keydown', '.carga-archivo-govco', function(event) {
    assignEventsFileUpload();
  });

  assignEventsFileUpload();
}

function assignEventsFileUpload() {
  const containersFileUpload = document.querySelectorAll('.carga-archivo-govco:not(.actived-events-govco)');
  for (const containerFileUpload of containersFileUpload) {
    containerFileUpload.classList.add('actived-events-govco');  

    const inputsFile = containerFileUpload.querySelectorAll('.input-carga-archivo-govco');
    methodAssignFileInput("change", selectingFiles, inputsFile);

    const buttonsFile = containerFileUpload.querySelectorAll('.button-loader-carga-archivo-govco');
    methodAssign("click", clickButtonFile, buttonsFile);
  }
}

//Por defaul maximo 5 archivos sin validaciones
function methodAssignFileInput(e, f, a) {
  for (let i of a) {
    i.addEventListener(e, f, false);
    attachmentList[i.id] = [];
    selectedFiles[i.id] = [];
    configFileInputs[i.id] = {
      'validExtensions': [],
      'validSize': 0,
      'maximumQuantity': 5
    };
  }
}

function selectingFiles() {
  const idInput = this.id;
  const parent = this.parentNode;
  const parentCarga = parent.parentNode;
  const button = parentCarga.querySelector('.button-loader-carga-archivo-govco');
  let fileName = '';
  const maximumQuantity = configFileInputs[idInput]['maximumQuantity'];
  selectedFiles[idInput] = [];
  errorInputFile(this, false, '');

  if ((attachmentList[idInput].length + this.files.length) > maximumQuantity) {
    errorInputFile(this, true, fileUploadMessageTypes.maximumQuantityExceeded);
    if (attachmentList[idInput].length >= maximumQuantity) {
      this.disabled = true;
      this.classList.remove("active");
    }
  } else if (this.files.length > 0) {
    let validations = validateFiles(this.files, idInput);

    if (validations.invalidExtensions === 0 && validations.invalidSize === 0) {
      if (selectedFiles[idInput] && selectedFiles[idInput].length > 1) {
        fileName = selectedFiles[idInput].length + ' archivos seleccionados';
      } else {
        fileName = selectedFiles[idInput][0].name;
      }
      assignName(parent, fileName);
      enableDisableFileUploadButton(button, false);
    } else {
      selectedFiles[idInput] = [];
      const textError = validationErrortext(validations.invalidExtensions, validations.invalidSize);
      errorInputFile(this, true, textError);
    }
  } else {
    errorInputFile(this, true, fileUploadMessageTypes.noFile);
    cleanInputfile(this, parent);
    enableDisableFileUploadButton(button, true);
  }
}

function validationErrortext(extensions, size) {
  let textoError = '';
  if (extensions > 0) {
    if (extensions > 1) {
      textoError = fileUploadMessageTypes.extensionNotAllowed;
    } else {
      textoError = fileUploadMessageTypes.extensionsNotAllowed;
    }
  }

  if (size > 0) {
    if (size > 1) {
      textoError += ' ' + fileUploadMessageTypes.sizeNotAllowed;
    } else {
      textoError += ' ' + fileUploadMessageTypes.sizesNotAllowed;
    }
  }

  return textoError;
}

function validateFiles(files, idInput) {
  let invalidExtensions = 0;
  let invalidSize = 0;
  let listValidExtensions = configFileInputs[idInput]['validExtensions'];
  let validSize = configFileInputs[idInput]['validSize'];

  if (listValidExtensions.length > 0 || validSize > 0) {
    [...files].forEach(function (element) {
      const extensionFile = element.name.split('.').pop().toLowerCase();
      if (listValidExtensions && Array.isArray(listValidExtensions) && listValidExtensions.includes(extensionFile)) {
        if (validSize >= element.size) {
          selectedFiles[idInput].push(element);
        } else {
          invalidSize++;
        }
      } else {
        invalidExtensions++;
      }
    });
  } else {
    selectedFiles[idInput].push(...files);
  }

  return {
    'invalidExtensions': invalidExtensions,
    'invalidSize': invalidSize
  }
}

function setValidationParameters(idElement, extensions = [], size = 0, quantity = 1) {
  const validExtensions = extensions.map(e => e.toString().toLowerCase());
  const validSize = !isNaN(size) ? parseInt(size) : 0;
  const maximumQuantity = !isNaN(quantity) ? parseInt(quantity) : 0;

  configFileInputs[idElement] = {
    'validExtensions': validExtensions,
    'validSize': validSize,
    'maximumQuantity': maximumQuantity
  };
}

function assignName(container, fileName) {
  const containerNameFile = container.querySelector('.file-name-carga-archivo-govco');
  containerNameFile.innerHTML = fileName ? fileName : 'Sin archivo seleccionado';
}

function enableDisableFileUploadButton(element, value) {
  element.classList.toggle("inactive", value);
}

async function clickButtonFile() {
  const parentButton = this.parentNode;
  const parent = parentButton.parentNode;
  const inputFile = parent.querySelector('.input-carga-archivo-govco');
  const idInput = inputFile.id;
  const containerLoader = parent.querySelector('.load-carga-archivo-govco');
  activateContainerLoader(containerLoader, true);
  enableDisableFileUploadButton(this, true);

  if (inputFile.value) {
    const containerParent = parent.nextElementSibling;
    const container = containerParent.querySelector('.attached-files-carga-archivo-govco');

    const filesResponse = await validateFunction(inputFile, containerLoader, parent, 'add', selectedFiles[idInput]);
    if (filesResponse.length > 0) {
      createAttachedFiles(container, filesResponse, idInput);

      containerParent.style.display = attachmentList[idInput].length > 0 ? 'block' : 'none';

      if (attachmentList[idInput].length >= configFileInputs[idInput]['maximumQuantity']) {
        inputFile.disabled = true;
        inputFile.classList.remove("active");
      }
    }
    cleanInputfile(inputFile, parent);
  } else {
    errorInputFile(inputFile, true, fileUploadMessageTypes.noFile);
    activateContainerLoader(containerLoader, false);
  }
}

async function validateFunction(inputFile, containerLoader, parent, action, listFiles) {
  const nameDataAction = action == 'add' ? 'data-action' : 'data-action-delete';
  const nameMethod = inputFile.getAttribute(nameDataAction);
  let method;
  let answer = {};

  if (!nameMethod) {
    console.error(nameDataAction + ' method is not defined');
  }

  try {
    //method = new Function('return ' + nameMethod)();
    method = JSON.parse(nameMethod); //cambio por sonarqube
  } catch (error) {
    console.error(nameDataAction + ' method is not defined');
  }

  if (method) {
    try {
      answer = await method(listFiles);
      activateContainerLoader(containerLoader, false);
      if (action == 'delete') return true;
    } catch (error) {
      errorInputFile(inputFile, true, error);
      activateContainerLoader(containerLoader, false);
      cleanInputfile(inputFile, parent);
      if (action == 'delete') return false;
    }
  } else {
    answer = listFiles;
    activateContainerLoader(containerLoader, false);
    if (action == 'delete') return true;
  }
  return answer;
}

function errorInputFile(input, active, message) {
  const parentInput = input.parentNode;
  const parentAllInput = parentInput.parentNode;
  const containerParent = parentAllInput.nextElementSibling;
  const containerAlert = containerParent.querySelector('.alert-carga-archivo-govco');
  const idInput = input.id;
  input.setAttribute('data-error', active ? "true" : "false");
  activateContainer(containerAlert, active);
  containerAlert.innerHTML = message;

  if (attachmentList[idInput].length <= 0) {
    containerParent.style.display = active ? 'block' : 'none';
  }
}

function activateContainer(container, active) {
  if (active) {
    container.classList.remove('visually-hidden');
  } else {
    container.classList.add('visually-hidden');
  }
}

function activateContainerLoader(container, active) {
  if (active) {
    container.style.visibility = "visible";
  } else {
    setTimeout(() => {
      container.style.visibility = "hidden";
    }, 3000);
  }
}

function cleanInputfile(inputFile, container) {
  inputFile.value = '';
  assignName(container, '');
}

function createAttachedFiles(container, files, idInput) {
  files.forEach(function (value) {
    const size = formatterSizeUnit(value.size);
    createElement(container, value.name, size);
    attachmentList[idInput].push(value);
  });

  return true;
}

function createElement(container, name, type) {
  const newDivAttached = document.createElement('div');
  newDivAttached.classList.add('attached-file-carga-archivo-govco');
  newDivAttached.setAttribute("tabindex", "0");

  const newDivContainerIcon = document.createElement('div');
  newDivContainerIcon.classList.add('icon-text-carga-archivo-govco');

  const newDivIconFile = document.createElement('div');
  newDivIconFile.classList.add('file-alt-carga-archivo-govco', 'govco-icon', 'govco-file-alt');

  const newDiv = document.createElement('div');
  newDiv.classList.add('container-text-name-carga-archivo-govco');
  const span1 = document.createElement('span');
  span1.classList.add('text-name-carga-archivo-govco');
  const textSpan1 = document.createTextNode(name);
  span1.appendChild(textSpan1);
  const span2 = document.createElement('span');
  const textSpan2 = document.createTextNode(type);
  span2.appendChild(textSpan2);

  const newButtonIconTrash = document.createElement('button');
  newButtonIconTrash.classList.add('trash-alt-1-carga-archivo-govco', 'govco-icon', 'govco-trash');

  newDivContainerIcon.appendChild(newDivIconFile);
  newDiv.appendChild(span1);
  newDiv.appendChild(span2);
  newDivContainerIcon.appendChild(newDiv);
  newDivAttached.appendChild(newDivContainerIcon);
  newDivAttached.appendChild(newButtonIconTrash);
  container.appendChild(newDivAttached);

  newButtonIconTrash.addEventListener("click", removeAttachment, false);
}

function formatterSizeUnit(size) {
  if (size) {
    var result = parseInt(size);
    if (result < 1024) {
      return result + "bytes";
    } else if (result < 1024 * 1024) {
      return parseInt(result / 1024) + "KB";
    } else if (result < 1024 * 1024 * 1024) {
      return parseInt(result / (1024 * 1024)) + "MB";
    } else {
      return parseInt(result / (1024 * 1024 * 1024)) + "GB";
    }
  }
}

async function removeAttachment() {
  const container = this.parentNode;
  const containerAttachments = container.parentNode;
  const containerDetail = containerAttachments.parentNode;
  const containerAll = containerDetail.parentNode;
  const inputFile = containerAll.querySelector('.input-carga-archivo-govco');
  const idInput = inputFile.id;
  const containerLoader = containerAll.querySelector('.load-carga-archivo-govco');
  const containerName = container.querySelector('.text-name-carga-archivo-govco');
  const name = containerName.innerHTML;
  const element = attachmentList[idInput].find(file => file.name === name);
  const index = attachmentList[idInput].indexOf(element);

  activateContainerLoader(containerLoader, true);

  if (index >= 0) {
    const responseRemove = await validateFunction(inputFile, containerLoader, containerAll, 'delete', element);

    if (responseRemove == true) {
      let parent = container.parentNode
      attachmentList[idInput].splice(index, 1);
      parent.removeChild(container);
      if (attachmentList[idInput].length < configFileInputs[idInput]['maximumQuantity']) {
        inputFile.disabled = false;
        inputFile.classList.add("active");
      }
      containerDetail.style.display = attachmentList[idInput].length > 0 ? 'block' : 'none';
    }
  } else {
    activateContainerLoader(containerLoader, false);
  }
}
