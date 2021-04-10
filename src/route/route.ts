import React, { lazy } from 'react';
import { LinkProps, RouteProps } from 'react-router-dom';

const Home = lazy(
  () => import(/**  webpackChunkName: "home"  */ /* webpackMode: lazy */ '@src/page/home/home'),
);
const PhotoAblumDetail = lazy(
  () =>
    import(
      /** photo-ablum-detail */ /* webpackMode: lazy */ '@src/page/photo-ablum/photo-detail/photo-detail'
    ),
);
const PhotoAblum = lazy(
  () =>
    import(
      /**  webpackChunkName: "photo-ablum"  */ /* webpackMode: lazy */ '@src/page/photo-ablum/photo-ablum'
    ),
);
const StudyRecord = lazy(
  () =>
    import(
      /**  webpackChunkName: "study-record"  */ /* webpackMode: lazy */ '@src/page/study-record/study-record'
    ),
);
const CanvasCenter = lazy(
  () =>
    import(
      /**  webpackChunkName: "canvas-center"  */ /* webpackMode: lazy */ '@src/page/canvas/canvas'
    ),
);

type RouteTypeItem = {
  name?: string;
  Linkprops?: Omit<LinkProps, 'to'>;
  RouteProps: Omit<RouteProps, 'path'> & { path: string };
  component: React.LazyExoticComponent<React.FC<{}>>;
};

const RouteData: RouteTypeItem[] = [
  {
    name: '主页',
    component: Home,
    RouteProps: { path: '/home' },
  },
  {
    component: PhotoAblumDetail,
    RouteProps: { path: '/photo-ablum/:id' },
  },
  {
    name: '相册',
    component: PhotoAblum,
    RouteProps: { path: '/photo-ablum', exact: true },
  },
  {
    name: '学习记录',
    component: StudyRecord,
    RouteProps: { path: '/study-record' },
  },
  {
    name: 'canvas',
    component: CanvasCenter,
    RouteProps: { path: '/canvas-center' },
  },
];

export default RouteData;
