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

declare class QMplayer {
  constructor(options?: { target?: Target; filter?: boolean; loop?: boolean }) {}
  state: State;
  currentTime: number;
  duration: number;
  data: {};
  loop: boolean;
  target: number;
  play(song: string | string[], options?: { index: number }) {}
  pause: VoidFunction;
  playPrev: VoidFunction;
  playNext: VoidFunction;
  on(eventName: string, callback: VoidFunction) {}
  toggle(play: boolean) {}
}
