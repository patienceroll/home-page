import React, { memo } from "react";

import Loading from "@src/componets-canvas/loading/loading";

const Home: React.FC = memo(() => {
    return (
        <div>
            <div style={{ textAlign: "center" }}>home页面</div>
            <Loading />
        </div>
    );
});

export default Home;
