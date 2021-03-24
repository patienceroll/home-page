import React, { memo } from "react";
import Img from "@src/componets/img/img";

import Style from "./photo-box.module.less";

type PhotoBoxProps = {
    /** 标题 */
    title: string;
    /** 封面 */
    cover: string;
    /** 时间 */
    date: string;
    /** 描述 */
    describe: string;
};

const PhotoBox = memo<PhotoBoxProps>(props => {
    const { title, cover, date, describe } = props;
    return (
        <div className={Style.CT}>
            <div className={Style.img_view}>
                <Img src={cover} className={Style.img} />
            </div>
            <div className={Style.content_view}>
                <h2 className={Style.title}>{title}</h2>
            </div>
            <div className={Style.mask_content}>

            </div>
        </div>
    );
});

export default PhotoBox;
