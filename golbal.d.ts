declare module '*.less';
declare module '*.jpg';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGAElement>,
  ): React.ReactElement<SVGAElement>;
}

/** 当前播放状态 */
type State = 'ready' | 'playing' | 'pause' | 'ended' | 'error';

/** 播放方式 */
type Target = 'auto' | 'music' | 'web';

type EventName = 'play' | 'pause' | 'ended' | 'timeupdate' | 'waiting' | 'error';

/**
 *
 * #### QQ 音乐 web Api 文档
 * - https://xingqiao.gitbooks.io/qmplayer/content/
 *
 */
declare class QMplayer {
  constructor(options?: { target?: Target; filter?: boolean; loop?: boolean }) {}
  state: State;
  currentTime: number;
  duration: number;
  data: { currentTime: number; duration: number; index: number; state: State };
  loop: boolean;
  target: number;
  play(song: string | string[], options?: { index: number }) {}
  pause: VoidFunction;
  playPrev: VoidFunction;
  playNext: VoidFunction;
  on(eventName: EventName, callback: (e?: unknown) => void) {}
  off(eventName: EventName) {}
  toggle(play: boolean) {}
}
