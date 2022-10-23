import "./interviewerStatus.scss"
import Grid from "../../../../../components/Grid/Gird";
import reportInterviewerStatusColumns from "../../../../../constants/columns/report-interviewer-statuses.json"

const ReportInterviewerStatuses = ()=>{


    const getInterviewsStatue = ()=>{
        return {
            totalCount : 0,
            items:[]
        }
    }

    return(
        <div className="interview-status-container">
            <Grid
                api={getInterviewsStatue}
                dataColumns={reportInterviewerStatusColumns}
                pageSize={30}
                actions={{enable: false}}
                filtering={{enable: false}}
                rowIndexx={{enable: false}}
                isOnLoad={true}
            />
        </div>
    )
}
export default ReportInterviewerStatuses;