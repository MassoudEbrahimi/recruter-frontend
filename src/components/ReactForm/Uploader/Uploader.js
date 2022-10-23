import React, {useCallback, useMemo, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import "./Uploader.scss";
import axios from "axios";


const baseStyle = {
    width:"80%",
    margin:"10px auto",
    height : "80px",
    position : "relative",
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'var(--border-color)',
    borderStyle: 'dashed',
    backgroundColor: 'var(--secondary-bg-color)',
    color: 'var(--second-text-color)',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};


function UploaderDropZone({value, handleUploader, disabled, multiFile}) {
    const [percent , setPercent] = useState(0);
    const onDrop = useCallback(async (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
                //Todo unComment after connect to backend
            // const options = {
            //     onUploadProgress: progressEvent =>{
            //         const {loaded , total} = progressEvent
            //         let percent = Math.floor(loaded * 100 / total);
            //     }
            // }
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                // axios.post("" , binaryStr , options)
                console.log(binaryStr)
            }
            reader.readAsArrayBuffer(file)
        })

    }, [])
    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        disabled,
        multiple: multiFile,
        maxSize: 2000000   //2MB to Byte = 20,000,000

    })

    const style = useMemo(() => ({
        ...baseStyle
    }), []);
    return (
        <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            <p>روزمه خود را در این قسمت قرار دهید  (حداکثر حجم فایل 2MB)</p>
            {percent !==0 && <progress className="uploader-progressbar" value={percent} max={100}/>}
        </div>
    )
}

export default UploaderDropZone;