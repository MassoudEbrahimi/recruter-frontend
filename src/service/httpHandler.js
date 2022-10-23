import { ToastNotification } from "../helpers"


class Handler{
    apiHandler(response={} , callback , error){
        if(response.data && response.data.Error){
            this.message(response.data.Message)
        }
        callback(response.data,response.status)
    }
    message(msg){
        ToastNotification("A","error",msg);
    }
}
const _Handler = new Handler();
export default _Handler;