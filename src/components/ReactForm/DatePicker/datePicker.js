import React, {useState} from "react";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import opacity from "react-element-popper/animations/opacity";

import "./datepicker.scss";


const DatePicker2 = ({label,change,required}) => {
    const [values ,setValue] = useState(new Date());
    const handleChangeValue = (e)=>{

        const time  =`${e.hour}:${e.minute}:${e.second}`
        setValue(e)
        change(time);
    }
    return (
        <div className="multi-calendar-date-picker">
            <div className="date-timePicker-label">
                <span>{label}</span>
            </div>
            {/*<DatePicker*/}
            {/*    animations={[opacity()]}*/}
            {/*    ref={ref}*/}
            {/*    disableDayPicker*/}
            {/*    format="HH:mm:ss"*/}
            {/*    value={value}*/}
            {/*    plugins={[<TimePicker/>]}*/}
            {/*    calendar={persian}*/}
            {/*    locale={persian_fa}*/}
            {/*    onChange={setValue}*/}
            {/*    onFocusedDateChange={handleFocusDateChanged}*/}
            {/*    onPropsChange={handleFocusDateChanged}*/}
            {/*    calendarPosition="bottom-right"*/}
            {/*    // placeholder="زمان مصاحبه"*/}
            {/*/>*/}
            <DatePicker
                animations={[opacity()]}
                disableDayPicker
                format="HH:mm:ss"
                plugins={[
                    <TimePicker hideSeconds/>
                ]}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                value={values}
                onChange={handleChangeValue}
            />
            {(required && !this.state.defValues) && <div style={{color: "red", textAlign: "right"}}>
                <span className="r-message">وارد کردن این فیلد ضروری میباشد</span>
            </div>}
        </div>
    )
}
export default DatePicker2;