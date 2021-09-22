import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Index from "../pages/index";
import AdminIndex from "../pages/adminIndex";
import Feedback from "../pages/feedback/feedback";
import UpdateUserIndex from "../pages/updateUser/index";
import AdminUserInfoIndex from "../pages/adminUserInfo";
import AdminFeedback from "../pages/adminFeedBack/index";

export default function ContentIndex() {
  return (
    <Switch>
      <Route
        path="/home"
        exact
        key="home"
        render={() => <Redirect to="/home/index" />}
      />
      <Route path="/home/index" component={Index} key="index" />
      <Route path="/home/feedback" component={Feedback} key="feedback" />
      <Route
        path="/home/updateuser"
        component={UpdateUserIndex}
        key="updateuser"
      />
      <Route
        path="/adminhome"
        exact
        key="adminhome"
        render={() => <Redirect to="/adminhome/index" />}
      />
      <Route path="/adminhome/index" component={AdminIndex} key="adminindex" />
      <Route
        path="/adminhome/userinfo"
        component={AdminUserInfoIndex}
        key="adminuserinfo"
      />
      <Route
        path="/adminhome/feedback"
        component={AdminFeedback}
        key="adminfeedback"
      />
    </Switch>
  );
}
