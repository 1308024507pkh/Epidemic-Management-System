import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { HomeIndex } from "../pages/home/index";
import { AdminLogin } from "../pages/adminLogin";
import { AdminHomeIndex } from "../pages/adminHome/index";


export default function RouterIndex() {
  return (
    <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/adminlogin" component={AdminLogin} />
      <Route exact path="/home" component={HomeIndex} />
      <Route exact path="/adminhome" component={AdminHomeIndex} />
    </Switch>
    </div>
  );
}
