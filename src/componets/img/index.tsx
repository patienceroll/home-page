import React, { FC, useState } from 'react';

import IMAGE from '@src/assets/svg/image.svg';

import Style from './index.module.less';

type ImgProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const Img: FC<ImgProps> = (props) => {
  const { onLoad, className, style = {} } = props;
  const [show, setShow] = useState(false);
  const newOnLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
    if (onLoad) onLoad(e);
    setShow(true);
  };

  return (
    <img
      {...props}
      className={`${Style.img} ${(show && Style.img_show) || ''} ${className || ''}`}
      style={{ ...style, backgroundImage: !show ? `url(${IMAGE})` : undefined }}
      onLoad={newOnLoad}
    />
  );
};

export default Img;
