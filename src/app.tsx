import React from "react";
import ReactDOM from "react-dom";

import { HashRouter } from "react-router-dom";

import Layout from "@src/layout/layout";

import "@src/global.less";
import "@src/animate/animate.less";

ReactDOM.render(
    <HashRouter>
        <Layout />
    </HashRouter>,
    document.getElementById("root")
);
