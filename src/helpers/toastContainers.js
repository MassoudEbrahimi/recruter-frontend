import { ToastContainer } from "react-toastify"


export const ToastContainers = ({position = "top-right" , id="A"}) => {
    return <ToastContainer 
    containerId={id}
    position ={position}
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={true}
    pauseOnFocusLoss
    draggable={false}
    enableMultiContainer
    pauseOnHover
    theme="colored"
    />
}