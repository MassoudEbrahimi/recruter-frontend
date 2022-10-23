import aboutImage from "../../../assets/aboutus.png"
import "./aboutUs.scss"

const AboutUs = () => {
    return (
        <section id="aboutUs" className="aboutUs-container">
            <div className="aboutUs-wrapper">
                <img src={aboutImage} alt="aboutUs-image" loading={"lazy"}/>
                <div className="description">
                    <h1>گروه نرم افزاری حافظ</h1>
                    <div>
                        <div className="details"><span> شماره تماس : </span> <span> 021-12345678</span></div>
                        <div className="details"><span> پست الکترونیکی : </span> <span>Hafez@Test.com</span></div>
                        <div className=""><span>آدرس : </span>
                            <p>
                                حافظ</p>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fillOpacity="1"
                              d="M0,64L60,69.3C120,75,240,85,360,106.7C480,128,600,160,720,186.7C840,213,960,235,1080,218.7C1200,203,1320,149,1380,122.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                    </svg>
                    <div className="social-icon">

                    </div>
                </div>
            </div>
        </section>)
}
export default AboutUs;