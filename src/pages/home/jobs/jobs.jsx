import {Swiper, SwiperSlide} from "swiper/react";
import "./jobs.scss"
import "swiper/css";
import "swiper/css/pagination";
import Job from "./jobItem";
import {Autoplay, Navigation, Pagination} from "swiper";
import {useState} from "react";
import {v4 as uuid} from "uuid";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

const skill = ["React", "JavaScript", "C#", ".NetCore", "SQL Server", "Python", "HTML", "CSS", "Redux", "Influx", "MongoDb", "GraphQL", "OOP", "XUnit", "NUnit"]

function getRandomJobSkill() {
    const id = Math.ceil(Math.random() * 6);
    const data = [];
    for (let i = 0; i < id; i++) {
        data.push({
            id: i,
            text: skill[Math.ceil(Math.random() * skill.length - 1)]
        })
    }
    return data;
}

const ITEMS = [
    {
        title: "FrontEnd Developer",
        time: "Full time",
        location: "میدان ولیعصر",
        description: "Exercitation fugiat sunt velit minim.",
        tags: getRandomJobSkill()
    },
    {
        title: "BackEnd Developer",
        time: "Full time",
        location: "میدان ولیعصر",
        description: "Ullamco tempor labore amet exercitation laborum reprehenderit exercitation. Esse non adipisicing duis commodo fugiat pariatur ullamco dolore cillum ea. Dolore enim labore voluptate pariatur. Exercitation sit anim deserunt commodo consequat do.",
        tags: getRandomJobSkill()
    },
    {
        title: "C# .Net Developer",
        time: "Part Time",
        location: "میدان ولیعصر",
        description: "Lorem laboris eu occaecat dolore et.",
        tags: getRandomJobSkill()
    },
    {
        title: "پشتیبان SQL Server",
        time: "Part Time",
        location: "میدان ولیعصر",
        description: "Laboris proident sit laboris proident ea qui amet officia occaecat velit ullamco enim. Cillum veniam exercitation officia et. Amet voluptate consequat culpa commodo ea velit laborum commodo minim elit ex. Enim voluptate pariatur incididunt laborum do. Anim sunt esse culpa Lorem. Reprehenderit qui cupidatat eiusmod tempor mollit voluptate aliqua. Deserunt eiusmod aliquip eu pariatur.",
        tags: getRandomJobSkill()
    },
    {
        title: "UI/UX Designer",
        time: "Full time",
        location: "میدان ولیعصر",
        description: "Cupidatat sint anim elit amet.",
        tags: getRandomJobSkill()
    },
    {
        title: "UI/UX Designer",
        time: "Part Time",
        location: "میدان ولیعصر",
        description: "Dolor laboris ea anim magna sunt eu fugiat esse cupidatat veniam aliquip incididunt.",
        tags: getRandomJobSkill()
    },
    {
        title: "UI/UX Designer",
        time: "Full time",
        location: "میدان ولیعصر",
        description: "Enim adipisicing nostrud adipisicing elit enim Lorem occaecat eiusmod nulla commodo ex. Excepteur nulla eiusmod laborum aliqua sint dolor. Eu Lorem ut cillum consectetur adipisicing tempor laborum sunt irure consectetur nisi et. Eiusmod nulla veniam reprehenderit voluptate veniam minim proident officia id exercitation qui. Excepteur labore duis amet sit consequat nulla incididunt enim aute commodo quis labore consectetur aliquip.",
        tags: getRandomJobSkill()
    },
    {
        title: "UI/UX Designer",
        time: "Full time",
        location: "میدان ولیعصر",
        description: "Minim do deserunt occaecat laborum voluptate dolore cupidatat pariatur pariatur excepteur commodo sunt non. Mollit incididunt enim consequat sunt velit consectetur eiusmod proident eu sit minim do non. Fugiat duis fugiat cupidatat do laboris elit commodo. Do tempor sint proident nostrud ipsum ea excepteur magna est laboris non eiusmod.",
        tags: getRandomJobSkill()
    },
]

const Jobs = () => {
    const id = ()=> uuid().slice(0, 8);
    const [jobs,] = useState(generateFakeJobs(ITEMS))

    function generateFakeJobs(items) {
        return items.map(o => ({jobId : id(), ...o}));
    }
    return (
        <div id="jobs" className="jobs-container">
            <div className="jobs-container-inner">
                {/*<Divider icon="mdi mdi-briefcase-account"/>*/}
                <article className="jobs-list">
                    <Swiper
                        dir="rtl"
                        slidesPerView={1}
                        spaceBetween={20}
                        loop={false}
                        breakpoints={{
                            500: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                            1600: {
                                slidesPerView: 5,
                                spaceBetween: 45
                            }
                        }}
                        pagination={{
                            clickable: true
                        }}
                        hashNavigation={{
                            watchState: true,
                        }}
                        navigation={true}
                        // autoplay={{
                        //     delay: 2500,
                        //     disableOnInteraction: false,
                        // }}
                        modules={[Pagination, Autoplay, Navigation]}
                        className="mySwiper"
                    >
                        {jobs.map((job, index) =>
                            <SwiperSlide key={index}>
                                <Job dataSource={job}/>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </article>
                <Link className="more-items" to="jobContent">بیشتر</Link>
            </div>
        </div>
    )
}
export default Jobs;