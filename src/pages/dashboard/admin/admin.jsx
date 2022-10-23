import {Outlet, Route, Routes, useLocation} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import Loading from "../../../components/loading/loading";
import "./admin.scss"

const SUMMARY = [
    {id: 0, icon: "", title: "تعداد کل افراد مصاحبه شده", value: 150, color: "var(--primary-color)", unit: "",textColor:"#fff"},
    {id: 1, icon: "", title: "تعداد مصاحبه انجام شده در ماه", value: 15, color: "var(--success-color)", unit: "",textColor:"#fff"},
    {id: 2, icon: "", title: "مصاحبه جاری ماه", value: 25, color: "var(--info-color)", unit: "",textColor:"#fff"},
    {id: 3, icon: "", title: "افراد پذیرفته شده", value: 30, color: "var(--success-color)", unit: "",textColor:"#fff"},
    {id: 4, icon: "", title: "افراد در انتظار تاییدیه فنی", value: 19, color: "var(--warning-color)", unit: "",textColor:"#fff"},
    {id: 5, icon: "", title: "افراد در انتظار تاییدیه نهایی", value: 18, color: "var(--warning-color)", unit: "",textColor:"#fff"},
    {id: 6, icon: "", title: "افراد رد شده مصاحبه فنی", value: 2, color: "var(--error-color)", unit: "",textColor:"#fff"},
    {id: 7, icon: "", title: "افراد رد شده مصاحبه مصاحبه نهایی", value: 15, color: "var(--error-color)", unit: "",textColor:"#fff"},
]

const AdminPanel = () => {
    const [summaryList, setSummaryList] = useState(null)

    const location = useLocation();

    useEffect(() => {
        setTimeout(()=>{
            setSummaryList([...SUMMARY])
        },2000)
        return () => {

        };
    }, []);

    const renderTask =(o ,i)=> <div key={i} className="task" style={{backgroundColor : o.color , color:o.textColor}}>
        <p>{o.title}</p>
        <p>{o.value}&nbsp;&nbsp;</p>
    </div>

    if(summaryList === null) return  <Loading/>
    return (
        <div className="admin-panel-wrapper">
            <div className="admin-panel-container">
                {summaryList.map((o,i)=> renderTask(o , i))}
            </div>
        </div>
    )
}
export default AdminPanel;