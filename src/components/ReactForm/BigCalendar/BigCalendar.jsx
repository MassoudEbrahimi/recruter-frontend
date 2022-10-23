import {useEffect, useState} from "react";
import {metaYear, calendarObject, cssProperty} from "./calendarObject";
import "./BigCalendar.scss";

const US_Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const FA_Month = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
const US_WeekName = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const FA_WeekName = ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه"];


const BigCalendar = () => {
    const [monthCounter, setMonthCounter] = useState(1);
    //#region Constant
    const today = Date.now();
    const todayFa = {
        "day": getDateFormat(today, {
            "day": "2-digit"
        }),
        "month": getDateFormat(today, {
            "month": "numeric"
        }),
        "monthTitle": getDateFormat(today, {
            "month": "long"
        }),
        "year": getDateFormat(today, {
            "year": "numeric"
        }),
        "dayWeek": getDateFormat(today, {
            "weekday": "long"
        }),
    }
    useEffect(() => {

        const parentEventsDOM = document.getElementsByClassName('calendar-left')[0];

        for (const month of calendarObject) {
            const dateList = [];
            let liCounter = 0;
            let UlCounter = 1;
            let oneStarted = false;

            for (const day of month) {
                const currentMonth = todayFa.monthTitle;
                if ((!dateList[0] && 9 < day[0]) || (dateList.indexOf(day[0]) !== -1))
                    oneStarted = false;
                else {
                    oneStarted = true;
                    dateList.push(day[0]);
                }


                for (const dayElement of day[4]) {
                    const indexBracket = dayElement.indexOf("[");
                    const eventdate = (0 <= indexBracket) ? dayElement.substring(indexBracket) : "";
                    const eventTitle = dayElement.replace(eventdate, "");
                    const startedDate = dateList[dateList.length - 1];

                    // if (oneStarted) {
                    //     eventDOM.innerHTML += generateTemplateHTML('events', {
                    //         day: convertDigits("fa", `${startedDate} ${currentMonth}`),
                    //         eventTitle: eventTitle,
                    //         date: eventdate,
                    //     });
                    // }
                }


                liCounter++;

            }
            setMonthCounter(prev => prev++);
        }
        activeMonthElement('dynamic-element', `dynamic-element-${todayFa.month}`, 'active-element');
        activeMonthElement('month-letter', `month-letter-${todayFa.month}`, 'active-season-cr');
        activeMonthElement('day-element', `date-${todayFa.month}-${parseInt(todayFa.day)}`, 'active-season');

        return () => {

        };
    }, []);


    const handleChangeMonth = (month, index, e) => {
        const thisElement = e.target;
        if (thisElement.classList.contains("active-season-cr")) return;
        const monthDataNumber = thisElement.getAttribute("data-num");
        activeMonthElement('dynamic-element', `dynamic-element-${monthDataNumber}`, 'active-element');
        activeMonthElement('month-letter', `month-letter-${monthDataNumber}`, 'active-season-cr');
    }

    //endregion
    function getSeasonByMonNum(numMonth) {
        const monthSeason = [
            "spring",
            "summer",
            "fall",
            "winter",
        ];
        numMonth = 6;
        let season = "";

        if (numMonth <= 3) {
            season = monthSeason[0];
        } else if (3 < numMonth && numMonth <= 6) {
            season = monthSeason[1];
        } else if (6 < numMonth && numMonth <= 9) {
            season = monthSeason[2];
        } else if (9 < numMonth && numMonth <= 12) {
            season = monthSeason[3];
        }
        return season;
    }

    function getCssBySeason(season) {
        const cssObjects = cssProperty[season];
        let cssString = "";
        for (const cssObject of cssObjects) {
            let template = `${cssObject['selector']}{\n`;
            for (const property of cssObject['property']) {
                template += `${property}\n`;
            }
            template += "}\n\n"
            cssString += template;
        }

        return cssString;
    }

    function getDateFormat(uDate, option) {
        let date = new Intl.DateTimeFormat('fa-IR', option).format(uDate);
        date = convertDigits("en", date);
        return date;
    }

    function activeMonthElement(allCls, whichCls, activeCls) {
        const dynamicElement = document.getElementsByClassName(allCls);
        for (const element of dynamicElement) {
            if (element.classList.contains(activeCls))
                element.classList.remove(activeCls);
            else if (element.classList.contains(whichCls))
                element.classList.add(activeCls);
        }
    }

    function generateTemplateHTML(type, data) {
        let htmlTemplate = '';
        if (type === "date")
            htmlTemplate = ``;
        else if (type === "metaYear") {
            htmlTemplate = `<div class="year yr-${data.index} dynamic-element dynamic-element-${monthCounter}">${data.year}</div> <div class="year-meta myr-${data.index} dynamic-element dynamic-element-${monthCounter}">${data.arabic}<br>${data.miladi}</div>`;
        } else if (type === "events") {
            htmlTemplate = `<li><span class="event-day">${data.day} </span><div class="event-title">${data.eventTitle}</div><span class="event-date-type"> ${data.date}</span></li>`;
        }
        return htmlTemplate;
    }

    function convertDigits(to, day) {
        // let str = this;
        let result = day;
        const toCvn = getBaseConversionNumber(to)[to];
        const allDigits = getBaseConversionNumber("all");

        delete allDigits[to];

        const Objkeys = Object.keys(allDigits);
        for (let i = 0; i < Objkeys.length; i++) {
            const currentKey = Objkeys[i];
            const fromCvn = allDigits[currentKey];
            result = cvnFromTo(fromCvn, toCvn, day)
        }
        return result;
    }

    function cvnFromTo(fromDigits, toDigits, str) {
        var str = str === undefined ? this : str;
        for (var i = 0; i < toDigits.length; i++) {
            const currentFromDigit = fromDigits[i];
            const currentToDigit = toDigits[i];
            const regex = new RegExp(currentFromDigit, 'g');
            str = str.replace(regex, currentToDigit);
        }
        return str;
    }

    function getBaseConversionNumber(label) {
        const faDigits = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
        const enDigits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        const arDigits = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'];

        let whichDigit = {};

        switch (label) {
            case 'fa':
                whichDigit[label] = faDigits;
                break;
            case 'en':
                whichDigit[label] = enDigits;
                break;
            case 'ar':
                whichDigit[label] = arDigits;
                break;
            case 'all':
                whichDigit = {
                    "fa": faDigits,
                    "en": enDigits,
                    "ar": arDigits
                };
                break;
            default:
                whichDigit = [];
        }

        return whichDigit;
    }

    const renderNumsDates = () => {
        const month = calendarObject[monthCounter];
        return (
            <div className="num-dates">
                <ul>
                    {month.map(day=> <li className="day-elemet">
                        <span id="jalali">{day[0]}</span>
                        <small id="miladi">{day[1]}</small>
                        <small id="ghamari">{day[2]}</small>
                    </li>)}
                </ul>
            </div>
        )
    };
    const renderYear = () => {
        let tmpMetaYear = metaYear.metaYear[monthCounter - 1];
        tmpMetaYear = tmpMetaYear.split(" | ");
        const year = {
            persian: metaYear.year,
            arabic: tmpMetaYear[1],
            miladi: tmpMetaYear[0],
        }
        return (
            <div className="year-wrapper">
                <div className="year yr-1 dynamic-element dynamic-element-1"><span>{year.persian}</span></div>
                <div className="year-meta myr-1 dynamic-element dynamic-element-1">{year.arabic}<br/>{year.miladi}
                </div>
            </div>
        )
    }
    const renderHolidaySubject = () => {
        return (
            <div className="calendar-left active-season">
                <div className="num-date">{convertDigits("fa", todayFa['day'])}</div>
                <div className="day">{convertDigits("fa", todayFa['dayWeek'])}</div>
            </div>
        )
    }

    return (<div className="big-calendar-container">
            <div className="calendar-wrapper">
                <div className="calendar-base">
                    {renderYear()}
                    <div className="months">
                        {FA_Month.map((o, i) => <span key={i} onClick={handleChangeMonth.bind(this, o, i)}
                                                      className={`month-hover month-letter month-letter-${i + 1}`}
                                                      data-num={i + 1}> {o} </span>)}
                    </div>
                    <hr className="month-line"/>
                    <div className="days">
                        <ul className="weeks">
                            {FA_WeekName.map((o, i) => <li key={i}>{o}</li>)}
                            <div className="clearfix"></div>
                        </ul>
                    </div>
                    {renderNumsDates()}
                </div>
                {renderHolidaySubject()}
            </div>
            <div className="clearfix"></div>

        </div>
    )
}
export default BigCalendar;