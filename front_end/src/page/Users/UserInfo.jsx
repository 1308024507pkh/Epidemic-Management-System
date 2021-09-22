import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginIn from './js/LoginIn';
import Main from './js/Main';
import Create from './js/Create';
import User from './js/User';
import Change from './js/Change';
import Comment from './js/Comment';
import Application from './js/Application';
import Operator from './js/Operator';
import SuperOperator from './js/SuperOperator';


class UserInfo extends React.Component {
	render() {
		return(
		<Router>
                   
                  <Route exact path = "/User/Application" component = {Application}></Route>
                  <Route exact path = "/Operator" component = {Operator}></Route>
                  <Route exact path = "/SuperOperator" component = {SuperOperator}></Route>
                  
               
            </Router>
		);
	}
}

export default UserInfo