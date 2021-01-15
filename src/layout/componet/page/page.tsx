import React, { memo, Suspense, useContext } from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import RouteData from "@src/route/route";

import { LayoutContext } from "@src/context/context";

import style from "./page.module.less";

const Page: React.FC = memo(() => {
    const {
        state: { showNav, showAbout },
        setShowAbout,
        setShowNav,
    } = useContext(LayoutContext);

    const onClickMask = () => {
        setShowAbout(false);
        setShowNav(false);
    };

    return (
        <div className={style.page_container}>
            <div
                className={`${style.contain} ${showAbout ? style.swipe_left : ""} ${
                    showNav ? style.swipe_right : ""
                }`}
            >
                <Switch>
                    <Redirect exact from="/" to="/home" />
                    {RouteData.map(item => (
                        <Route key={item.name} path={item.RouteProps.path}>
                            <Suspense fallback={<div>加载中</div>}>
                                <item.component />
                            </Suspense>
                        </Route>
                    ))}
                </Switch>
            </div>

            <div
                onClick={onClickMask}
                className={`${style.mask} ${showNav || showAbout ? style.mask_show : ""}`}
            ></div>
        </div>
    );
});

export default Page;
