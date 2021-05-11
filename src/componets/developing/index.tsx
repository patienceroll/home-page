import React, { memo } from 'react';

import { ReactComponent as Setting } from '@src/assets/svg/setting.svg';

import Style from './index.module.less';

const Developing = memo(() => {
  return (
    <div className={Style.CT}>
      <div className={Style.CT_inner}>
        <Setting className="rotate" />
        <div className={Style.text}>建设中...</div>
      </div>
    </div>
  );
});

export default Developing;
