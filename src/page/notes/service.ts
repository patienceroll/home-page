import { GetResponse, buildUrl } from '@src/fetch/fetch';
import type { ListParamBase, List } from '@src/fetch/fetch';

import type Data from './data';

/** 获取相册列表 */
export const GetPhotoList = (params: ListParamBase) => {
  return GetResponse<List<Data.NoteListItem>>(buildUrl(`notes`), params);
};

/** 获取相册详情 */
export const GetPhoto = (params: { id: number | string }) => {
  return GetResponse<Data.NoteDetail>(buildUrl(`notes/${params.id}`));
};
