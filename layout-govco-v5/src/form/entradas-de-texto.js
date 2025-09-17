/**
 * Gov.co (https://www.gov.co) - Gobierno de Colombia
 *  - Componente: Entradas de texto
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
				for (const currSel of sel.split(',')) {
					if (t.matches(currSel)) {
						handler.call(t, event);
					}
				}
				t = t.parentNode;
			}
		});
	}
}

(function () {
	window.addEventListener('load', function () {
		textFields();
	});
})();

function textFields() {
  addEventHandler(document.body, 'click keydown', '.entradas-de-texto-govco', function(event) {
    counterTextFields();
    passwordTextFields();
    mailTextFields();
    phoneTextFields();
  });

  counterTextFields();
  passwordTextFields();
  mailTextFields();
  phoneTextFields();
}

// Con contador 
function counterTextFields() {
  const inputs = document.querySelectorAll('.entradas-de-texto-govco input[typeData="accountant"]:not(.actived-events-govco)');
  methodAssign("keyup", activeInputContador, inputs);

  for (const input of inputs) {
    input.parentNode.classList.add('actived-events-govco');
  }
}

function activeInputContador(element) {
  const maxLength = element.srcElement.maxLength;
  const parentInputContador = this.parentNode;
  const span = parentInputContador.querySelector(".counter-text");
  span.innerHTML = this.value.length + "/" + maxLength;
}

// De contraseña
function passwordTextFields() {
  const inputs = document.querySelectorAll('.entradas-de-texto-govco input[typeData="password"]:not(.actived-events-govco)');
  methodAssign("keyup", activeInputContrasenia, inputs);

  for (const input of inputs) {
    input.parentNode.classList.add('actived-events-govco');
    const buttons = input.parentNode.querySelectorAll('input[typeData="password"] ~ button');
    methodAssign("click", activeIconInputPassword, buttons);
  }
}

function activeIconInputPassword(element) {
  const parentPassword = this.parentNode;
  const inputPassword = parentPassword.querySelector('.entradas-de-texto-govco input');
  const hidePassword = parentPassword.querySelector('button:not(.view-password)');
  const visiblePassword = parentPassword.querySelector('button.view-password');

  if (inputPassword.getAttribute('disabled') === null) {
    if (inputPassword.type == 'password') {
      inputPassword.type = 'text';
      visiblePassword.classList.remove('d-none');
      hidePassword.classList.add('d-none');
    } else {
      inputPassword.type = 'password';
      hidePassword.classList.remove('d-none');
      visiblePassword.classList.add('d-none');
    }
  }
}

function activeInputContrasenia(element) {
  const expresionRegularP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\-_\/\.,|{}<>\[\]\(\)=?\+¿¡])(?=.{8,})/;
  const textExito = "Contraseña correcta";
  const textError = "Contraseña incorrecta, debe contener mínimo ocho (8) caracteres, un número, una letra minúscula, una letra mayúscula, un carácter especial.";

  if (expresionRegularP.test(this.value) && this.classList.contains("success") === false) {
    this.classList.remove('error');
    this.classList.add('success');
    crearMensaje(this, textExito, 'success', 'password-note');
  } else if (expresionRegularP.test(this.value) === false && this.classList.contains("error") === false) {
    this.classList.remove('success');
    this.classList.add('error');
    crearMensaje(this, textError, 'error', 'password-note');
  }
}

// correo electronico
function mailTextFields() {
  const inputs = document.querySelectorAll('.entradas-de-texto-govco input[typeData="mail"]:not(.actived-events-govco)');
  methodAssign("keyup", activeInputCorreo, inputs);

  for (const input of inputs) {
    input.parentNode.classList.add('actived-events-govco');
  }
}

function activeInputCorreo(element) {
  const expresionRegularE = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  const textExito = "Correo electrónico válido";
  const textError = "Correo electrónico no válido";

  if (expresionRegularE.test(this.value) && this.classList.contains("success") === false) {
    this.classList.remove('error');
    this.classList.add('success');
    crearMensaje(this, textExito, 'success', '');
  } else if (expresionRegularE.test(this.value) === false && this.classList.contains("error") === false) {
    this.classList.remove('success');
    this.classList.add('error');
    crearMensaje(this, textError, 'error', '');
  }
}

// teléfono
function phoneTextFields() {
  const inputs = document.querySelectorAll('.entradas-de-texto-govco input[typeData="phone"]:not(.actived-events-govco)');
  methodAssign("keyup", activeInputTelefono, inputs);

  for (const input of inputs) {
    input.parentNode.classList.add('actived-events-govco');
  }
}

function activeInputTelefono(element) {
  const expresionRegularE = /^[+]?\(?(\d{2})\)?[-]?(\d{3})[-]?(\d{5,7})$/;
  const textExito = "Número de teléfono válido";
  const textError = "Número de teléfono no válido";

  if (expresionRegularE.test(this.value) && this.classList.contains("success") === false) {
    this.classList.remove('error');
    this.classList.add('success');
    crearMensaje(this, textExito, 'success', '');
  } else if (expresionRegularE.test(this.value) === false && this.classList.contains("error") === false) {
    this.classList.remove('success');
    this.classList.add('error');
    crearMensaje(this, textError, 'error', '');
  }
}

// Validaciones
function crearMensaje(e, text, type, describedby) {
  const dataMensajes = {
    'success': {
      'id': 'campoSuccess-id',
      'aria-invalid': 'false',
      'class': 'success-text-govco',
      'role': 'status',
      'aria-live': 'polite',
    },
    'error': {
      'id': 'campoWarning-id',
      'aria-invalid': 'true',
      'class': 'error-text-govco',
      'role': 'alert',
      'aria-live': 'assertive',
    }
  };

  const parentInput = e.closest('.entradas-de-texto-govco');
  const spanOld = parentInput.querySelector('.information-text');
  if (spanOld) { parentInput.removeChild(spanOld); }
  const newSpan = document.createElement('span');
  const span = parentInput.appendChild(newSpan);

  e.setAttribute('aria-describedby', describedby + ' ' + dataMensajes[type]['id']);
  e.setAttribute('aria-invalid', dataMensajes[type]['aria-invalid']);

  span.textContent = text;
  span.classList.add(dataMensajes[type]['class'], 'information-text');
  span.id = dataMensajes[type]['id'];
  span.setAttribute('role', dataMensajes[type]['role']);
  span.setAttribute('aria-live', dataMensajes[type]['aria-live']);
}
