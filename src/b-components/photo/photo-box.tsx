import React, { memo, useEffect, useState } from "react";
import Img from "@src/componets/img";

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
    /**
     * 延时时间单位上滑
     * 单位 number * 100ms
     */
    delayUp?: number;
};

const PhotoBox = memo<PhotoBoxProps>(props => {
    const { title, cover, date, describe, delayUp = 0 } = props;
    const [up, setUp] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setUp(true);
        }, (delayUp + 1) * 50);
    }, [delayUp]);

    return (
        <div className={`${Style.CT} ${up ? Style.uped : ""}`}>
            <div className={Style.img_view}>
                <Img src={cover} className={Style.img} />
            </div>
            <div className={Style.content_view}>
                <h2 className="text_2_line_elips">{title}</h2>
                <p className="text_3_line_elips">{describe}</p>
            </div>
            <div className={Style.mask_content}>
                <div className={Style.mask_item}>
                    <div className={Style.title_wrap}>
                        <h2 className="text_2_line_elips">{title}</h2>
                    </div>
                    <div className={Style.date_wrap}>
                        <span>{date}</span>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default PhotoBox;
