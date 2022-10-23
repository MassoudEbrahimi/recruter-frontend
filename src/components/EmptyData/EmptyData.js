import React from 'react'



//#region empty style component for data grid in null or dataLength equal to 0
export const EmptyData = ({ text }) => {
    const divStyle = {
        textAlign: "center",
        color: "#989898",
        paddingTop: "20px",
    }
    const iconStyle = {
        fontSize: 60
    }
    return (
        <div style={divStyle}>
            <div>
                <span className="icon" style={iconStyle}>
                    <i className="fa fa-database"/>
                </span>
            </div>
            <div>
                <span>{text}</span>
            </div>
        </div>
    );
}
//#endregion
//#region empty style component for task in warrent status length equal to 0
export const EmptyTask = ({ text }) => {
    const divStyle = {
        textAlign: "center",
        color: "#000",
        direction: "rtl"
    }
    const iconStyle = {
        fontSize: 25,
        marginLeft: "5px"
    }
    return (
        <div style={divStyle}>
            <span className="icon" style={iconStyle}>
                <i className="fa fa-database"/>
            </span>
            <span>{text}</span>
        </div>
    );
}
//#endregion
//#region empty style component for call archive in sip analyzer default first time use it  archive call length equal to 0
export const EmptyCall = ({text}) =>{
    const divStyle = {
        textAlign: "center",
        color: "#989898",
        marginTop: "20px",
    }
    const iconStyle = {
        fontSize: 60
    }
    return (
        <div style={divStyle}>
            <div>
                <span className="icon" style={iconStyle}>
                    <i className="mdi mdi-phone-off"/>
                </span>
            </div>
            <div>
                <span>{text}</span>
            </div>
        </div>
    );
}
//#endregion
