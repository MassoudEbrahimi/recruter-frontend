import moment from "jalali-moment";
import 'react-big-calendar/lib/sass/styles.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import "./interview-assignment.scss";
import {useEffect, useMemo, useReducer, useState} from "react";
import Modal from "../../../../components/Modal/Modal";

import persian from "react-date-object/calendars/persian"
import {DatePicker2, Input} from "../../../../components/Form";
import GeneratorFormItems from "../../../../components/Generators/form";


const US_Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const FA_Month = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
const US_WeekName = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const FA_WeekName = ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه"];
const DayName = {
    Sat: {en: "Saturday", fa: "شنبه"},
    Sun: {en: "Sunday", fa: "یکشنبه"},
    Mon: {en: "Monday", fa: "دوشنبه"},
    Tue: {en: "Tuesday", fa: "سه شنبه"},
    Wed: {en: "Wednesday", fa: "چهارشنبه"},
    Thu: {en: "Thursday", fa: "پنج شنبه"},
    Fri: {en: "Friday", fa: "جمعه"}
}

const getDays = () => {
}

const initCalendar = state => ({
    month: state.month,
    year: state.year,
    day: state.day,
    dayOfMonth: state.dayOfMonth,
    startDayOfMonth: state.startDayOfMonth,
    endDayOfMonth: state.endDayOfMonth,
    europeDate: state.europeDate,
    persianDate: state.persianDate
})
const initialCalendar = {
    month: "",
    year: "",
    day: "",
    dayOfMonth: "",
    startDayOfMonth: "",
    endDayOfMonth: "",
    europeDate: "",
    persianDate: "",

}
const calendarReducer = (state, action) => {
    switch (action.type) {
        case "year":
            return {...state, year: ""}
        case "month":
            return {...state, month: ""}
        case "day":
            return {...state, day: ""}
        case "dayOfMonth":
            return {...state, dayOfMonth: ""}
        case "start":
            return {...state, start: ""}
        case "end":
            return {...state, end: ""}
        case "europe":
            return {...state, europe: ""}
        case "persian":
            return {...state, persian: ""}
        case "fillCalendar" :
            return {}
        default :
            return initCalendar;
    }
}
const TabItems = [
    {id: 3, name: "ماه"},
    {id: 4, name: "هفته"},
    {id: 5, name: "روز"},
    {id: 6, name: "دستور جلسات"}
]
const formItems = [
    {
        id: 1,
        field: "interviewers",
        values: [],
        type: "multi-select",
        required: false,
        disable: false,
        label: "مصاحبه کنندگان",
        items: [
            {id: 1, name: "مصاحبه کننده 1", selected: false},
            {id: 2, name: "مصاحبه کننده 2", selected: false}
        ],
        mapping: {value: "id", text: 'name'}
    },
    {id: 2, field: "location", value: "", type: "select", required: false, disable: false,
        items: [
            {id: 1, name: "مصاحبه شونده - 1", selected: false},
            {id: 2, name: "مصاحبه شونده - 2", selected: false}
        ],
        label: "مصاحبه شونده"},
]


