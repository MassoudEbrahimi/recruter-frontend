import "./article.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper";
import CSharp from "../../../assets/article-logo/C#.png";
import Docker from "../../../assets/article-logo/Docker.png";
import JavaScript from "../../../assets/article-logo/javascript.png";
import NetCore from "../../../assets/article-logo/net.png";
import rabbitMq from "../../../assets/article-logo/rabbit.jpg";
import {v4 as uuid} from "uuid";
import {useState} from "react";
import Article from "../../../components/article";
import {Link} from "react-router-dom";

const TEXT_SAMPLE = "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد."

const uniqueId = uuid().slice(0, 8);
const ITEMS = [
    {id: uniqueId, img: CSharp, title: "C# Article", description: TEXT_SAMPLE},
    {id: uniqueId, img: JavaScript, title: "JavaScript Articles", description: TEXT_SAMPLE},
    {id: uniqueId, img: NetCore, title: "NetCore Articles", description: TEXT_SAMPLE},
    {id: uniqueId, img: Docker, title: "Docker Articles", description: TEXT_SAMPLE},
    {id: uniqueId, img: rabbitMq, title: "RabbitMq Articles", description: TEXT_SAMPLE},
]
const Articles = () => {
    const [articles,] = useState(ITEMS);


    const handleGetArticle = ()=>{

    }
    return (
        <div id="articles" className="articles-container">
            <article className="article-list">
                <Swiper
                    dir="rtl"
                    slidesPerView={1}
                    spaceBetween={20}
                    loop={false}
                    breakpoints={{
                        500: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1600: {
                            slidesPerView: 3,
                            spaceBetween: 40
                        }
                    }}
                    pagination={{
                        clickable: true
                    }}
                    hashNavigation={{
                        watchState: true,
                    }}
                    navigation={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Autoplay, Navigation]}
                    className="articles-swiper"
                >
                    {articles.map((art, index) =>
                        <SwiperSlide key={index}>
                            <Article dataSource={art}/>
                        </SwiperSlide>
                    )}
                </Swiper>
            </article>
            <Link className="more-items" to="article-list">بیشتر</Link>
        </div>
    )
}
export default Articles;