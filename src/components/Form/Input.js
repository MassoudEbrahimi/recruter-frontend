import React, { Component } from 'react';
import {Input} from "../ReactForm"



class BaseInput extends Component {
    render() {
        const { label, value, change, required, type, id , disabled , maxLength , minLength , multiline , direction } = this.props;
        return (
            <Input
                id={id}
                type={type}
                required={required}
                rtl={true}
                label={label}
                value={value}
                change={change}
                outline={true}
                disabled={disabled}
                multiline={multiline}
                maxLenght={maxLength}
                minLenght={minLength}
            />
        )
    }
}
BaseInput.defaultProps = {
    bg: false,
    left: false,
}

export default BaseInput;
