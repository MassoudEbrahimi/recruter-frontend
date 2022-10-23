import {useContext, useEffect, useMemo, useState} from "react";
import {Link, NavLink, Outlet, useLocation} from "react-router-dom";
import "./dashboard.scss";
import image from "../../assets/job-logo/logo1.svg"
import Loading from "../../components/loading/loading";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {ConfirmForm} from "../../helpers";
import ThemeSelector from "../../context/theme/themeSelector";
import {ThemeContext} from "../../context/theme/themeContext";

const LogoutTitle = "برای خارج شد از برنامه مطمئن هستید ؟";


const Panel = () => {
    const [isOpen, setIsOpen] = useState(false)
    // const [isDark, setIsDark] = useState(false);
    const [sideItems, setSideItems] = useState(null);
    const themeCtx = useContext(ThemeContext);
    const {sidebar, role} = useSelector(state => state.auth);

    const navigate = useNavigate();
    useEffect(() => {
        if (sidebar === null) {
            navigate("/login", {replace: true});
        } else
            setSideItems([...sidebar])

        return () => {
        };
    }, [sidebar]);

    const handleToggleMenu = () => {
        setSideItems(prev => prev.map(o => ({...o, status: false})));
        setIsOpen(prev => !prev);
    }
    // const handleToggleTheme = () => {
    //     if (isDark)
    //         document.body.setAttribute("data-theme", "light");
    //     else {
    //         document.body.setAttribute("data-theme", "dark");
    //     }
    //     console.log(isDark)
    //     setIsDark(prev => !prev);
    // }
    const handleLogout = async () => {
        const valid = await ConfirmForm(LogoutTitle, "warning", "بله", "خیر")
        if (valid) {
            navigate("/logout", {replace: true});
        }
    }
    const handleToggleSubmenu = (o, event) => {
        if (!isOpen)
            setIsOpen(true)
        setSideItems(prev => prev.map(el => el.id === o.id ? {...el, status: !el.status} : el));
    }

    const renderHeader = useMemo(() => <section className="panel-header">
        <div className="right-panel-header">
            <div className={`hamburger-menu-icon ${isOpen ? "active" : ""}`}>
                <button className="btn-page square" onClick={handleToggleMenu}>
                    <div className="hamburger">
                        <span className="line"/>
                        <span className="line"/>
                        <span className="line"/>
                    </div>
                </button>
            </div>
            <Link to={role} className="panel-header-btn" style={{borderRadius: "10px"}}><i
                className="fa fa-home"/></Link>
        </div>
        <div className="left-panel-header">
            {/*<button className={`theme-layout-btn ${isDark ? "active" : ""}`}>*/}
            {/*    <input type="checkbox" onChange={handleToggleTheme}/>*/}
            {/*    <span/>*/}
            {/*</button>*/}
            <ThemeSelector/>
            <button className="panel-header-btn" onClick={handleLogout}><span><i
                className="fa fa-sign-out"/>&nbsp;  خروج</span></button>
        </div>
    </section>, [themeCtx.theme, isOpen]);

    const withLinkRoute = (o) => {
        return (
            <NavLink to={o.link} className={el => el.isActive ? "active-link" : ""}><i
                className={o.icon}/><span>{o.title}</span></NavLink>
        )
    }
    const renderSubmenu = (list, status) => {
        return (
            <div className={`inner__sidebar_submenu ${status ? "active" : ""}`}
                 style={{height: status ? `${list.length * 61}px` : 0}}>
                <ul>
                    {list.map((o, i) => <li key={i}>
                        <NavLink to={o.link} className={el => el.isActive ? "active-link" : ""}>
                            <i className={o.icon}/>
                            <span>{o.title}</span>
                        </NavLink>
                    </li>)}
                </ul>
            </div>
        )
    }
    const withoutLinkRoute = (o) => {
        return (
            <>
                <a onClick={handleToggleSubmenu.bind(this, o)}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div>
                            <i className={o.icon}/><span>{o.title}</span>
                        </div>
                        <div className="submenu-icon">
                            <span><i className={`fa ${!o.status ? "fa-chevron-down" : "fa-chevron-up"}`}/></span>
                        </div>
                    </div>
                </a>
                {renderSubmenu(o.items, o.status)}
            </>
        )
    }
    const renderSidebar = () => <aside className="panel-sidebar">
        <img src={image} alt="profile-image"/>
        <div className="panel-inner-sidebar">
            <ul className="panel-sidebar-list">
                {sideItems && sideItems.map((o, i) => {
                    return (
                        <li key={i}>
                            {o?.link && withLinkRoute(o)}
                            {(!o?.link && o?.items) && withoutLinkRoute(o)}
                        </li>
                    )
                })}
            </ul>
        </div>
    </aside>

    if (sideItems === null) return <Loading/>
    return (
        <div className={`panel-container ${isOpen ? "active" : ""}`}>
            {sideItems && renderSidebar()}
            <div className="panel-section">
                {renderHeader}
                <article className="panel-content">
                    <Outlet/>
                </article>
                <section className="panel-footer"></section>
            </div>
        </div>
    )
}
export default Panel;