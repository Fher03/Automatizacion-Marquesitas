import Swal from 'sweetalert2'

document.addEventListener('DOMContentLoaded', () => {
    const errorDiv = document.getElementById('flash-error')
    if (errorDiv) {
        Swal.fire({
            title: 'Error',
            text: errorDiv.dataset.message,
            icon: 'error',
        })
    }
})
