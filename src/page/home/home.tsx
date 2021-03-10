import React, { memo, useCallback, useEffect, useState } from "react";

import Loading from "@src/componets-canvas/loading/loading";
import ProjectBox from "@src/componets/project-box/project-box";

import * as Data from "./data";

import Style from "./home.module.less";

const store = {
    [Symbol.iterator]: function* () {
        let i = 1;
        while (i <= 20) {
            i++;
            yield {
                id:i,
                title: "气泡上升",
                subtitle: "canvas",
                url: "http://gsea.top/canvas/study/pop-up",
                image: "https://img1.baidu.com/it/u=3832422639,2986198850&fm=26&fmt=auto&gp=0.jpg",
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
