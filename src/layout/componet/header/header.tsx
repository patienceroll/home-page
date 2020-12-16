import React, { memo } from "react";

import style from "./header.module.less";

export type HeaderProps = {
    /** 点击菜单icon */
    onClickMenu: () => void;
    /** 点击搜索icon */
    onClickSearch: () => void;
};

const Header: React.FC<HeaderProps> = ({}) => {
    return (
        <div className={style.header_container}>
            <div className={style.nav_icon_container}>
                <div className={style.nav_icon}>
                    {/* 导航按钮 */}
                    <ul>
                        <li />
                        <li />
                        <li />
                        <li />
                    </ul>
                </div>

                <div className={style.nav_text}>导航</div>
            </div>
        </div>
    );
};

export default memo(Header);
