import React, { memo, useContext } from "react";

import LayoutContext from "@src/layout/context/context";

import style from "./aside.module.less";

const Aside = memo(() => {
    const {
        state: { showAside },
    } = useContext(LayoutContext);
    return <aside className={`${style.contain} ${showAside ? "" : style.hide}`}>aside</aside>;
});

export default Aside;
