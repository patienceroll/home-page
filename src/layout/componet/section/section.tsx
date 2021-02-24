import React, { memo, Suspense, useContext } from "react";
import { Route } from "react-router-dom";

import LayoutContext from "@src/layout/context/context";

import RouteData from "@src/route/route";

import Style from "./section.module.less";

const Section = memo(() => {
    const {
        state: { showAside, showNav },
        setShowAside,
        setShowNav,
    } = useContext(LayoutContext);

    const onClickMask = () => {
        setShowAside(false);
        setShowNav(false);
    };

    return (
        <section className={`${Style.CT}`}>
            <div className={`${Style.CT_inner} ${showNav ? Style.t_right : ""} ${showAside ? Style.t_left : ""}`}>
                {RouteData.map(item => (
                    <Route key={item.name} {...item.RouteProps}>
                        <Suspense fallback={<div>加载中</div>}>
                            <item.component />
                        </Suspense>
                    </Route>
                ))}
                <div
                    onClick={onClickMask}
                    className={`${Style.mask} ${showAside || showNav ? Style.show : ""}`}
                />
            </div>
        </section>
    );
});

export default Section;
