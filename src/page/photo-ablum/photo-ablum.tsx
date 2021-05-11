import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Loading from "@src/componets-canvas/loading/loading";
import PhotoBox from "@src/b-components/photo/photo-box";

import * as Request from "./service";
import type Data from "./data";

import Style from "./photo-ablum.module.less";

const PhotoAblum: FC = memo(() => {
    const history = useHistory();

    const [list, setList] = useState<Data.PhotoListItem[]>();

    const getList = useCallback(() => {
        setList(undefined);
        Request.GetPhotoList({ page: 1, perPage: 30 }).then(res => {
            setList(res.data.list);
        });
    }, []);

    const onClickPhoto = (id: string) => () => {
        history.push(`/photo-ablum/${id}`);
    };

    useEffect(getList, [getList]);

    return (
        <div className={Style.CT}>
            {list ? (
                <div className={Style.CT_inner}>
                    {list.map(i => (
                        <div key={i.id} onClick={onClickPhoto(i.id)} className={Style.item}>
                            <PhotoBox {...i} />
                        </div>
                    ))}
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
});

export default PhotoAblum;
