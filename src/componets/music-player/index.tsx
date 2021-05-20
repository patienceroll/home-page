import React, { memo, useContext, useEffect, useState } from 'react';
import message from '@src/componets/message';

import PLAY from '@src/assets/svg/play.svg';
import MUSIC from '@src/assets/svg/music.svg';
import NEXT from '@src/assets/svg/next.svg';
import PAUSE from '@src/assets/svg/pause.svg';
import PERVISE from '@src/assets/svg/pervise.svg';
import MUSIC_LIST from '@src/assets/svg/music-list.svg';

import LayoutContext from '@src/layout/context/context';

import Style from './index.module.less';

type Song = { mid: string; name: string; img?: string; time?: string; singer: string };

const SONG_LIST: Song[] = [
  { mid: '003uIrW41da4ay', name: '秘密', singer: '张震岳' },
  { mid: '004H5cUS2baA6O', name: '关于我们之间的事', singer: '张震岳' },
];

const MusicPlayer = memo(() => {
  const { getState } = useContext(LayoutContext);
  const { QQplayer } = getState();

  const [play, setPlay] = useState(false);
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
      QQplayer.play(SONG_LIST.map((i) => i.mid));
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

  const onClickShowList = () => {
    message.notice('正在开发中哟~', 3000);
  };

  useEffect(initPlayer, []);

  return (
    <>
      {/* 微型音乐播放按钮 */}
      <div
        className={`${Style.music_player_icon}  ${showIcon ? Style.show_icon : ''}`}
        onClick={onClickShowIcon}
        onMouseLeave={onMouseLeaveIcon}
        onMouseEnter={onMouseEnterIcon}
      >
        <img src={MUSIC} className={play ? 'rotate' : undefined} />
        <img src={PERVISE} title="上一首" onClick={onClickPervise} className={Style.action} />
        {play ? (
          <img onClick={onClicjPause} title="暂停" src={PAUSE} className={Style.action} />
        ) : (
          <img onClick={onClickPlay} title="播放" src={PLAY} className={Style.action} />
        )}
        <img src={NEXT} title="下一首" onClick={onClickNext} className={Style.action} />
        <img src={MUSIC_LIST} title="播放列表" onClick={onClickShowList} className={Style.action} />
      </div>
      <div className={Style.music_player_pannel}></div>
    </>
  );
});

export default MusicPlayer;
