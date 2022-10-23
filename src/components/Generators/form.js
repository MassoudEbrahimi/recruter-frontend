import React from 'react';
import {Input, Select, DatePicker, DateTimePicker, InputFile, CheckBox, MultiSelect, DatePicker2} from '../Form'
import PropTypes from 'prop-types';


const INPUT_TYPES = {
    TEXT: "text",
    MASK: "mask",
    SELECT: "select",
    CHECKBOX: "checkbox",
    COLOR_PICKER: "color-picker",
    SEGMENT_PICKER_REPORT: "segment-picker-report-type",
    SEGMENT_PICKER: "segment-picker",
    SELECT_NAME: "select-name",
    NUMBER: "number",
    DATE_PICKER: "datepicker",
    DATE_TIME_PIKER: "date-time-picker",
    TIME_PICKER :"timePicker",
    TEXTAREA: "textarea",
    GRID: "grid",
    Password: "password",
    FILE: "file",
    SELECT_ID_VALUE : "select-id-value",
};
const GeneratorFormItems = ({item, changeHandler}) => {
    return (
        item.map((o, i) => {
            let req = typeof o?.required === "boolean" ? o.required : JSON.parse(o.required);
            switch (o.type) {
                case INPUT_TYPES.TEXT :
                case INPUT_TYPES.MASK :
                case INPUT_TYPES.Password:
                    return (
                        <div className="model-item" key={i}>
                            <Input
                                type={o.type}
                                disabled={o.disable}
                                required={req}
                                label={o.label}
                                value={o.value}
                                change={changeHandler.bind(this, o.field, item)}
                            />
                        </div>)
                case INPUT_TYPES.SELECT :
                case INPUT_TYPES.SELECT_NAME:
                case INPUT_TYPES.SELECT_ID_VALUE:
                    return (
                        <div className="model-item" key={i}>
                            <Select
                                type={o.type}
                                required={req}
                                items={o.items}
                                mapping={{
                                    value: "id",
                                    text: 'name'
                                }} //TODO o.mapping now its hardcode for id and name if i need more properties need extend to mapping object more property
                                label={o.label}
                                value={o.value}
                                disabled={o.disable || false}
                                change={changeHandler.bind(this, o.field, item)}
                            />
                        </div>
                    );
                // case INPUT_TYPES.COLOR_PICKER:
                //     return (
                //         <div className="model-item" key={i}>
                //             <ColorPicker
                //                 type={o.type}
                //                 required={req}
                //                 label={o.label}
                //                 value={o.value}
                //                 change={changeHandler.bind(this, o.field, item)}
                //             />
                //         </div>
                //     )
                case INPUT_TYPES.NUMBER:
                    return (
                        <div className="model-item" key={i}>
                            <Input
                                type={o.type}
                                required={req}
                                label={o.label}
                                value={o.value}
                                disabled={o.disable || false}
                                change={changeHandler.bind(this, o.field, item)}
                            />
                        </div>
                    );
                case INPUT_TYPES.DATE_PICKER:
                    return (
                        <div className="model-item">
                            <DatePicker
                                key={i}
                                required={req}
                                label={o.label}
                                value={o.value}
                                disabled={o.disable || false}
                                change={changeHandler.bind(this, o.field, item)}
                            />
                        </div>
                    );
                case INPUT_TYPES.DATE_TIME_PIKER:
                    return (
                        <div className="model-item" key={i}>
                            <DateTimePicker
                                key={i}
                                required={req}
                                label={o.label}
                                value={o.value}
                                timer={o.timer}
                                disabled={o.disable || false}
                                change={changeHandler.bind(this, o.field, item)}
                            />
                        </div>
                    );
                case INPUT_TYPES.TEXTAREA:
                    return (
                        <div className="model-item" key={i}>
                            <Input
                                type={o.type}
                                required={req}
                                label={o.label}
                                value={o.value}
                                multiline={true}
                                disabled={o.disable || false}
                                change={changeHandler.bind(this, o.field, item)}
                            />
                        </div>
                    );
                case INPUT_TYPES.CHECKBOX :
                    return (
                        <div className="model-item" key={i}>
                            <CheckBox
                                required={o.required}
                                change={changeHandler.bind(this, o.field, item)}
                                value={o.value}
                                label={o.label}
                                disabled={o.disable || false}
                                defaultValue={o.value}
                            />
                        </div>
                    )
                case INPUT_TYPES.FILE :
                    return (
                        <div className="model-item" key={i}>
                            <InputFile
                                id={o.id}
                                required={o.required}
                                change={changeHandler.bind(this, o.field, item)}
                                value={o.value}
                                disabled={o.disable || false}
                                label={o.label}
                            />
                        </div>
                    )
                case "multi-select":
                    return (
                        <div className="model-item" key={i}>
                            <MultiSelect
                                required={o.required}
                                change={changeHandler.bind(this, o.field, item)}
                                values={o.value}
                                disabled={o.disable || false}
                                label={o.label}
                                items={o.items}
                            />
                        </div>
                    )
                case "multi-datepicker":
                    return (
                        <div className="model-item" key={i}>
                            <DatePicker2/>
                        </div>
                    )
                default:
                    return null;
            }
        })
    );
}
//#endregion

GeneratorFormItems.propTypes = {
    items: PropTypes.array,
    changeHandler: PropTypes.func
}
export default GeneratorFormItems;
