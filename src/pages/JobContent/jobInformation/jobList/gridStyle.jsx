import {motion} from "framer-motion";
import "./gridStyle.scss";
const animateProps = {
    initial: {opacity: 0, scale: 0},
    animate: {opacity: 1, scale: 1},
}



const GridStyle = ({data , redirect})=>{
    return <div className="grib-job-style">
            <ul>
                {data.map((job , i) => <motion.li className="job-item" key={job.id} {...animateProps} transition={{ease: "easeOut", duration: (i * 0.3) + 0.5}}>
                    <div className="job-post">
                        <div>
                            <div className="post-top">
                                {job.icon}
                                <h4>{job.title}</h4>
                            </div>
                            <div className="post-info">
                                <ul>
                                    {job.tags.map((tag , index)=><li key={index}><i className={tag.icon}/>&nbsp;{tag.text}</li>)}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className="post-salary"><span> حقوق از :</span>{job.salary}</div>
                        </div>
                    </div>
                    </motion.li>)}
            </ul>
    </div>
}
export  default  GridStyle;