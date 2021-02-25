import React, { memo, Suspense, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

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
            <div
                className={`${Style.CT_inner} ${showNav ? Style.t_right : ""} ${
                    showAside ? Style.t_left : ""
                }`}
            >
                <Suspense fallback={<div>加载中...</div>}>
                    <Switch>
                        <Route exact path="/" children={<Redirect to="/home" />} />
                        {RouteData.map(item => (
                            <Route
                                key={item.name}
                                {...item.RouteProps}
                                component={item.component}
                            />
                        ))}
                    </Switch>
                </Suspense>
                <div
                    onClick={onClickMask}
                    className={`${Style.mask} ${showAside || showNav ? Style.show : ""}`}
                />
            </div>
        </section>
    );
});

export default Section;
