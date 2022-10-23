import {useContext} from "react";
import {LanguageContext} from "./languageContext";
import {languageOptions} from "./index";

export default function LanguageSelector() {
    const {userLanguage, userLanguageChange} = useContext(LanguageContext)
    const handleLanguageChange = event => userLanguageChange(event.target.checked);

    return (
        <select onChange={handleLanguageChange}>
            value={userLanguage}
            {Object.entries(languageOptions).map(([id, name]) => (
                <option key={id} value={id}>{name}</option>
            ))}
        </select>
    )
}