import React, { memo, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import LayoutContext from "@src/layout/context/context";

import RouteData from "@src/route/route";

import style from "./nav.module.less";

const Nav = memo(() => {
    const {
        state: { showNav },
    } = useContext(LayoutContext);

    const { pathname } = useLocation();

    return (
        <nav className={`${style.contain} ${showNav ? "" : style.hide}`}>
            {RouteData.map(item => {
                const { name, to, props = {} } = item;
                const className = `${style.link} ${pathname === to ? style.link_current : ""}`;
                if (name === undefined) return;
                return (
                    <Link key={name} className={className} to={to} {...props}>
                        <div>{name}</div>
                    </Link>
                );
            })}
        </nav>
    );
});

export default Nav;
