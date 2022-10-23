import "./login.scss";
import logo from "../../assets/login-img/hafez.jpg"
import mainLogo from "../../assets/login-img/Hafez-main.jpg"
import GeneratorFormItems from "../../components/Generators/form";
import {useMemo, useState} from "react";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {handleSidePanel, userRole} from "../../store/reducer";
import {AdminPanel, IntervieweePanel, InterviewerPanel} from "../dashboard/menu";
import {FormManager, ToastNotification} from "../../helpers";

const FORMS = [
    {id: 0, field: "username", value: "", type: "text", required: false, disable: false, label: "نام کاربری"},
    {id: 1, field: "password", value: "", type: "password", required: false, disable: false, label: "کلمه عبور"},
]
const TITLE = "ورود به سامانه گروه نرم افزاری حافظ";
const ADMIN = "admin";
const INTERVIEWER = "interviewer";
const INTERVIEWEE = "interviewee";
const Login = () => {
    const [formItems, setFormItems] = useState([...FORMS])
    const selector = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const valid = formItems.every(o => o.value.trim() !== "");
        if (!valid) {
            setFormItems(prev => prev.map(o => o.value.trim() === "" ? {...o, required: true} : o));
        } else {
            const res = FormManager.ConvertValuesToObject(formItems);
            const {username, password} = res
            //Todo send to backend and get Role , userType , token , ...
            // Use AuthContext for manage global auth store
            let route = "/signIn";
            let role = null;
            let panel = null;
            switch (username) {
                case ADMIN:
                    route += "/admin"
                    role = ADMIN;
                    panel = AdminPanel
                    break;
                case INTERVIEWEE:
                    route += "/interviewee"
                    role = INTERVIEWEE;
                    panel = IntervieweePanel
                    break;
                case INTERVIEWER:
                    route += "/interviewer"
                    role = INTERVIEWER;
                    panel = InterviewerPanel
                    break;
                default:
                    role = null;
                    break;
            }
            if (role === null) {
                ToastNotification("A", "error", "نام کاربری یا کلمه عبور اشتباه است");
                return null;
            }
            dispatch(userRole(role))
            dispatch(handleSidePanel(panel))
            navigate(route, {replace: true})
        }
    }
    const handleChange = (field, item, e) => {
        setFormItems(prev => prev.map(o => o.field === field ? ({...o, value: e}) : o))
    }
    const handleGoBack = () => {
        navigate("/", {replace: true});
    }


    const renderImg = useMemo(() => <div className="login-img">
        <img src={logo} alt="login-image"/>
    </div>, []);

    const renderButton = <div>
        <button type={"submit"} ><i className="fa fa-sign-in" aria-hidden="true"/>&nbsp;ورود</button>
        <button onClick={handleGoBack}><i className="fa fa-sign-out" aria-hidden="true"/>&nbsp;بازگشت</button>
    </div>;

    const renderForms = useMemo(() => <div className="login-form">
        <h3>{TITLE}</h3>
        <form onSubmit={handleLogin}>
            <div className="form-container">

                <GeneratorFormItems item={formItems} changeHandler={handleChange}/>
            </div>
            {renderButton}
        </form>
    </div>, [formItems])

    return (
        <div className="login-container">
            <img src={mainLogo} alt="main-logo"/>
            <div>
                {renderImg}
                {renderForms}
            </div>
        </div>
    )
}
export default Login