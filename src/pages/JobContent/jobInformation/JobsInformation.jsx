import "./JobsInformation.scss";
import {Select} from "../../../components/Form";
import {useEffect, useState} from "react";
import {createSearchParams, Link, useSearchParams} from "react-router-dom";
import { GridStyle , RowsStyle} from "./jobList";
import Pagination from "../../../components/Grid/Pagination";

import {logo} from "../../../assets/job-logo/logo";
import {v4 as uuid} from "uuid";
import Loading from "../../../components/loading/loading";
import {useNavigate} from "react-router";

const JOB_COUNTER = "شغل های یافت شده :"
const ITEMS = [
    {id: 1, name: "ماه قبل"},
    {id: 2, name: "2 ماه قبل"},
    {id: 3, name: "هفته قبل"},
    {id: 4, name: "3 روز قبل"},

]


const location = ["تهران،ولیعصر", "تهران،فردوسی", "اصفهان، اصفهان"];
const published = new Array(5).fill(` در${Math.floor(Math.random() * 30)} روز پیش ایجاد گردید `);
const time = ["تمام وقت", "پاره وقت"]
const random = (arr, num) => {
    return arr[Math.floor(Math.random() * num)];
}
const tags = [
    {icon: "mdi mdi-bookmark-outline", text: random(time, 2)},
    {icon: "mdi mdi-alarm", text: random(published, 5)},
    {icon: "mdi mdi-map-marker-outline", text: random(location, 3)}
]
const job = [
    {
        icon: logo.UI,
        title: "UI/UX Designer",
        tags,
        time: random(time, 2),
        publish: random(published, 5),
        salary: "10,000,000"
    },
    {
        icon: logo.Net,
        title: "Senior .Net Developer",
        tags: [...tags],
        time: [...random(time, 1)],
        publish: [...random(published, 5)],
        salary: "18,000,000"
    },
    {
        icon: logo.MidFront,
        title: "Mid-Level FrontEnd Developer",
        tags,
        time: random(time, 1),
        publish: random(published, 5),
        salary: "12,000,000"
    },
    {
        icon: logo.React,
        title: "Senior ReactJs Developer",
        tags,
        time: random(time, 1),
        publish: random(published, 5),
        salary: "15,000,000"
    },
    {
        icon: logo.NodeJs,
        title: "Senior NodeJs Developer",
        tags,
        time: random(time, 1),
        publish: random(published, 5),
        salary: "13,000,000"
    },
]
const FAKE_ITEMS = () => {
    const item = []
    let i = 0;
    while (i < 10) {
        item.push({
            id: uuid().slice(0, 10),
            ...random(job, 5)
        })
        i++;
    }
    return item
}


const JobsInformation = ({totalCount = 15, change = () => {}, reset = () => {}}) => {
    const [freshness, setFreshness] = useState(null);
    const [searchParams] = useSearchParams();
    const [dataSource, setDataSource] = useState(null);
    const jobStyle = searchParams.get("style") === null ? "rows" : searchParams.get("style");
    const navigate = useNavigate();

    useEffect(() => {
        setDataSource(FAKE_ITEMS)
        return () => {

        };
    }, []);

    const handleGotToJob = (job)=>{
        navigate({
            pathname:"/jobContent",
            search : `?${createSearchParams({job : job.id , title : job.title})}`
        })
    }
    const handleChangeInput = (e) => {
        setFreshness(e)
        change(e)
    }
    console.log(jobStyle)
    return (
        <div className="job-information-container">
            <div className="head">
                <div className="right">
                    <p>{JOB_COUNTER}&nbsp;{totalCount}</p>
                </div>
                <div className="left">
                    <Select
                        change={handleChangeInput}
                        items={ITEMS}
                        mapping={{value: "id", text: "name"}}
                        label={"مرتب سازی بر اساس زمان ایجاد شغل"}
                        value={freshness}
                        required={false}
                    />
                    <Link to="?style=rows"><i className="fa fa-th-list"/></Link>
                    <Link to="?style=grid"><i className="fa fa-th"></i></Link>
                </div>
            </div>
            <hr/>
            <div className="list-items">
                <div className="job-list-items">
                    {dataSource === null ? <Loading/> :
                        jobStyle === "rows" ? <RowsStyle data={dataSource}
                        redirect={handleGotToJob}/> : <GridStyle data={dataSource}
                        redirect={handleGotToJob}/>
                    }

                </div>
                <Pagination/>
            </div>
        </div>
    )
}
export default JobsInformation;
