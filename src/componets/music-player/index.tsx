import React, { memo, useContext } from 'react';

import LayoutContext from '@src/layout/context/context';

import Style from './index.module.less';

const MusicPlayer = memo(() => {
  const { getState } = useContext(LayoutContext);
  const { QQplayer } = getState();
  const { state, on } = QQplayer;

  return (
    <>
      <div className={Style.music_player_icon}></div>
      <div className={Style.music_player_pannel}></div>
    </>
  );
});

export default MusicPlayer;
