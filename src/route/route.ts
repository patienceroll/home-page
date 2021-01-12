import React from "react";
import { LinkProps, RouteProps } from "react-router-dom";

import Home from "@src/page/home/home";
import PhotoCenter from "@src/page/photo-center/photo-center";
import StudyCenter from "@src/page/study-center/study-center";
import canvas from "@src/page/canvas/canvas";

type RouteTypeItem = {
    name: string;
    props?: Omit<LinkProps, "to">;
    to: LinkProps["to"];
    RouteProps: RouteProps;
    component: React.FC | React.ComponentClass;
};

const RouteData: RouteTypeItem[] = [
    {
        name: "主页",
        to: "/home",
        component: Home,
        RouteProps: { path: "/home" },
    },
    {
        name: "相册",
        to: "/photo-center",
        component: PhotoCenter,
        RouteProps: { path: "/photo-center" },
    },
    {
        name: "学习记录",
        to: "/study-center",
        component: StudyCenter,
        RouteProps: { path: "/study-center" },
    },
    {
        name: "canvas",
        to: "/canvas-center",
        component: canvas,
        RouteProps: { path: "/canvas-center" },
    },
];

export default RouteData;
