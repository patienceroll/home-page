import React, { lazy } from "react";
import { LinkProps, RouteProps } from "react-router-dom";

type RouteTypeItem = {
    name: string;
    props?: Omit<LinkProps, "to">;
    to: LinkProps["to"];
    RouteProps: RouteProps;
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
        name: "相册",
        to: "/photo-ablum",
        component: lazy(
            () => import(/**  webpackChunkName: "home"  */ "@src/page/photo-ablum/photo-ablum")
        ),
        RouteProps: { path: "/photo-ablum" },
    },
    {
        name: "学习记录",
        to: "/study-record",
        component: lazy(
            () => import(/**  webpackChunkName: "home"  */ "@src/page/study-record/study-record")
        ),
        RouteProps: { path: "/study-record" },
    },
    {
        name: "canvas",
        to: "/canvas-center",
        component: lazy(() => import(/**  webpackChunkName: "home"  */ "@src/page/canvas/canvas")),
        RouteProps: { path: "/canvas-center" },
    },
];

export default RouteData;
