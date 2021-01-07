import React, { useContext } from "react";

import { LayoutContext } from "@src/context/context";

import style from "./about.module.less";

const About: React.FC = () => {
    const {
        state: { showAbout },
    } = useContext(LayoutContext);
    return <div className={`${style.contain} ${showAbout ? "" : style.hide}`}>关于</div>;
};

export default About;
