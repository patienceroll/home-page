import React, { memo, useContext } from "react";

import HOME_SVG from "@src/assets/svg/home.svg";

import { LayoutContext } from "@src/context/context";

import style from "./header.module.less";

const Header: React.FC = () => {
    const {
        setShowAbout,
        setShowNav,
        state: { showNav },
    } = useContext(LayoutContext);

    const onClickNavIcon = () => {
        setShowNav(isShow => !isShow);
    };

    const onClickAboutContain = () => {
        setShowAbout(isShow => !isShow);
    };

    return (
        <div className={style.header_container}>
            <div
                onClick={onClickNavIcon}
                className={`${style.nav_icon_container} ${showNav ? style.clicked : ""}`}
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

            <div className={style.header_title}>Patience Drinking Dream Every Day</div>

            <div className={style.about_me_contain}>
                <div onClick={onClickAboutContain} className={`${style.about_me} shake_animate`}>
                    <img src={HOME_SVG} alt="" />
                    <span>关于</span>
                </div>
            </div>
        </div>
    );
};

export default memo(Header);
