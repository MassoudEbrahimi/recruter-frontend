import {Component} from "react";
import {MultiSelect} from "../ReactForm";


class BaseMultiSelect extends Component {


    render() {
        const {values , mapping  , required , change , label, items } = this.props
        return (
            <MultiSelect
                values={items?? []}
                mapping={mapping?? {value:"id" , text:"name"}}
                defaultValue={values}
                required={required}
                change={change}
                label={label ?? ""}
                search={true}
                rtl={true}
                nullable={true}
                disabled={false}
                outline={true}
                // showKey={true}
            />
        )
    }
}
export default BaseMultiSelect;