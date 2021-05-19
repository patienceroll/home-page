import React, { memo, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import LayoutContext from '@src/layout/context/context';

import RouteData from '@src/route/route';

import Style from './nav.module.less';

const Nav = memo(() => {
  const { getState } = useContext(LayoutContext);
  const { showNav } = getState();

  const { pathname } = useLocation();

  return (
    <nav className={`${Style.contain} ${showNav ? '' : Style.hide}`}>
      {RouteData.map((item) => {
        const { name, Linkprops = {}, RouteProps, Icon } = item;
        const className = `${Style.link} ${pathname === RouteProps.path ? Style.link_current : ''}`;
        if (name === undefined) return;
        return (
          <Link key={name} className={className} to={RouteProps.path} {...Linkprops}>
            <div>
              {Icon && (
                <>
                  <Icon className={Style.icon} />
                  &emsp;
                </>
              )}
              <span className={Style.text}>{name}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
});

export default Nav;
