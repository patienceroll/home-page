import React, { useEffect, useRef } from 'react';
import type { FC, ReactNode, ReactElement } from 'react';

import Style from './message.module.less';

export interface MessageProps {
  icon: ReactElement<SVGAElement>;
  text: string | ReactNode;
  /** 从1开始 */
  index: number;
}

const Message: FC<MessageProps> = ({ icon, text, index }) => {
  const element = useRef<HTMLDivElement>(null);

  const FadeOut = () => {
    if (element.current) {
      const { current } = element;
      const { clientHeight } = current;
      current.style.top = `${(clientHeight + 20) * (index - 1) + 20}px`;
      current.style.opacity = '1';
      current.style.transform = 'translate(-50%, 0)';
    }
  };

  useEffect(FadeOut, []);

  return (
    <div className={Style.ct} ref={element}>
      <figure className={Style.icon}>
        {icon}
        <span className={Style.text}>{text}</span>
      </figure>
    </div>
  );
};

export default Message;
