import React, { useCallback, useEffect, useState } from "react";

import Header from "./componet/header/header";
import Menu from "./componet/menu/menu";
import Search from "./componet/search/search";

import { ShowNavList } from "@src/context/context";

import "../global.less";
import "@src/animate/animate.less";

const Layout: React.FC = () => {
    /** 是否显示菜单 */
    const [showNav, setShowNav] = useState(false);
    /** 是否显示关于 */
    const [showAbout, setShowAbout] = useState(false);

    useEffect(() => {
        if (showAbout) setShowNav(false);
    }, [showAbout]);

    useEffect(() => {
        if (showNav) setShowAbout(false);
    }, [showNav]);

    return (
        <ShowNavList.Provider value={{ setShowNav, setShowAbout, state: { showAbout, showNav } }}>
            <div>
                <Header />
                <div>
                    <Menu />

                    <Search />
                </div>
            </div>
        </ShowNavList.Provider>
    );
};

export default Layout;
