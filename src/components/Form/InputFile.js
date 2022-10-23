import {InputFile} from "../ReactForm";


const BaseInputFile = ({id, label, change, required, value}) => {
    return (
        <InputFile
            id={id}
            label={label}
            change={change}
            value={value}
            required={required}
        />
    )
}
export default BaseInputFile;
