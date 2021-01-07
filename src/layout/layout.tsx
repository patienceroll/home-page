import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./componet/header/header";
import Menu from "./componet/menu/menu";
import Search from "./componet/search/search";

import { LayoutContext } from "@src/context/context";

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
        <LayoutContext.Provider value={{ setShowNav, setShowAbout, state: { showAbout, showNav } }}>
            <div>
                <Header />
                <div>
                    <BrowserRouter>
                        <Menu />

                        <Search />
                    </BrowserRouter>
                </div>
            </div>
        </LayoutContext.Provider>
    );
};

export default Layout;
