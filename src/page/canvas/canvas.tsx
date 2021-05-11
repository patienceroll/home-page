import React, { FC, memo } from 'react';

import Developing from '@src/componets/developing';

const Canvas: FC = memo(() => {
  return (
    <div style={{ height: '100%' }}>
      <Developing />
    </div>
  );
});

export default Canvas;
