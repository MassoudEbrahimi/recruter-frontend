import {motion} from "framer-motion";



const animateProps = {
    initial: {opacity: 0, scale: 0},
    animate: {opacity: 1, scale: 1},
}

const RowsStyle = ({data , redirect}) => {

    return (
        <div className="row-job-style">
            <ul>
                {data.map((job , i) =>
                    <motion.li {...animateProps} transition={{ease: "easeOut", duration: (i*.2) + 0.5}} key={job.id} onClick={redirect.bind(this , job)}>
                        <div className="job-post">
                            <div className="flex">
                                <div className="post-icon">
                                    {job.icon}
                                    {/*<img src={job.icon} alt="" loading={"lazy"}/>*/}
                                </div>
                                <div className="post-info">
                                    <h4>{job.title}</h4>
                                    <ul>
                                        {job.tags.map((tag , index)=><li key={index}><i className={tag.icon}/>&nbsp;{tag.text}</li>)}
                                    </ul>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="post-time">{job.time}</div>
                                <div className="post-salary"><span> حقوق از :</span>{job.salary}</div>
                            </div>
                        </div>
                    </motion.li>
                )}
            </ul>
        </div>
    )
}
export default RowsStyle;