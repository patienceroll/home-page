import React, { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loading from "@src/componets-canvas/loading/loading";

import * as Data from "../data";

import * as Request from "../service";

import Style from "./photo-detail.module.less";

const PhotoDetail = memo(() => {
    const { id } = useParams<{ id: string }>();
    const [detail, setDetail] = useState<Data.PhotoDetail>();

    const getDetail = useCallback(() => {
        setDetail(undefined);
        Request.GetPhoto({ id }).then(res => {
            setDetail(res.data);
        });
    }, [id]);

    useEffect(getDetail, [getDetail]);

    return detail ? (
        <div className={Style.CT}>
            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: decodeURIComponent(detail.content) }} />
        </div>
    ) : (
        <Loading />
    );
});

export default PhotoDetail;
