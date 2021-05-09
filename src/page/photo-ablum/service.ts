import { GetResponse, buildUrl } from '@src/fetch/fetch';
import type FetchData from '@src/fetch/data';

import type Data from './data';

/** 获取相册列表 */
export const GetPhotoList = (params: FetchData.BaseListParam) => {
  return GetResponse<FetchData.listType<Data.PhotoListItem>>(buildUrl(`photo`), params);
};

/** 获取相册详情 */
export const GetPhoto = (params: { id: number | string }) => {
  return GetResponse<Data.PhotoDetail>(buildUrl(`photo/${params.id}`));
};
