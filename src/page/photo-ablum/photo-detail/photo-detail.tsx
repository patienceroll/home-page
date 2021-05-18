import React, { memo, useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Loading from '@src/canvas-componets/loading/loading';
import PageNate from '@src/componets/page-nate';
import type { PageNateProps } from '@src/componets/page-nate';

import { AwaitTime, AwatiScrollTop } from '@src/helper/time';

import * as Data from '../data';

import * as Request from '../service';

import Style from './photo-detail.module.less';

const PhotoDetail = memo(() => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [detail, setDetail] = useState<Data.PhotoDetail>();

  const contentRef = useRef<HTMLDivElement>(null);
  const [animateDetail, setAnimateDetail] = useState<Data.PhotoDetail>();

  const GetDetail = (id: number | string) => Request.GetPhoto({ id });

  const showAnimate = (params: { id: number | string; direction: 'left' | 'right' }) => {
    const { id, direction } = params;
    const { current } = contentRef;

    if (current) {
      GetDetail(id)
        .then((res) => {
          setAnimateDetail(res.data);
          current.style.transition = '';
          current.style.transform = `translateX(${direction === 'left' ? -66.666666 : 0}%)`;
          return AwaitTime(500).then(() => res.data);
        })
        .then((data) => {
          setDetail(data);
          current.style.transition = 'unset';
          current.style.transform = '';
        });
    }
  };

  const onChangePageNate: PageNateProps['onchange'] = (result) => {
    AwatiScrollTop().then(() => {
      if (result === 'left') {
        history.replace(`/photo-ablum/${detail?.previousId}`);
        if (detail?.previousId) showAnimate({ id: detail.previousId, direction: 'right' });
      } else if (result === 'right') {
        history.replace(`/photo-ablum/${detail?.nextId}`);
        if (detail?.nextId) showAnimate({ id: detail.nextId, direction: 'left' });
      } else {
        history.push('/photo-ablum');
      }
    });
  };

  useEffect(() => {
    GetDetail(id).then((res) => {
      setDetail(res.data);
      setAnimateDetail(res.data);
    });
  }, []);

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
        <h2 className={Style.title}>{detail.title}</h2>
        <div className={Style.ct_swiper} ref={contentRef}>
          {animateDetail && (
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: decodeURIComponent(animateDetail.content) }}
            />
          )}
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: decodeURIComponent(detail.content) }}
          />
          {animateDetail && (
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: decodeURIComponent(animateDetail.content) }}
            />
          )}
        </div>
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
