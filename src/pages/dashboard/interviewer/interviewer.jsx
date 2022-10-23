import {useEffect, useState} from "react";
import Loading from "../../../components/loading/loading";
import "./interviewer.scss";

const SUMMARY = [
    {id: 0, icon: "", title: "تعداد مصاحبه در انتظار", value: 50, color: "var(--primary-color)", unit: "",textColor:"#fff"},
    {id: 1, icon: "", title: "تعداد مصاحبه در ماه جاری", value: 10, color: "var(--primary-color)", unit: "",textColor:"#fff"},
    {id: 2, icon: "", title: "نفرات مصاحبه شونده روز", value: 12, color: "var(--info-color)", unit: "",textColor:"#fff"},
    {id: 3, icon: "", title: "مصحابه های انجام شده روز", value: 5, color: "var(--success-color)", unit: "",textColor:"#fff"},
    {id: 4, icon: "", title: "مصاحبه باقی مانده", value: 7, color: "var(--warning-color)", unit: "",textColor:"#fff"},
]

const Interviewer = () => {
    const [ summaryList , setSummaryList] = useState(null);

    useEffect(() => {
        setTimeout(()=>{
            setSummaryList(SUMMARY)
        },2000)
        return () => {

        };
    }, []);

    const renderTask =(o ,i)=> <div key={i} className="task" style={{backgroundColor : o.color , color:o.textColor}}>
        <p>{o.title}</p>
        <p>{o.value}&nbsp;&nbsp;</p>
    </div>

    if(summaryList === null) return <Loading/>
    return (<div className="interviewer-panel-wrapper">
        <div className="interviewer-container">
            {summaryList.map((o,i)=> renderTask(o , i))}
        </div>
    </div>)
}
export default Interviewer;