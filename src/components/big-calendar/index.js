import {Calendar, momentLocalizer} from "react-big-calendar";
import {useState} from "react";
import moment from "moment-jalaali";

const monthName=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const shamsiMonth=["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
const weekName= ["Su","Mo","Tu","We","Th","Fr","Sa"];
const jalaliWeekNames = ["شنبه","یکشنبه","دوشنبه","سه شنبه","چهارشنبه","پنج شنبه","جمعه"];

moment.locale('fa-IR');
const localizer = momentLocalizer(moment);

const dataas =(data)=> moment(data, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
const xx = convertToJallali(new Date());
const firstDayofMonth = new Date(xx.getFullYear(),xx.getMonth() ,1)
function convertToJallali(data){
    let d = new Date(data),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = "" + d.getFullYear();
    const dates = [year, month, day].join("-");
    const jalal = moment(dates, "YYYY-M-D HH:mm:ss").format('jYYYY/jM/jD HH:mm:ss')
    return new Date(jalal)
}


const BigCalendar = () => {
    const [eventCalendar, setEventCalendar] = useState([
        {
            start: new Date(Date.now()),
            end: new Date(Date.now()),
            title: "Some title"
        }
    ])

    const data = moment(new Date(), "")
    return (
        <Calendar
            localizer={localizer}
            // defaultDate={new Date(Date.now())}
            defaultView="month"
            events={eventCalendar}
            style={{height: "400px"}}
        />
    )
}
export default BigCalendar;