import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { LayoutContext } from "@src/context/context";

import RouteData from "@src/route/route";

import style from "./menu.module.less";

const Menu: React.FC = () => {
    const {
        state: { showNav },
    } = useContext(LayoutContext);

    const { pathname } = useLocation();

    return (
        <div className={`${style.contain} ${showNav ? "" : style.hide}`}>
            {RouteData.map(item => (
                <Link
                    key={item.name}
                    className={`${style.link} ${pathname === item.to ? style.link_current : ""}`}
                    {...(item.props || {})}
                    to={item.to}
                >
                    <div>{item.name}</div>
                </Link>
            ))}
        </div>
    );
};

export default Menu;