const InterviewAssignment = () => {
    const [dateTime, dispatchDateTime] = useReducer(calendarReducer, initialCalendar, initCalendar);
    const [tabIndex, setTabIndex] = useState(0);
    const [assignModal, setAssignModal] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const [intervieweeAssignmentForm, setInterviewerForm] = useState(formItems)

    useEffect(() => {
        setTimeout(() => {
            calendar();
        }, 1000)
        return () => {

        };
    },);


    const calendar = () => {
        let now = moment(new Date(Date.now()), 'YYYY/M/D').locale('fa');
        const persian = moment(now, "YYYY/M/D").format("jYYYY/jM/jD");
        const m = moment(persian, 'jYYYY/jM/jD')
        const dayName = DayName[now.toString().split(' ')[0]];
        const year = m.jYear()
        const month = m.jMonth() + 1
        const day = m.jDate()
        const daysInMonth = m.jDaysInMonth(year, month);
        const firstDayOfMonth = m.startOf('jMonth').format('jYYYY/jM/jD');
        const lastDayOfMonth = m.endOf('jMonth').format('jYYYY/jM/jD'); // 1367/6/31

        moment.locale('en')
        const firstDateOfMonthEn = moment.from(firstDayOfMonth, 'fa', 'YYYY/M/D')
            .format('YYYY-M-D');
        const getFirstDayMonthName = new Date(firstDateOfMonthEn).toString().split(' ')[0]
        const firstDateOfMonthEnDayName = DayName[getFirstDayMonthName]

        const endDateOfMonthEn = moment.from(lastDayOfMonth, 'fa', 'YYYY/M/D')
            .format('YYYY-M-D');
        const getLastDayMonthName = new Date(endDateOfMonthEn).toString().split(' ')[0]
        const LastDateOfMonthEnDayName = DayName[getLastDayMonthName]

        const weekInMonth = 5
        const weekDay = 7
        // const value = weekDay * weekInMonth;
        const startIndex = US_WeekName.findIndex(o => o === getFirstDayMonthName);
        const endIndex = US_WeekName.findIndex(o => o === getLastDayMonthName);

        const weekLength = US_WeekName.length  - (endIndex+1);
        const totalDays = Number(weekLength + daysInMonth + startIndex);
        debugger

        let index = 0;
        let dayNumber = 1;
        const getFakeValue = () => {
            const fake = ["Frontend 12:50:00", "Backend 11:10:00", "SQL Developer 9:00:00", "Net 10:30:00"]
            const res = [];
            const len = Math.floor(Math.random() * fake.length + 1)
            for (let i = 0; i < len; i++) {
                res.push(fake[i])
            }
            return res;
        }
        const dataSource = Array.from({length: totalDays}, (o, i) => {
            let day = US_WeekName[index];
            const values = {
                id: i.toString(16),
                status: 0,
                day: dayNumber,
                num: i,
                items: [],
            }
            index++;
            if (index === 7) {
                index = 0;
            }

            if (i < startIndex || dayNumber > daysInMonth) return values;
            if (day === "Fri" || day === "Thu") {
                dayNumber++;
                return {
                    ...values,
                    status: 2,
                }
            }
            dayNumber++;
            return {
                ...values,
                status: 1,
                items: getFakeValue()
            }
        })
        return {
            year: year,
            month: FA_Month[month - 1],
            daysOfMonth: daysInMonth,
            dataSource,
            day,
            dayName,

        }

    }
    calendar();

    const handleAssignInterview = () => {
        setAssignModal(true)
    }
    const closeAssignModal = () => {
        setAssignModal(false)
    }
    const handleShowAssignmentDetail = () => {
        setDetailModal(true)
    }
    const closeShowDetailModal = () => {
        setDetailModal(false)
    }
    const saveAssignModal = () => {
        //Todo Assign to List
        closeAssignModal();
    }
    const saveModal = () => {
        //Todo Send To backEnd
        closeShowDetailModal();
    }
    const handleChangeDetail = (field, item, val) => {
        setInterviewerForm(prev => prev.map(o => o.field === field ? o.type === "multi-select" ? {
            ...o,
            value: o.values.push(val)
        } : {...o, value: val} : o))
    }

    const renderYear = useMemo(() => <div className="year-title">
            <section className="arrow"><span><i className="fa fa-chevron-right"/></span></section>
            <section className="title">
                {calendar().month} ماه {calendar().year}
            </section>
            <section className="arrow"><span><i className="fa fa-chevron-left"/></span></section>
        </div>
        , [dateTime.year, dateTime.month]);


    const renderAssignmentModal = () => {
        const header = {
            title: "افزودن مصاحبه",
            items: [{icon: "mdi mdi-close", text: "", eventHandler: closeAssignModal}]
        };
        const wrapper = {style: {width: 500, height: 250, marginTop: 4}};
        const content = {style: {height: 150}};
        const footer = {
            items: [
                {
                    icon: "mdi mdi-content-save",
                    background: "var(--success-color)",
                    color: "#fff",
                    text: "ذخیره",
                    eventHandler: saveAssignModal
                },
                {
                    icon: "mdi mdi-close",
                    background: "var(--error-color)",
                    color: "#fff",
                    text: "بستن",
                    eventHandler: closeAssignModal
                }]
        }
        return <Modal
            header={header}
            wrapper={wrapper}
            content={content}
            footer={footer}
        >
            <div className="assignment-modal-container">
                <div className="model-item">
                    <Input
                        type="text"
                        value=""
                        label="نوع شغل"
                        change={""}
                        required={false}

                    />
                </div>
                <div className="model-item">
                    <DatePicker2
                        value={new Date()}
                        change={() => {
                        }}
                    />
                </div>
            </div>
        </Modal>
    }
    const renderDetailModal = () => {
        const header = {
            title: "تخصیص مصاحبه کنندگان به مصاحبه شوندگان",
            items: [{icon: "mdi mdi-close", text: "", eventHandler: closeShowDetailModal}]
        };
        const wrapper = {style: {width: 500, height: 250, marginTop: 4}};
        const content = {style: {height: 150}};
        const footer = {
            items: [
                {
                    icon: "mdi mdi-content-save",
                    background: "var(--success-color)",
                    color: "#fff",
                    text: "ذخیره",
                    eventHandler: saveModal
                },
                {
                    icon: "mdi mdi-close",
                    background: "var(--error-color)",
                    color: "#fff",
                    text: "بستن",
                    eventHandler: closeShowDetailModal
                }]
        }
        return <Modal
            header={header}
            wrapper={wrapper}
            content={content}
            footer={footer}
        >
            <div className="assignment-modal-container">
                <GeneratorFormItems item={intervieweeAssignmentForm} changeHandler={handleChangeDetail}/>
            </div>
        </Modal>
    }
    return (
        <>
            {assignModal && renderAssignmentModal()
            }
            {detailModal && renderDetailModal()}
            <div className="interview-assignment-container">
                {renderYear}
                <div className="calendar-type-list">
                    <button><i className="mdi mdi-calendar-today"/></button>
                    <section className="time-changer">
                        {TabItems.map((o, i) => <button key={i}>{o.name}</button>)}
                    </section>
                </div>
                <div className="week-day">
                    {FA_WeekName.map((o, i) => <section key={i}>{o}</section>)}
                </div>
                <div className="days-of-month">
                    {calendar().dataSource.map((o, i) =>
                        <section key={i} className={`day-item-${i}`}>
                            <div
                                className={`${o.status === 0 ? "disable" : o.status === 1 ? o?.items?.length === 0 ? "active none-item" : "active" : "holiday"}`}>
                                {o.status === 0 ? null : o.status === 1 ?
                                    <>
                                        <p className="day-number"
                                           onClick={handleAssignInterview.bind(this, o)}>{o.day}</p>
                                        {o.items.length !== 0 &&
                                            <div onClick={handleShowAssignmentDetail.bind(this, o)}
                                                 className="assignment-person">
                                                {o.items.map((el, i) => <p title={el} key={i}>{el}</p>)}
                                            </div>}
                                    </> :
                                    <>
                                        <p>{o.day}</p>
                                    </>}
                            </div>
                        </section>)}
                </div>
            </div>
        </>
    )
}
export default InterviewAssignment;