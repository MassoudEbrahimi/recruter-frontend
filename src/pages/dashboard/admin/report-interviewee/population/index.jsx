import intervieweePopulationColumns from "../../../../../constants/columns/report-interviewee-population.json";
import Grid from "../../../../../components/Grid/Gird";

const ReportIntervieweePopulation = () => {

    const getIntervieweePopulations = ()=>{
        return {
            items : [],
            totalCount:0
        }
    }

    return (
        <div className="report-interviewee-population">
            <Grid
                api={getIntervieweePopulations}
                dataColumns={intervieweePopulationColumns}
                pageSize={30}
                actions={{enable: false}}
                filtering={{enable: false}}
                rowIndexx={{enable: false}}
                isOnLoad={true}
            />
        </div>)
}
export default ReportIntervieweePopulation;