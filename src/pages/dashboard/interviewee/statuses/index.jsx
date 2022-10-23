import "./statuses.scss";
import {useEffect, useMemo, useState} from "react";
import Loading from "../../../../components/loading/loading";


const ITEMS = [
    {id: 0, status: 1, title: "تکمیل پروفایل"},
    {id: 1, status: 1, title: "مصاحبه فنی"},
    {id: 2, status: 1, title: "مصاحبه عقیدتی"},
    {id: 3, status: 2, title: "تاییدیه فنی"},
    {id: 4, status: 0, title: "در انتظار بررسی نهایی"}
]


const IntervieweeStatuses = () => {
    const [statusItem, setStatusItem] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            setStatusItem(ITEMS);
        }, 1000)
        return () => {

        };
    }, []);
    const getStyle = (status) => {
        switch (status) {
            case 0:
                return {
                    backgroundColor: "var(--primary-color)",
                    icon: "fa fa-spinner fa-spin fa-fw",
                    color : "#ffffff"
                }
            case 1:
                return {
                    backgroundColor: "var(--success-color)",
                    icon: "fa fa-check",
                    color : "#222339"
                }
            case 2:
                return {
                    backgroundColor: "var(--warning-color)",
                    icon: "fa fa-exclamation",
                    color : "#222339"
                }
            case 3:
                return {
                    backgroundColor: "var(--error-color)",
                    icon: "fa fa-exclamation-circle",
                    color : "#222339"
                }
            default:
                break;
        }
    }

    const renderTask = () => statusItem.map((el, index) => {
        const {backgroundColor, icon , color} = getStyle(el.status)
        return <section key={index}>
            <div style={{backgroundColor , color }} className="counter-index"><div><i className={icon}/></div></div>
            <div style={{backgroundColor , color}} className="title">
                <div></div>&nbsp;&nbsp;
                <div>{el.title}</div>
            </div>
        </section>
    })


    if (statusItem === null) return <Loading/>
    return (
        <div className="interviewee-status-wrapper">
            {renderTask()}
        </div>
    )
}
export default IntervieweeStatuses;