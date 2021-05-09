import { GetResponse, buildUrl } from '@src/fetch/fetch';
import type FetchData from '@src/fetch/data';
import * as Data from './data';

/** 获取首页列表 */
export const GetHomeList = (params: FetchData.BaseListParam) => {
  return GetResponse<FetchData.listType<Data.ProjectItem>>(buildUrl('home'), params);
};

