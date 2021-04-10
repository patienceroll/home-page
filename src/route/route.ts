import React, { lazy } from 'react';
import type { LinkProps, RouteProps } from 'react-router-dom';

type RouteTypeItem = {
  name?: string;
  Linkprops?: Omit<LinkProps, 'to'>;
  RouteProps: Omit<RouteProps, 'path'> & { path: string };
  component: React.LazyExoticComponent<React.FC<{}>>;
};

const RouteData: RouteTypeItem[] = [
  {
    name: '主页',
    component: lazy(() => import(/**  webpackChunkName: "home"  */ '@src/page/home/home')),
    RouteProps: { path: '/home' },
  },
  {
    component: lazy(
      () =>
        import(
          /** webpackChunkName: "photo-ablum-detail" */ '@src/page/photo-ablum/photo-detail/photo-detail'
        ),
    ),
    RouteProps: { path: '/photo-ablum/:id' },
  },
  {
    name: '相册',
    component: lazy(
      () => import(/**  webpackChunkName: "photo-ablum"  */ '@src/page/photo-ablum/photo-ablum'),
    ),
    RouteProps: { path: '/photo-ablum', exact: true },
  },
  {
    name: '学习记录',
    component: lazy(
      () => import(/**  webpackChunkName: "study-record"  */ '@src/page/study-record/study-record'),
    ),
    RouteProps: { path: '/study-record' },
  },
  {
    name: 'canvas',
    component: lazy(
      () => import(/**  webpackChunkName: "canvas-center"  */ '@src/page/canvas/canvas'),
    ),
    RouteProps: { path: '/canvas-center' },
  },
];

export default RouteData;
