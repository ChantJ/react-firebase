import React from "react";
import logo from "../logo.svg"

const AppBar=()=>{
    return (
        <div className="appbar">
            <img src={logo} alt="logo" className="appbarLogo"/>
            <div className="appbarTile">
                React Firebase
            </div>
        </div>
    )
}
export default AppBar;