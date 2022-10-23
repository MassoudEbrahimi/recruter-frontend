import {Component} from "react";
import {DatePicker2} from "../ReactForm";


class BaseDatePicker2 extends Component {


    render() {
        const {value, change} = this.props;
        return (
            <DatePicker2
                change={change}
                value={value}
            />
        )
    }
}

export default BaseDatePicker2