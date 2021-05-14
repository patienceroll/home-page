import React, { memo } from 'react';

import Style from './index.module.less';

const PageNate = memo(() => {
  return (
    <nav className={Style.ct}>
      <a className={Style.previous} title="上一个" />
      <a>
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </a>
      <a className={Style.nextId} title="下一个" />
    </nav>
  );
});

export default PageNate;
