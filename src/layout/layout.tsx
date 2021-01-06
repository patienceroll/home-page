import React, { useCallback, useState } from "react";

import Header from "./componet/header/header";
import Menu from "./componet/menu/menu";
import Search from "./componet/search/search";

import { ShowNavList } from "@src/context/context";

import "../global.less";
import "@src/animate/animate.less";

const Layout: React.FC = () => {
    const [showNavList, setShowNavList] = useState(false);

    const onClickMenu = useCallback(clicked => {
        console.log("点击菜单按钮", clicked);
    }, []);

    const onClickSearch = () =>
        useCallback(() => {
            console.log("点击搜索按钮");
        }, []);

    return (
        <ShowNavList.Provider value={{ setShowNavList, state: showNavList }}>
            <div>
                <Header onClickMenu={onClickMenu} onClickSearch={onClickSearch} />
                <div>
                    <Menu />

                    <Search />
                </div>
            </div>
        </ShowNavList.Provider>
    );
};

export default Layout;
