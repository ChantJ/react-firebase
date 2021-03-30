import React, {useState} from "react";
import { Link } from "react-router-dom";

const SideNavigation = () => {
    const [selected, setSelected]=useState(1)

  return (
    <nav className="navbar">
      <div className={selected===1 ? "navitems selected":"navitems"} onClick={()=>setSelected(1)}>
        <Link to="/" className="navlink">Home</Link>
      </div>
      <div className={selected===2 ? "navitems selected":"navitems"} onClick={()=>setSelected(2)}>
        <Link to="/realtime-database" className="navlink">Realtime Database</Link>
      </div>
    </nav>
  );
};
export default SideNavigation;
