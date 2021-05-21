import { GetResponse, buildUrl } from '@src/fetch/fetch';
import type { ListParamBase, List } from '@src/fetch/fetch';
import * as Data from './data';

/** 获取首页列表 */
export const GetHomeList = (params: ListParamBase) => {
  return GetResponse<List<Data.ProjectItem>>(buildUrl('project'), params);
};
