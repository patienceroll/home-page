import React, { memo } from 'react';

import PAUSE from '@src/assets/svg/pause.svg';
import PLAY from '@src/assets/svg/play.svg';

import Style from './components.module.less';

type SongItemProps = {
  img: string;
  name: string;
  onClick?: VoidFunction;
  singer: string;
};

export const SongItem = memo<SongItemProps>(({ img, name, singer, onClick }) => {
  return (
    <div className={Style.ct} onClick={onClick}>
      <img src={img} />
      <div className={Style.info}>
        <div>
          <strong className={`${Style.name} text_elips`}>{name}</strong>
          <br />
          <span className={`${Style.singer} text_elips`}>{singer}</span>
        </div>
      </div>
    </div>
  );
});

type SongPlayingProps = {
  img: string;
  name: string;
  singer: string;
  play: boolean;
  className: string;
  onClickPlay: VoidFunction;
  onClickPause: VoidFunction;
};

export const SongPlaying = memo<SongPlayingProps>(
  ({ onClickPause, onClickPlay, img, name, singer, play, className = '' }) => {
    return (
      <div className={`${Style.ct_play} ${className}`}>
        <div className={Style.img}>
          <img src={img} className={Style.cover} />
          <div className={Style.action}>
            {play ? (
              <img title="暂停" onClick={onClickPause} className="rotate" src={PAUSE} />
            ) : (
              <img title="播放" onClick={onClickPlay} src={PLAY} />
            )}
          </div>
        </div>
        <div className={Style.info}>
          <div>
            <strong className={`${Style.name} text_elips`}>{name}</strong>
            <br />
            <span className={`${Style.singer} text_elips`}>{singer}</span>
          </div>
        </div>
      </div>
    );
  },
);
