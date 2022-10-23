import {Helmet} from "react-helmet-async";


export const MyHelmet = ({text})=>{
    return(
        <Helmet>
            <meta charSet="utf8"/>
            <title>{text}</title>
        </Helmet>
    )
}