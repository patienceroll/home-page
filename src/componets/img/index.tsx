import { FC, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import React, { useState } from 'react';

import IMAGE from '@src/assets/svg/image.svg';
import IMAGE_ERROR from '@src/assets/svg/image-error.svg';

import { AwaitTime } from '@src/helper/time';

import Style from './index.module.less';

type ImgProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const Img = forwardRef<HTMLImageElement, ImgProps>((props, ref) => {
  const { src } = props;
  const [newSrc, setNewSrc] = useState<ImgProps['src']>(IMAGE as unknown as string);
  const imgRef = useRef<HTMLImageElement>(null);

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
    if (imgRef.current) {
      const { current } = imgRef;
      const DomTransition = current.style.transition;
      const DomOpacity = current.style.opacity;

      getImgBlob()
        .then((url) => {
          current.style.opacity = '0';
          current.src = url;
          return AwaitTime(16);
        })
        .then(() => {
          current.style.transition = 'opacity 300ms ease';

          current.style.opacity = '1';
          return AwaitTime(300);
        })
        .then(() => {
          current.style.opacity = DomOpacity;
          current.style.transition = DomTransition;
        })
        .catch(() => {
          setNewSrc(IMAGE_ERROR as unknown as string);
        });
    }
  }, []);

  useImperativeHandle(ref, () => imgRef.current as HTMLImageElement);

  return <img {...props} src={newSrc} ref={imgRef} />;
});

export default Img;
