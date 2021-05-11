import React, { memo, useEffect, useState } from 'react';

import Image from '@src/componets/img';

import Style from './project-box.module.less';
interface ProjectBoxProps {
  title: string;
  subTitle?: string;
  /** 跳转的url,如果不传入则不做跳转 */
  url?: string;
  image: string;
  /**
   * 延时时间单位上滑
   * 单位 number * 100ms
   */
  delayUp?: number;
}

const ProjectBox = memo<ProjectBoxProps>((props) => {
  const { title, subTitle, url, image, delayUp = 0 } = props;

  const [up, setUp] = useState(false);

  const onClick = () => {
    if (url) window.open(url);
  };

  useEffect(() => {
    setTimeout(() => {
      setUp(true);
    }, (delayUp + 1) * 50);
  }, []);

  return (
    <div className={`${Style.CT} ${up ? Style.uped : ''} colum_font_size`} onClick={onClick}>
      <div className={Style.CT_inner}>
        <Image src={image} />

        <div className={Style.content_mask}>
          <div className={Style.text}>
            <h2 className="text_2_line_elips">{title}</h2>
            {subTitle && <div className={Style.sub_title}>{subTitle}</div>}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProjectBox;
