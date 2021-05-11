import React, { memo, useContext } from 'react';

import LayoutContext from '@src/layout/context/context';

import { ReactComponent as GITHUB } from '@src/assets/svg/github.svg';
import { ReactComponent as CSDN } from '@src/assets/svg/csdn.svg';

import Style from './aside.module.less';

const Aside = memo(() => {
  const {
    state: { showAside },
  } = useContext(LayoutContext);
  return (
    <aside className={`${Style.contain} ${showAside ? '' : Style.hide}`}>
      <a
        title="GitHub"
        className={`${Style.link} ${Style.github}`}
        href="https://github.com/patienceroll"
        target="_blank"
      >
        <div>
          <GITHUB />
          &emsp; <strong>GitHub</strong>
        </div>
      </a>
      <a
        title="GitHub"
        className={Style.link}
        href="https://blog.csdn.net/qq_40653782"
        target="_blank"
      >
        <div>
          <CSDN />
          &emsp; <strong>博客</strong>
        </div>
      </a>
    </aside>
  );
});

export default Aside;
