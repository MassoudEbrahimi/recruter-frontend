import {Fragment, useState} from "react";
import {motion} from "framer-motion";
import "./job.scss";
import {createSearchParams, Link} from "react-router-dom";
import {useNavigate} from "react-router";
import jobs from "../jobs";

const animateProps = {
    initial: {opacity: 0, scale: 0},
    animate: {opacity: 1, scale: 1},
    ended: {opacity: 0, scale: 0},
    transition: {ease: "easeOut", duration: 1}
}
const Job = ({dataSource}) => {
    const navigate = useNavigate();
    const [state, setState] = useState();

    const {jobId, title, description, tags, time, location} = dataSource;
    const handleGoToJob = ()=>{
        navigate({
            pathname:"/jobContent",
            search : `?${createSearchParams({job : jobId , title})}`
        })
    }
    return (
        <motion.div className="job-container" key={jobId} {...animateProps}>
            <div className="job-wrapper">
                <div className="icon-content">
                    <div className="title">{title}</div>
                    <div className="job-status">
                        <button onClick={handleGoToJob}><span><i
                            className="mdi mdi-eye-circle-outline"/></span></button>
                        <p><i className="fa fa-clock"/>&nbsp;{time}</p>
                        <p><i className="mdi mdi-map-marker-outline"/>{location}</p>
                    </div>
                </div>
                {/*<div className="job-tags">{tags.map((tag, index) => <Fragment key={index}><span className="job-tag" key={tag.id}>{tag.text}</span>&nbsp;&nbsp;</Fragment>)}</div>*/}
                {/*<p>{description}</p>*/}
                {/*<button onClick={handleJob.bind(this, dataSource, index)}><span><i className="mdi mdi-eye" /></span></button>*/}
            </div>
        </motion.div>
    )
}
export default Job;