import Grid from "../../../../components/Grid/Gird";
import "./userManagement.scss"
import {useState} from "react";
import Modal from "../../../../components/Modal/Modal";
import usersColumns from "../../../../constants/columns/user-management.json";
import GeneratorFormItems from "../../../../components/Generators/form";

const FORMS = [
    {id: 0, field: "username", value: "", type: "text", required: false, disable: false, label: "نام کاربری"},
    {id: 1, field: "password", value: "", type: "password", required: false, disable: false, label: "رمز عبور"},
    {id: 2, field: "melliCode", value: "", type: "text", required: false, disable: false, label: "کد ملی"},
    {id: 3, field: "phone", value: "", type: "text", required: false, disable: false, label: "تلفن همراه"},
    {id: 4, field: "tel", value: "", type: "text", required: false, disable: false, label: "تلفن ثابت"},
]
const backdrop = {enable: true};
const wrapper = {style: {width: 600, height: 400, marginTop: 4}};
const content = {style: {height: 300}};

const UserManagement = () => {
    const [modal, setModal] = useState(false)
    const [formItems, setFormItems] = useState(FORMS)
    const [reloadGrid, setReloadGrid] = useState(false);
    const [row, setRow] = useState(null);
    const getUsers = async () => {
        return {
            totalCount: 0,
            items: []
        }
    }
    const reload = () => {
        setReloadGrid(false);
    }
    const editUser = row => {
        setRow(row);
        setFormItems(prev => {
            Object.entries(row).forEach(([key, value]) => {
                prev.forEach(o => {
                    if (o.field === key) {
                        o.value = value
                    }
                })
            })
        })
        setModal(true);

    };
    const handleChange = (field , item , e)=>{
        setFormItems(prev=> prev.map(o=> o.field === field ? {...o,value : e} : o))
    }
    const clearForm = () => {
        setFormItems(prev => prev.map(o => ({...o, value: ""})));
    }
    const removeUser = () => {
    };
    const showModal = () => {
        setModal(true)
    }
    const closeModal = () => {
        setModal(false)
        clearForm()
    }
    const saveModal = () => {
        clearForm()
    }
    return (
        <div className="user-management-container">
            {modal && <Modal
                backdrop={backdrop}
                wrapper={wrapper}
                content={content}
                header={{
                    title: "افزودن مصاحبه شونده",
                    items: [{icon: "mdi mdi-close", eventHandler: closeModal}]
                }}
                footer={{
                    style: {height: 50}, items: [
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
                            eventHandler: closeModal
                        }]
                }}
            >
                <div className="modal-form-containers">
                    <GeneratorFormItems item={formItems} changeHandler={handleChange}/>
                </div>
            </Modal>}
            <div className="create-user">
                <button onClick={showModal}><i className="mdi mdi-plus"/>افزودن</button>
            </div>
            <div className="bottom-grid">
                <Grid
                    api={getUsers}
                    dataColumns={usersColumns}
                    pageSize={30}
                    actions={{
                        enable: true,
                        items: [{id: 0, icon: "mdi mdi-pencil", eventHandler: editUser},
                            {id: 1, icon: "mdi mdi-remove", eventHandler: removeUser}]
                    }}
                    filtering={{enable: false}}
                    rowIndexx={{enable: false}}
                    isOnLoad={true}
                    reloaded={{state: reloadGrid, event: reload}}
                />
            </div>
        </div>
    )
}
export default UserManagement;