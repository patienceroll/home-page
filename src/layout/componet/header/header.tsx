import React, { memo, useEffect, useState } from "react";

import HOME_SVG from "@src/assets/svg/home.svg";

import style from "./header.module.less";

export type HeaderProps = {
    /** 点击菜单icon */
    onClickMenu: (clicked: boolean) => void;
    /** 点击搜索icon */
    onClickSearch: () => void;
};

const Header: React.FC<HeaderProps> = ({ onClickMenu }) => {
    const [clicked, setClicked] = useState(false);

    const onClickNavIcon = () => {
        setClicked(clicked => !clicked);
    };

    useEffect(() => {
        onClickMenu(clicked);
    }, [clicked]);

    return (
        <div className={style.header_container}>
            <div
                onClick={onClickNavIcon}
                className={`${style.nav_icon_container} ${clicked ? style.clicked : ""}`}
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

            <div className={`${style.about_me} shake_animate`}>
                <img src={HOME_SVG} alt="" />
                <span>关于</span>
            </div>
        </div>
    );
};

export default memo(Header);
