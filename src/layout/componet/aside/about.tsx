import React, { useContext } from "react";

import LayoutContext from "@src/layout/context/context";

import style from "./about.module.less";

const About: React.FC = () => {
    const {
        state: { showAside },
    } = useContext(LayoutContext);
    return <div className={`${style.contain} ${showAside ? "" : style.hide}`}>关于</div>;
};

export default About;
