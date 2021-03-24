import React, { FC, memo, useEffect, useState } from "react";
import Loading from "@src/componets-canvas/loading/loading";

import PhotoBox from "@src/componets/photo-box/photo-box";

import Style from "./photo-ablum.module.less";

const obj = {
    [Symbol.iterator]: function* () {
        let i = 0;
        while (i <= 20) {
            yield {
                title: `$第${i}张`,
                date: "2021.7.14",
                cover: "/upload/image/2021322/1616385223269-管理端.jpg",
                describe: "asjhdskjfdhalsd",
                id: i,
            };
            i++;
        }
    },
};

const PhotoAblum: FC = memo(() => {
    const [list, setList] = useState<any[]>();

    useEffect(() => {
        setTimeout(() => {
            setList([...obj]);
        }, 1000);
    }, []);
    return (
        <div className={Style.CT}>
            {list ? (
                <div className={Style.CT_inner}>
                    {list.map(i => (
                        <div key={i.id} className={Style.item}>
                            <PhotoBox {...i} />
                        </div>
                    ))}
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
});

export default PhotoAblum;
