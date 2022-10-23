import {useCallback, useState} from "react";
import "./createJob.scss";
import jobsColumns from "../../../../constants/columns/create-job.json";
import Grid from "../../../../components/Grid/Gird";
import Modal from "../../../../components/Modal/Modal";
import GeneratorFormItems from "../../../../components/Generators/form";
import {CKEditor} from 'ckeditor4-react';
import parser from "html-react-parser";


const FORM = [
    {id: 0, field: "type", type: "text", required: false, disable: false, label: "دسته شغلی"},
    {
        id: 1, field: "duty", type: "select", required: false, disable: false, label: "نظام وظیفه", items: [
            {id: 1, name: "مهم است"},
            {id: 2, name: "مهم نیست"}
        ], mapping: {value: "id", text: 'name'}
    },
    {id: 2, field: "location", type: "text", required: false, disable: false, label: "موقعیت مکانی"},
    {
        id: 3, field: "jobType", type: "select", required: false, disable: false, label: "نوع همکاری", items: [
            {id: 1, name: "پاره وقت"},
            {id: 2, name: "تمام وقت"},
            {id: 3, name: "پاره وقت ، تمام وقت"}
        ], mapping: {value: "id", text: 'name'}
    },
    {id: 4, field: "experience", type: "text", required: false, disable: false, label: "حداقل سابقه کار"},
    {id: 5, field: "salary", type: "text", required: false, disable: false, label: "حقوق"},


]

const CreateJob = () => {
    const [modal, setModal] = useState(false);
    const [formItems, setFormItems] = useState([...FORM])
    const [tags, setTags] = useState(null);

    const getAllJobs = () => {
        //Todo get All jobs request to backend
        return {
            items: [],
            totalCount: 0
        }
    }
    const handleChange = (field, item, e) => {
        setFormItems(prev => prev.map(o => o.field === field ? {...o, value: e} : {...o}))
    }
    const toggleModal = () => {
        setModal(prev => !prev);
    }
    const save = () => {
    }
    const handleTextEditor = event => {
        setTags(event.editor.getData());
    }
    const clearFormValues = () => {
        setFormItems(prev => prev.map(o => ({...o, value: ""})))
    }
    const editorConfig = useCallback(() => ({
                contentsLangDirection: "rtl",
                extraPlugins: "justify,font,colorbutton",
                toolbarGroups: [
                    {name: "document", groups: ["mode", "document", "doctools"]},
                    {name: "clipboard", groups: ["clipboard", "undo"]},
                    {name: "editing", groups: ["find", "selection", "spellchecker"]},
                    {name: "forms"},
                    "/",
                    {name: "basicstyles", groups: ["basicstyles", "cleanup"]},
                    {
                        name: "paragraph",
                        groups: ["list", "indent", "blocks", "align", "bidi"] // 'align' -> 'justify' plugin
                    },
                    {name: "links"},
                    {name: "insert"},
                    "/",
                    {name: "styles"}, // 'font and fontsize' -> 'font' plugin
                    {name: "colors"}, // 'colors' -> 'colorbutton' plugin
                    {name: "tools"},
                    {name: "others"},
                    {name: "about"}
                ]
            }), [],);
    const modalConfig = useCallback(()=>({
        backdrop:{enable: false},
        header:{title: "افزودن مصاحبه شونده", items: [{icon: "mdi mdi-close", eventHandler: toggleModal}]},
        wrapper:{style: {width: 800, height: 600, marginTop: 4}},
        content:{style: {height: 500}},
        footer:{
            style: {height: 50}, items: [
                {
                    icon: "mdi mdi-content-save",
                    background: "var(--success-color)",
                    color: "#fff",
                    text: "ذخیره",
                    eventHandler: save
                },
                {
                    icon: "mdi mdi-close",
                    background: "var(--error-color)",
                    color: "#fff",
                    text: "بستن",
                    eventHandler: toggleModal
                }],
        }}),[])


    const renderModal = () => <Modal {...modalConfig()}>
        <div className="create-job-modal">
            <div className="form">
                <GeneratorFormItems item={formItems} changeHandler={handleChange}/>
            </div>
            <CKEditor
                config={{...editorConfig()}}
                onChange={handleTextEditor}
                data="<p>لطفا توضیحات رزومه خود را در این قسمت وارد کنید</p>"
            />
        </div>
    </Modal>


    const renderTemplateHtml = tags && parser(tags);
    return (
        <div className="create-job-container">
            {modal && renderModal()}
            <section className="top">
                <button onClick={toggleModal}>افزودن</button>
                {renderTemplateHtml}
            </section>
            <section className="grid">
                <Grid
                    api={getAllJobs}
                    dataColumns={jobsColumns}
                    pageSize={30}
                    actions={{enable: false}}
                    filtering={{enable: false}}
                    rowIndexx={{enable: false}}
                    isOnLoad={true}
                />
            </section>
        </div>
    )
}
export default CreateJob;