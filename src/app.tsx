import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import Layout from "@src/layout/layout";

const App = () => {
    return (
        <HashRouter>
            <Layout />
        </HashRouter>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
