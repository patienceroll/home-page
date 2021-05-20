declare module '*.less';
declare module '*.jpg';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGAElement>,
  ): React.ReactElement<SVGAElement>;
  const defaultType: string;
  export default defaultType;
}

/** 当前播放状态 */
type QMplayerState = 'ready' | 'playing' | 'pause' | 'ended' | 'error';

/** 播放方式 */
type QMplayerTarget = 'auto' | 'music' | 'web';

/** 事件名 */
type QMplayerEventName = 'play' | 'pause' | 'ended' | 'timeupdate' | 'waiting' | 'error';

/** QQ音乐歌曲信息(只写了用到的) */
type QMplayerSong = {
  name: string;
  mid: string;
};

/** QQ 音乐播放信息 */
type QMplayerData = {
  currentTime: number;
  duration: number;
  index: number;
  state: QMplayerState;
  song: QMplayerSong;
  songs: Record<number, QMplayerSong>;
};

/** QQ 音乐播放事件 event */
type QMplayerPlayEvent = QMplayerData;

/** QQ 音乐播放时间变化 event */
type QMplayerTimeUpdateEvent = {
  currentTime: number;
  type: 'timeupdate';
};

/**
 *
 * #### QQ 音乐 web Api 文档
 * - https://xingqiao.gitbooks.io/qmplayer/content/
 *
 */
declare class QMplayer {
  constructor(options?: { target?: QMplayerTarget; filter?: boolean; loop?: boolean }) {}
  state: QMplayerState;
  currentTime: number;
  duration: number;
  data: QMplayerData;
  loop: boolean;
  target: number;
  play(song?: string | string[], options?: { index: number }) {}
  pause: VoidFunction;
  playPrev: VoidFunction;
  playNext: VoidFunction;
  on(eventName: QMplayerEventName, callback: (e: any) => void) {}
  off(eventName: QMplayerEventName) {}
  toggle(play: boolean) {}
}
