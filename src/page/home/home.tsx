import React, { memo } from "react";

import CanvasFirework from "@src/componets-canvas/firework/firework";

const Home: React.FC = memo(() => {
    return (
        <div>
            <div style={{ textAlign: "center" }}>home页面内</div>
            <CanvasFirework style={{ width: '100vw', height: '100vh' }} />
        </div>
    );
});

export default Home;
