import React, { memo } from 'react';

import Style from './index.module.less';

export type PageNateProps = {
  disablePrevious?: boolean;
  disableNext?: boolean;
  onchange?: (
    result: 'left' | 'right' | 'middle',
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => void;
};

const PageNate = memo<PageNateProps>(({ onchange, disablePrevious, disableNext }) => {
  const onCLickLeft: React.DOMAttributes<HTMLAnchorElement>['onClick'] = (e) => {
    if (!disablePrevious && onchange) onchange('left', e);
  };
  const onClickRight: React.DOMAttributes<HTMLAnchorElement>['onClick'] = (e) => {
    if (!disableNext && onchange) onchange('right', e);
  };
  const onClickMiddle: React.DOMAttributes<HTMLAnchorElement>['onClick'] = (e) =>
    onchange && onchange('middle', e);

  return (
    <nav className={Style.ct}>
      <a
        className={`${Style.previous} ${disablePrevious ? Style.disablePrevious : ''}`}
        onClick={onCLickLeft}
        title="上一个"
      />
      <a onClick={onClickMiddle} className={Style.middle} title="返回列表">
        <ul>
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
      </a>
      <a
        className={`${Style.nextId}  ${disableNext ? Style.disableNext : ''} `}
        onClick={onClickRight}
        title="下一个"
      />
    </nav>
  );
});

export default PageNate;
