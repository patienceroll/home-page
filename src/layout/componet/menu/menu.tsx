import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { LayoutContext } from "@src/context/context";

import style from "./menu.module.less";

const Menu: React.FC = () => {
    const {
        state: { showNav },
    } = useContext(LayoutContext);

    return (
        <div className={`${style.contain} ${showNav ? "" : style.hide}`}>
            <div>相册</div>
        </div>
    );
};

export default Menu;
