import React, { FC, memo, useEffect, useState } from "react";
import Loading from "@src/componets-canvas/loading/loading";

import PhotoBox from "@src/componets/photo-box/photo-box";

import Style from "./photo-ablum.module.less";

const obj = {
    [Symbol.iterator]: function* () {
        let i = 0;
        while (i <= 10) {
            yield {
                title: `$第${new Array(i).fill('撒旦爱神的箭')}张`,
                date: "2021.7.14",
                cover: "/upload/image/2021322/1616385223269-管理端.jpg",
                describe: new Array(i).fill(" 简答题的时候,直接是空数组"),
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
