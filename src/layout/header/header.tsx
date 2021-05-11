import React, { memo, useContext } from "react";
import { useLocation } from "react-router-dom";

import PEOPLE from "@src/assets/svg/people.svg";

import LayoutContext from "@src/layout/context/context";

import Style from "./header.module.less";

const NavText: {
    [key: string]: string;
} = {
    home: "主页",
    "photo-ablum": "相册",
    "study-record": "学习记录",
    "canvas-center": "Canvas",
};

const Header = memo(() => {
    const {
        state: { showNav, showAside },
        setShowNav,
        setShowAside,
    } = useContext(LayoutContext);

    const { pathname } = useLocation();
    /** 获取 pathname 的第一级 */
    const NavTextKey = pathname.substr(1).split("/")[0];

    return (
        <header className={Style.header}>
            <div
                onClick={setShowNav.bind(null, !showNav)}
                className={`${Style.nav_icon_CT}${showNav ? ` ${Style.clicked}` : ""}`}
            >
                <div className={Style.nav_icon}>
                    {/* 导航按钮 */}
                    <ul>
                        <li />
                        <li />
                        <li />
                        <li />
                    </ul>
                </div>

                <div className={`${Style.nav_text} waggle_animate`}>
                    {NavText[NavTextKey] || "导航"}
                </div>
            </div>

            <div className={`${Style.title} text_elips`} title="逆流而上的鲑鱼">
                逆流而上的鲑鱼
            </div>

            <div className={`${Style.right_btn_CT} text_elips`}>
                <div
                    onClick={setShowAside.bind(null, !showAside)}
                    className={`${Style.right_btn} shake_animate`}
                >
                    <PEOPLE />
                    <span>关于</span>
                </div>
            </div>
        </header>
    );
});

export default Header;
