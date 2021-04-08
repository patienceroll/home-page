import React, { lazy } from "react";
import { LinkProps, RouteProps } from "react-router-dom";

const Home = import(/**  webpackChunkName: "home"  */ /* webpackMode: lazy */ "@src/page/home/home");
const PhotoAblumDetail = import(
    /** photo-ablum-detail */ /* webpackMode: lazy */ "@src/page/photo-ablum/photo-detail/photo-detail"
);
const PhotoAblum = import(
    /**  webpackChunkName: "photo-ablum"  */ /* webpackMode: lazy */ "@src/page/photo-ablum/photo-ablum"
);
const StudyRecord = import(
    /**  webpackChunkName: "study-record"  */ /* webpackMode: lazy */ "@src/page/study-record/study-record"
);
const CanvasCenter = import(
    /**  webpackChunkName: "canvas-center"  */ /* webpackMode: lazy */ "@src/page/canvas/canvas"
);

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
        component: lazy(() => {
            console.log("home");
            return Home;
        }),
        RouteProps: { path: "/home" },
    },
    {
        to: "/photo-ablum/:id",
        component: lazy(() => {
            console.log("photo-ablum/:id");
            return PhotoAblumDetail;
        }),
        RouteProps: { path: "/photo-ablum/:id" },
    },
    {
        name: "相册",
        to: "/photo-ablum",
        component: lazy(() => {
            console.log("photo-ablum");
            return PhotoAblum;
        }),
        RouteProps: { path: "/photo-ablum", exact: true },
    },
    {
        name: "学习记录",
        to: "/study-record",
        component: lazy(() => {
            console.log("study-record");
            return StudyRecord;
        }),
        RouteProps: { path: "/study-record" },
    },
    {
        name: "canvas",
        to: "/canvas-center",
        component: lazy(() => {
            console.log("canvas-center");
            return CanvasCenter;
        }),
        RouteProps: { path: "/canvas-center" },
    },
];

export default RouteData;
