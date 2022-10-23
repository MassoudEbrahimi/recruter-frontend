import "./report-interviewer.scss"
import intervieweeScheduleColumns from "../../../../../constants/columns/report-interviewer-schedule.json";
import Grid from "../../../../../components/Grid/Gird";
import {Select} from "../../../../../components/Form";
import {useState} from "react";

const ITEMS = [
    {id: 0, name: "شماره 1"},
    {id: 1, name: "شماره 2"},
    {id: 2, name: "شماره 3"},
]

const ReportInterviewerSchedule = () => {
    const [interviewer, setInterviewer] = useState();

    const handleChange = (e) => {
        setInterviewer(e);
        //todo get filtered Items from backend.
    }
    const getInterviewsSchedule = () => {
        //Todo onload request to backend and get all interviewer schedule item.
        return {
            totalCount: 0,
            items: []
        }

    }
    return (
        <div className="interviewer-container">
            <div className="top">
                <Select
                    change={handleChange}
                    items={ITEMS}
                    mapping={{value: "id", text: "name"}}
                    label={"مصاحبه کننده"}
                    value={interviewer}
                    required={false}
                />
            </div>
            <div className="bottom">
                <Grid
                    api={getInterviewsSchedule}
                    dataColumns={intervieweeScheduleColumns}
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
export default ReportInterviewerSchedule;