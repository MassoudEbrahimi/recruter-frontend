import {createContext} from "react";
import {dictionaryList} from "./index";


export const LanguageContext = createContext({
    userLanguage : "fa",
    dictionary : dictionaryList.fa
})
