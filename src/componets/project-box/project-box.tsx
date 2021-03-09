import React, { memo } from "react";

interface ProjectBoxProps {
    title: string;
    subTitle?: string;
    /** 跳转的url,如果不传入则不做跳转 */
    url?: string;
}

const ProjectBox = memo<ProjectBoxProps>(props => {
    const { title, subTitle, url } = props;

    const onClick = () => {
        window.open(url);
    };

    return (
        <div onClick={onClick}>
            <div>{title}</div>
            <div>{subTitle}</div>
        </div>
    );
});

export default ProjectBox;
