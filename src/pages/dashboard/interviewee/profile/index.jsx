import {useMemo, useState} from "react";
import {motion} from "framer-motion";
import "./proflie.scss";
import GeneratorFormItems from "../../../../components/Generators/form";

const step1 = [
    {id: 1, field: "name", type: "text", required: false, disable: false, label: "نام"},
    {id: 2, field: "lastName", type: "text", required: false, disable: false, label: "نام خانوادگی"},
    {id: 3, field: "age", type: "number", required: false, disable: false, label: "سن"},
    {id:4 , field: "birthday", type:"date-time-picker", required: false , value :"" , label :"تاریخ تولد"},
    {
        id: 5, field: "genre", type: "select", required: false, disable: false, label: "جنسیت",
        mapping: {value: "id", text: 'name'}, items: [{id: 1, name: "آقا"}, {id: 2, name: "خانم"}]
    },
    {
        id: 6, field: "genre", type: "select", required: false, disable: false, label: "جنسیت",
        mapping: {value: "id", text: 'name'}, items: [{id: 1, name: "آقا"}, {id: 2, name: "خانم"}]
    },
    {id: 7, field: "tel", type: "text", required: false, disable: false, label: "شماره ثابت"},
    {id: 8, field: "phone", type: "text", required: false, disable: false, label: "همراه"},
    {id: 9, field: "address", type: "text", required: false, disable: false, label: "آدرس"},
    {id: 10, field: "isMarriage", type: "checkbox", required: false, disable: false, label: "وضعیت تاهل"},
    {id: 11, field: "isDuty", type: "checkbox", required: false, disable: false, label: "وضعیت نظام وظیفه"},

];
const step2 = [
    {id: 1, field: "job", type: "text", required: false, disable: false, label: "عنوان شغل"},
    {id: 2, field: "experience", type: "text", required: false, disable: false, label: "سابقه کار"},
    {id: 3, field: "jobGrade", type: "text", required: false, disable: false, label: "درجه شغلی"},
    {id: 4, field: "lastCompany", type: "text", required: false, disable: false, label: "نام آخرین شرکت"},
    {id: 5, field: "isEmployee", type: "checkbox", required: false, disable: false, label: "مشغول به کار"},
];
const step3 = [
    {
        id: 1, field: "degree", type: "select", required: false, disable: false, label: "مدرک تحصیلی",
        mapping: {value: "id", text: 'name'}, items: [{id: 1, name: "آقا"}, {id: 2, name: "خانم"}]
    },
    {id: 2, field: "major", type: "text", required: false, disable: false, label: "رشته تحصیلی"},
    {id: 3, field: "educationYear", type: "text", required: false, disable: false, label: "سال پایان تحصیل"},
    {id: 4, field: "educationGrade", type: "text", required: false, disable: false, label: "معدل"},
];
const lanSkill = [{id: 1, name: "عالی"}, {id: 2, name: "خوب"}, {id: 2, name: "متوسط"}, {id: 2, name: "بد"}, {
    id: 2,
    name: "خیلی بد"
}]
const step4 = [
    {
        id: 1, field: "english", type: "select", required: false, disable: false, label: "انگلیسی",
        mapping: {value: "id", text: 'name'}, items: [...lanSkill]
    },
    {
        id: 1, field: "arabic", type: "select", required: false, disable: false, label: "عربی",
        mapping: {value: "id", text: 'name'}, items: [...lanSkill]
    },
    {
        id: 1, field: "internet", type: "select", required: false, disable: false, label: "اینترنت",
        mapping: {value: "id", text: 'name'}, items: [...lanSkill]
    },
    {
        id: 1, field: "groupWork", type: "select", required: false, disable: false, label: "تمایل به کار گروهی",
        mapping: {value: "id", text: 'name'}, items: [...lanSkill]
    },
];


const FORMS = [
    [...step1],
    [...step2],
    [...step3],
    [...step4]
]
const animateProps = {
    initial: {opacity: 0, x: 1000},
    animate: {opacity: 1, x: 0},
    transition: {ease: "easeOut", duration: 1}
}

const InterviewProfile = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [formItems, setFormItems] = useState(FORMS)
    const [tabItems,] = useState(Array.from({length: 4}, (o, i) => i))


    const handleChange = (field,) => {

    }
    const handleTab = (id) => {
        setTabIndex(id)
    }
    const handleNext = () => {
        setTabIndex(prev => prev === tabItems.length ? prev : prev + 1);
    }
    const handlePrev = () => {
        setTabIndex(prev => prev === 0 ? prev : prev - 1);
    }
    const handleSave = () => {

    }

    const renderTabBar = () => <div className="profile-tab-bar">
        <div className="connecting-line"/>
        <ul>
            {tabItems.map((el, i) => <li key={i} role="presentation"
                                         className={`${tabIndex === i ? "active" : ""}`}>
                <a data-toggle="tab" aria-controls="step1" role="tab" aria-expanded="true"
                   className="" aria-selected="false"><span onClick={handleTab.bind(this, el)}
                                                            className="round-tab">{el + 1}</span></a>
            </li>)}
        </ul>
    </div>
    const renderFooter = () => {
        return (
            <div className="footer-profile">
                {tabIndex !== 0 && <button style={{backgroundColor:"var(--warning-color)"}} onClick={handlePrev}><span >بازگشت</span></button>}
                {tabIndex === 3 ? <button style={{backgroundColor:"var(--success-color)"}} onClick={handleSave}><span >ذخیره</span></button> :
                    <button style={{backgroundColor:"var(--info-color)"}} onClick={handleNext}><span>بعدی</span></button>}
            </div>
        )
    }
    const renderFormStep = () => {
        const items = Array.from(formItems[tabIndex]);
        return (
            <motion.div key={tabIndex} {...animateProps} className="step-form-container">
                <GeneratorFormItems item={items} changeHandler={handleChange}/>
            </motion.div>
        )
    }
    return (
        <div className="interview-profile-wrapper">
            {renderTabBar()}
            <div className="form-profile">
                {renderFormStep()}
                {/*{tabIndex === 0 && renderStepOne}*/}
                {/*{tabIndex === 1 && renderStepTwo}*/}
                {/*{tabIndex === 2 && renderStepThree}*/}
                {/*{tabIndex === 3 && renderStepFour}*/}
            </div>
            {renderFooter()}
        </div>
    )
}
export default InterviewProfile;