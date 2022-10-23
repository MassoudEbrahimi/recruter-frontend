import {useContext} from "react";
import {LanguageContext} from "./languageContext";


export function Text({tid}){
    const languageContext = useContext(LanguageContext);
    return languageContext.dictionary[tid] || tid;
}