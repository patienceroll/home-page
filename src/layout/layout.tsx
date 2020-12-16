import React, { useCallback } from "react";

import Header from "./componet/header/header";
import Menu from "./componet/menu/menu";
import Search from "./componet/search/search";

import "../global.less";

const Layout: React.FC = () => {
    const onClickMenu = useCallback(() => {
        console.log("点击菜单按钮");
    }, []);

    const onClickSearch = () =>
        useCallback(() => {
            console.log("点击搜索按钮");
        }, []);

    return (
        <div>
            <Header onClickMenu={onClickMenu} onClickSearch={onClickSearch} />
            <div>
                <Menu />

                <Search />
            </div>
        </div>
    );
};

export default Layout;
