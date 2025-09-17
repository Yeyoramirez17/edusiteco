function openAlert() {
    let alertaInteractivo = document.querySelectorAll('.container-alerta-interactivo');
    alertaInteractivo.forEach(function(alerta) {
        alerta.classList.remove('d-none');
    });
    // se cierra automáticamente luego de 30 segundos
    setTimeout(() => {
        closeAlert();
    }, 30000);
}

function closeAlert() {
    let alertaInteractivo = document.querySelectorAll('.container-alerta-interactivo');
    alertaInteractivo.forEach(function(alerta) {
        alerta.classList.add('d-none')
    });
}

function openToast() {
    let toastInteractivo = document.querySelectorAll('.container-toast-interactivo');
    toastInteractivo.forEach(function(toast) {
        toast.classList.remove('d-none');
        toast.firstElementChild.classList.add('show');
    });
}

function closeToast() {
    let toastInteractivo = document.querySelectorAll('.container-toast-interactivo');
    toastInteractivo.forEach(function(toast) {
        toast.classList.add('d-none');
        toast.firstElementChild.classList.remove('show');
    });
}