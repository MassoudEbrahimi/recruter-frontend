import Footer from "../footer/footer";
import Header from "../header/header";
import "./masterpage.scss"
import {Outlet, Route, Routes, useLocation} from "react-router-dom";
import Content from "../content/content";
import JobsContent from "../../pages/JobContent/jobsContent";


const MasterPage = () => {
    const {pathname} = useLocation();
    const handleScroll = e =>{
        const GAP_SCROLL = 11.677;
        const winScroll = e?.target.scrollTop;
        const height = e?.target.scrollHeight - document.documentElement.clientHeight;
        let scrolled = ((winScroll / height) * 100);
        if(scrolled > 90) scrolled -= GAP_SCROLL;
        const dom = document.getElementById("myBar");
        if(dom){
            dom.style.width = scrolled + "%";
        }
    }

    return (
        <>
            <div className="main-container">
                <Header/>
                <div className="main-content" onScroll={handleScroll.bind(this)}>
                    <Outlet/>
                </div>
                <Footer/>
            </div>
        </>

    )
}


export default MasterPage;