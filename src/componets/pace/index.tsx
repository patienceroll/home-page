import { FC, useCallback, useEffect, useRef } from 'react';

import { render, unmountComponentAtNode } from 'react-dom';
import React, { useState } from 'react';

import Style from './index.module.less';

type Methods = { end: (element: HTMLDivElement) => void };
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
        setTimeout(() => {
          onEnd();
        }, 150);
      }, 150);
    }
  }, []);

  callBack({
    end(element) {
      if (animate.current) {
        cancelAnimationFrame(animate.current);
      }
      const onEnd = () => {
        unmountComponentAtNode(element);
        element.remove();
      };
      showEndAnimation(width, onEnd);
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
  let methods: Methods = { end() {} };
  let setp = 0;

  const getPaceMethods: GetPaceMethods = (o) => {
    methods = o;
  };

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
  render(<Pace callBack={getPaceMethods} step={setp} />, element);

  return {
    endPace() {
      methods.end(element);
    },
  };
};
