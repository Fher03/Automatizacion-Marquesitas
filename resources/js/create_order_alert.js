import Swal from "sweetalert2";

document.addEventListener('DOMContentLoaded', () => {
    const errorDiv = document.getElementById('flash-error')
    const successDiv = document.getElementById('flash-success')
    if(errorDiv) {
        Swal.fire({
            title: 'Error',
            text: errorDiv.dataset.message,
            icon: 'error',
        })
    }
    if(successDiv) {
        Swal.fire({
            title: 'Orden creada',
            text: successDiv.dataset.message,
            icon: 'success'
        })
    }
})
