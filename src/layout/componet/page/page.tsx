import React, { memo, useContext } from "react";
import { Switch } from "react-router-dom";

import RouteData from "@src/route/route";

import { LayoutContext } from "@src/context/context";

import style from "./page.module.less";

const Page: React.FC = memo(() => {
    const {
        state: { showNav, showAbout },
        setShowAbout,
        setShowNav,
    } = useContext(LayoutContext);

    const onClickMask = () => {
        setShowAbout(false);
        setShowNav(false);
    };

    return (
        <div>
            <div
                className={`${style.contain} ${showAbout ? style.swipe_left : ""} ${
                    showNav ? style.swipe_right : ""
                }`}
            >
                134813764826666666666666666666666666666666666666666666666666666
            </div>

            <div
                onClick={onClickMask}
                className={`${style.mask} ${showNav || showAbout ? style.mask_show : ""}`}
            ></div>
        </div>
    );
});

export default Page;
