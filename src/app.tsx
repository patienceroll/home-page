import React from "react";
import ReactDOM from "react-dom";

import Layout from "@src/layout/layout";

import "./global.less";

const App = () => {
    return <Layout />;
};

ReactDOM.render(<App />, document.getElementById("root"));
