import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { useLocation } from 'react-router-dom';

import LayoutContext from '@src/layout/context/context';
import type { LayoutContextType } from '@src/layout/context/context';

import Header from '@src/layout/header/header';
import Nav from '@src/layout/nav/nav';
import Section from '@src/layout/section/section';
import Aside from '@src/layout/aside/aside';
import MusicPlayer from '@src/componets/music-player';

import Style from './layout.module.less';

const Layout: FC = () => {
  const { pathname } = useLocation();
  const [showNav, setShowNav] = useState(false);
  const [showAside, setShowAside] = useState(false);

  const [QQplayer] = useState(() => new QMplayer({ target: 'web', loop: true }));

  useEffect(() => {
    if (showNav) setShowAside(false);
  }, [showNav]);

  useEffect(() => {
    if (showAside) setShowNav(false);
  }, [showAside]);

  const ShowSection = useCallback(() => {
    setShowAside(false);
    setShowNav(false);
  }, []);

  const onClickMask = () => {
    setShowAside(false);
    setShowNav(false);
  };

  const value: LayoutContextType = useMemo(() => {
    return {
      getState: () => ({ showAside, showNav, QQplayer }),
      setShowNav,
      setShowAside,
    };
  }, [showAside, showNav]);

  useEffect(ShowSection, [ShowSection, pathname]);

  return (
    <LayoutContext.Provider value={value}>
      <Header />
      <Nav />
      <Section />
      <div
        onClick={onClickMask}
        className={`${Style.mask} ${showAside || showNav ? Style.show : ''}`}
      />
      <Aside />
      <MusicPlayer />
      <footer></footer>
    </LayoutContext.Provider>
  );
};

export default Layout;
