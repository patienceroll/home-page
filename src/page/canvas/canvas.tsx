import React, { FC, memo } from "react";

import Clock from "@src/componets-canvas/clock/clock";

const Canvas: FC = memo(() => {
    return (
        <div style={{ height: "100%" }}>
            canvas页面
            <Clock style={{height:'100%'}} />
        </div>
    );
});

export default Canvas;
