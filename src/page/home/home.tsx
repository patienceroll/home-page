import React, { memo, useCallback, useEffect, useState } from "react";

import Loading from "@src/componets-canvas/loading/loading";
import ProjectBox from "@src/componets/project-box/project-box";

import * as Data from "./data";
import MockData from "./mock-data";

import Style from "./home.module.less";

const store = {
    [Symbol.iterator]: function* () {
        let i = 0;
        while (i < MockData.length) {
            yield {
                id: i,
                ...MockData[i],
            };
            i++;
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
