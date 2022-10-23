import { toast } from "react-toastify"



export const ToastNotification = (id = "A", type = "error", text = "", timer ="2000") => {
    return toast[type](text, {
        autoClose: timer,
        closeOnClick: true,
        containerId: id
    })
}