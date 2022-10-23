import {useContext, useEffect, useState} from "react";
import {v4 as uuid} from "uuid";
import "./header.scss";
import LanguageSelector from "../../language/languageSelector";
import {Link, useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import logo from "../../assets/100.png";
import {ThemeContext} from "../../context/theme/themeContext";
import ThemeSelector from "../../context/theme/themeSelector";

const ITEMS = [
    {title: "خانه", hash: "#top-page", link: "/" },
    {title: "موقعیت شغلی", hash: "#jobs", link: "jobContent" },
    {title: "مقالات", hash: "#articles", link: "/#articles" },
    {title: "درباره ما", hash: "#aboutUs", link: "/#aboutUs" },
]
const uniqueId = () => uuid().slice(0, 10);
const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [list,setList] = useState(initialMenu(ITEMS));
    // const [isDark, setIsDark] = useState(false);
    const themeCtx = useContext(ThemeContext);

    useEffect(() => {
        if(location.pathname !== "/"){
            setList(prev => prev.map(o=> ({...o, element : <Link to={o.link}>{o.title}</Link>})))
        }else{
            setList(prev=> prev.map(o=> ({...o , element : <a href={o.hash}>{o.title}</a>})))
        }
    },[location.pathname])

    function initialMenu(items) {
        return items.map(o => ({id: uniqueId(), element: <a href={o.hash}>{o.title}</a>, ...o}))
    }
    const handleToLogin = ()=>{
        navigate("/login");
    }
    const handleToggleTheme = () => {
        themeCtx.change()
    }
    const renderLogo = () => <div className="company-logo">
        <img src={logo} alt="logo"/>
        <span>گروه نرم افزاری حافظ</span>
    </div>
    const renderMenu = () => <ul className="nav-menu-list-header">
        {list.map((el, index) =>
            <li className="nav-menu-item" key={index}>
                {el.element}
            </li>)}
    </ul>
    const renderToggleTheme = () => {
        return <div className="inner-left-content">
            {/*<LanguageSelector/>*/}
            <ThemeSelector/>
            <button onClick={handleToLogin} className="login-btn"><i className="fa fa-lock"/><span>&nbsp;ورود</span></button>
        </div>
    }


    return (
        <header className="main-header">
            <div className="nav-container">
                {renderLogo()}
                {renderMenu()}
                <div className="header-left-content">
                    {renderToggleTheme()}
                </div>
            </div>
        </header>
    )
}

export default Header;