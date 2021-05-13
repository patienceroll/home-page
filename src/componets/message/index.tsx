import { render, unmountComponentAtNode } from 'react-dom';
import React, { ReactNode } from 'react';
import Message from './message';

import { ReactComponent as Success } from '@src/assets/svg/success.svg';
import { ReactComponent as Error } from '@src/assets/svg/error.svg';
import { ReactComponent as Prohibit } from '@src/assets/svg/prohibit.svg';
import { ReactComponent as Unknow } from '@src/assets/svg/unknow.svg';
import { ReactComponent as Warn } from '@src/assets/svg/warn.svg';

type Option = {
  time?: number;
  text: string | ReactNode;
};

const MessageMap = new Map<number, HTMLElement>();
let MapIndex = 0;

/**
 * 创建一个 DOM 元素,并挂在到 document 上
 */
const createElement: () => [HTMLElement, number] = () => {
  MapIndex++;
  const element = document.createElement('div');
  element.id = `zxl-message-${MapIndex}`;
  document.body.appendChild(element);
  MessageMap.set(MapIndex, element);
  return [element, MapIndex];
};

/** 因为清除DOM会展示 300ms 的动画,所以延迟清除dom */
const destoryElement = (element: HTMLElement, mapIndex: number) =>
  new Promise<void>((res) => {
    // 如果 element 已经被 destoryAll 清除,则不执行
    if (MessageMap.has(mapIndex)) {
      const msg = element.firstElementChild as HTMLElement;
      if (msg) {
        msg.style.transform = null as unknown as string;
        msg.style.opacity = null as unknown as string;
      }
      setTimeout(() => {
        unmountComponentAtNode(element);
        element.remove();
        if (mapIndex) MessageMap.delete(mapIndex);
        res();
      }, 300);
    } else {
      res();
    }
  });
const WaitTime = (time: number) =>
  new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, time);
  });

const showMessage = (option: Option, icon: React.ReactElement<SVGAElement>) => {
  const { text, time } = option;
  // 需要多给300ms展示出场动画
  const watieTime = (time || 3000) + 300;
  const [element, index] = createElement();
  render(<Message text={text} icon={icon} index={MessageMap.size} />, element);
  return WaitTime(watieTime).then(() => destoryElement(element, index));
};

const success = (text: string, time?: number) => showMessage({ text, time }, <Success />);

const error = (text: string, time?: number) => showMessage({ text, time }, <Error />);

const prohibit = (text: string, time?: number) => showMessage({ text, time }, <Prohibit />);

const unknow = (text: string, time?: number) => showMessage({ text, time }, <Unknow />);

const warn = (text: string, time?: number) => showMessage({ text, time }, <Warn />);

const destoryAll = () => MessageMap.forEach((i, index) => destoryElement(i, index));

const message = {
  /** 成功消息 */
  success,
  /** 错误消息 */
  error,
  /** 禁止消息 */
  prohibit,
  /** 未知消息 */
  unknow,
  /** 警告消息 */
  warn,
  /** 清除所有 */
  destoryAll,
};

export = {
  default: message,
  /** 成功消息 */
  success,
  /** 错误消息 */
  error,
  /** 禁止消息 */
  prohibit,
  /** 未知消息 */
  unknow,
  /** 警告消息 */
  warn,
  /** 清除所有 */
  destoryAll,
};
