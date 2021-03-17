import Fetch from "@src/fetch/fetch";
import * as Data from "./data";

const { get, buildUrl } = Fetch;

/** 获取首页列表 */
const GetHomeList = () => {
    return get<Data.ProjectItem[]>(buildUrl("home"));
};

export default {
    GetHomeList,
};
