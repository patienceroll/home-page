import FetchType from "./data";

const get: FetchType.Get = (path, params = {}) => {
    params._timeStamp = +new Date();
    let query = "";
    Object.keys(params).forEach(key => {
        query += `${key}=${params[key]}&`;
    });

    return fetch(`${path}?${query.substr(0, query.length - 1)}`, {
        headers: {
            "content-type": "application/json",
        },
    })
        .then(response => {
            return response.json();
        })
        .then((res: FetchType.BaseResponse<any>) => {
            if (res.code === 0) {
                return res;
            } else {
                return Promise.reject();
            }
        });
};

/** 统一封装的请求 */
const Fetch = {
    /** get请求方法 */
    get,
};

export default Fetch;
