/** 相册列表项 */
export type PhotoListItem = {
    /** 标题 */
    title: string;
    /** 日期 */
    date: string;
    /** 封面 */
    cover: string;
    /** 描述 */
    describe: string;
    id: string;
};

/** 详情 */
type PhotoDetail = PhotoListItem & {
    /** 内容 被编码过 */
    content: string;
};