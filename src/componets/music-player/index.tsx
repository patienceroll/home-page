import React, { memo, useContext, useEffect, useState } from 'react';
import message from '@src/componets/message';

import PLAY from '@src/assets/svg/play.svg';
import MUSIC from '@src/assets/svg/music.svg';
import NEXT from '@src/assets/svg/next.svg';
import PAUSE from '@src/assets/svg/pause.svg';
import PERVISE from '@src/assets/svg/pervise.svg';
import MUSIC_LIST from '@src/assets/svg/music-list.svg';

import LayoutContext from '@src/layout/context/context';

import { SongItem, SongPlaying } from './components';

import Style from './index.module.less';

export type Song = { mid: string; name: string; img?: string; time?: number; singer: string };

const SONG_LIST: Song[] = [
  { mid: '003uIrW41da4ay', name: '秘密', singer: '张震岳' },
  { mid: '004H5cUS2baA6O', name: '关于我们之间的事', singer: '张震岳' },
  { mid: '0015O8Cz2JBjE3', name: 'The Left Panel', singer: 'Buckethead' },
  { mid: '003WiqfU3kn4L6', name: 'C', singer: 'Buckethead' },
  { mid: '004dUi3s0olrHd', name: 'Swomee Swan', singer: 'Buckethead' },
  { mid: '004eJGdo0o49X3', name: 'Endless Rain', singer: 'X Japan' },
];

const MusicPlayer = memo(() => {
  const { getState } = useContext(LayoutContext);
  const { QQplayer } = getState();

  const [play, setPlay] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [songList] = useState(SONG_LIST);
  const [currentSong, setCurrentSong] = useState<Song>();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 初始化播放器的事件
  const initPlayer = () => {
    const onPlay = function (e: QMplayerPlayEvent) {
      const {
        currentTime,
        duration,
        song: { mid },
      } = e;
      setPlay(true);
      setCurrentTime(currentTime);
      setDuration(duration);
      setCurrentSong(songList.find((i) => i.mid === mid));
    };

    const onPause = function () {
      setPlay(false);
    };

    const onError = function () {
      message.error('播放器出错了(-_-!)').then(() => message.notice('请尝试切换歌曲哟^_^'));
    };

    const onTimeUpdate = (e: QMplayerTimeUpdateEvent) => {
      // console.log(e);
    };

    /** 通过 . 调用 不会导致 this 丢失 */
    QQplayer.on('play', onPlay);
    QQplayer.on('pause', onPause);
    QQplayer.on('error', onError);
    QQplayer.on('timeupdate', onTimeUpdate);
    (window as any).QQplayer = QQplayer;
  };

  const onClickNext = () => {
    QQplayer.playNext();
  };

  const onClickPervise = () => {
    QQplayer.playPrev();
  };

  const onClickPlay = () => {
    if (Object.keys(QQplayer.data.songs).length === 0) {
      QQplayer.play(songList.map((i) => i.mid));
    } else {
      QQplayer.play();
    }
  };

  const onClickPause = () => {
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
    setShowPanel(true);
  };

  const onMouseEnterPanel = () => {
    setShowPanel(false);
  };

  const onClickPlayMusic = (music: string) => {
    const song = songList.find((i) => i.mid === music);
    if (song) {
      QQplayer.play(song.mid);
    }
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
          <img onClick={onClickPause} title="暂停" src={PAUSE} className={Style.action} />
        ) : (
          <img onClick={onClickPlay} title="播放" src={PLAY} className={Style.action} />
        )}
        <img src={NEXT} title="下一首" onClick={onClickNext} className={Style.action} />
        <img src={MUSIC_LIST} title="播放列表" onClick={onClickShowList} className={Style.action} />
      </div>
      {/* 音乐播放列表 */}
      <div
        className={`${Style.music_player_pannel} ${showPanel ? Style.show_pannel : ''}`}
        onMouseLeave={onMouseEnterPanel}
      >
        <div>
          {currentSong && (
            <div className={Style.playing_wrapper}>
              <SongPlaying
                onClickPlay={onClickPlay}
                onClickPause={onClickPause}
                className={Style.playing}
                img={currentSong.img || MUSIC}
                name={currentSong.name}
                singer={currentSong.singer}
                play={play}
              />
            </div>
          )}

          <div className={Style.panner_inner}>
            <div className={Style.panner_scroll}>
              {songList.map((song) => (
                <SongItem
                  key={song.mid}
                  img={song.img || MUSIC}
                  name={song.name}
                  singer={song.singer}
                  onClick={() => onClickPlayMusic(song.mid)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default MusicPlayer;
