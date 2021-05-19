import React, { memo, useContext, useEffect, useState } from 'react';

import { ReactComponent as PLAY } from '@src/assets/svg/play.svg';
import { ReactComponent as MUSIC } from '@src/assets/svg/music.svg';
import { ReactComponent as NEXT } from '@src/assets/svg/next.svg';
import { ReactComponent as PAUSE } from '@src/assets/svg/pause.svg';
import { ReactComponent as PERVISE } from '@src/assets/svg/pervise.svg';

import LayoutContext from '@src/layout/context/context';

import Style from './index.module.less';

const MusicPlayer = memo(() => {
  const { getState } = useContext(LayoutContext);
  const { QQplayer } = getState();

  const [paly, setPlay] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  // 初始化播放器的事件
  const initPlayer = () => {
    const onPlay = function () {
      setPlay(true);
    };

    const onPause = function () {
      setPlay(false);
    };

    const onError = function (e: any) {
      console.log(e);
    };

    /** 通过 . 调用 不会导致 this 丢失 */
    QQplayer.on('play', onPlay);
    QQplayer.on('pause', onPause);
    QQplayer.on('error', onError);
  };

  const onClickNext = () => {
    QQplayer.playNext();
  };

  const onClickPervise = () => {
    QQplayer.playPrev();
  };

  const onClickPlay = () => {
    if (Object.keys(QQplayer.data.songs).length === 0) {
      QQplayer.play(['003IPDsn4ZWb5H', '003PMR2c3ohl7o']);
    } else {
      QQplayer.play();
    }
  };

  const onClicjPause = () => {
    QQplayer.pause();
  };

  const onClickShowIcon = () => {
    setShowIcon(true);
  };

  const onMouseLeaveIcon = () => {
    setShowIcon(false);
  };

  const onMouseEnterIcon = () => {
    setShowIcon(true);
  };

  useEffect(initPlayer, []);

  return (
    <>
      <div
        className={`${Style.music_player_icon}  ${showIcon ? Style.show_icon : ''}`}
        onClick={onClickShowIcon}
        onMouseLeave={onMouseLeaveIcon}
        onMouseEnter={onMouseEnterIcon}
      >
        <MUSIC className={paly ? 'rotate' : ''} />
        <PERVISE onClick={onClickPervise} className={Style.action} />
        {paly ? (
          <PAUSE onClick={onClicjPause} className={Style.action} />
        ) : (
          <PLAY onClick={onClickPlay} className={Style.action} />
        )}
        <NEXT onClick={onClickNext} className={Style.action} />
      </div>
      <div className={Style.music_player_pannel}></div>
    </>
  );
});

export default MusicPlayer;
