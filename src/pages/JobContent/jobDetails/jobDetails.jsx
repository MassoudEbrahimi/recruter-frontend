import "./jobDetails.scss";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Loading from "../../../components/loading/loading";
import GeneratorFormItems from "../../../components/Generators/form";
import {useQuery} from "../../../hooks/useQuery";
import {UploaderDropZone} from "../../../components/Form";

const fakeValue = {
    title: "Senior Backend Developer",
    grouping: [{title: "دسته‌بندی شغلی\n", value: "وب،‌ برنامه‌نویسی و نرم‌افزار\n"}, {
        title: "وضعیت نظام وظیفه\n",
        value: "مهم نیست"
    },
        {title: "موقعیت مکانی\n", value: "تهران ، تهران\n"},
        {title: "نوع همکاری\n", value: "تمام وقت\n"}, {
            title: "حداقل سابقه کار\n",
            value: "سه تا شش سال\n"
        }, {title: "حقوق", value: "توافقی"}],
    summary: "ما در گروه حافظ به همکارانی خلاق، خوش روحیه و با انگیزه نیاز داریم تا در کنار هم رشد کرده و به موقعیتهای بزرگتری برسیم، در این راستا به چند برنامه نویس برای تکمیل تیم Backend خود نیازمندیم.",
    publicAbility: ["داشتن روحیه و علاقه به کار تیمی", "تسلط به Scrum و متد Agile", "حل مساله، طراحی بهینه با ذهن باز و داشتن تفکر خلاقانه", "انگیزه بالا برای یادگیری، ارائه تکنولوژی های جدید و پیشرفت"],
    specialAbility: ["تجربه و سابقه همکاری با تیم اپلیکیشن (Android && iOS)",
        "مسلط به زبان برنامه نویسی C# و اصول طراحی Object-oriented", "مسلط به تکنولوژی ASP.NET Core"
        , "مسلط به مفاهیم RESTFul وWeb API ", "مسلط به بکارگیری انواع ORM (Entity framework Core، Entity framework و Dapper)"
        , "مسلط به مباحث معماری و الگوهای Micro-services ",
        "مسلط به بکارگیری SQL Server و زبان T-SQL",
        "آشنا به Net Core.",
        "آشنا به Design Pattern ها و الگوهایی مانند (Circuit Breaker, Saga)",
        "آشنا به MongoDB،Redis ،ELK ، Message Broker"
    ],
    advantage: ["Java", "Node.js", "Front-End", "PWA"],
    condition: ["شرکت واقع در محدوده ، نزدیک به ایستگاه BRT",
        "ساعات کاری شنبه تا چهارشنبه از 8 تا 16:45 (پنج شنبه ها تعطیل)"],
};
const titles = {
    grouping: "",
    summary: "شرح موقعیت شغلی",
    publicAbility: "توانایی های عمومی",
    specialAbility: "توانایی های تخصصی",
    advantage: "آشنایی و تجربه کار با موارد زیر مزیت محسوب می‌شود",
    condition: "شرایط کاری",
    salary: "حقوق"
};

const FORMS = () => {
    return [
        {id: 0, field: "name", type: "text", required: false, disable: false, label: "نام"},
        {id: 1, field: "lastName", type: "text", required: false, disable: false, label: "نام خانوادگی"},
        {id: 2, field: "age", type: "number", required: false, disable: false, label: "سن"},
        {
            id: 3, field: "genre", type: "select", required: false, disable: false, label: "جنسیت",
            mapping: {value: "id", text: 'name'}, items: [{id: 1, name: "آقا"}, {id: 2, name: "خانم"}]
        },
        {id: 4, field: "isDuty", type: "checkbox", required: false, disable: false, label: "وضعیت نظام وظیفه"},
        {id: 5, field: "address", type: "text", required: false, disable: false, label: "آدرس"},
        {id: 6, field: "email", type: "text", required: false, disable: false, label: "پست الکترونیکی"},
        {id: 7, field: "phone", type: "number", required: false, disable: false, label: "تلفن-ثابت"},
        {id: 9, field: "tel", type: "number", required: false, disable: false, label: "تلفن ثابت بهمراه کد شهری"},
        {id: 10, field: "resume", type: "", required: false, disable: false, label: "آپلود رزومه"},
    ]
}

const JobDetails = () => {
    const [data, setData] = useState(null);
    const [toggleForm, setToggleForm] = useState(false);
    const [formItems, setFormItems] = useState(FORMS())
    //Todo Add state for job detail
    const location = useLocation();
    const queryParams = useQuery(location.search);
    const handleToggleForm = () => {
        if(toggleForm){
            clearForm();
        }
        setToggleForm(prev => !prev)
    }

    useEffect(() => {
        const jobId = queryParams.get("job");
        //Todo Add Request for get job with jobId.
        //request to backend with params.id => jobId
        //Todo remove after connect to backend
        setData(fakeValue)
        return () => {
        }
    }, [])
    function clearForm(){
        setFormItems(prev=> prev.map(o=>({...o , value : ""})));
    }
    const handleChangeForm = (filed, item, e) => {
        setFormItems(prev => prev.map(o => o.field === filed ? {...o, value: e} : {...o}))
    }
    const handleSave = () => {
        //Todo Send To backend
    }
    if (data === null) {
        return <Loading/>
    }
    const renderParagraph = text => <p>{text}</p>
    const renderList = list => <ul className="">
        {list.map((o, index) => <li key={index}>{o}</li>)}
    </ul>

    const {title: headerTitle, grouping, ...list} = data;
    return (
        <div className={`job-details-wrapper ${toggleForm ? "active" : ""}`}>
            <div className="job-detail">
                <button className="apply-job" onClick={handleToggleForm}><i className="mdi mdi-check-outline"/>  پذیرش شغل </button>
                <button className="redirect-app"><i className="mdi mdi-backburger"/></button>
                <div className="job-detail-description">
                    <h3 className="title">{headerTitle}</h3>
                    {/*<hr/>*/}
                    <div className="description">
                        <div className="grouping-job">
                            <ul>
                                {grouping.map((o, index) => <li key={index}>{Object.keys(o).map((key, index) =>
                                    <p key={index}>{o[key]}</p>)}</li>)}
                            </ul>
                        </div>
                        <div className="all-job-ability">
                            {Object.entries(list).map(([key, value], index) => <div className="job-position-description"
                                                                                    key={index}>
                                    <h4>{titles[key]}</h4>
                                    {typeof value === "string" ? renderParagraph(value) : typeof value === "object" ? renderList(value) : null}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="vertical"></div>
            {toggleForm && <div className={`job-forms-apply ${toggleForm ? "active" : ""}`}>
                <div className="forms">
                    <GeneratorFormItems
                        item={formItems}
                        changeHandler={handleChangeForm}
                    />
                </div>
                <UploaderDropZone/>
                <button onClick={handleSave}><i className="fa fa-save"/>&nbsp;ارسال</button>
            </div>}
        </div>
    )
}
export default JobDetails;