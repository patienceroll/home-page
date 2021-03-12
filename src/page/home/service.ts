import Fetch from "@src/fetch/fetch";
import * as Data from "./data";

/** 获取首页列表 */
const GetHomeList = () => {
    return Fetch.get<Data.ProjectItem[]>("/api/v1/home");
};

export default {
    GetHomeList,
};
