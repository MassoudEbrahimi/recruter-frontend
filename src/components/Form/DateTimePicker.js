import React, { Component } from 'react'
import { DateTimePicker } from '../ReactForm'


class BaseDateTimePicker extends Component {
    render() {
        const { label, value, change, required, id, timer } = this.props;
        // const x = new Date(Date.now());
        // x.setDate(x.getDate() - 13)
        return (
            <DateTimePicker
                timer={timer}
                id={id}
                change={change}
                label={label}
                value={value}
                required={required}
            />
        );
    }
}

export default BaseDateTimePicker;
