import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Index from '../components/ForumIndex';
import Details from '../components/ForumDetails';
import User from '../components/ForumUser';
export default class router extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/ESS/forum' render={()=>(
              <Redirect to='/index/all'/>
              )}/>
          <Route path='/index/:id' component={Index}/>
          <Route path='/user/:id'  component={User}/>
          <Route path='/details/:id'  component={Details}/>
        </Switch>
      </div>
    )
  }
}
