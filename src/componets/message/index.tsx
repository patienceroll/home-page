import { render } from 'react-dom';
import React from 'react';
import Message from './message';

import type { MessageProps } from './message';

import { ReactComponent as Success } from '@src/assets/svg/seccess.svg';
import { ReactComponent as Error } from '@src/assets/svg/error.svg';
import { ReactComponent as Prohibit } from '@src/assets/svg/prohibit.svg';
import { ReactComponent as Question } from '@src/assets/svg/question.svg';
import { ReactComponent as Warn } from '@src/assets/svg/warn.svg';

interface SuccessOptions extends MessageProps {
  time: number;
}

const MessageMap = new Map<number, HTMLElement>();
let MapIndex = 0;

const success = (option: Omit<SuccessOptions, 'icon'>) => {
  const { text, time } = option;
  const element = document.createElement('div');
  element.id = 'zxl-message';
  document.body.appendChild(element);
  MessageMap.set(MapIndex++, element);
  render(<Message text={text} icon={<Success />} />, element);
  return new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, time / 1000);
  });
};

export default {
  success,
};
