import Jobs from "../../pages/home/jobs/jobs";

import "./content.scss";

import Articles from "../../pages/home/article/article";
import AboutUs from "../../pages/home/aboutUs/aboutUs";
import Divider from "../../components/divider/divider";


const Content = () => {

    const renderScrollProgressBar = ()=>{
        return <div  className="progress-bar-header">
            <div  className="progress-container">
                <div className="progress-bar" id="myBar"></div>
            </div>
        </div>
    }
    return (
        <>
            {renderScrollProgressBar()}
            <div id="top-page" className="main-content-inner">
                <div className="homepage-image"/>
                <Divider text="موقعیت شغلی"/>
                <Jobs/>
                <Divider text="مقالات"/>
                <Articles/>
                <Divider text="درباره ما"/>
                <AboutUs/>
            </div>
        </>
    )
}
export default Content;