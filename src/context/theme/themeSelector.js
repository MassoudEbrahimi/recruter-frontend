import {useContext} from "react";
import {ThemeContext} from "./themeContext";
import "./themeStyle.scss";

const ThemeSelector = ()=>{
    const themeCtx = useContext(ThemeContext);

    return (
        <a className={`theme-layout ${themeCtx.theme === "dark" ? "active" : ""}`}>
            <input type="checkbox" checked={themeCtx.theme !== "light"} onChange={themeCtx.change}/>
            <span/>
        </a>
    )
}
export default ThemeSelector;