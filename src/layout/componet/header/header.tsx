import React, { memo } from "react";

import style from './header.module.less';

export type HeaderProps = {
    /** 点击菜单icon */
    onClickMenu: () => void;
    /** 点击搜索icon */
    onClickSearch: () => void;
};

const Header: React.FC<HeaderProps> = ({}) => {
    return <div className={style.header_container}>
        
    </div>;
};

export default memo(Header);
