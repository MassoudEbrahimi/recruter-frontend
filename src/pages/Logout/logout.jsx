import {useEffect} from "react";
import {ConfirmForm} from "../../helpers";
import {useNavigate} from "react-router";


const Logout = ()=>{
    const navigate = useNavigate();



    useEffect(() => {
        //Todo remove token from cookies.
        navigate("/" , {replace : true});
        return () => {

        };
    }, []);

    return null
}
export default Logout