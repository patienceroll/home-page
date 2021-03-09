import React, { memo } from "react";

import Style from "./project-box.module.less";
interface ProjectBoxProps {
    title: string;
    subTitle?: string;
    /** 跳转的url,如果不传入则不做跳转 */
    url?: string;
}

const ProjectBox = memo<ProjectBoxProps>(props => {
    const { title, subTitle, url } = props;

    const onClick = () => {
        if (url) window.open(url);
    };

    return (
        <div className={Style.CT} onClick={onClick}>
            <div className={Style.content_mask}>
                <div>{title}</div>
                <div>{subTitle}</div>
            </div>
        </div>
    );
});

export default ProjectBox;
