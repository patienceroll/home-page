import type { FC, CSSProperties } from 'react';
import React, { useState } from 'react';

import IMAGE from '@src/assets/svg/image.svg';
import IMAGE_ERROR from '@src/assets/svg/image-error.svg';

import Style from './index.module.less';

type ImgProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const Img: FC<ImgProps> = (props) => {
  const { onLoad, className, style = {}, onError } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const newOnLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
    if (onLoad) onLoad(e);
    setLoading(true);
  };

  const newonError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    if (onError) onError(e);
    setError(true);
  };

  let newStyle: CSSProperties = {};
  if (loading) {
    newStyle = {
      ...style,
      backgroundImage: loading ? `url(${IMAGE})` : undefined,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: '50% 50%',
    };
  } else if (error) {
    newStyle = {
      ...style,
      backgroundImage: loading ? `url(${IMAGE_ERROR})` : undefined,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: '50% 50%',
    };
  } else {
    newStyle = { ...style };
  }

  return (
    <img
      {...props}
      className={`${Style.img} ${loading ? Style.hide : Style.img_show} ${className || ''}`}
      style={newStyle}
      onLoad={newOnLoad}
      onError={newonError}
    />
  );
};

export default Img;
