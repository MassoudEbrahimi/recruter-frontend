import React, { Component } from 'react';
import { Select } from '../ReactForm';




class BaseSelect extends Component {

    render() {
        const { change, items, mapping, label, value, required, id , disabled } = this.props;
        return (
            <Select
                id={id}
                nullable={true}
                search={true}
                change={change}
                rtl={true}
                label={label}
                defaultValue={value}
                outline={true}
                values={items}
                mapping={mapping}
                required={required}
                disabled={disabled}

            />
        )
    }
}

export default BaseSelect;

