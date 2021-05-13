import React from 'react';
import type { FC, ReactNode, ReactElement } from 'react';

import Style from './message.module.less';

export interface MessageProps {
  icon: ReactElement<SVGAElement>;
  text: string | ReactNode;
}

const Message: FC<MessageProps> = ({ icon, text }) => {
  return (
    <div className={Style.ct}>
      <figure className={Style.icon}>{icon}</figure>
      <span className={Style.text}>{text}</span>
    </div>
  );
};

export default Message;
