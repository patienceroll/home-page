import React, { lazy, memo, Suspense, useContext, useMemo } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LayoutContext from '@src/layout/context/context';

import Loading from '@src/canvas-componets/loading/loading';
import Page404 from '@src/layout/404/404';

import RouteData from '@src/route/route';

import Style from './section.module.less';

const Section = memo(() => {
  const { getState } = useContext(LayoutContext);

  const { showNav, showAside } = getState();

  return (
    <section className={`${Style.CT}`}>
      <div
        className={`${Style.CT_inner} ${showNav ? Style.t_right : ''} ${
          showAside ? Style.t_left : ''
        }`}
      >
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/" children={<Redirect to="/project" />} />
            {RouteData.map((item, index) => (
              <Route
                key={`${index}`}
                {...item.RouteProps}
                component={useMemo(() => lazy(item.component), [])}
              />
            ))}
            <Route children={<Page404 />} />
          </Switch>
        </Suspense>
      </div>
    </section>
  );
});

export default Section;
