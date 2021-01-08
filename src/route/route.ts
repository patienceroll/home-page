import { LinkProps } from "react-router-dom";

type RouteTypeItem = { name: string; props?: Omit<LinkProps, "to">; to: LinkProps["to"] };

const RouteData: RouteTypeItem[] = [
    { name: "主页", to: "/home" },
    { name: "相册", to: "/photo-center" },
    { name: "学习记录", to: "/study-center" },
    { name: "Convas", to: "/convas-center" },
];

export default RouteData;
