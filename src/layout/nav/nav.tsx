import React, { memo, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import LayoutContext from '@src/layout/context/context';

import RouteData from '@src/route/route';

import style from './nav.module.less';

const Nav = memo(() => {
  const { getState } = useContext(LayoutContext);
  const { showNav } = getState();

  const { pathname } = useLocation();

  return (
    <nav className={`${style.contain} ${showNav ? '' : style.hide}`}>
      {RouteData.map((item) => {
        const { name, Linkprops = {}, RouteProps } = item;
        const className = `${style.link} ${pathname === RouteProps.path ? style.link_current : ''}`;
        if (name === undefined) return;
        return (
          <Link key={name} className={className} to={RouteProps.path} {...Linkprops}>
            <div>{name}</div>
          </Link>
        );
      })}
    </nav>
  );
});

export default Nav;
