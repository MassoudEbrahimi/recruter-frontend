import "./divider.scss";


const Divider = ({icon = "", text = ""}) => {
    return (
        <div className="h-divider">
            <div className="h-divider-shadow"></div>
            <div className="text"><i className={icon}>{text}</i></div>
        </div>
    )
}
export default Divider;