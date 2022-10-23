import dayjs from "dayjs";
import Cookie from "js-cookie";
import axios from "axios";
import STATUS_CODE from "../constants/httpServerErrorStatusCode.json";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
axios.defaults.headers.common["content-type"] = "application/json";
axios.defaults.headers.common["Authorization"] = `Bearer  ${"token"}`;



axios.interceptors.request.use(async config => {
    const accessToken = Cookie.get("accessToken")
    const headerCommon = {
        'Authorization': "Bearer  " + accessToken,
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
    const getExpireTime = Cookie.get("expireTime");
    const getOldToken = Cookie.get("accessToken");
    if (getExpireTime && getOldToken) {
        const oldTime = dayjs(getExpireTime);
        const timeNow = dayjs();
        const different = oldTime.diff(timeNow);
        if (different < 0) {
            //Todo Refresh Token API
            const address = "Apis.RefreshToken";
            const obj = {
                accessToken:Cookie.get("accessToken"),
                refreshToken:Cookie.get("refreshToken")
            };
            await fetch(address, {
                method: "POST",
                headers: {...headerCommon},
                body: JSON.stringify(obj)
            }).then(response => response.json())
                .then(result => {
                    const values = result.value.dtos[0]
                    config.headers = {...headerCommon};
                    Cookie.set("accessToken", values.accessToken);
                    Cookie.set("expireTime", values.expiration);
                    Cookie.set("refreshToken" , values.refreshToken);
                })
        }
    }
    config.headers = {...headerCommon};
    return config
}, error => {
    Promise.reject(error)
})

function ErrorHandler(text) {
    return Promise.resolve({
        data: {
            Message: text,
            Error: true
        }
    })
}
axios.interceptors.response.use(response => response, error => {
    try {
        if (!error.response || error.response.status === 504 || error.response.status === 500 || error.response.status === 501) {
            return ErrorHandler(STATUS_CODE[500])
        } else {
            if (error.response.status === 404) {
                return ErrorHandler(STATUS_CODE[400]);
            } else {
                if (error.response.status === 403) {
                    return ErrorHandler(STATUS_CODE[403]);
                } else {
                    if (error.response.status === 401) {
                        return ErrorHandler(STATUS_CODE[401]);
                    } else {
                        if (error.response.status === 50) {
                            return ErrorHandler(error.response.data.title);
                        } else {
                            return ErrorHandler(error.response.data.message);
                        }
                    }
                }
            }
        }
    } catch (error) {

    }
})
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}