import React, { memo, useCallback, useEffect, useState } from "react";

import Loading from "@src/componets-canvas/loading/loading";
import ProjectBox from "@src/componets/project-box/project-box";

import * as Data from "./data";

import Style from "./home.module.less";

const store = {
    [Symbol.iterator]: function* () {
        let i = 1;
        while (i <= 1) {
            i++;
            yield {
                id: i,
                title: "Canvas绘制气泡上升",
                subTitle: "canvas",
                url: "http://gsea.top/canvas/study/pop-up",
                image: "http://gsea.top/image/20210310/popup-screen-shot.png",
            };
        }
    },
};

const Home: React.FC = memo(() => {
    const [list, setList] = useState<Data.ProjectItem[]>();

    const getList = useCallback(() => {
        setList(undefined);
        new Promise(resolve => {
            setTimeout(() => {
                resolve(undefined);
            }, 1000);
        }).then(() => {
            setList([...store]);
        });
    }, []);

    useEffect(getList, [getList]);

    return (
        <div className={Style.CT}>
            {list ? (
                list.map(i => (
                    <div key={i.id} className={Style.pro_item}>
                        <ProjectBox {...i} />
                    </div>
                ))
            ) : (
                <div className={Style.loading}>
                    <Loading />
                </div>
            )}
        </div>
    );
});

export default Home;
