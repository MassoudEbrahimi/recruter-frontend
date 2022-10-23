import React, {Component, createRef} from 'react'
import DatePicker from 'react-datepicker2'
import './CalendatTime.css'
import momentJalaali from 'moment-jalaali';

class DateTimePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defValues: momentJalaali()
        }
        this.dt = createRef();
    }
    handleChange = (value) => {
        const {change, timer} = this.props
        let date
        if (timer) {
            this.setState({defValues: value})
            date = value.format("YYYY-MM-DD HH:mm:ss")
        } else {
            this.setState({defValues: value})
            date = value.format("YYYY-MM-DD")
        }
        change(date);
    }

    render() {
        const {value , label, timer, required} = this.props
        let calendarValue = value!=="" ? momentJalaali(new Date(value)) : this.state.defValues;
        return (
            <React.StrictMode>
                <div className="r-input r-datepicker r-rtl r-bordered">
                    <div className="date-timePicker-label">
                        {label && <span>{label}</span>}
                    </div>
                    <DatePicker
                        ref={r => {
                            this.dt = r
                        }}
                        timePicker={timer}
                        isGregorian={false}
                        value={calendarValue}
                        onChange={this.handleChange}
                        inputJalaaliFormat={!timer ? "jYYYY-jM-jD" : "jYYYY-jM-jD HH:mm:ss"}
                        inputFormat={!timer ? "YYYY-M-D" : "YYYY-M-D HH:mm:ss"}
                    />
                    {(required && !this.state.defValues) && <div style={{color: "red", textAlign: "right"}}>
                        <span className="r-message">وارد کردن این فیلد ضروری میباشد</span>
                    </div>}
                </div>
            </React.StrictMode>
        );
    }
}

export default DateTimePicker;
