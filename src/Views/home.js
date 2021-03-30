import React from "react";
import firebase from "../firebase.png";
import logo from "../logo.svg";

const Home = () => {
  return (
    <div className="maincontent">
      <div
        style={{
          margin: "5rem",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          fontFamily: "cursive;",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "60px" }}>Welcome to React FireBase sample</div>
        <div style={{ fontSize: "30px" }}>
          This is a sample task, to clone the firebase editor and create a front
          end web app for it.
        </div>
        <div style={{ fontSize: "30px" }}>
          In this app we are creating a child, a nested children, and also
          editing and deleting them.
        </div>
        <div style={{ margin: "5rem", display:"flex", justifyContent:"center" }}>
          <img src={logo} alt="react" className="logo" />
          <img src={firebase} alt="firebase" className="logo"/>
        </div>
      </div>
    </div>
  );
};
export default Home;
