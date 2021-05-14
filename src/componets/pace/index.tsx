import { FC, useCallback, useEffect, useRef } from 'react';

import { render, unmountComponentAtNode } from 'react-dom';
import React, { useState } from 'react';

import Style from './index.module.less';

type Methods = { end: (element: HTMLDivElement) => Promise<void> };
type GetPaceMethods = (m: Methods) => void;

type PaceProps = {
  callBack: GetPaceMethods;
  step?: number;
};

/** 步进等待时间 单位 ms */
const WAIT_TIME = 6000;

const Pace: FC<PaceProps> = ({ callBack, step = 0 }) => {
  const timeStamp = useRef(+new Date());
  const animate = useRef(NaN);
  const [width, setWidth] = useState(step);

  const porgress = useCallback(() => {
    const during = +new Date() - timeStamp.current;
    /** 如果没有超过等待时间 100% */
    if (during < WAIT_TIME) {
      setWidth((during / WAIT_TIME) * 100);
      animate.current = requestAnimationFrame(porgress);
    } else {
      // 如果超过等待时间,且加载没有终止
      setWidth(99);
    }
  }, []);

  const showEndAnimation = useCallback((currentWidth: number, onEnd: VoidFunction) => {
    if (currentWidth < 50) {
      setTimeout(() => {
        setWidth(50);
        showEndAnimation(50, onEnd);
      }, 150);
    }
    if (50 <= currentWidth && currentWidth < 75) {
      setTimeout(() => {
        setWidth(75);
        showEndAnimation(75, onEnd);
      }, 150);
    }
    if (75 <= currentWidth && currentWidth < 90) {
      setTimeout(() => {
        setWidth(90);
        showEndAnimation(90, onEnd);
      }, 150);
    }
    if (90 <= currentWidth) {
      setTimeout(() => {
        setWidth(100);
        setTimeout(onEnd, 150);
      }, 150);
    }
  }, []);

  callBack({
    end(element) {
      // 清除当前动画
      if (animate.current) {
        cancelAnimationFrame(animate.current);
      }
      return new Promise<void>((res) => {
        const onEnd = () => {
          unmountComponentAtNode(element);
          element.remove();
          res();
        };
        showEndAnimation(width, onEnd);
      });
    },
  });

  useEffect(porgress, [porgress]);

  return (
    <div className={Style.pace}>
      <div className={Style.progress} id="zxl-pace-progress" style={{ width: `${width}vw` }} />
    </div>
  );
};

export const startPace = () => {
  const paced = document.getElementById('zxl-pace');
  let methods: Methods = { end: () => Promise.resolve() };
  let setp = 0;

  const getPaceMethods: GetPaceMethods = (o) => {
    methods = o;
  };

  // 如果已经出现进度条,重新生成进度条,但是请求接着卸载的进度走
  if (paced) {
    const paceProgress = document.getElementById('zxl-pace-progress');
    if (paceProgress) {
      setp = Number(paceProgress.style.width.replace(/[vw]/g, ''));
    }
    unmountComponentAtNode(paced);
    paced.remove();
  }

  const element = document.createElement('div');
  element.id = 'zxl-pace';
  document.body.appendChild(element);

  // 需要展示动画,body 向下移动
  document.body.style.transform = 'translateY(4px)';

  render(<Pace callBack={getPaceMethods} step={setp} />, element);

  return {
    endPace() {
      return methods.end(element).then(() => {
        document.body.style.transform = 'unset';
      });
    },
  };
};
