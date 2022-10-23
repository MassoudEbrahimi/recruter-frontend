import {Component} from "react";
import {UploaderDropZone} from "../ReactForm";


class BaseUploader extends Component{

    render() {
        const {value , handleUploader , multipleFile , disabled} = this.props;
        return (
            <UploaderDropZone
                value ={value}
                handleUploader={handleUploader}
                multipleFile={multipleFile}
                disbaled={disabled}

            />
        );
    }

}
export default  BaseUploader;