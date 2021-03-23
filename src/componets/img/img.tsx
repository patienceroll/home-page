import React, { FC, useState } from "react";

import Style from "./img.module.less";

type ImgProps = React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
>;

const Img: FC<ImgProps> = props => {
    const { onLoad, className } = props;
    const [show, setShow] = useState(false);
    const newOnLoad: React.ReactEventHandler<HTMLImageElement> = e => {
        if (onLoad) onLoad(e);
        setShow(true);
    };

    return (
        <img
            {...props}
            className={`${Style.img} ${(show && Style.img_show) || ""} ${className || ""}`}
            onLoad={newOnLoad}
        />
    );
};

export default Img;
