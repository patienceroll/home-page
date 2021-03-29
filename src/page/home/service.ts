import Fetch from "@src/fetch/fetch";
import type FetchData from "@src/fetch/data";
import * as Data from "./data";

const { get, buildUrl } = Fetch;

/** 获取首页列表 */
const GetHomeList = (params: FetchData.BaseListParam) => {
    return get<FetchData.listType<Data.ProjectItem>>(buildUrl("home"), params);
};

export default {
    GetHomeList,
};
