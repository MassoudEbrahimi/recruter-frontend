import Swal from "sweetalert2";





export const ConfirmForm = async (text, icon = "error", yes = "", no = "") => {
    let result;
    await Swal.fire({
        title: text,
        icon,
        direction: "rtl",
        showCancelButton: true,
        cancelButtonText: no,
        confirmButtonText: yes,
        buttonsStyling: false,
        width: "300px",
        padding: 0,
        customClass: {
            container:"swal swal-container",
            confirmButton: "swal confirm_button",
            cancelButton: "swal cancel_button",
            title: "swal title",
            icon: "swal error_icon",
            actions: "swal action"
        },
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then(resolve => {
        resolve.isConfirmed ? result = true : result = false;
    })
    return result;
}