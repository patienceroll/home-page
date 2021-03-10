import React, { memo, useState } from "react";

import Style from "./project-box.module.less";
interface ProjectBoxProps {
    title: string;
    subTitle?: string;
    /** 跳转的url,如果不传入则不做跳转 */
    url?: string;
    image: string;
}

const ProjectBox = memo<ProjectBoxProps>(props => {
    const { title, subTitle, url, image } = props;

    const onClick = () => {
        if (url) window.open(url);
    };

    return (
        <div className={Style.CT} onClick={onClick}>
            <div className={Style.CT_inner}>
                <img src={image} />

                <div className={Style.content_mask}>
                    <div className={Style.text}>
                        <h2 className="text_2_line_elips">{title}</h2>
                        {subTitle && <div className={Style.sub_title}>{subTitle}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProjectBox;
