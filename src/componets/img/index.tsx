import { FC, useEffect } from 'react';
import React, { useState } from 'react';

import IMAGE from '@src/assets/svg/image.svg';
import IMAGE_ERROR from '@src/assets/svg/image-error.svg';

import Style from './index.module.less';

type ImgProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const Img: FC<ImgProps> = (props) => {
  const { className = '', style = {}, src } = props;
  const [animating, setAnimating] = useState(false);
  const [newSrc, setNewSrc] = useState<ImgProps['src']>(IMAGE as unknown as string);

  const getImgBlob = () => {
    if (src) {
      return fetch(src, { method: 'GET', headers: { 'content-type': 'image/*' } })
        .then((res) => res.blob())
        .then((blob) => {
          return URL.createObjectURL(blob);
        });
    }
    return Promise.reject();
  };

  useEffect(() => {
    getImgBlob()
      .then((url) => {
        setAnimating(true);
        setNewSrc(url);
        setTimeout(() => {
          setAnimating(false);
        }, 16);
      })
      .catch(() => {
        setNewSrc(IMAGE_ERROR as unknown as string);
      });
  }, []);

  return (
    <img
      {...props}
      src={newSrc}
      className={`${Style.hide} ${animating ? '' : Style.show} ${className}`}
      style={style}
    />
  );
};

export default Img;
