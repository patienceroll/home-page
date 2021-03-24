import React, { FC, memo } from "react";

import PhotoBox from "@src/componets/photo-box/photo-box";
import Developing from "@src/componets/developing/developing";



import Style from "./photo-ablum.module.less";

const obj = {
    [Symbol.iterator]: function* () {
        let i = 0;
        while (i <= 0) {
            yield {
                title: `$第${i}张`,
                date: "2021.7.14",
                cover: "/upload/image/2021322/1616385223269-管理端.jpg",
                describe: "asjhdskjfdhalsd",
            };
            i++;
        }
    },
};

const PhotoAblum: FC = memo(() => {
    return (
        <div className={Style.CT}>
            {/* {[...obj].map(i => (
                <div className={Style.item}>
                    <PhotoBox {...i} />
                </div>
            ))} */}
            <Developing />
        </div>
    );
});

export default PhotoAblum;
