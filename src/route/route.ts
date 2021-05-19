import type { LinkProps, RouteProps } from 'react-router-dom';

import { ReactComponent as PROJECT } from '@src/assets/svg/setting.svg';
import { ReactComponent as WRITE } from '@src/assets/svg/write.svg';
import { ReactComponent as Study } from '@src/assets/svg/study.svg';
import { ReactComponent as Canvas } from '@src/assets/svg/canvas.svg';

type RouteTypeItem = {
  name?: string;
  Linkprops?: Omit<LinkProps, 'to'>;
  RouteProps: Omit<RouteProps, 'path'> & { path: string };
  component: () => Promise<any>;
  Icon?: (props: React.SVGProps<SVGAElement>) => React.ReactElement<SVGAElement>;
};

const RouteData: RouteTypeItem[] = [
  {
    name: '项目',
    Icon: PROJECT,
    component: () => import(/**  webpackChunkName: "home"  */ '@src/page/project/project'),
    RouteProps: { path: '/project' },
  },
  {
    component: () => import(/** webpackChunkName: "notes-detail" */ '@src/page/notes/note-detail'),
    RouteProps: { path: '/notes/:id' },
  },
  {
    name: '随记',
    Icon: WRITE,
    RouteProps: { path: '/notes' },
    component: () => import(/**  webpackChunkName: "notes"  */ '@src/page/notes'),
  },
  {
    name: '学习记录',
    Icon: Study,
    RouteProps: { path: '/study-record' },
    component: () =>
      import(/**  webpackChunkName: "study-record"  */ '@src/page/study-record/study-record'),
  },
  {
    name: '画布',
    Icon: Canvas,
    RouteProps: { path: '/canvas-center' },
    component: () => import(/**  webpackChunkName: "canvas-center"  */ '@src/page/canvas/canvas'),
  },
];

export default RouteData;
