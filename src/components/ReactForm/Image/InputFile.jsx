import React, {useState} from "react";
import {ToastNotification} from "../../../helpers"
import "./InputFile.scss";

const InputFile = ({id, change, required, label, value}) => {

    const [img, setImage] = useState(value);
    const changeHandler = (e) => {
        const file = e.target.files
        let value = "";
        if (file.length > 0) {
            const fileToLoad = file[0];
            const extension = ["jpeg", "png", "jpg"];
            const validInput = extension.includes(file[0].name.split(".").pop());
            if (validInput) {
                const fileReader = new FileReader();
                fileReader.onload = (fileLoadedEvent) => {
                    value = fileLoadedEvent.target.result;
                    setImage(value)
                    change(value)
                }
                fileReader.readAsDataURL(fileToLoad);
            } else {
                ToastNotification("A","error","پسوند فایل مورد نظر اشتباه است",2000);
            }
        }
    }
    const removeHandler = ()=>{
        setImage(null);
    }
    return (
        <div className="input-file-container">
            <div className="action-button">
                <input type="file" id={id} hidden style={{width: "100%"}} onChange={changeHandler.bind(this)}
                       accept=".jpeg,.png,.jpg"/>
                <label className="label-upload-img" htmlFor={id}>
                    <span><i className="mdi mdi-upload"/> بارگذاری تصویر</span>
                </label>
                <label className="label-remove-img" onClick={removeHandler}>
                    <span><i className="mdi mdi-close"/>حذف تصویر</span>
                </label>
            </div>
            <figure className="image-box">
                <img src={img} alt="تصویر وجود ندارد"/>
            </figure>
        </div>
    )
}
export default InputFile
