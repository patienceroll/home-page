import React, { memo, useContext } from "react";

import PEOPLE from "@src/assets/svg/people.svg";

import LayoutContext from "@src/layout/context/context";

import style from "./header.module.less";

const Header = memo(() => {
    const {
        state: { showNav, showAside },
        setShowNav,
        setShowAside,
    } = useContext(LayoutContext);
    return (
        <header className={style.header}>
            <div
                onClick={setShowNav.bind(null, !showNav)}
                className={`${style.nav_icon_CT}${showNav ? ` ${style.clicked}` : ""}`}
            >
                <div className={style.nav_icon}>
                    {/* 导航按钮 */}
                    <ul>
                        <li />
                        <li />
                        <li />
                        <li />
                    </ul>
                </div>

                <div className={`${style.nav_text} waggle_animate`}>导航</div>
            </div>

            <div className={style.title}>Zzz...</div>

            <div className={style.right_btn_CT}>
                <div
                    onClick={setShowAside.bind(null, !showAside)}
                    className={`${style.right_btn} shake_animate`}
                >
                    <PEOPLE />
                    <span>关于</span>
                </div>
            </div>
        </header>
    );
});

export default Header;
