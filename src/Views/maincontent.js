import React from "react";
import { Switch, Route } from "react-router-dom";
import RealtimeDatabae from "./realtime-database";
import Home from "./home";

import "./style.css";

const MainContent = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/realtime-database" component={RealtimeDatabae}/>
    </Switch>
  );
};
export default MainContent;
