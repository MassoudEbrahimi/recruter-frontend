import {ThemeContext} from "./themeContext";
import {useState} from "react";
import "./themeStyle.scss";


export const ThemeProvider = ({children})=>{
    const initialTheme = window.localStorage.getItem("theme");
    const [theme , setTheme] = useState(initialTheme || "light")
    document.body.setAttribute("data-theme" , theme);


    const handleChangeTheme = () =>{
        const value = theme === "light" ? "dark" : "light";
        setTheme(value);
        window.localStorage.setItem("theme" , value);
        document.body.setAttribute("data-theme" , value);
    }
    const contextValues = ()=>({
        theme,
        change : handleChangeTheme
    })
    return (
        <ThemeContext.Provider value={contextValues()}>
            {children}
        </ThemeContext.Provider>
    )
}