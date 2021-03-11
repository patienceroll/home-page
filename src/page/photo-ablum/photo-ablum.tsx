import React, { FC, memo } from "react";

import Developing from "@src/componets-canvas/developing/developing";

const PhotoAblum: FC = memo(() => {
    return (
        <div style={{ height: "100%" }}>
            <Developing />
        </div>
    );
});

export default PhotoAblum;
