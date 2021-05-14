import React, { memo } from 'react';

import Style from './index.module.less';

const PageNate = memo(() => {
  return (
    <nav className={Style.ct}>
      <a className={Style.previous} />
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
      <a className={Style.nextId} />
    </nav>
  );
});

export default PageNate;
