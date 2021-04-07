import React, { lazy } from "react";
import { LinkProps, RouteProps } from "react-router-dom";

type RouteTypeItem = {
    name?: string;
    props?: Omit<LinkProps, "to">;
    to: LinkProps["to"];
    RouteProps: RouteProps;
    /** 如果为false不显示在菜单栏 */
    menu?: false;
    component: React.LazyExoticComponent<React.FC<any> | React.ComponentClass<any>>;
};

const RouteData: RouteTypeItem[] = [
    {
        name: "主页",
        to: "/home",
        component: lazy(() => import(/**  webpackChunkName: "home"  */ "@src/page/home/home")),
        RouteProps: { path: "/home" },
    },
    {
        to: "/photo-ablum/:id",
        component: lazy(
            () =>
                import(/** photo-ablum-detail */ "@src/page/photo-ablum/photo-detail/photo-detail")
        ),
        RouteProps: { path: "/photo-ablum/:id" },
    },
    {
        name: "相册",
        to: "/photo-ablum",
        component: lazy(
            () =>
                import(/**  webpackChunkName: "photo-ablum"  */ "@src/page/photo-ablum/photo-ablum")
        ),
        RouteProps: { path: "/photo-ablum", exact: true },
    },
    {
        name: "学习记录",
        to: "/study-record",
        component: lazy(
            () =>
                import(
                    /**  webpackChunkName: "study-record"  */ "@src/page/study-record/study-record"
                )
        ),
        RouteProps: { path: "/study-record" },
    },
    {
        name: "canvas",
        to: "/canvas-center",
        component: lazy(
            () => import(/**  webpackChunkName: "canvas-center"  */ "@src/page/canvas/canvas")
        ),
        RouteProps: { path: "/canvas-center" },
    },
];

export default RouteData;
