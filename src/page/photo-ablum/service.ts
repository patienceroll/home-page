import Fetch from "@src/fetch/fetch";
import type FetchData from "@src/fetch/data";

import type Data from "./data";

const { get, buildUrl } = Fetch;

/** 获取相册列表 */
export const GetPhotoList = (params: FetchData.BaseListParam) => {
    return get<FetchData.listType<Data.PhotoListItem>>(buildUrl(`photo`), params);
};

/** 获取相册详情 */
export const GetPhoto = (params: { id: number | string }) => {
    return get<Data.PhotoDetail>(buildUrl(`photo/${params.id}`));
};
