import React from "react";
import ReactDOM from "react-dom";

import Img from "@src/assets/1.jpg";

import url from "@public/back-ground.svg";

import style from "./app.module.less";

import "./app.less";

const App = () => {
    return (
        <div className={style.b}>
            123
            <div className="a">456</div>
            <img src={Img} alt="" />
            <img src={url} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
