import React from "react";
import MainContent from "./maincontent"
import SideNavigation from "./sidenavigation"
import AppBar from "./appbar"

const Layout=()=>{
    return (
        <div >
            <AppBar/>
            <div style={{display:"flex", height:"100%"}}>
                <SideNavigation/>
                <MainContent/>
            </div>

        </div>
    )
}
export default Layout;
