import intervieweePersonalityColumns from "../../../../../constants/columns/report-interviewee-personality.json";
import Grid from "../../../../../components/Grid/Gird";


const ReportIntervieweePersonality = ()=>{

    const getIntervieweePersonality = ()=>{
        return {
            totalCount : 0,
            items : []
        }

    }

    return(
        <div className="report-interviewee-personality">
            <Grid
                api={getIntervieweePersonality}
                dataColumns={intervieweePersonalityColumns}
                pageSize={30}
                actions={{enable: false}}
                filtering={{enable: false}}
                rowIndexx={{enable: false}}
                isOnLoad={true}
            />
        </div>
    )
}
export default ReportIntervieweePersonality