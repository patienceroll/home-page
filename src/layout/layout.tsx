import React, { FC, useEffect, useState } from "react";
import { HashRouter, useLocation } from "react-router-dom";

import LayoutContext from "@src/layout/context/context";

import Header from "@src/layout/componet/header/header";
import Nav from "@src/layout/componet/nav/nav";
import Section from "@src/layout/componet/section/section";
import Aside from "@src/layout/componet/aside/aside";

const Layout: FC = () => {
    const [showNav, setShowNav] = useState(false);
    const [showAside, setShowAside] = useState(false);

    useEffect(() => {
        if (showNav) setShowAside(false);
    }, [showNav]);

    useEffect(()=>{
        if(showAside) setShowNav(false);
    },[showAside])

    return (
        <HashRouter>
            <LayoutContext.Provider
                value={{ state: { showAside, showNav }, setShowNav, setShowAside }}
            >
                <Header />
                <Nav />
                <Section />
                <Aside />
                <footer></footer>
            </LayoutContext.Provider>
        </HashRouter>
    );
};

export default Layout;
