import "./schedule.scss"
import interviewerSchedule from "../../../../constants/columns/interviewer-schedule.json";
import Grid from "../../../../components/Grid/Gird";


const InterviewerSchedule = () => {

    const getInterviewerSchedule = () => {
        return {
            items: [],
            totalCount: 0
        }

    }

    return (
        <div className="interviewer-schedule-wrapper">
            <div className="title">
                <p><strong>مصاحبه کننده شماره 1</strong></p>
            </div>
            <div className="table-content">
                <Grid
                    api={getInterviewerSchedule}
                    dataColumns={interviewerSchedule}
                    pageSize={30}
                    actions={{enable: false}}
                    filtering={{enable: false}}
                    rowIndexx={{enable: false}}
                    isOnLoad={true}
                />
            </div>
        </div>
    )
}
export default InterviewerSchedule;