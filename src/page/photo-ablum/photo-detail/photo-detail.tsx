import React, { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';

import Loading from '@src/canvas-componets/loading/loading';
import PageNate from '@src/componets/page-nate';
import type { PageNateProps } from '@src/componets/page-nate';

import * as Data from '../data';

import * as Request from '../service';

import Style from './photo-detail.module.less';

const PhotoDetail = memo(() => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [detail, setDetail] = useState<Data.PhotoDetail>();

  const getDetail = useCallback(() => {
    Request.GetPhoto({ id }).then((res) => {
      setDetail(res.data);
    });
  }, [id]);

  const onChangePageNate: PageNateProps['onchange'] = (result) => {
    if (result === 'left') {
      history.replace(`/photo-ablum/${detail?.previousId}`);
    } else if (result === 'right') {
      history.replace(`/photo-ablum/${detail?.nextId}`);
    } else {
      history.push('/photo-ablum');
    }
  };

  useEffect(getDetail, [getDetail]);

  return detail ? (
    <>
      <div className={Style.page_nate}>
        <PageNate
          onchange={onChangePageNate}
          disableNext={!detail.nextId}
          disablePrevious={!detail.previousId}
        />
      </div>
      <div className={Style.CT}>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: decodeURIComponent(detail.content) }}
        />
      </div>
      <div className={Style.page_nate}>
        <PageNate
          onchange={onChangePageNate}
          disableNext={!detail.nextId}
          disablePrevious={!detail.previousId}
        />
      </div>
    </>
  ) : (
    <Loading />
  );
});

export default PhotoDetail;
