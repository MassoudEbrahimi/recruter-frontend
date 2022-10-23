import {useState} from "react";
import {dictionaryList, languageOptions} from "./index";
import {LanguageContext} from "./languageContext";


export const LanguageProvider = ({children})=>{
    const defaultLanguage = window.localStorage.getItem("user-lang");
    const [userLanguage  , setUserLanguage] = useState(defaultLanguage || "fa")



    const provider = {
        userLanguage,
        dictionary:dictionaryList[userLanguage],
        userLanguageChange : selected =>{
            const newLanguage = languageOptions[selected] ? selected : "fa";
            setUserLanguage(newLanguage);
            window.localStorage.setItem("user-lang" , newLanguage);
        }
    }
    return (
        <LanguageContext.Provider value={provider}>
            {children}
        </LanguageContext.Provider>
    )
}