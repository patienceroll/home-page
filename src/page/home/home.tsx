import React, { memo, useCallback, useEffect, useState } from "react";

import Loading from "@src/componets-canvas/loading/loading";
import ProjectBox from "@src/componets/project-box/project-box";

import * as Data from "./data";
import Request from "./service";

import Style from "./home.module.less";

const Home: React.FC = memo(() => {
    const [list, setList] = useState<Data.ProjectItem[]>();

    const getList = useCallback(() => {
        setList(undefined);
        Request.GetHomeList({ page: 1, perPage: 8 }).then(res => {
            setList(res.data.list);
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
