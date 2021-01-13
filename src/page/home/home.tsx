import React, { memo } from "react";

import CanvasFirework from "@src/componets-canvas/firework/firework";

const Home: React.FC = memo(() => {
    return (
        <div>
            <div style={{ textAlign: "center" }}>home</div>
            <CanvasFirework style={{ width: 1000, height: 1000 }} />
        </div>
    );
});

export default Home;
