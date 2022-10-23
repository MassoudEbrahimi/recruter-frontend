// import {Outlet} from "react-router";
import "./jobsContent.scss"
import {useMemo, useState} from "react";
import {MyHelmet} from "../../components/helmet/helmet";
import {useLocation} from "react-router-dom";
import JobsInformation from "./jobInformation/JobsInformation";
import JobDetails from "./jobDetails/jobDetails";
import GeneratorFormItems from "../../components/Generators/form";

const FORMS = [
    {id: 0,value:"", field: "title", type: "text", required: false, disable: false, label: "عنوان شغلی"},
    {id: 1,value:"", field: "fromSalary", type: "number", required: false, disable: false, label: "حقوق از"},
    {id: 2,value:"", field: "toSalary", type: "number", required: false, disable: false, label: "حقوق تا"},
    {
        id: 3,value:"", field: "time", type: "select", items: [
            {id: 1, name: "تمام وقت"},
            {id: 2, name: "پاره وقت"}
        ], mapping: {value: "id", text: 'name'}, required: false, disable: false, label: "نوع شغل"
    },
    {id: 4,value:"", field: "city", type: "text", required: false, disable: false, label: "استان"},
    {
        id: 5,value:"", field: "genre", type: "select", required: false, disable: false, label: "جنسیت",
        items: [
            {id: 1, name: "آقا"},
            {id: 2, name: "پاره وقت"}],
        mapping: {value:"id" , text:"name"}
    },
]

const JobsContent = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [formItems, setFormItems] = useState(FORMS);
    const location = useLocation();
    const jobId = new URLSearchParams(location.search).get("job") || null;
    const handleToggle = () => {
        setIsOpen(prev => !prev)
    }
    const resetMenu = ()=>{
        setIsOpen(false);
    }
    const handleChange = (field, item, e) => {
        setFormItems(prev => prev.map(o => o.field === field ? {...o, value: e} : {...o}))
    }
    const handleSave = () => {
        //Todo Send to db request for filter list job
    }
    const handleClear = () => {
        setFormItems(prev => prev.map(o => ({...o, value: ""})));
    }
    const renderJobFilter = useMemo(() => () => {
        return (
            <div className="w-full h-full overflow-x-hidden overflow-y-auto">
                <section className="p-8">
                    <GeneratorFormItems item={formItems} changeHandler={handleChange}/>
                </section>
                <section className="flex justify-center">
                    <button className="ml-2" onClick={handleSave}><i className="fa fa-save"/>&nbsp;ارسال</button>
                    <button className="ml-2" onClick={handleClear}><i className="fa fa-remove"/>&nbsp;حذف</button>
                </section>
            </div>
        )
    }, [formItems]);
    return (
        <>
            <MyHelmet text="موقعیت های شغلی"/>
            <div className={`jobs-content-container ${isOpen && "active"}`}>
                {!jobId && <div className="jobs-sidebar">
                    <div className="sidebar-inner">
                        {renderJobFilter()}
                        <button onClick={handleToggle} className="icon-menu"><i
                            className="fa fa-cog fa-spin fa-2x fa-fw"/></button>
                    </div>
                </div>}
                <div className="jobs-container">
                    <div className="jobs-inner">
                        {jobId ?
                            <JobDetails/> : <JobsInformation reset={resetMenu}/>
                        }
                        {/*<Routes>*/}
                        {/*    <Route index element={<JobDetails/>}/>*/}
                        {/*    <Route path=":id" element={<JobsInformation/>}/>*/}
                        {/*</Routes>*/}
                    </div>
                </div>
                {/*<Outlet/>*/}
            </div>
        </>
    )
}
export default JobsContent;
