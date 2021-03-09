import React, { memo, useCallback, useEffect, useState } from "react";

import Loading from "@src/componets-canvas/loading/loading";
import ProjectBox from "@src/componets/project-box/project-box";

import * as Data from "./data";

const Home: React.FC = memo(() => {
    const [list, setList] = useState<Data.ProjectItem[]>();

    const getList = useCallback(() => {
        setList(undefined);
        new Promise(resolve => {
            setTimeout(() => {
                resolve(undefined);
            }, 1000);
        }).then(() => {
            setList([
                {
                    title: "气泡上升",
                    subtitle: "canvas",
                    url: "http://gsea.top/canvas/study/pop-up",
                },
            ]);
        });
    }, []);

    useEffect(getList, [getList]);

    return <div>{list ? list.map(i => <ProjectBox key={i.title} {...i} />) : <Loading />}</div>;
});

export default Home;
