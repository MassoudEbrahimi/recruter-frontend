import React, {Component, Fragment, createRef} from "react";
import {createIcon, mapObjectToClassName} from "../functions";
import icons from "../icons";
import "./Input.scss";

class Input extends Component {
    constructor(props) {
        super(props);
        this.textareaDom = createRef();
        let {value = ""} = this.props;
        this.state = {
            initialValue: value,
            value,
            togglePasswordType: false,
            passwordType: "password"
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.value !== state.initialValue) {
            let {value = ""} = props;
            return {
                value,
                initialValue: value,
            };
        }

        return null;
    }

    componentDidMount() {
        require("../../../script/inputScript");
    }

    /**
     * Handle input changes
     *
     * @param {Event} e
     */
    handleChange(e) {
        const {change} = this.props;
        let value = e.target.value;

        this.setState({value});

        change(value);
    }

    /**
     * HandleChange Eye Icon for password type
     *
     * @param {state} togglePasswordType
     */
    handleToggleEyeIcon = () => {
        const {togglePasswordType} = this.state;
        if (!this.state.togglePasswordType) {
            this.setState({passwordType: "text"});
        } else {
            this.setState({passwordType: "password"});
        }
        this.setState({togglePasswordType: !togglePasswordType});
    }

    /**
     * Get style
     */
    isUnicode(str) {
        var letters = [];
        for (var i = 0; i <= str.length; i++) {
            letters[i] = str.substring((i - 1), i);
            if (letters[i].charCodeAt() > 255) {
                return true;
            }
        }
        return false;
    }

    getInputClass() {
        const {rtl, outline, disabled, icon, className, required} = this.props;
        const {value} = this.state;
        let direction = null;
        if (value !== "")
            if (this.isUnicode(value)) {
                direction = true
            } else {
                direction = false
            }
        let names = {
            [className]: className ? true : false,
            filled: String(value).length > 0 || disabled,
            "r-input": true,
            "r-rtl": direction !== null ? direction : rtl,
            "r-bordered": outline,
            "r-disabled": disabled,
            "r-has-icon": icon !== null,
            "r-error":
                (value === undefined || value === null || value === "") && required,
        };

        return mapObjectToClassName(names);
    }

    render() {
        const {
            label,
            disabled,
            multiline,
            icon,
            onFocus,
            onBlur,
            autoFocus,
            onKeyUp,
            style,
            required,
            type,
            id,
            maxLength,
            minLength
        } = this.props;
        const {value} = this.state;

        const inputIcon = createIcon(icon);

        return (
            <div style={style} className={this.getInputClass()}>
                {multiline ? (
                    <textarea
                        onKeyUp={onKeyUp}
                        autoFocus={autoFocus}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        data-autoresize
                        ref={this.textareaDom}
                        type="text"
                        value={value}
                        autocomplete="off"
                        onChange={this.handleChange.bind(this)}
                        disabled={disabled}
                    ></textarea>
                ) : (
                    <input
                        id={id}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        onKeyUp={onKeyUp}
                        autoFocus={autoFocus}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        type={type === "password" ? this.state.passwordType : type}
                        value={value}
                        onChange={this.handleChange.bind(this)}
                        disabled={disabled}
                        maxLength={maxLength ? maxLength : 1000}
                        minLength={minLength ? minLength : 0}

                        // minLength="2"
                        // maxLength="8"
                    />
                )}

                {label && <label>{label}</label>}
                {(value && value !== "") && type === "password" && <span onClick={this.handleToggleEyeIcon}
                                              className={required ? "r-input-password required" : "r-input-password"}><i
                    className={this.state.togglePasswordType ? "mdi mdi-eye-off" : "mdi mdi-eye"}/></span>}
                {icon !== null && <span className="r-input-icon">{inputIcon}</span>}
                {(value === undefined || value === null || value === "") && required && (
                    <Fragment>
                        <span className="r-icon">{icons.error}</span>
                        <span className="r-message">وارد کردن این فیلد ضروری میباشد</span>
                    </Fragment>
                )}
            </div>
        );
    }
}

Input.defaultProps = {
    autoFocus: false,
    rtl: false,
    outline: false,
    disabled: false,
    multiline: false,
    icon: null,
    style: {},
    className: "",
    required: true,
    type: "text",
};

export default Input;
